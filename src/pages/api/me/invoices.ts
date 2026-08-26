import type { APIRoute } from 'astro';
import { getSql, jsonResponse, errorResponse, handleServerError } from '../../../server/db.js';
import { requireSession } from '../../../server/auth.js';
import { validateLineItems, validateAmount, validateTotal, sanitizeClient } from '../../../server/validate.js';

export const prerender = false;

/** Create an invoice (and upsert the client) for the logged-in distributor. */
export const POST: APIRoute = async (context) => {
  try {
    const { session, error } = requireSession(context);
    if (error) return errorResponse(error, 401);

    const code = session!.code;
    const body = await context.request.json().catch(() => null);
    if (!body) return errorResponse('Cuerpo de la solicitud inválido.', 400);

    // Validate before touching the database. An audit found that a negative
    // quantity produced a negative invoice total, a non-object `products` value was
    // written straight into JSONB, and oversized numbers overflowed NUMERIC(12,2)
    // and escaped as a 500.
    const items = validateLineItems(body.products, body.productPrices);
    if (items.error) return errorResponse(items.error, 400);

    const shippingCheck = validateAmount(body.shipping, 'El costo de envío');
    if (shippingCheck.error) return errorResponse(shippingCheck.error, 400);
    const shipping = shippingCheck.amount;

    // The total is always recomputed here; a client-supplied total is ignored.
    const totalCheck = validateTotal(items.subtotal + shipping);
    if (totalCheck.error) return errorResponse(totalCheck.error, 400);
    const total = totalCheck.total;

    const client = sanitizeClient(body.client);
    const products = items.products;
    const productPrices = items.productPrices;

    const sql = getSql();
    const clientNumber = String(client.clientNumber || '').trim() || `TEMP_${Date.now()}`;

    await sql`
      INSERT INTO clients (client_number, distributor_code, first_name, last_name,
                           address, city, state, zip_code, phone, email)
      VALUES (${clientNumber}, ${code}, ${client.firstName || ''}, ${client.lastName || ''},
              ${client.address || ''}, ${client.city || ''}, ${client.state || ''},
              ${client.zipCode || ''}, ${client.phone || ''}, ${client.email || ''})
      ON CONFLICT (distributor_code, client_number) DO UPDATE SET
        first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name,
        address = EXCLUDED.address, city = EXCLUDED.city, state = EXCLUDED.state,
        zip_code = EXCLUDED.zip_code, phone = EXCLUDED.phone, email = EXCLUDED.email
    `;

    const inserted = await sql`
      INSERT INTO invoices (distributor_code, client_number, client_name, invoice_date,
                            total_amount, shipping_price, products, product_prices,
                            full_data, confirmed)
      VALUES (${code}, ${clientNumber},
              ${`${client.firstName || ''} ${client.lastName || ''}`.trim()},
              ${(() => {
                const d = body.date ? new Date(body.date) : new Date();
                return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
              })()},
              ${total}, ${shipping}, ${JSON.stringify(products)},
              ${JSON.stringify(productPrices)}, ${JSON.stringify(body.fullData ?? null)}, FALSE)
      RETURNING id, client_name, invoice_date, total_amount, shipping_price,
                products, product_prices, full_data, confirmed, confirmed_at
    `;

    const inv = inserted[0];
    return jsonResponse({
      invoice: {
        id: inv.id,
        date: inv.invoice_date,
        client: inv.client_name,
        total: Number(inv.total_amount) || 0,
        products: inv.products || {},
        productPrices: inv.product_prices || {},
        shipping: Number(inv.shipping_price) || 0,
        fullData: inv.full_data,
        confirmed: false,
        confirmedAt: null
      }
    }, 201);
  } catch (error) {
    return handleServerError(error, 'me/invoices POST');
  }
};

/** Confirm a sale and decrement inventory atomically. */
export const PATCH: APIRoute = async (context) => {
  try {
    const { session, error } = requireSession(context);
    if (error) return errorResponse(error, 401);

    const code = session!.code;
    const body = await context.request.json().catch(() => null);
    const invoiceId = Number(body?.invoiceId);
    if (!Number.isFinite(invoiceId)) return errorResponse('invoiceId inválido.', 400);

    const sql = getSql();

    // The `distributor_code` guard is what stops one distributor confirming another's
    // invoice by guessing an id.
    const updated = await sql`
      UPDATE invoices SET confirmed = TRUE, confirmed_at = NOW()
      WHERE id = ${invoiceId} AND distributor_code = ${code} AND confirmed = FALSE
      RETURNING id, products
    `;

    if (updated.length === 0) {
      return errorResponse('Factura no encontrada o ya confirmada.', 404);
    }

    // Decrement in SQL rather than reading stock into JS and writing it back — the
    // old client-side version computed new stock from a stale React state snapshot,
    // so two confirmations in a row could both write the same value.
    // Existing rows predate the validation above and may hold a non-object value,
    // so re-check rather than trusting the column.
    const stored = updated[0].products;
    const products = (typeof stored === 'object' && stored !== null && !Array.isArray(stored)) ? stored : {};
    for (const [productName, qty] of Object.entries(products)) {
      const amount = Number(qty);
      if (!Number.isFinite(amount) || amount <= 0) continue;
      await sql`
        INSERT INTO inventory (distributor_code, product_name, stock_quantity, updated_at)
        VALUES (${code}, ${productName}, 0, NOW())
        ON CONFLICT (distributor_code, product_name) DO UPDATE SET
          stock_quantity = GREATEST(0, inventory.stock_quantity - ${amount}),
          updated_at = NOW()
      `;
    }

    const inventory = await sql`
      SELECT product_name, stock_quantity FROM inventory WHERE distributor_code = ${code}
    `;
    const inventoryObj: Record<string, number> = {};
    for (const i of inventory) inventoryObj[i.product_name] = Number(i.stock_quantity) || 0;

    return jsonResponse({ ok: true, inventory: inventoryObj });
  } catch (error) {
    return handleServerError(error, 'me/invoices PATCH');
  }
};

/** Delete (cancel) an invoice belonging to the logged-in distributor. */
export const DELETE: APIRoute = async (context) => {
  try {
    const { session, error } = requireSession(context);
    if (error) return errorResponse(error, 401);

    const body = await context.request.json().catch(() => null);
    const invoiceId = Number(body?.invoiceId);
    if (!Number.isFinite(invoiceId)) return errorResponse('invoiceId inválido.', 400);

    const sql = getSql();
    const deleted = await sql`
      DELETE FROM invoices WHERE id = ${invoiceId} AND distributor_code = ${session!.code}
      RETURNING id
    `;

    if (deleted.length === 0) return errorResponse('Factura no encontrada.', 404);
    return jsonResponse({ ok: true });
  } catch (error) {
    return handleServerError(error, 'me/invoices DELETE');
  }
};

import type { APIRoute } from 'astro';
import { getSql, jsonResponse, errorResponse, handleServerError } from '../../../server/db.js';
import { requireSession } from '../../../server/auth.js';

export const prerender = false;

/**
 * Everything the distributor dashboard needs, in one request.
 *
 * Scoping comes from the signed session cookie, never from a client-supplied code —
 * so one distributor cannot read another's clients or invoices by changing a
 * parameter. Previously the browser chose its own `distributor_code` filter and the
 * database accepted it, because every RLS policy was `USING (true)`.
 *
 * This also replaces four sequential round trips the old dashboard made on login.
 */
export const GET: APIRoute = async (context) => {
  try {
    const { session, error } = requireSession(context);
    if (error) return errorResponse(error, 401);

    const sql = getSql();
    const code = session!.code;

    const [profile, clients, invoices, prices, inventory] = await Promise.all([
      sql`SELECT code, name, last_name, state, country, phone, email, photo_url,
                 payment_methods_usa, payment_methods_mexico
          FROM distributors WHERE code = ${code}`,
      sql`SELECT client_number, first_name, last_name, address, city, state, zip_code, phone, email
          FROM clients WHERE distributor_code = ${code}`,
      sql`SELECT id, client_number, client_name, invoice_date, total_amount, shipping_price,
                 products, product_prices, full_data, confirmed, confirmed_at
          FROM invoices WHERE distributor_code = ${code} ORDER BY invoice_date DESC`,
      sql`SELECT product_name, price FROM distributor_prices WHERE distributor_code = ${code}`,
      sql`SELECT product_name, stock_quantity FROM inventory WHERE distributor_code = ${code}`
    ]);

    const clientsObj: Record<string, unknown> = {};
    for (const c of clients) {
      clientsObj[c.client_number] = {
        firstName: c.first_name, lastName: c.last_name, address: c.address,
        city: c.city || '', state: c.state || '', zipCode: c.zip_code || '',
        phone: c.phone || '', email: c.email || ''
      };
    }

    const pricesObj: Record<string, number> = {};
    for (const p of prices) pricesObj[p.product_name] = Number(p.price) || 0;

    const inventoryObj: Record<string, number> = {};
    for (const i of inventory) inventoryObj[i.product_name] = Number(i.stock_quantity) || 0;

    return jsonResponse({
      profile: profile[0] ?? null,
      clients: clientsObj,
      prices: pricesObj,
      inventory: inventoryObj,
      invoices: invoices.map((inv) => ({
        id: inv.id,
        date: inv.invoice_date,
        client: inv.client_name,
        total: Number(inv.total_amount) || 0,
        products: inv.products || {},
        productPrices: inv.product_prices || {},
        shipping: Number(inv.shipping_price) || 0,
        fullData: inv.full_data,
        confirmed: Boolean(inv.confirmed),
        confirmedAt: inv.confirmed_at
      }))
    });
  } catch (error) {
    return handleServerError(error, 'me/data');
  }
};

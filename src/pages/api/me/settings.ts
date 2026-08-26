import type { APIRoute } from 'astro';
import { getSql, jsonResponse, errorResponse, handleServerError } from '../../../server/db.js';
import { requireSession } from '../../../server/auth.js';
import { isPlainObject, MAX_UNIT_PRICE, MAX_QUANTITY } from '../../../server/validate.js';

export const prerender = false;

/**
 * Bulk-save the logged-in distributor's prices and/or stock levels, plus their own
 * profile fields. All scoped by the session cookie, so `distributor_code` can never
 * be spoofed by the caller.
 */
export const PUT: APIRoute = async (context) => {
  try {
    const { session, error } = requireSession(context);
    if (error) return errorResponse(error, 401);

    const code = session!.code;
    const body = await context.request.json().catch(() => null);
    if (!body) return errorResponse('Cuerpo de la solicitud inválido.', 400);

    const sql = getSql();

    if (isPlainObject(body.prices)) {
      for (const [productName, price] of Object.entries(body.prices)) {
        const value = Number(price);
        // Upper bound added after an audit: an oversized price overflowed
        // NUMERIC(12,2) and surfaced as a 500 instead of a validation error.
        if (!Number.isFinite(value) || value < 0 || value > MAX_UNIT_PRICE) continue;
        if (typeof productName !== 'string' || !productName || productName.length > 200) continue;
        await sql`
          INSERT INTO distributor_prices (distributor_code, product_name, price, updated_at)
          VALUES (${code}, ${productName}, ${value}, NOW())
          ON CONFLICT (distributor_code, product_name) DO UPDATE SET
            price = EXCLUDED.price, updated_at = NOW()
        `;
      }
    }

    if (isPlainObject(body.inventory)) {
      for (const [productName, qty] of Object.entries(body.inventory)) {
        const value = Math.min(MAX_QUANTITY, Math.max(0, Math.trunc(Number(qty) || 0)));
        if (typeof productName !== 'string' || !productName || productName.length > 200) continue;
        await sql`
          INSERT INTO inventory (distributor_code, product_name, stock_quantity, updated_at)
          VALUES (${code}, ${productName}, ${value}, NOW())
          ON CONFLICT (distributor_code, product_name) DO UPDATE SET
            stock_quantity = EXCLUDED.stock_quantity, updated_at = NOW()
        `;
      }
    }

    if (isPlainObject(body.paymentMethods)) {
      const usa = Array.isArray(body.paymentMethods.usa) ? body.paymentMethods.usa : [];
      const mex = Array.isArray(body.paymentMethods.mexico) ? body.paymentMethods.mexico : [];
      await sql`
        UPDATE distributors
        SET payment_methods_usa = ${JSON.stringify(usa)},
            payment_methods_mexico = ${JSON.stringify(mex)},
            updated_at = NOW()
        WHERE code = ${code}
      `;
    }

    if (isPlainObject(body.profile)) {
      const p = body.profile;
      // Column list is fixed: a distributor must not be able to flip their own
      // is_admin flag by adding it to the request body.
      await sql`
        UPDATE distributors SET
          name = COALESCE(${p.name ?? null}, name),
          last_name = COALESCE(${p.last_name ?? null}, last_name),
          state = COALESCE(${p.state ?? null}, state),
          phone = COALESCE(${p.phone ?? null}, phone),
          email = COALESCE(${p.email ?? null}, email),
          photo_url = COALESCE(${p.photo_url ?? null}, photo_url),
          updated_at = NOW()
        WHERE code = ${code}
      `;
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    return handleServerError(error, 'me/settings');
  }
};

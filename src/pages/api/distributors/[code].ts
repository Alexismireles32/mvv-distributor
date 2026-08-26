import type { APIRoute } from 'astro';
import { getSql, jsonResponse, errorResponse, handleServerError } from '../../../server/db.js';

export const prerender = false;

/**
 * Public distributor lookup for the verification page and the customer ordering flow.
 *
 * The column list here is the security boundary: the browser can no longer choose
 * what to select, so `pin_hash` is unreachable. The old client did
 * `.select('*')` against the whole table and filtered locally, which handed every
 * visitor every distributor's PIN, phone and email.
 *
 * `country` and the two payment_methods columns must stay in this list: the checkout
 * builds its payment options from them. Omitting them left every distributor with an
 * empty payment list, which permanently disabled the "Enviar a Distribuidor" button
 * and made it impossible for any customer to complete an order. They hold method
 * names such as "OXXO", not credentials.
 */
export const GET: APIRoute = async ({ params }) => {
  try {
    const code = String(params.code ?? '').trim();
    if (!/^\d{3}$/.test(code)) {
      return errorResponse('El código debe tener exactamente 3 dígitos.', 400);
    }

    const sql = getSql();
    const rows = await sql`
      SELECT code, name, last_name, state, country, phone, email, photo_url,
             payment_methods_usa, payment_methods_mexico
      FROM distributors
      WHERE code = ${code} AND is_active = TRUE
    `;

    if (rows.length === 0) {
      return jsonResponse({ distributor: null }, 404);
    }

    // Prices come along so the ordering page can activate in a single round trip.
    const prices = await sql`
      SELECT product_name, price
      FROM distributor_prices
      WHERE distributor_code = ${code}
    `;

    const priceMap: Record<string, number> = {};
    for (const row of prices) {
      priceMap[row.product_name] = Number(row.price) || 0;
    }

    return jsonResponse({ distributor: rows[0], prices: priceMap });
  } catch (error) {
    return handleServerError(error, 'distributors/[code]');
  }
};

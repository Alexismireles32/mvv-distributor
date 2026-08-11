import type { APIRoute } from 'astro';
import { getSql, jsonResponse, errorResponse, handleServerError } from '../../../server/db.js';
import { requireAdmin } from '../../../server/auth.js';

export const prerender = false;

/** Invoices for one distributor, admin only. */
export const GET: APIRoute = async (context) => {
  try {
    const { error } = requireAdmin(context);
    if (error) return errorResponse(error, 403);

    const code = String(context.url.searchParams.get('code') ?? '').trim();
    if (!/^\d{3}$/.test(code)) return errorResponse('Código inválido.', 400);

    const sql = getSql();
    const invoices = await sql`
      SELECT id, client_number, client_name, invoice_date, total_amount, shipping_price,
             products, product_prices, full_data, confirmed, confirmed_at
      FROM invoices
      WHERE distributor_code = ${code}
      ORDER BY invoice_date DESC
    `;

    return jsonResponse({ invoices });
  } catch (error) {
    return handleServerError(error, 'admin/invoices');
  }
};

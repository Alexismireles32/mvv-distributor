import type { APIRoute } from 'astro';
import { getSql, jsonResponse, errorResponse, handleServerError } from '../../../server/db.js';
import { requireAdmin, hashPin } from '../../../server/auth.js';
import { slugify, isValidSlug } from '../../../lib/slug.js';

export const prerender = false;

/**
 * Admin roster with per-distributor sales totals.
 *
 * Authorization is `requireAdmin`, which reads the httpOnly signed session cookie.
 * The old dashboard gated on `localStorage.admin_authed === 'true'` plus a hardcoded
 * code in the bundle — both settable from the browser console.
 */
export const GET: APIRoute = async (context) => {
  try {
    const { error } = requireAdmin(context);
    if (error) return errorResponse(error, 403);

    const sql = getSql();

    // Single aggregate query. The previous version ran one invoices query per
    // distributor inside an awaited loop.
    const rows = await sql`
      SELECT d.code, d.name, d.last_name, d.state, d.country, d.phone, d.email,
             d.is_active, d.is_admin, d.slug,
             COALESCE(SUM(i.total_amount), 0)      AS sales,
             COUNT(i.id)                            AS invoice_count,
             COUNT(DISTINCT i.client_number)        AS clients_count
      FROM distributors d
      LEFT JOIN invoices i ON i.distributor_code = d.code
      GROUP BY d.code
      ORDER BY sales DESC
    `;

    const distributors = rows.map((r) => ({
      code: r.code, name: r.name, last_name: r.last_name, state: r.state, slug: r.slug,
      country: r.country, phone: r.phone, email: r.email,
      is_active: r.is_active, is_admin: r.is_admin,
      sales: Number(r.sales) || 0,
      invoiceCount: Number(r.invoice_count) || 0,
      clientsCount: Number(r.clients_count) || 0
    }));

    return jsonResponse({
      distributors,
      stats: {
        totalDistributors: distributors.length,
        totalSales: distributors.reduce((s, d) => s + d.sales, 0),
        totalClients: distributors.reduce((s, d) => s + d.clientsCount, 0),
        topSellers: distributors.slice(0, 5)
      }
    });
  } catch (error) {
    return handleServerError(error, 'admin/distributors GET');
  }
};

/** Admin edit of a distributor, including resetting a forgotten PIN. */
export const PATCH: APIRoute = async (context) => {
  try {
    const { error } = requireAdmin(context);
    if (error) return errorResponse(error, 403);

    const body = await context.request.json().catch(() => null);
    const code = String(body?.code ?? '').trim();
    if (!/^\d{3}$/.test(code)) return errorResponse('Código inválido.', 400);

    const sql = getSql();

    // A new PIN is hashed here; the plaintext is never stored. This is how a
    // distributor who forgets their PIN gets back in.
    if (body.pin) {
      if (!/^\d{4}$/.test(String(body.pin))) {
        return errorResponse('El PIN debe ser de 4 dígitos numéricos.', 400);
      }
      await sql`UPDATE distributors SET pin_hash = ${hashPin(String(body.pin))}, updated_at = NOW()
                WHERE code = ${code}`;
    }

    // Slug edits are normalised and uniqueness-checked before they land, so a
    // vanity URL cannot be duplicated or contain characters a URL cannot carry.
    if (body.slug !== undefined) {
      const nextSlug = slugify(body.slug);
      if (!isValidSlug(nextSlug)) {
        return errorResponse('El enlace personalizado no es válido.', 400);
      }
      const clash = await sql`
        SELECT code FROM distributors WHERE slug = ${nextSlug} AND code <> ${code}
      `;
      if (clash.length > 0) {
        return errorResponse(`El enlace /d/${nextSlug} ya está en uso.`, 409);
      }
      await sql`UPDATE distributors SET slug = ${nextSlug}, updated_at = NOW() WHERE code = ${code}`;
    }

    await sql`
      UPDATE distributors SET
        name = COALESCE(${body.name ?? null}, name),
        last_name = COALESCE(${body.last_name ?? null}, last_name),
        state = COALESCE(${body.state ?? null}, state),
        phone = COALESCE(${body.phone ?? null}, phone),
        email = COALESCE(${body.email ?? null}, email),
        is_active = COALESCE(${typeof body.is_active === 'boolean' ? body.is_active : null}, is_active),
        updated_at = NOW()
      WHERE code = ${code}
    `;

    return jsonResponse({ ok: true });
  } catch (error) {
    return handleServerError(error, 'admin/distributors PATCH');
  }
};

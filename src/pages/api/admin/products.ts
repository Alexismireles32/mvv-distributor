import type { APIRoute } from 'astro';
import { getSql, jsonResponse, errorResponse, handleServerError } from '../../../server/db.js';
import { requireAdmin } from '../../../server/auth.js';

export const prerender = false;

/** Product catalog CRUD. Admin only — previously any visitor could write here. */
export const GET: APIRoute = async (context) => {
  try {
    const { error } = requireAdmin(context);
    if (error) return errorResponse(error, 403);

    const sql = getSql();
    const products = await sql`SELECT id, name, slug, image_url, is_active FROM products ORDER BY name ASC`;
    const images = await sql`SELECT id, product_id, image_url FROM product_images`;

    return jsonResponse({ products, images });
  } catch (error) {
    return handleServerError(error, 'admin/products GET');
  }
};

export const POST: APIRoute = async (context) => {
  try {
    const { error } = requireAdmin(context);
    if (error) return errorResponse(error, 403);

    const body = await context.request.json().catch(() => null);

    // Adding an image to an existing product.
    if (body?.productId && body?.imageUrl) {
      const sql = getSql();
      const rows = await sql`
        INSERT INTO product_images (product_id, image_url)
        VALUES (${Number(body.productId)}, ${String(body.imageUrl)})
        RETURNING id, product_id, image_url`;
      return jsonResponse({ image: rows[0] }, 201);
    }

    const name = String(body?.name ?? '').trim();
    if (!name) return errorResponse('El nombre del producto es obligatorio.', 400);

    const sql = getSql();
    const rows = await sql`
      INSERT INTO products (name, slug, image_url)
      VALUES (${name}, ${body?.slug || null}, ${body?.image_url || null})
      ON CONFLICT (name) DO NOTHING
      RETURNING id, name, slug, image_url, is_active`;

    if (rows.length === 0) return errorResponse('Ya existe un producto con ese nombre.', 409);
    return jsonResponse({ product: rows[0] }, 201);
  } catch (error) {
    return handleServerError(error, 'admin/products POST');
  }
};

export const PATCH: APIRoute = async (context) => {
  try {
    const { error } = requireAdmin(context);
    if (error) return errorResponse(error, 403);

    const body = await context.request.json().catch(() => null);
    const id = Number(body?.id);
    if (!Number.isFinite(id)) return errorResponse('id inválido.', 400);

    const sql = getSql();
    await sql`
      UPDATE products SET
        name = COALESCE(${body.name ?? null}, name),
        slug = COALESCE(${body.slug ?? null}, slug),
        image_url = COALESCE(${body.image_url ?? null}, image_url),
        is_active = COALESCE(${typeof body.is_active === 'boolean' ? body.is_active : null}, is_active)
      WHERE id = ${id}`;

    return jsonResponse({ ok: true });
  } catch (error) {
    return handleServerError(error, 'admin/products PATCH');
  }
};

export const DELETE: APIRoute = async (context) => {
  try {
    const { error } = requireAdmin(context);
    if (error) return errorResponse(error, 403);

    const body = await context.request.json().catch(() => null);
    const sql = getSql();

    if (body?.imageId) {
      await sql`DELETE FROM product_images WHERE id = ${Number(body.imageId)}`;
      return jsonResponse({ ok: true });
    }

    const id = Number(body?.id);
    if (!Number.isFinite(id)) return errorResponse('id inválido.', 400);
    await sql`DELETE FROM products WHERE id = ${id}`;
    return jsonResponse({ ok: true });
  } catch (error) {
    return handleServerError(error, 'admin/products DELETE');
  }
};

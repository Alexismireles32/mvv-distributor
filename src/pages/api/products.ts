import type { APIRoute } from 'astro';
import { getSql, jsonResponse, handleServerError } from '../../server/db.js';

export const prerender = false;

/**
 * Public product catalog. Read-only — writes live behind /api/admin/products.
 * Previously the browser held write access to this table through the anon key.
 */
export const GET: APIRoute = async () => {
  try {
    const sql = getSql();
    const products = await sql`
      SELECT name, slug, image_url
      FROM products
      WHERE is_active = TRUE
      ORDER BY name ASC
    `;
    return jsonResponse({ products });
  } catch (error) {
    return handleServerError(error, 'products');
  }
};

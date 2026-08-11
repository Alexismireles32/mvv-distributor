import type { APIRoute } from 'astro';
import { getSql, jsonResponse, errorResponse, handleServerError } from '../../../server/db.js';
import { verifyPin, createSessionToken, sessionCookie } from '../../../server/auth.js';

// Runs on the server. Without this the route would be prerendered to static HTML
// at build time and could not read the database or set a cookie.
export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const body = await context.request.json().catch(() => null);
    const code = String(body?.code ?? '').trim();
    const pin = String(body?.pin ?? '').trim();

    if (!/^\d{3}$/.test(code) || !/^\d{4}$/.test(pin)) {
      return errorResponse('Código o PIN inválido.', 400);
    }

    const sql = getSql();
    const rows = await sql`
      SELECT code, name, last_name, state, country, phone, email, photo_url,
             pin_hash, is_active, is_admin
      FROM distributors
      WHERE code = ${code}
    `;

    const distributor = rows[0];

    // Same generic message whether the code is unknown or the PIN is wrong, so the
    // endpoint cannot be used to enumerate which of the 900 codes exist.
    if (!distributor || !verifyPin(pin, distributor.pin_hash)) {
      return errorResponse('Código o PIN incorrecto.', 401);
    }

    if (distributor.is_active === false) {
      return errorResponse('Esta cuenta está desactivada. Contacta al administrador.', 403);
    }

    const token = createSessionToken({
      code: distributor.code,
      role: distributor.is_admin ? 'admin' : 'distributor'
    });
    context.cookies.set(sessionCookie.name, token, sessionCookie.options);

    // pin_hash is deliberately not part of the response.
    const { pin_hash, ...safe } = distributor;
    return jsonResponse({ distributor: safe, role: distributor.is_admin ? 'admin' : 'distributor' });
  } catch (error) {
    return handleServerError(error, 'auth/login');
  }
};

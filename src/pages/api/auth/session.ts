import type { APIRoute } from 'astro';
import { getSql, jsonResponse, handleServerError } from '../../../server/db.js';
import { getSession, sessionCookie } from '../../../server/auth.js';

export const prerender = false;

/**
 * Restores the current session on page load, replacing the old
 * `localStorage.getItem('lastLoggedIn')` flow — that trusted a value the user could
 * edit, and re-fetched the distributor row without any credential check.
 */
export const GET: APIRoute = async (context) => {
  try {
    const session = getSession(context);
    if (!session) return jsonResponse({ distributor: null, role: null });

    const sql = getSql();
    const rows = await sql`
      SELECT code, name, last_name, state, country, phone, email, photo_url, is_active, is_admin
      FROM distributors
      WHERE code = ${session.code}
    `;

    const distributor = rows[0];
    // Cover the case where the account was deleted or deactivated mid-session.
    if (!distributor || distributor.is_active === false) {
      context.cookies.delete(sessionCookie.name, { path: '/' });
      return jsonResponse({ distributor: null, role: null });
    }

    return jsonResponse({ distributor, role: session.role });
  } catch (error) {
    return handleServerError(error, 'auth/session');
  }
};

/** Logout. */
export const DELETE: APIRoute = async (context) => {
  context.cookies.delete(sessionCookie.name, { path: '/' });
  return jsonResponse({ ok: true });
};

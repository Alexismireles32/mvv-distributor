import type { APIRoute } from 'astro';
import { getSql, jsonResponse, errorResponse, handleServerError } from '../../../server/db.js';
import { verifyPin, createSessionToken, sessionCookie } from '../../../server/auth.js';

export const prerender = false;

// Distributor codes are public (they appear on the verification page and in
// /productos?code=NNN links), so the 4-digit PIN is the only secret. An audit
// measured the unthrottled endpoint at ~2.7 attempts/sec — the entire 10,000-PIN
// space in about an hour. With this lockout the same sweep takes ~500 hours.
const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

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
             pin_hash, is_active, is_admin, failed_attempts, locked_until
      FROM distributors
      WHERE code = ${code}
    `;

    const distributor = rows[0];

    // Same generic response whether the code is unknown or the PIN is wrong, so the
    // endpoint cannot be used to enumerate which of the 900 codes exist.
    if (!distributor) {
      return errorResponse('Código o PIN incorrecto.', 401);
    }

    if (distributor.locked_until && new Date(distributor.locked_until) > new Date()) {
      const minutesLeft = Math.max(
        1,
        Math.ceil((new Date(distributor.locked_until).getTime() - Date.now()) / 60000)
      );
      return errorResponse(
        `Demasiados intentos fallidos. Intenta de nuevo en ${minutesLeft} minuto(s).`,
        429
      );
    }

    if (!verifyPin(pin, distributor.pin_hash)) {
      // Count the failure and lock the account once the threshold is crossed.
      // Locking per account (rather than per IP) is what actually stops the attack,
      // since an attacker can rotate addresses freely. The window is deliberately
      // short so a malicious lockout is a nuisance rather than a denial of service.
      const attempts = Number(distributor.failed_attempts || 0) + 1;
      if (attempts >= MAX_ATTEMPTS) {
        await sql`
          UPDATE distributors
          SET failed_attempts = ${attempts},
              locked_until = NOW() + (${LOCKOUT_MINUTES} * INTERVAL '1 minute')
          WHERE code = ${code}
        `;
        return errorResponse(
          `Demasiados intentos fallidos. Cuenta bloqueada por ${LOCKOUT_MINUTES} minutos.`,
          429
        );
      }

      await sql`UPDATE distributors SET failed_attempts = ${attempts} WHERE code = ${code}`;
      return errorResponse('Código o PIN incorrecto.', 401);
    }

    if (distributor.is_active === false) {
      return errorResponse('Esta cuenta está desactivada. Contacta al administrador.', 403);
    }

    // Successful login clears the counter.
    await sql`
      UPDATE distributors SET failed_attempts = 0, locked_until = NULL WHERE code = ${code}
    `;

    const token = createSessionToken({
      code: distributor.code,
      role: distributor.is_admin ? 'admin' : 'distributor'
    });
    context.cookies.set(sessionCookie.name, token, sessionCookie.options);

    // pin_hash and the lockout bookkeeping are deliberately not in the response.
    const { pin_hash, failed_attempts, locked_until, ...safe } = distributor;
    return jsonResponse({ distributor: safe, role: distributor.is_admin ? 'admin' : 'distributor' });
  } catch (error) {
    return handleServerError(error, 'auth/login');
  }
};

import type { APIRoute } from 'astro';
import { getSql, jsonResponse, errorResponse, handleServerError } from '../../../server/db.js';
import { hashPin, createSessionToken, sessionCookie } from '../../../server/auth.js';

export const prerender = false;

const CODE_MIN = 100;
const CODE_MAX = 999;
const MAX_ATTEMPTS = 5;

// Must match the options in the registration form's country select.
const VALID_COUNTRIES = ['USA', 'Mexico'];

export const POST: APIRoute = async (context) => {
  try {
    const body = await context.request.json().catch(() => null);

    // The registration gate is now checked server-side against a non-public env var,
    // so it is no longer readable in the client bundle.
    const expectedGate = process.env?.REGISTRATION_CODE;
    if (!expectedGate) {
      return errorResponse('El registro no está configurado. Falta REGISTRATION_CODE.', 503);
    }
    if (String(body?.registrationCode ?? '') !== expectedGate) {
      return errorResponse('Código de registro incorrecto.', 403);
    }

    const name = String(body?.name ?? '').trim();
    const lastName = String(body?.lastName ?? '').trim();
    const state = String(body?.state ?? '').trim();
    const pin = String(body?.pin ?? '').trim();

    if (!name || !lastName || !state) {
      return errorResponse('Nombre, apellido y estado son obligatorios.', 400);
    }

    // Country is required: it decides the quoted currency and which payment-method
    // list the checkout shows, so a distributor without one would quote the wrong
    // currency and show the wrong payment options.
    const country = String(body?.country ?? '').trim();
    if (!VALID_COUNTRIES.includes(country)) {
      return errorResponse(
        `El país es obligatorio y debe ser uno de: ${VALID_COUNTRIES.join(', ')}.`,
        400
      );
    }
    if (!/^\d{4}$/.test(pin)) {
      return errorResponse('El PIN debe ser de 4 dígitos numéricos.', 400);
    }

    const sql = getSql();
    const pinHash = hashPin(pin);
    const phone = String(body?.phone ?? '').trim() || null;
    const email = String(body?.email ?? '').trim() || null;

    // Pick a free code, then let the PRIMARY KEY settle any race. Two people
    // registering at the same moment used to be able to claim the same code,
    // because the old client checked availability and inserted as separate steps.
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const taken = await sql`SELECT code FROM distributors`;
      const takenSet = new Set(taken.map((r: { code: string }) => String(r.code)));

      const available: string[] = [];
      for (let c = CODE_MIN; c <= CODE_MAX; c++) {
        const code = String(c);
        if (!takenSet.has(code)) available.push(code);
      }

      if (available.length === 0) {
        return errorResponse(
          `No hay códigos disponibles: el rango ${CODE_MIN}-${CODE_MAX} está agotado.`,
          409
        );
      }

      const code = available[Math.floor(Math.random() * available.length)];

      try {
        await sql`
          INSERT INTO distributors (code, name, last_name, state, country, phone, email, pin_hash)
          VALUES (${code}, ${name}, ${lastName}, ${state}, ${country}, ${phone}, ${email}, ${pinHash})
        `;

        const token = createSessionToken({ code, role: 'distributor' });
        context.cookies.set(sessionCookie.name, token, sessionCookie.options);

        return jsonResponse({
          distributor: { code, name, last_name: lastName, state, country, phone, email },
          code
        }, 201);
      } catch (insertError: any) {
        // 23505 = unique_violation: another registration took this code first. Retry.
        if (insertError?.code === '23505') continue;
        throw insertError;
      }
    }

    return errorResponse('No se pudo asignar un código. Intenta nuevamente.', 409);
  } catch (error) {
    return handleServerError(error, 'distributors/register');
  }
};

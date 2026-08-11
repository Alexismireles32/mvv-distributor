import { neon } from '@neondatabase/serverless';

/**
 * Server-only database access.
 *
 * Nothing in this directory may be imported from a React component. These reads use
 * DATABASE_URL, which has NO `PUBLIC_` prefix and is therefore never inlined into the
 * client bundle — that is the whole point of the migration. The previous architecture
 * shipped the database key to the browser, which is why every access rule had to live
 * in RLS policies that were all set to `USING (true)`.
 */

let cachedSql = null;

export function getSql() {
  if (cachedSql) return cachedSql;

  // process.env first so this module also works from plain Node scripts
  // (scripts/import-distributors.mjs), where import.meta.env does not exist.
  const connectionString = process.env?.DATABASE_URL ?? import.meta.env?.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      'DATABASE_URL is not set. Add it in the Vercel project settings and in .env for local dev.'
    );
  }

  cachedSql = neon(connectionString);
  return cachedSql;
}

/**
 * Wraps a handler so an unexpected failure returns JSON instead of an HTML error
 * page. Client code parses every response as JSON; an unhandled throw used to
 * surface as an opaque parse error with no indication of what actually broke.
 */
export function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      // API responses must never be cached by the CDN — they are per-session.
      'Cache-Control': 'no-store',
      ...extraHeaders
    }
  });
}

export function errorResponse(message, status = 400) {
  return jsonResponse({ error: message }, status);
}

/** Logs the real error server-side, returns a generic message to the client. */
export function handleServerError(error, context) {
  console.error(`[api:${context}]`, error);
  const isConfig = String(error?.message || '').includes('DATABASE_URL');
  return errorResponse(
    isConfig
      ? 'La base de datos no está configurada.'
      : 'Error del servidor. Intenta nuevamente.',
    isConfig ? 503 : 500
  );
}

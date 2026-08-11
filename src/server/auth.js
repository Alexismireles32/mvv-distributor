import { randomBytes, scryptSync, timingSafeEqual, createHmac } from 'node:crypto';

/**
 * Server-only authentication.
 *
 * Replaces the previous scheme, where the browser downloaded the distributor row and
 * compared `data.pin !== pin` in JavaScript. That meant the PIN was sent to anyone who
 * asked for the row, and the check could simply be skipped in DevTools. Here the PIN
 * never leaves the server and is stored only as a salted scrypt hash.
 */

const SCRYPT_KEYLEN = 64;
const SESSION_COOKIE = 'mvv_session';
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12h

function getSessionSecret() {
  // process.env first so this module also loads from plain Node scripts.
  const secret = process.env?.SESSION_SECRET ?? import.meta.env?.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      'SESSION_SECRET is not set or is too short (need >= 32 chars). Generate one with: openssl rand -hex 32'
    );
  }
  return secret;
}

/** Salted scrypt hash, stored as `salt:hash`. */
export function hashPin(pin) {
  const salt = randomBytes(16).toString('hex');
  const derived = scryptSync(String(pin), salt, SCRYPT_KEYLEN).toString('hex');
  return `${salt}:${derived}`;
}

/** Constant-time comparison so a wrong PIN cannot be found by timing the response. */
export function verifyPin(pin, stored) {
  if (!stored || typeof stored !== 'string' || !stored.includes(':')) return false;
  const [salt, expected] = stored.split(':');
  if (!salt || !expected) return false;

  try {
    const derived = scryptSync(String(pin), salt, SCRYPT_KEYLEN);
    const expectedBuf = Buffer.from(expected, 'hex');
    if (derived.length !== expectedBuf.length) return false;
    return timingSafeEqual(derived, expectedBuf);
  } catch {
    return false;
  }
}

/** True when a stored value is still a plaintext PIN from the old schema. */
export function isLegacyPlaintextPin(stored) {
  return typeof stored === 'string' && !stored.includes(':');
}

function sign(payload) {
  return createHmac('sha256', getSessionSecret()).update(payload).digest('base64url');
}

/** Builds a tamper-evident session token: base64url(json).signature */
export function createSessionToken({ code, role }) {
  const body = {
    code,
    role, // 'distributor' | 'admin'
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  };
  const encoded = Buffer.from(JSON.stringify(body)).toString('base64url');
  return `${encoded}.${sign(encoded)}`;
}

/** Returns the session payload, or null when missing, tampered with, or expired. */
export function readSessionToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return null;

  const expected = sign(encoded);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const body = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
    if (!body?.exp || body.exp < Math.floor(Date.now() / 1000)) return null;
    return body;
  } catch {
    return null;
  }
}

export const sessionCookie = {
  name: SESSION_COOKIE,
  options: {
    // httpOnly is the point: JavaScript cannot read this, so the old
    // `localStorage.setItem('admin_authed','true')` bypass is not possible.
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS
  }
};

/** Reads and validates the session from an Astro APIContext. */
export function getSession(context) {
  const token = context.cookies.get(SESSION_COOKIE)?.value;
  return readSessionToken(token);
}

/** Guard for endpoints that require any authenticated distributor. */
export function requireSession(context) {
  const session = getSession(context);
  if (!session) return { session: null, error: 'No autenticado' };
  return { session, error: null };
}

/** Guard for admin-only endpoints. */
export function requireAdmin(context) {
  const session = getSession(context);
  if (!session || session.role !== 'admin') {
    return { session: null, error: 'No autorizado' };
  }
  return { session, error: null };
}

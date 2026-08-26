#!/usr/bin/env node
/**
 * Creates (or resets) the admin account.
 *
 *   node scripts/create-admin.mjs <4-digit-pin>
 *   node scripts/create-admin.mjs <4-digit-pin> --code 999
 *
 * The admin signs in on the normal distributor login screen using this code and PIN;
 * the server grants the admin role from the `is_admin` column, not from anything the
 * browser sends.
 *
 * Pass the PIN as an argument rather than storing it in a file, so no plaintext
 * credential is left on disk. Do not reuse 0505 — that value was compiled into the
 * public JavaScript bundle for the lifetime of the old site.
 */

import { neon } from '@neondatabase/serverless';
import { hashPin } from '../src/server/auth.js';

const pin = process.argv[2];
const codeFlag = process.argv.indexOf('--code');
const code = codeFlag !== -1 ? process.argv[codeFlag + 1] : '999';

if (!pin || !/^\d{4}$/.test(pin)) {
  console.error('Usage: node scripts/create-admin.mjs <4-digit-pin> [--code 999]');
  process.exit(1);
}
if (!/^\d{3}$/.test(code)) {
  console.error(`Code must be exactly 3 digits (got "${code}").`);
  process.exit(1);
}
if (pin === '0505') {
  console.error('Refusing to use 0505 — it was public in the old client bundle. Pick another PIN.');
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Run `vercel env pull .env` first.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const existing = await sql`SELECT code FROM distributors WHERE code = ${code}`;

if (existing.length > 0) {
  await sql`
    UPDATE distributors
    SET pin_hash = ${hashPin(pin)}, is_admin = TRUE, is_active = TRUE, updated_at = NOW()
    WHERE code = ${code}`;
  console.log(`Updated admin account ${code} with a new PIN.`);
} else {
  await sql`
    INSERT INTO distributors (code, name, last_name, state, country, pin_hash, is_admin)
    VALUES (${code}, 'Admin', 'MVV', 'USA', 'USA', ${hashPin(pin)}, TRUE)`;
  console.log(`Created admin account ${code}.`);
}

console.log(`\nSign in at /distribuidores (or /admin) with:`);
console.log(`  Código: ${code}`);
console.log(`  PIN:    the one you just passed`);
console.log(`\nThe PIN is stored only as a salted hash.`);

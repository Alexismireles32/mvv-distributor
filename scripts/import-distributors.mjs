#!/usr/bin/env node
/**
 * Restores distributors into Neon, preserving their ORIGINAL 3-digit code and
 * 4-digit PIN so nobody has to be told new credentials.
 *
 *   node scripts/import-distributors.mjs distributors.csv
 *   node scripts/import-distributors.mjs distributors.csv --dry-run
 *
 * CSV header (order does not matter; only `code` and `pin` are required):
 *   code,name,last_name,state,country,phone,email,pin,is_admin
 *
 * `country` must be "USA" or "Mexico"; it defaults to USA when the column is absent
 * or a cell is blank. It sets the currency the distributor quotes in and which
 * payment methods their customers are offered.
 *
 * Example:
 *   code,name,last_name,state,phone,email,pin
 *   101,Maria,Lopez,Jalisco,+523331234567,maria@example.com,4821
 *
 * PINs are hashed on the way in — the plaintext is never stored. Delete the CSV
 * once the import succeeds; it contains live credentials.
 *
 * Re-running is safe: an existing code is updated, not duplicated. A blank `pin`
 * on an existing row leaves that distributor's current PIN untouched.
 */

import { readFileSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';
import { hashPin } from '../src/server/auth.js';

// Must match the registration form's options. Country decides the quoted currency
// and which payment methods the checkout shows, so it is never left blank.
const VALID_COUNTRIES = ['USA', 'Mexico'];
const DEFAULT_COUNTRY = 'USA';

const file = process.argv[2];
const dryRun = process.argv.includes('--dry-run');

if (!file) {
  console.error('Usage: node scripts/import-distributors.mjs <file.csv> [--dry-run]');
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Export it first, or run via `vercel env pull`.');
  process.exit(1);
}

/** Minimal CSV reader: handles quoted fields and embedded commas. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') inQuotes = false;
      else field += ch;
      continue;
    }
    if (ch === '"') inQuotes = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (ch !== '\r') field += ch;
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter(r => r.some(c => c.trim() !== ''));
}

const rows = parseCsv(readFileSync(file, 'utf8'));
if (rows.length < 2) {
  console.error('CSV needs a header row plus at least one distributor.');
  process.exit(1);
}

const header = rows[0].map(h => h.trim().toLowerCase());
const required = ['code', 'pin'];
const missing = required.filter(c => !header.includes(c));
if (missing.length) {
  console.error(`CSV is missing required column(s): ${missing.join(', ')}`);
  console.error(`Found: ${header.join(', ')}`);
  process.exit(1);
}

const records = rows.slice(1).map((cells, i) => {
  const rec = {};
  header.forEach((col, idx) => { rec[col] = (cells[idx] ?? '').trim(); });
  rec.__line = i + 2;
  return rec;
});

// Validate everything BEFORE writing anything, so a bad row halts the run instead
// of leaving the table half-imported.
const problems = [];
const seen = new Set();
for (const r of records) {
  if (!/^\d{3}$/.test(r.code)) problems.push(`line ${r.__line}: code "${r.code}" must be exactly 3 digits`);
  if (!/^\d{4}$/.test(r.pin)) problems.push(`line ${r.__line}: pin for code ${r.code} must be exactly 4 digits`);
  if (!r.name) problems.push(`line ${r.__line}: name is required for code ${r.code}`);
  if (seen.has(r.code)) problems.push(`line ${r.__line}: duplicate code ${r.code} in this file`);
  if (r.country && !VALID_COUNTRIES.includes(r.country)) {
    problems.push(`line ${r.__line}: country "${r.country}" for code ${r.code} must be one of: ${VALID_COUNTRIES.join(', ')}`);
  }
  seen.add(r.code);
}
if (problems.length) {
  console.error(`\nRefusing to import — ${problems.length} problem(s):`);
  problems.forEach(p => console.error(`  - ${p}`));
  process.exit(1);
}

console.log(`Parsed ${records.length} distributor(s) from ${file}.`);
if (dryRun) {
  console.log('\n--dry-run: nothing written. Would import:');
  records.forEach(r => console.log(`  ${r.code}  ${r.name} ${r.last_name || ''}`.trimEnd()));
  process.exit(0);
}

const sql = neon(process.env.DATABASE_URL);
let created = 0;
let updated = 0;

for (const r of records) {
  const existing = await sql`SELECT code FROM distributors WHERE code = ${r.code}`;
  const pinHash = hashPin(r.pin);
  const isAdmin = ['1', 'true', 'yes', 'si', 'sí'].includes(String(r.is_admin || '').toLowerCase());
  const country = r.country || DEFAULT_COUNTRY;

  if (existing.length > 0) {
    await sql`
      UPDATE distributors SET
        name = ${r.name}, last_name = ${r.last_name || ''}, state = ${r.state || null},
        country = ${country}, phone = ${r.phone || null}, email = ${r.email || null},
        pin_hash = ${pinHash}, is_admin = ${isAdmin}, updated_at = NOW()
      WHERE code = ${r.code}`;
    updated++;
    console.log(`  updated ${r.code}  ${r.name} ${r.last_name || ''}`.trimEnd());
  } else {
    await sql`
      INSERT INTO distributors (code, name, last_name, state, country, phone, email, pin_hash, is_admin)
      VALUES (${r.code}, ${r.name}, ${r.last_name || ''}, ${r.state || null}, ${country},
              ${r.phone || null}, ${r.email || null}, ${pinHash}, ${isAdmin})`;
    created++;
    console.log(`  created ${r.code}  ${r.name} ${r.last_name || ''}`.trimEnd());
  }
}

console.log(`\nDone. ${created} created, ${updated} updated.`);
console.log('Each distributor logs in with the same code and PIN as before.');
console.log('Now delete the CSV — it contains plaintext PINs.');

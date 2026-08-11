# Setup — Vercel + Neon

The app no longer uses Supabase. The browser holds no database credential; all data
access goes through server-side API routes in `src/pages/api/`.

## The one step that must be yours

```bash
vercel login
```

Claude cannot run this — it is a browser OAuth flow against your account. Everything
after it can be automated from the authenticated CLI.

Verify it worked:

```bash
vercel whoami
```

## Everything after that

1. `vercel link` → existing **mvv-distributor** project (`prj_2CPnsy8qRu1HOaOQECH9fXW8pdzn`)
2. `vercel integration add neon` → provisions the database, adds `DATABASE_URL`
3. `vercel env add SESSION_SECRET` / `REGISTRATION_CODE`
4. `vercel env pull .env`
5. `psql "$DATABASE_URL" -f db/schema.sql`
6. `node scripts/create-admin.mjs <your-new-pin>`
7. `vercel deploy` → **preview URL**, verified there first
8. `vercel promote` → production, only after you have seen it working

Step 7 matters: this project serves **mvvbynatural.com** and **mvvnaturales.org**.
Nothing reaches those domains until a preview build has been tested.

---

## Adding distributors later

Each distributor keeps their **original 3-digit code and 4-digit PIN**, so nothing
changes for them. Either add them through the admin panel, or bulk-import:

```csv
code,name,last_name,state,phone,email,pin
101,Maria,Lopez,Jalisco,+523331234567,maria@example.com,4821
```

```bash
node scripts/import-distributors.mjs distributors.csv --dry-run
node scripts/import-distributors.mjs distributors.csv
```

It validates every row before writing anything, so a bad row cannot leave the table
half-imported. PINs are hashed on import. **Delete the CSV afterwards** — it holds
live credentials.

## Profile photos (optional)

**Vercel → Storage → Create → Blob**, connect to the project, `vercel env pull` again.
Until then photo upload returns a clear "not configured" message; nothing else breaks.

---

## Environment variables

| Variable | Where it comes from |
|---|---|
| `DATABASE_URL` | added by the Neon integration |
| `SESSION_SECRET` | `openssl rand -hex 32` — different value in production than local |
| `REGISTRATION_CODE` | your choice; the code distributors type to self-register |
| `BLOB_READ_WRITE_TOKEN` | added by the Vercel Blob integration |

None carry a `PUBLIC_` prefix, so Astro keeps them server-side. **Adding `PUBLIC_` to
any of them ships it to every visitor.** Verify after any change:

```bash
grep -rE "DATABASE_URL|SESSION_SECRET|postgres|neon.tech" .vercel/output/static/_astro/*.js
```

That must return nothing.

## How it fits together

- **52 marketing pages** stay prerendered static HTML — same speed and cost as before.
- **`/api/*`** runs as one serverless function; only it touches the database.
- **Auth**: PINs are salted scrypt hashes. Login returns an httpOnly signed cookie, so
  JavaScript cannot read or forge a session.
- **Scoping**: every `/api/me/*` route takes the distributor code from that cookie,
  never from the request body — one distributor cannot read another's data.

## Security note

Treat the old `0505` admin code and `3232` registration code as **compromised**. Both
sat in the public JavaScript bundle for as long as the old site was live, so anyone who
viewed source could read them. `scripts/create-admin.mjs` refuses to set `0505`.

## What was lost

Client lists and invoice history from the deleted Supabase project. `db/schema.sql`
keeps the old table and column names deliberately, so if Supabase support restores a
backup it imports unchanged — the only difference is `distributors.pin` became
`pin_hash`, which the import script handles.

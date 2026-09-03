-- =============================================================================
-- MVV Distributor — Neon Postgres schema
-- =============================================================================
-- Run once against your Neon database:
--   psql "$DATABASE_URL" -f db/schema.sql
--
-- Deliberately mirrors the old Supabase table/column names so any data recovered
-- from the deleted project imports without reshaping. Two things changed:
--   1. `distributors.pin` (plaintext) becomes `pin_hash` — PINs are now salted and
--      hashed server-side and are never sent to a browser.
--   2. No RLS policies. Access is enforced by the API routes in src/pages/api/,
--      which run on the server and are the only thing holding DATABASE_URL.
-- =============================================================================

CREATE TABLE IF NOT EXISTS distributors (
  code         TEXT PRIMARY KEY,               -- 3-digit code the distributor already knows
  name         TEXT NOT NULL,
  last_name    TEXT NOT NULL,
  state        TEXT,
  country      TEXT,
  phone        TEXT,
  email        TEXT,
  photo_url    TEXT,
  pin_hash     TEXT NOT NULL,                  -- salt:scrypt, never plaintext
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  is_admin     BOOLEAN NOT NULL DEFAULT FALSE,
  payment_methods_usa    JSONB NOT NULL DEFAULT '[]'::jsonb,
  payment_methods_mexico JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clients (
  id                BIGSERIAL PRIMARY KEY,
  client_number     TEXT NOT NULL,
  distributor_code  TEXT NOT NULL REFERENCES distributors(code) ON DELETE CASCADE,
  first_name        TEXT,
  last_name         TEXT,
  address           TEXT,
  city              TEXT,
  state             TEXT,
  zip_code          TEXT,
  phone             TEXT,
  email             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Client numbers are only unique within a distributor, which is what the app's
  -- upsert-on-invoice flow assumes.
  UNIQUE (distributor_code, client_number)
);

CREATE TABLE IF NOT EXISTS invoices (
  id                BIGSERIAL PRIMARY KEY,
  distributor_code  TEXT NOT NULL REFERENCES distributors(code) ON DELETE CASCADE,
  client_number     TEXT,
  client_name       TEXT,
  invoice_date      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  total_amount      NUMERIC(12,2) NOT NULL DEFAULT 0,
  shipping_price    NUMERIC(12,2) NOT NULL DEFAULT 0,
  products          JSONB NOT NULL DEFAULT '{}'::jsonb,
  product_prices    JSONB NOT NULL DEFAULT '{}'::jsonb,
  full_data         JSONB,
  confirmed         BOOLEAN NOT NULL DEFAULT FALSE,
  confirmed_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory (
  id                BIGSERIAL PRIMARY KEY,
  distributor_code  TEXT NOT NULL REFERENCES distributors(code) ON DELETE CASCADE,
  product_name      TEXT NOT NULL,
  stock_quantity    INTEGER NOT NULL DEFAULT 0,
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (distributor_code, product_name)
);

CREATE TABLE IF NOT EXISTS distributor_prices (
  id                BIGSERIAL PRIMARY KEY,
  distributor_code  TEXT NOT NULL REFERENCES distributors(code) ON DELETE CASCADE,
  product_name      TEXT NOT NULL,
  price             NUMERIC(12,2) NOT NULL DEFAULT 0,
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (distributor_code, product_name)
);

CREATE TABLE IF NOT EXISTS products (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  slug        TEXT,
  image_url   TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_images (
  id          BIGSERIAL PRIMARY KEY,
  product_id  BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url   TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes matching the app's actual query patterns (all filter by distributor_code).
CREATE INDEX IF NOT EXISTS idx_clients_distributor   ON clients(distributor_code);
CREATE INDEX IF NOT EXISTS idx_invoices_distributor  ON invoices(distributor_code);
CREATE INDEX IF NOT EXISTS idx_invoices_date         ON invoices(distributor_code, invoice_date DESC);
CREATE INDEX IF NOT EXISTS idx_inventory_distributor ON inventory(distributor_code);
CREATE INDEX IF NOT EXISTS idx_prices_distributor    ON distributor_prices(distributor_code);

-- ---------------------------------------------------------------------------
-- Brute-force protection (added after a production audit)
-- ---------------------------------------------------------------------------
-- Distributor codes are public — they appear on the verification page and in
-- /productos?code=NNN links — so the 4-digit PIN is the only secret. Without a
-- lockout the whole 10,000-PIN space falls in about an hour. These columns back a
-- per-account lockout enforced in /api/auth/login.
ALTER TABLE distributors ADD COLUMN IF NOT EXISTS failed_attempts INT NOT NULL DEFAULT 0;
ALTER TABLE distributors ADD COLUMN IF NOT EXISTS locked_until TIMESTAMPTZ;

-- ---------------------------------------------------------------------------
-- Country is required
-- ---------------------------------------------------------------------------
-- It decides the quoted currency and which payment-method list the checkout shows,
-- so a distributor without one quotes the wrong currency and shows the wrong payment
-- options. Defaults to 'USA'.
UPDATE distributors SET country = 'USA' WHERE country IS NULL OR btrim(country) = '';
ALTER TABLE distributors ALTER COLUMN country SET DEFAULT 'USA';
ALTER TABLE distributors ALTER COLUMN country SET NOT NULL;

-- ---------------------------------------------------------------------------
-- Vanity URLs: /d/<slug>
-- ---------------------------------------------------------------------------
-- Namespaced under /d/ rather than the site root, because the root already holds
-- 52 pages — several of which read like first names (/serenity, /primrose,
-- /floryva). A root-level distributor URL would compete with those, and a product
-- page added later would silently shadow a distributor's link.
ALTER TABLE distributors ADD COLUMN IF NOT EXISTS slug TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_distributors_slug ON distributors(slug);

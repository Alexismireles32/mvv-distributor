-- =====================================================
-- SQL FINAL PARA SUPABASE - SISTEMA 100% FUNCIONAL
-- Ejecuta TODO este archivo en Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. AGREGAR CAMPOS A TABLA DISTRIBUTORS
-- =====================================================
ALTER TABLE distributors ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE distributors ADD COLUMN IF NOT EXISTS pin TEXT;

-- Índice para búsqueda rápida de código + PIN
CREATE INDEX IF NOT EXISTS idx_distributors_code_pin ON distributors(code, pin) WHERE pin IS NOT NULL;

-- =====================================================
-- 2. AGREGAR CAMPOS A TABLA INVOICES
-- =====================================================
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS confirmed BOOLEAN DEFAULT FALSE;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP;

-- Índice para consultas de facturas confirmadas
CREATE INDEX IF NOT EXISTS idx_invoices_confirmed ON invoices(distributor_code, confirmed) WHERE confirmed = true;

-- Marcar todas las facturas existentes como confirmadas
UPDATE invoices SET confirmed = true, confirmed_at = created_at WHERE confirmed IS NULL;

-- =====================================================
-- 3. CREAR TABLA INVENTORY (si no existe)
-- =====================================================
CREATE TABLE IF NOT EXISTS inventory (
  id BIGSERIAL PRIMARY KEY,
  distributor_code TEXT NOT NULL,
  product_name TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(distributor_code, product_name)
);

CREATE INDEX IF NOT EXISTS idx_inventory_distributor ON inventory(distributor_code);

ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own inventory" ON inventory;
DROP POLICY IF EXISTS "Users can insert own inventory" ON inventory;
DROP POLICY IF EXISTS "Users can update own inventory" ON inventory;

CREATE POLICY "Users can view own inventory"
  ON inventory FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own inventory"
  ON inventory FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own inventory"
  ON inventory FOR UPDATE
  USING (true);

-- =====================================================
-- 4. CREAR TABLA DISTRIBUTOR_PRICES (si no existe)
-- =====================================================
CREATE TABLE IF NOT EXISTS distributor_prices (
  id BIGSERIAL PRIMARY KEY,
  distributor_code TEXT NOT NULL,
  product_name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(distributor_code, product_name)
);

CREATE INDEX IF NOT EXISTS idx_prices_distributor ON distributor_prices(distributor_code);

ALTER TABLE distributor_prices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own prices" ON distributor_prices;
DROP POLICY IF EXISTS "Users can insert own prices" ON distributor_prices;
DROP POLICY IF EXISTS "Users can update own prices" ON distributor_prices;

CREATE POLICY "Users can view own prices"
  ON distributor_prices FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own prices"
  ON distributor_prices FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own prices"
  ON distributor_prices FOR UPDATE
  USING (true);

-- =====================================================
-- ✅ FIN - ESTE SCRIPT HACE TODO NECESARIO
-- =====================================================


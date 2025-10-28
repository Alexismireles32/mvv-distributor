# SQL para Nuevas Tablas en Supabase

## 📋 Ejecuta estos comandos en tu Supabase SQL Editor

### ⚠️ IMPORTANTE: Ejecuta SOLO estos comandos (uno por uno)

---

## 1️⃣ Tabla de Inventario

```sql
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

CREATE POLICY "Users can view own inventory"
  ON inventory FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own inventory"
  ON inventory FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own inventory"
  ON inventory FOR UPDATE
  USING (true);
```

**✅ Ejecuta este SQL primero**

---

## 2️⃣ Tabla de Precios

```sql
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

CREATE POLICY "Users can view own prices"
  ON distributor_prices FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own prices"
  ON distributor_prices FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own prices"
  ON distributor_prices FOR UPDATE
  USING (true);
```

**✅ Ejecuta este SQL segundo**

---

## 3️⃣ Tabla de Preferencias (Recordatorios)

```sql
CREATE TABLE IF NOT EXISTS distributor_preferences (
  id BIGSERIAL PRIMARY KEY,
  distributor_code TEXT NOT NULL UNIQUE,
  reminder_days TEXT[] DEFAULT ARRAY['30'],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE distributor_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON distributor_preferences FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own preferences"
  ON distributor_preferences FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own preferences"
  ON distributor_preferences FOR UPDATE
  USING (true);
```

**✅ Ejecuta este SQL tercero**

---

## 🎯 Cómo Ejecutar en Supabase

### Paso 1:
1. Ve a https://app.supabase.com
2. Selecciona tu proyecto
3. Abre "SQL Editor" (menú lateral izquierdo)
4. Click "New query"

### Paso 2:
1. Copia el SQL del **1️⃣ Tabla de Inventario**
2. Pega en el editor
3. Click "Run" (botón verde) o presiona `Ctrl + Enter`
4. Espera el mensaje verde "Success"

### Paso 3:
1. Borra el SQL anterior del editor
2. Copia el SQL del **2️⃣ Tabla de Precios**
3. Pega y ejecuta
4. Espera mensaje de éxito

### Paso 4:
1. Borra el SQL anterior
2. Copia el SQL del **3️⃣ Tabla de Preferencias**
3. Pega y ejecuta
4. Espera mensaje de éxito

---

## ✅ Verificación

Después de ejecutar los 3 comandos, ve a:
1. "Table Editor" (menú lateral)
2. Deberías ver 3 nuevas tablas:
   - `inventory`
   - `distributor_prices`
   - `distributor_preferences`

---

## 📝 Notas

- `IF NOT EXISTS`: Evita errores si las tablas ya existen
- `UNIQUE(distributor_code, product_name)`: Evita duplicados
- `RLS ENABLE`: Seguridad activada
- `USING (true)`: Permite operaciones para todos (puedes ajustar después)

**¿Ya ejecutaste los 3 comandos? Avísame para continuar con la implementación.**


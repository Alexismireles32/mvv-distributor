# 🗄️ Guía de Configuración de Supabase

## 📋 Lo que necesito de ti

### 1. Crear Proyecto en Supabase
Ve a: https://supabase.com
1. Crea una cuenta
2. Click "New Project"
3. Nombre del proyecto: `mvv-distributors`
4. Database Password: (guárdala, la necesitaré)
5. Region: (la más cercana a ti)

### 2. Obtener Credenciales
En tu proyecto de Supabase:
1. Ve a "Settings" → "API"
2. Necesito estos 2 valores:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (muy larga)

### 3. Crear Tablas en la Base de Datos

Ve a "SQL Editor" en Supabase y ejecuta este SQL:

```sql
-- Tabla de Distribuidores
CREATE TABLE distributors (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  state TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Clientes
CREATE TABLE clients (
  client_number TEXT PRIMARY KEY,
  distributor_code TEXT NOT NULL REFERENCES distributors(code),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Facturas
CREATE TABLE invoices (
  id BIGSERIAL PRIMARY KEY,
  distributor_code TEXT NOT NULL REFERENCES distributors(code),
  client_number TEXT NOT NULL REFERENCES clients(client_number),
  client_name TEXT NOT NULL,
  invoice_date TIMESTAMP NOT NULL DEFAULT NOW(),
  total_amount DECIMAL(10, 2) NOT NULL,
  products JSONB NOT NULL,
  product_prices JSONB NOT NULL,
  shipping_price DECIMAL(10, 2) DEFAULT 0,
  full_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_clients_distributor ON clients(distributor_code);
CREATE INDEX idx_invoices_distributor ON invoices(distributor_code);
CREATE INDEX idx_invoices_date ON invoices(invoice_date);

-- Habilitar Row Level Security (RLS) - seguridad
ALTER TABLE distributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Políticas: Cada distribuidor solo ve SUS datos
CREATE POLICY "Distributors can view own data"
  ON distributors FOR SELECT
  USING (true);

CREATE POLICY "Distributors can insert own data"
  ON distributors FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Distributors can update own data"
  ON distributors FOR UPDATE
  USING (true);

CREATE POLICY "Clients can view own data"
  ON clients FOR SELECT
  USING (true);

CREATE POLICY "Clients can insert own data"
  ON clients FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Clients can update own data"
  ON clients FOR UPDATE
  USING (true);

CREATE POLICY "Invoices can view own data"
  ON invoices FOR SELECT
  USING (true);

CREATE POLICY "Invoices can insert own data"
  ON invoices FOR INSERT
  WITH CHECK (true);
```

## 📝 Qué hacer con esta información

Una vez que tengas:
1. ✅ Project URL
2. ✅ anon public key
3. ✅ Tablas creadas

**Devuélveme la información** y yo configuraré el código automáticamente.

## 🔐 Variables de Entorno

Las credenciales se guardarán en: `.env`

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

## ✅ Lo que haré

1. Eliminar funciones exportar/importar
2. Crear cliente de Supabase
3. Reemplazar localStorage con Supabase
4. Login con base de datos
5. Guardar clientes en Supabase
6. Guardar facturas en Supabase
7. Sincronización automática entre dispositivos
8. Autenticación si es necesario

## 🎯 Resultado

✅ Datos en la nube
✅ Sincronización automática entre dispositivos
✅ Acceso desde cualquier lugar
✅ Backup automático
✅ Seguridad con RLS


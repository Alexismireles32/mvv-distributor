# 🚀 Plan de Implementación: Nuevas Funcionalidades

## 📋 Estado Actual
- Sistema base funcionando (1,144 líneas)
- Facturación ✅
- Historial ✅
- WhatsApp ✅

## 🎯 Objetivos a Implementar

### 1. Dashboard de Estadísticas ✅
**Archivo creado:** `src/components/distributor-dashboard.jsx`

**Funcionalidades:**
- Ventas totales
- Clientes únicos
- Facturas generadas (mes actual + total)
- Top 5 productos más vendidos
- Alertas de inventario bajo
- Facturas recientes

### 2. Gestión de Inventario ⏳
**Pendiente:**

Estado inicial:
```javascript
const [inventory, setInventory] = useState({});

// Para cada producto, guardar cantidad en stock
inventory = {
  "Duo-60 Fusion": 25,
  "Alpha Glow": 12,
  ...
}
```

Funcionalidades:
- Agregar/actualizar stock de cada producto
- Restar automáticamente al generar factura
- Alertas cuando stock < 10
- Historial de compra vs venta

**Tabla Supabase:**
```sql
CREATE TABLE inventory (
  id BIGSERIAL PRIMARY KEY,
  distributor_code TEXT NOT NULL,
  product_name TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Precios Predefinidos ⏳
**Pendiente:**

Estado inicial:
```javascript
const [defaultPrices, setDefaultPrices] = useState({});

// Precios por defecto por producto
defaultPrices = {
  "Duo-60 Fusion": 89.99,
  "Alpha Glow": 65.00,
  ...
}
```

Funcionalidades:
- Configurar precios por producto
- Auto-completar en facturación
- Permitir modificar al facturar
- Guardar en Supabase

**Tabla Supabase:**
```sql
CREATE TABLE distributor_prices (
  id BIGSERIAL PRIMARY KEY,
  distributor_code TEXT NOT NULL,
  product_name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Exportar PDF ⏳
**Pendiente:**

Usar librería: `jspdf` + `jspdf-autotable`

Funcionalidad:
```javascript
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const exportToPDF = () => {
  const doc = new jsPDF();
  // Tabla de facturas
  // Estadísticas
  // Logo
  doc.save('reporte_ventas.pdf');
};
```

### 5. Recordatorios de Clientes ⏳
**Pendiente:**

Funcionalidad:
- Calcular cuándo compró cada cliente (última compra)
- Opciones: 30, 35, 45, 60+ días
- Mostrar lista de clientes según tiempo seleccionado
- Botón WhatsApp directo para contactar

Lógica:
```javascript
const getReminderClients = (days) => {
  const today = new Date();
  return invoiceHistory.filter(inv => {
    const daysSince = (today - inv.date) / (1000 * 60 * 60 * 24);
    return daysSince >= days && daysSince < (days + 7); // Ventana de 7 días
  });
};
```

**Tabla Supabase:**
```sql
CREATE TABLE distributor_preferences (
  id BIGSERIAL PRIMARY KEY,
  distributor_code TEXT NOT NULL UNIQUE,
  reminder_days TEXT[] DEFAULT ARRAY['30'], -- Múltiples opciones seleccionadas
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 6. Dashboard Admin (Código 220577) ⏳
**Nuevo componente:** `src/components/admin-dashboard.jsx`

Funcionalidades:
- Login con código 220577
- Ver todos los distribuidores de USA (phone con +1)
- Estadísticas por distribuidor:
  - Ventas totales
  - Dinero generado
  - Número de clientes
- Vista de tabla/ranking
- Exportar datos

**Tabla Supabase:**
```sql
-- Ya existe distributors table con phone
-- Filtrar WHERE phone LIKE '+1%'
```

---

## 🏗️ Arquitectura Nueva

### Estructura de Componentes:
```
distributor-invoice.jsx (Principal)
├── DistributorDashboard.jsx (Nuevo)
├── InventoryManager.jsx (Nuevo)
├── PriceManager.jsx (Nuevo)
├── ReminderManager.jsx (Nuevo)
├── PDFExporter.jsx (Nuevo)
└── AdminDashboard.astro (Nuevo - Página separada)
```

### Flujo de Estados:
```javascript
const [currentView, setCurrentView] = useState('dashboard'); 
// Opciones: 'login', 'register', 'dashboard', 'products', 'invoice', 'history', 
//           'inventory', 'prices', 'reminders', 'stats'
```

### Nuevos Estados:
```javascript
const [inventory, setInventory] = useState({});
const [defaultPrices, setDefaultPrices] = useState({});
const [reminderSettings, setReminderSettings] = useState({
  days: ['30'] // Por defecto 30 días
});
const [currentAdminView, setCurrentAdminView] = useState(null);
```

---

## 📝 Pasos de Implementación

### Paso 1: Agregar Estados y Vistas al Componente Principal
- [ ] Agregar `inventory` state
- [ ] Agregar `defaultPrices` state
- [ ] Agregar `reminderSettings` state
- [ ] Crear funciones de load/save para Supabase
- [ ] Integrar Dashboard component
- [ ] Agregar botones de navegación

### Paso 2: Crear Tablas en Supabase
- [ ] inventory table
- [ ] distributor_prices table
- [ ] distributor_preferences table

### Paso 3: Implementar Dashboard
- [x] Componente creado
- [ ] Integrar en view flow
- [ ] Cargar datos reales

### Paso 4: Gestión de Inventario
- [ ] Crear InventoryManager component
- [ ] Input para cada producto
- [ ] Auto-restar al facturar
- [ ] Alertas de stock bajo
- [ ] Guardar en Supabase

### Paso 5: Precios Predefinidos
- [ ] Crear PriceManager component
- [ ] Form para configurar precios
- [ ] Auto-completar en facturación
- [ ] Guardar en Supabase

### Paso 6: Recordatorios
- [ ] Crear ReminderManager component
- [ ] Filtro por días (30/35/45/60+)
- [ ] Lista de clientes
- [ ] Botón WhatsApp directo

### Paso 7: Exportar PDF
- [ ] Instalar jspdf
- [ ] Crear PDFExporter component
- [ ] Generar reporte con logo
- [ ] Descargar archivo

### Paso 8: Admin Dashboard
- [ ] Crear página /admin
- [ ] Login con código 220577
- [ ] Filtrar distribuidores USA
- [ ] Tabla con estadísticas
- [ ] Exportar datos

---

## 🔧 Cambios en Base de Datos

### SQL para Ejecutar:
```sql
-- 1. Tabla de Inventario
CREATE TABLE inventory (
  id BIGSERIAL PRIMARY KEY,
  distributor_code TEXT NOT NULL,
  product_name TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(distributor_code, product_name)
);

-- 2. Tabla de Precios
CREATE TABLE distributor_prices (
  id BIGSERIAL PRIMARY KEY,
  distributor_code TEXT NOT NULL,
  product_name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(distributor_code, product_name)
);

-- 3. Tabla de Preferencias
CREATE TABLE distributor_preferences (
  id BIGSERIAL PRIMARY KEY,
  distributor_code TEXT NOT NULL UNIQUE,
  reminder_days TEXT[] DEFAULT ARRAY['30'],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_inventory_distributor ON inventory(distributor_code);
CREATE INDEX idx_prices_distributor ON distributor_prices(distributor_code);

-- RLS
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE distributor_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE distributor_preferences ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Users can view own inventory"
  ON inventory FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own inventory"
  ON inventory FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own inventory"
  ON inventory FOR UPDATE
  USING (true);

CREATE POLICY "Users can view own prices"
  ON distributor_prices FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own prices"
  ON distributor_prices FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own prices"
  ON distributor_prices FOR UPDATE
  USING (true);

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

---

## 📦 Dependencias Adicionales

### Instalar:
```bash
npm install jspdf jspdf-autotable
```

### Importar en componente:
```javascript
import jsPDF from 'jspdf';
import 'jspdf-autotable';
```

---

## ⏱️ Tiempo Estimado Total

- Dashboard: ✅ Creado (falta integrar)
- Inventario: 4 horas
- Precios: 2 horas
- Recordatorios: 3 horas
- PDF: 3 horas
- Admin: 4 horas
- Testing: 2 horas

**Total:** ~18 horas de desarrollo

---

## 🎯 Prioridad de Implementación

1. **Dashboard** (Ya creado - falta integrar)
2. **Inventario** (Crítico - evitar vender sin stock)
3. **Precios Predefinidos** (Alto ROI - ahorra tiempo)
4. **Recordatorios** (Mejora servicio)
5. **PDF Export** (Formalidad/compliance)
6. **Admin Dashboard** (Analytics para ti)

---

## ✅ Siguiente Paso

1. Integrar Dashboard en el flujo actual
2. Crear tablas en Supabase
3. Implementar inventario
4. Implementar precios
5. Resto de funcionalidades


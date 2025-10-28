# 🧾 Sistema de Facturación para Distribuidores

## 📋 Descripción

Sistema completo de generación de facturas para distribuidores MVV Natural. Los distribuidores pueden crear facturas profesionales en formato JPG para sus clientes.

## 🎯 Funcionalidades

### 1. **Autenticación de Distribuidor**
- Distribuidores ingresan su número de ID
- Sistema valida y carga información del distribuidor (nombre, apellido, estado)
- IDs de prueba: 101, 102, 103, 104, 105

### 2. **Selección de Productos**
- Grid visual con todas las imágenes de productos
- Click en imagen para agregar producto
- Contador flotante sobre imagen muestra cantidad seleccionada
- Botones + y - para ajustar cantidad
- Visual feedback de productos seleccionados
- Contador global de productos seleccionados

### 3. **Formulario de Facturación**
- **Cliente nuevo o existente:**
  - Ingresar número de cliente (opcional) para auto-completar
  - Sistema guarda clientes en localStorage para reutilización
  - Al ingresar número de cliente, auto-completa información
  
- **Información del cliente:**
  - Nombre *
  - Apellido *
  - Dirección * (formato USA)
  - Ciudad
  - Estado
  - Código Postal

### 4. **Precios**
- Ingresar precio unitario para cada producto
- Ingresar precio de envío
- Validación de precios antes de generar factura

### 5. **Generación de Factura JPG**
- Genera factura profesional en formato JPG
- Incluye:
  - Información del distribuidor (nombre, apellido, estado, ID)
  - Información del cliente completa
  - Productos con imágenes, cantidades y precios
  - Subtotal
  - Precio de envío
  - TOTAL a pagar
  - Fecha de factura
- Descarga automática del archivo JPG

## 🚀 Cómo Usar

### Paso 1: Ingresar como Distribuidor
1. Ir a `/distribuidores`
2. Ingresar número de distribuidor (ej: 101)
3. Click en "Ingresar al Sistema"

### Paso 2: Seleccionar Productos
1. Ver grid con todos los productos
2. Click en imagen del producto para agregarlo
3. Aparece contador sobre la imagen
4. Ajustar cantidad con botones + y -
5. Repetir para todos los productos necesarios
6. Click en "Comenzar Facturación"

### Paso 3: Completar Datos del Cliente
1. **Si es cliente existente:** Ingresar número de cliente para auto-completar
2. **Si es cliente nuevo:** Llenar toda la información
3. Sistema guarda clientes para futuro uso

### Paso 4: Establecer Precios
1. Ingresar precio unitario para cada producto
2. Ingresar precio de envío
3. Todos los precios son configurables por el distribuidor

### Paso 5: Generar Factura
1. Click en "Generar Factura JPG"
2. Sistema genera y descarga factura en JPG
3. Listo para enviar al cliente

## 🗄️ Base de Datos de Distribuidores

El sistema incluye una base de datos mock con distribuidores:

| ID | Nombre | Apellido | Estado |
|----|--------|----------|--------|
| 101 | Juan | Pérez | Arizona |
| 102 | María | García | Texas |
| 103 | Carlos | Rodríguez | California |
| 104 | Ana | Martínez | Florida |
| 105 | Luis | López | Nevada |

## 💾 Almacenamiento Local

- **Distribuidor actual:** Se guarda en localStorage
- **Clientes:** Se guardan en localStorage para reutilización
- Los clientes quedan disponibles para futuras facturaciones

## 📦 Catálogo de Productos

El sistema incluye todos los 20 productos actuales:
- Duo-60 Fusion
- Alpha Glow
- SOS Burn
- SOS Burn Clear
- SOS Burn Sensitive
- Prime Rose
- Lida Booster
- Lipo HD 360
- Chupa Panza
- Higa2
- Serenity
- Floryva
- Maca Premium
- Encimax
- Fat Blazer
- Slim Coffee
- Apple Cider Vinagre
- 30-Day Detox
- Colit 6
- CM Push up Men

## 🛠️ Tecnologías Utilizadas

- **React:** Para interfaz interactiva
- **html2canvas:** Para generar JPG de facturas
- **localStorage:** Para persistencia de datos
- **Tailwind CSS:** Para estilos
- **React Icons:** Para iconos

## 📝 Notas Importantes

1. **Cliente Número:** Cada cliente puede tener un número único para auto-completar información en futuras facturaciones
2. **Precios:** Los distribuidores establecen sus propios precios
3. **Datos del Distribuidor:** Se extraen de la base de datos usando el ID
4. **Facturas JPG:** Se generan con alta calidad (1200px de ancho)
5. **Offline:** Los clientes se guardan localmente, funciona sin servidor

## 🔄 Flujo Completo

```
1. Ingresa Distribuidor ID
   ↓
2. Selecciona productos con cantidades
   ↓
3. Click "Comenzar Facturación"
   ↓
4. Ingresa información del cliente (o usa número para auto-completar)
   ↓
5. Establece precios por producto y envío
   ↓
6. Click "Generar Factura JPG"
   ↓
7. Descarga automática de factura
   ↓
8. Enviar factura al cliente
```

## 🎨 Diseño Responsive

- **Desktop:** Grid de 5 columnas de productos
- **Tablet:** Grid de 3-4 columnas
- **Mobile:** Grid de 2 columnas
- Contador flotante optimizado para touch
- Formularios adaptables a pantalla

---

**Sistema desarrollado para MVV Natural Distributors**


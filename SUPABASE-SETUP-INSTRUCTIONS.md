# 📋 Instrucciones para Configurar Supabase

## ⚠️ IMPORTANTE: Debes ejecutar estos comandos SQL

### 📍 Cómo Ejecutar

1. Ve a https://app.supabase.com
2. Selecciona tu proyecto
3. Abre **"SQL Editor"** (menú lateral izquierdo)
4. Click **"New query"**
5. Copia y pega el SQL del archivo `SUPABASE-NEW-TABLES-SQL.md`
6. Ejecuta cada uno (son 3 comandos separados)

---

## ✅ Lo que hace cada comando:

### 1️⃣ Tabla `inventory`
- Guarda el stock de cada producto por distribuidor
- Se actualiza automáticamente al generar facturas

### 2️⃣ Tabla `distributor_prices`
- Guarda los precios predefinidos por distribuidor
- Se usa para auto-completar precios en facturación

### 3️⃣ Tabla `distributor_preferences`
- Guarda preferencias del distribuidor (como días de recordatorio)

---

## 🎯 Después de Ejecutar SQL

Una vez que ejecutes los 3 comandos SQL:

1. **Verifica** que las tablas se crearon:
   - Ve a "Table Editor"
   - Deberías ver: `inventory`, `distributor_prices`, `distributor_preferences`

2. **Listo** - Las nuevas funcionalidades estarán disponibles

---

## 📞 ¿Necesitas Ayuda?

Si tienes algún error al ejecutar SQL, envíame el mensaje de error exacto.

**¿Ya ejecutaste los comandos SQL?**


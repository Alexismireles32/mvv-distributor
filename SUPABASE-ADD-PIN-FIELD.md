# SQL para Agregar Campo PIN a Distribuidores

## 📋 Ejecuta este comando en tu Supabase SQL Editor

### ⚠️ IMPORTANTE: Ejecuta SOLO este comando

---

## Agregar Campo PIN

```sql
ALTER TABLE distributors 
ADD COLUMN IF NOT EXISTS pin TEXT;

-- Index para búsqueda rápida por PIN
CREATE INDEX IF NOT EXISTS idx_distributors_code_pin ON distributors(code, pin) WHERE pin IS NOT NULL;
```

**✅ Ejecuta este SQL en Supabase**

---

## 🎯 Cómo Ejecutar en Supabase

### Paso 1:
1. Ve a https://app.supabase.com
2. Selecciona tu proyecto
3. Abre **"SQL Editor"** (menú lateral izquierdo)
4. Click **"New query"**

### Paso 2:
1. Copia el SQL de arriba
2. Pega en el editor
3. Click **"Run"** (botón verde) o presiona `Ctrl + Enter`
4. Espera el mensaje verde **"Success"**

---

## ✅ Verificación

Después de ejecutar, ve a:
1. **"Table Editor"** (menú lateral)
2. Selecciona la tabla `distributors`
3. Deberías ver una nueva columna: `pin`

---

## 📝 Notas

- `IF NOT EXISTS`: Evita errores si el campo ya existe
- `pin TEXT`: Almacena PIN de 4 dígitos
- Los PIN serán almacenados en texto plano (simple para este nivel de seguridad)

**¿Ya ejecutaste el SQL? Avísame para continuar con la implementación.**


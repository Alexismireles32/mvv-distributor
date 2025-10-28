# 📝 Guía Paso a Paso para Ejecutar SQL en Supabase

## 🎯 Paso 1: Ir a tu Proyecto en Supabase

1. **Abre tu navegador**
2. **Ve a**: https://app.supabase.com
3. **Inicia sesión** con tu cuenta de Supabase
4. **Selecciona** el proyecto `mvv-distributors` (o el nombre que le pusiste)

## 🎯 Paso 2: Abrir SQL Editor

1. En el menú lateral izquierdo, busca y haz clic en:
   **"SQL Editor"**

## 🎯 Paso 3: Crear Nueva Consulta

1. Haz clic en el botón **"New query"** (arriba a la izquierda)

## 🎯 Paso 4: Pegar y Ejecutar el SQL

### Copia y pega ESTE código:

```sql
ALTER TABLE distributors 
ADD COLUMN photo_url TEXT;
```

### Luego:

1. Haz clic en el botón **"Run"** (botón verde, arriba a la derecha)
2. O presiona: `Ctrl + Enter` (Windows) o `Cmd + Enter` (Mac)

## ✅ Paso 5: Verificar que Funcionó

Deberías ver un mensaje verde que dice algo como:
- "Success. No rows returned"
- "Command executed successfully"

## 🎉 ¡Listo!

Una vez que veas el mensaje de éxito, el campo `photo_url` estará agregado a tu tabla `distributors`.

---

## 📸 Captura de Pantalla de Ubicación:

```
[Supabase Dashboard]
│
├── [Home] ← Menú lateral
├── [Authentication]
├── [Database]
├── [SQL Editor] ← CLICK AQUÍ 👈
├── [Storage]
└── ...
```

---

## 🧪 Verificar que Funcionó:

Puedes ejecutar esta consulta para verificar:

```sql
SELECT * FROM distributors LIMIT 1;
```

Debería mostrarte los distribuidores existentes con el nuevo campo `photo_url` (que estará NULL para los existentes).


# 📝 Instrucciones para Actualizar Supabase

## Nuevo Campo: `photo_url`

Necesitas ejecutar este SQL en el SQL Editor de Supabase:

```sql
ALTER TABLE distributors 
ADD COLUMN photo_url TEXT;
```

Esto permitirá que los distribuidores suban su foto de perfil.

## Después de Ejecutar:

Una vez que agregues el campo, los distribuidores podrán:
1. Registrarse con foto de perfil (URL)
2. Ser buscados en `/verificar-distribuidor`
3. Ver su foto en su perfil público

---

## Funcionalidad Completa Creada

### 1. Página de Verificación
✅ Ruta: `/verificar-distribuidor`
✅ Componente: `DistributorVerificationSystem`
✅ Buscar por nombre, código o estado
✅ Vista de perfil del distribuidor

### 2. Botón en Header
✅ Botón "Conoce tu Distribuidor" agregado
✅ Link en navbar agregado

### 3. Camp para Foto
✅ Campo en formulario de registro
✅ Guardado en Supabase
✅ Mostrado en perfil público

### 4. Badge Animado
✅ "Distribuidor Activo y Autorizado"
✅ Efecto de parpadeo suave

---

**Ejecuta el SQL en Supabase y todo funcionará perfectamente** 🎉


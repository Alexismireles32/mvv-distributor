-- ============================================
-- INSTRUCCIONES PARA SUPABASE
-- ============================================
-- Solo necesitas ejecutar ESTE SQL (ignora los errores de tablas que ya existen)
-- Si ya ejecutaste el primer SQL anteriormente, solo necesitas esto:

ALTER TABLE distributors 
ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- ============================================
-- Si quieres actualizar las políticas de seguridad (Opcional pero recomendado):
-- ============================================

-- Permitir vista pública de distribuidores (para verificación)
DROP POLICY IF EXISTS "Distributors can view own data" ON distributors;
CREATE POLICY "Distributors public view" 
  ON distributors FOR SELECT
  USING (true);

-- Permitir que distribuidores puedan actualizar sus propios datos (incluyendo foto)
DROP POLICY IF EXISTS "Distributors can update own data" ON distributors;
CREATE POLICY "Distributors can update own data" 
  ON distributors FOR UPDATE
  USING (true);

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Ejecuta esto para verificar que el campo existe:
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'distributors' AND column_name = 'photo_url';

-- Si devuelve una fila, ¡está todo correcto!


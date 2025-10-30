-- CUSTOMER ORDERING SYSTEM SCHEMA UPDATES
-- Run this in Supabase SQL Editor to add payment methods support

-- Add payment methods column to distributors table
ALTER TABLE distributors
ADD COLUMN IF NOT EXISTS payment_methods_usa jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS payment_methods_mexico jsonb DEFAULT '[]'::jsonb;

-- Comment explaining the structure
COMMENT ON COLUMN distributors.payment_methods_usa IS 'Array of payment methods accepted by USA distributors: Zelle, Venmo, Cash App, PayPal, Credit Card, Cash';
COMMENT ON COLUMN distributors.payment_methods_mexico IS 'Array of payment methods accepted by Mexico distributors: OXXO, SPEI, Transferencia, Efectivo, Tarjeta';

-- Example: Update existing distributors with default payment methods
-- USA distributors (you can run this after or customize per distributor)
-- UPDATE distributors SET payment_methods_usa = '["Zelle", "Venmo", "Cash App"]'::jsonb WHERE country = 'USA';

-- Mexico distributors
-- UPDATE distributors SET payment_methods_mexico = '["OXXO", "SPEI", "Efectivo"]'::jsonb WHERE country = 'Mexico';

-- Verify the changes
SELECT code, name, country, payment_methods_usa, payment_methods_mexico FROM distributors LIMIT 5;


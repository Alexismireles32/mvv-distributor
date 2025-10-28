-- Add confirmed field to invoices table
ALTER TABLE invoices 
ADD COLUMN IF NOT EXISTS confirmed BOOLEAN DEFAULT FALSE;

-- Add confirmed_at timestamp
ALTER TABLE invoices 
ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP;

-- Create index for confirmed invoices
CREATE INDEX IF NOT EXISTS idx_invoices_confirmed ON invoices(distributor_code, confirmed) WHERE confirmed = true;

-- Update existing invoices to be confirmed (since they were already processed)
UPDATE invoices SET confirmed = true, confirmed_at = created_at WHERE confirmed IS NULL;

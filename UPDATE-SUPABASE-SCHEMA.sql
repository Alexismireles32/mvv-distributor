-- Update distributors table to add photo_url field

ALTER TABLE distributors 
ADD COLUMN photo_url TEXT;

-- This allows distributors to upload and save their profile photo


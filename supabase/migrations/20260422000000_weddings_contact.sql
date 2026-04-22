-- Tambah kolom kontak catin (opsional)
ALTER TABLE weddings
  ADD COLUMN IF NOT EXISTS phone_number TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT;

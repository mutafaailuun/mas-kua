-- Tambah kolom petugas ke tabel weddings
ALTER TABLE weddings
  ADD COLUMN IF NOT EXISTS petugas TEXT;

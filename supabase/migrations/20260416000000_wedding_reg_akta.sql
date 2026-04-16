-- Tambah kolom no_pendaftaran dan no_akta ke tabel weddings
ALTER TABLE weddings
  ADD COLUMN IF NOT EXISTS no_pendaftaran TEXT,
  ADD COLUMN IF NOT EXISTS no_akta TEXT;

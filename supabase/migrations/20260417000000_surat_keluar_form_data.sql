-- Tambah kolom form_data untuk menyimpan isi surat sehingga bisa diprint ulang
ALTER TABLE public.surat_keluar
  ADD COLUMN IF NOT EXISTS form_data JSONB;

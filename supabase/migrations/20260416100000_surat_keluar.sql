-- Tabel log surat keluar
CREATE TABLE IF NOT EXISTS public.surat_keluar (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nomor_surat    TEXT NOT NULL UNIQUE,
  tanggal_surat  DATE,
  jenis_surat    TEXT NOT NULL,          -- 'ralat', 'umum', dsb.
  perihal        TEXT NOT NULL,
  keterangan     TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.surat_keluar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage surat_keluar"
  ON public.surat_keluar
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Index untuk sorting
CREATE INDEX IF NOT EXISTS surat_keluar_tanggal_idx
  ON public.surat_keluar (tanggal_surat DESC);

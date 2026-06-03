-- Tabel log hasil sinkronisasi SIMKAH
-- Dibuat: 2026-06-03

CREATE TABLE IF NOT EXISTS public.simkah_sync_log (
  id          uuid            PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz     DEFAULT now(),
  status      text            NOT NULL DEFAULT 'success',
  summary     text,
  inserted    integer         DEFAULT 0,
  updated     integer         DEFAULT 0,
  skipped     integer         DEFAULT 0,
  errors      text[]          DEFAULT NULL
);

-- RLS
ALTER TABLE public.simkah_sync_log ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'simkah_sync_log'
      AND policyname = 'Allow all for authenticated'
  ) THEN
    CREATE POLICY "Allow all for authenticated"
      ON public.simkah_sync_log
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Index untuk sorting & query hari ini
CREATE INDEX IF NOT EXISTS simkah_sync_log_created_at_idx
  ON public.simkah_sync_log (created_at DESC);

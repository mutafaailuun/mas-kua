-- Hapus job lama jika ada (idempotent)
SELECT cron.unschedule('piket-harian-kua') WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'piket-harian-kua'
);

-- Jadwalkan pemberitahuan piket setiap Senin-Jumat WIB jam 06:30
-- 06:30 WIB = 23:30 UTC hari sebelumnya → cron hari Minggu-Kamis (0-4) jam 23:30 UTC
SELECT cron.schedule(
  'piket-harian-kua',
  '30 23 * * 0-4',
  $$
  SELECT net.http_post(
    url     := 'https://ipvpckuogbfqpiolwlho.supabase.co/functions/v1/piket-notify',
    headers := jsonb_build_object(
      'Content-Type',  'application/json'
    ),
    body    := '{}'::jsonb
  ) AS request_id;
  $$
);

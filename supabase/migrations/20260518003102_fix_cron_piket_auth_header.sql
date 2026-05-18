-- Fix: tambah Authorization header agar cron job bisa memanggil edge function
SELECT cron.unschedule('piket-harian-kua') WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'piket-harian-kua'
);

-- 06:30 WIB = 23:30 UTC hari sebelumnya → cron hari Minggu-Kamis (0-4) jam 23:30 UTC
SELECT cron.schedule(
  'piket-harian-kua',
  '30 23 * * 0-4',
  $$
  SELECT net.http_post(
    url     := 'https://ipvpckuogbfqpiolwlho.supabase.co/functions/v1/piket-notify',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwdnBja3VvZ2JmcXBpb2x3bGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjA2MTksImV4cCI6MjA4OTYzNjYxOX0.MWxkUP7_K_664_bDd5AvyCiKiNvXpiTpxdEzRGXXbDU'
    ),
    body    := '{}'::jsonb
  ) AS request_id;
  $$
);

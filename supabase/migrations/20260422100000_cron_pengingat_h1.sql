-- Enable pg_cron dan pg_net untuk scheduled HTTP calls
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- ─────────────────────────────────────────────────────────────────────────────
-- LANGKAH PERSIAPAN (jalankan SEKALI di SQL Editor Supabase sebelum migrasi ini):
--
--   SELECT vault.create_secret(
--     'YOUR_SERVICE_ROLE_KEY',
--     'service_role_key',
--     'Service role key untuk memanggil edge function'
--   );
--
-- Ganti YOUR_SERVICE_ROLE_KEY dengan nilai dari:
-- Supabase Dashboard → Project Settings → API → service_role (secret)
-- ─────────────────────────────────────────────────────────────────────────────

-- Jadwalkan pengingat H-1 setiap hari jam 02:00 UTC = 09:00 WIB
SELECT cron.schedule(
  'pengingat-h1-catin',
  '0 2 * * *',
  $$
  SELECT net.http_post(
    url     := 'https://ipvpckuogbfqpiolwlho.supabase.co/functions/v1/catin-notify',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || (
        SELECT decrypted_secret
        FROM vault.decrypted_secrets
        WHERE name = 'service_role_key'
        LIMIT 1
      )
    ),
    body    := '{"type":"pengingat-h1"}'::jsonb
  ) AS request_id;
  $$
);

-- Enable pg_cron dan pg_net untuk scheduled HTTP calls
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Jadwalkan pengingat H-1 setiap hari jam 02:00 UTC = 09:00 WIB
-- Memanggil edge function catin-notify dengan type=pengingat-h1
SELECT cron.schedule(
  'pengingat-h1-catin',
  '0 2 * * *',
  $$
  SELECT net.http_post(
    url        := (SELECT current_setting('app.supabase_url', true) || '/functions/v1/catin-notify'),
    headers    := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || current_setting('app.service_role_key', true)
    ),
    body       := '{"type":"pengingat-h1"}'::jsonb
  ) AS request_id;
  $$
);

-- Jalankan perintah berikut SEKALI di SQL Editor Supabase untuk mengatur URL dan key:
-- ALTER DATABASE postgres SET app.supabase_url = 'https://YOUR_PROJECT_REF.supabase.co';
-- ALTER DATABASE postgres SET app.service_role_key = 'YOUR_SERVICE_ROLE_KEY';

-- Cron job: sync jadwal Penghulu JALALUDIN ke Google Calendar
-- Berjalan setiap hari jam 17:00 UTC = 00:00 WIB
-- pg_cron dan pg_net sudah dikelola Supabase di level platform.

SELECT cron.unschedule('gcal-sync-jalaludin') WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'gcal-sync-jalaludin'
);

SELECT cron.schedule(
  'gcal-sync-jalaludin',
  '0 17 * * *',
  $$
  SELECT net.http_post(
    url     := 'https://ipvpckuogbfqpiolwlho.supabase.co/functions/v1/gcal-sync',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || (
        SELECT decrypted_secret
        FROM vault.decrypted_secrets
        WHERE name = 'service_role_key'
        LIMIT 1
      )
    ),
    body    := '{"penghulu":"jalaludin","calendar_id":"kangjaliel1998@gmail.com"}'::jsonb
  ) AS request_id;
  $$
);

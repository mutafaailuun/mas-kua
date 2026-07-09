alter table public.dokumentasi_akad
  add column if not exists lokasi_nikah text,
  add column if not exists nikah_kantor boolean default true;

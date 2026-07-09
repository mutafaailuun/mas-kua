create table if not exists public.dokumentasi_akad (
  id            uuid        primary key default gen_random_uuid(),
  no_pendaftaran text       not null,
  no_akta        text,
  nama_suami     text       not null,
  nama_istri     text       not null,
  tanggal_akad   text,
  penghulu       text,
  foto_url       text,
  created_at     timestamptz default now()
);

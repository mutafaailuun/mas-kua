BEGIN;

INSERT INTO public.weddings (
  wedding_date,
  wedding_time,
  groom_name,
  bride_name,
  location,
  officiant_name,
  status,
  notes
)
SELECT
  src.wedding_date,
  src.wedding_time,
  src.groom_name,
  src.bride_name,
  src.location,
  src.officiant_name,
  src.status,
  src.notes
FROM (
  VALUES
    ('2026-04-13'::date, '08:00:00'::time, 'DEDI IRAWAN', 'DEDE SUNDARI MAENITA', 'KP.PINTU RT 002/005 BANTARJAYA', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026038'),
    ('2026-04-12'::date, '08:00:00'::time, 'HARUN DJAYA ATMAJA', 'CUNAYA', 'KP. PINTU RT. 003/003', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026034'),
    ('2026-04-12'::date, '08:00:00'::time, 'MIPUDIN HARYA PERMANA', 'TANTRI NOVITASARI', 'KP. PEBAYURAN RT 004/002 KERTASARI', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026032'),
    ('2026-04-12'::date, '08:00:00'::time, 'JOKO SUSANTO', 'MIFTAH AROHMAH', 'KP. PULOPIPISAN RT. 002/001', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026033'),
    ('2026-04-12'::date, '08:00:00'::time, 'RIFALDI ARDIANSYAH', 'EVI FITRIAH', 'KP. BOJONG JAYA RT 006/002 SUMBERSARI', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026036'),
    ('2026-04-12'::date, '08:00:00'::time, 'FRANCISCO PRATAMA', 'LOLITA SAYIDAH', 'KP. LEUWEUNG GEDE RT. 002/002', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026037'),
    ('2026-04-12'::date, '08:00:00'::time, 'TAUFIK FIRDAUS', 'ALIYAH FEBRIYANI', 'KP TELUK HAUR 002/006 DS KERTAJAYA KEC PEBAYURAN', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026035'),
    ('2026-04-11'::date, '08:00:00'::time, 'MUHAMAD FAISAL ALAWI', 'NURUL AISYAH', 'KP. BAKUNG RT 002/004 KARANGPATRI', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026029'),
    ('2026-04-11'::date, '08:00:00'::time, 'RIZKY MUHKI', 'INTAN NURAINI', 'KP. KENYAM RT 002/003 KARANGPATRI', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026031'),
    ('2026-04-11'::date, '08:00:00'::time, 'DIPKA NAUVAL AZAHRA', 'NISA AMELIA', 'KP. TELUKHAUR RT 001/001 KARANGHAUR', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026028'),
    ('2026-04-11'::date, '08:00:00'::time, 'RACHMAT RAMDANI', 'ELIANA BADRIAH', 'KP. TELUKHAUR RT. 003/001', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026030'),
    ('2026-04-10'::date, '08:00:00'::time, 'MOHAMAD HERMAN', 'HELMALIA PUTRI', 'KP. PEBAYURAN RT. 004/002', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026027'),
    ('2026-04-09'::date, '08:00:00'::time, 'AHMAD ABDULLAH', 'SITI NURFADILAH', 'KP. PISANG SAMBO RT. 016/006', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026026'),
    ('2026-04-08'::date, '08:00:00'::time, 'NURHASAN', 'AAS', 'KP. KEDUNG LOTONG RT. 003/006', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026023'),
    ('2026-04-08'::date, '08:00:00'::time, 'MUHIBUDIN ABDILAH', 'WIWIN NURFADILAH', 'KP. PEBAYURAN RT. 004/002', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026024'),
    ('2026-04-08'::date, '08:00:00'::time, 'SAEPUDIN', 'NURAMELIA', 'KP. BABAKAN RENGAS RT. 002/001', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026025'),
    ('2026-04-07'::date, '08:00:00'::time, 'ALDI MAULANA YUSUP', 'NOVI SAFITRI', 'JL. RAYA PEBAYURAN KEC. PEBAYURAN', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026022'),
    ('2026-04-06'::date, '08:00:00'::time, 'ABDUL AZIZ SUPANDI', 'SITI LATIFAH', 'KP. SELANG RT. 002/014', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026021'),
    ('2026-04-05'::date, '08:00:00'::time, 'DEFRI PRAMANA PUTRA', 'HERNIAWATI', 'KP. BABAKAN RENGAS, RT. 002/001', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026016'),
    ('2026-04-05'::date, '08:00:00'::time, 'SAPUTRA INDRA MAULANA', 'SRI WAHYUNI', 'KP. BAKUNGPONCOL RT. 007/004', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026020'),
    ('2026-04-05'::date, '08:00:00'::time, 'M. RISKI FEBRIYANSAH', 'ABEL HERMAWATI', 'KP. SAYURAN RT 006/003', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026015'),
    ('2026-04-05'::date, '08:00:00'::time, 'SUTRISNA', 'NAGITA NANDA', 'KP. BAKUNG RT 001/004 KARANGPATRI', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026017'),
    ('2026-04-05'::date, '08:00:00'::time, 'ABDUL ROHMAN MALISYI', 'NITTA AOULLIA ADZQKILLA', 'KP. PINTU RT. 003/002', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026018'),
    ('2026-04-05'::date, '08:00:00'::time, 'DANI', 'ANAH NURJANAH', 'KP.BOJONG JAYA RT 002/003 SUMBERSARI', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026019'),
    ('2026-04-04'::date, '08:00:00'::time, 'ISEP SOPIANDANI', 'EL GHINA IELMA ANWARI', 'KP. PINTU RT 002/002 BANTARJAYA', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026012'),
    ('2026-04-04'::date, '08:00:00'::time, 'HAMJAH', 'IIS RAHMAWATI', 'KP.TELUK HAUR RT 002/006 KERTAJAYA', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026011'),
    ('2026-04-04'::date, '08:00:00'::time, 'ERIYAN', 'PRADITA', 'KP. PULO PIPISAN RT. 001/001', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026014'),
    ('2026-04-04'::date, '08:00:00'::time, 'HAMDANI ROMANSYAH', 'DINI WIDIA', 'KP.PEBAYUARAN RT 004/002 KERTASARI', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026013'),
    ('2026-04-04'::date, '08:00:00'::time, 'DIKHA ESANOVIAN', 'SITI NURFARIDA', 'KP. TEKO RT 002/002 KERTAJAYA', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026010'),
    ('2026-04-03'::date, '08:00:00'::time, 'AJI GINTING', 'SITI MARWAH', 'KP. LEWENG GEDE RT 001/011 BANTARJAYA', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026008'),
    ('2026-04-03'::date, '08:00:00'::time, 'ENJANG FAHRUL FAUJI', 'ELIYA', 'KP.LEUWEUNG GEDE RT 003/011 BANTARJAYA', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026009'),
    ('2026-04-02'::date, '08:00:00'::time, 'IRVAN HARDIANSYAH', 'SITI AISYAH', 'KP. PANDERESAN, RT. 003/010', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026006'),
    ('2026-04-02'::date, '08:00:00'::time, 'DARMAWAN', 'SRI ULAN DARI', 'KP. RUMBIA RT. 003/002', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026007'),
    ('2026-04-01'::date, '08:00:00'::time, 'M ABDUR RAHIM ABDULLAH', 'DWI PUTRI SUHARDHIANTY', 'KP. PAMAHAN RT. 001/001', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026005'),
    ('2026-04-01'::date, '08:00:00'::time, 'IIF YULFIANUR', 'NURHALIMAH', 'KP. TELUK HAUR RT 002/006 KERTAJAYA', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026003'),
    ('2026-04-01'::date, '08:00:00'::time, 'MUHAMMAD MAHMUDIN', 'EEN ENDRIYANI', 'KP. TELUKHAUR RT. 002/005', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026004'),
    ('2026-04-01'::date, '08:00:00'::time, 'USMAN', 'RAMAH ERVIANA', 'KP. PAMAHAN RT. 001/001', 'NUNU HUSNUL HITAM, S.H.I.', 'Luar Kantor', 'No Akta: 3216131042026001'),
    ('2026-04-01'::date, '08:00:00'::time, 'YANA SANDRIA', 'SITI NURHOLIPAH', 'KP. LEUWEUNG GEDE RT 002/002 BANTARSARI', 'Drs. H. MA''MUN NAWAWI', 'Luar Kantor', 'No Akta: 3216131042026002')
) AS src(
  wedding_date,
  wedding_time,
  groom_name,
  bride_name,
  location,
  officiant_name,
  status,
  notes
)
WHERE EXISTS (
  SELECT 1
  FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_name = 'weddings'
)
AND NOT EXISTS (
  SELECT 1
  FROM public.weddings w
  WHERE w.wedding_date = src.wedding_date
    AND w.wedding_time = src.wedding_time
    AND w.groom_name = src.groom_name
    AND w.bride_name = src.bride_name
);

COMMIT;

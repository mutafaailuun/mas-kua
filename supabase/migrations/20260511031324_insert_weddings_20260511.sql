-- Data Pendaftaran Pernikahan - 20 Record
-- Tanggal insert: 2026-05-11
-- Insert ke tabel weddings

-- Tambahkan unique constraint jika belum ada (abaikan error jika sudah ada)
DO $$
BEGIN
  -- Hapus duplikat berdasarkan no_pendaftaran terlebih dahulu
  DELETE FROM public.weddings a
  USING public.weddings b
  WHERE a.id > b.id
  AND a.no_pendaftaran = b.no_pendaftaran
  AND a.no_pendaftaran IS NOT NULL;
  
  -- Tambahkan unique constraint
  ALTER TABLE public.weddings 
  ADD CONSTRAINT weddings_no_pendaftaran_unique UNIQUE (no_pendaftaran);
EXCEPTION 
  WHEN duplicate_table THEN NULL;
  WHEN unique_violation THEN NULL;
END $$;

-- Insert data dengan ON CONFLICT
INSERT INTO public.weddings (
  wedding_date,
  wedding_time,
  groom_name,
  bride_name,
  location,
  officiant_name,
  status,
  no_pendaftaran,
  phone_number,
  email,
  notes
) VALUES
-- Record 1
('2026-06-01', '10:00:00', 'JAJANG HARUMAN', 'DEVIAYU ARDITA', 'KP. BABAKAN RENGAS RT. 002/001 KARANGSEGAR', NULL, 'Luar Kantor', 'ND00403216131052026', '', 'kuabayuran@gmail.com', 
 'Tgl Daftar: 2026-05-08, NIK Suami: 3216131011970010, NIK Istri: 3216135006060004, Alamat Suami: KP. BABAKAN RENGAS RT. 003/004 KARANGSEGAR, Alamat Istri: KP. BABAKAN RENGAS RT. 002/001 KARANGSEGAR, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: SUDARTA, Pekerjaan Wali: SOPIR, Alamat Wali: KP. BABAKAN RENGAS RT. 002/001 KARANGSEGAR'),

-- Record 2
('2026-05-28', '15:00:00', 'ASEP RIYADI', 'NUR SADIYAH', 'KP. KOBAK CEPER RT. 008/003, KARANGHARJA', NULL, 'Luar Kantor', 'ND00393216131052026', '087785587322', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-08, NIK Suami: 3216100909960002, NIK Istri: 3216134107000040, Alamat Suami: KP. SUKAMANTRI RT 007/002 DESA SUKARAYA KECAMATAN KARANG BAHAGIA, Alamat Istri: KP. KOBAK CEPER RT. 008/003, KARANGHARJA, No HP Istri: 087785587322, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: SUDIRMAN, Pekerjaan Wali: BURUH HARIAN LEPAS, Alamat Wali: KP. KOBAK CEPER RT. 008/003, KARANGHARJA'),

-- Record 3
('2026-06-10', '09:00:00', 'MUHAMMAD ROPI', 'ANIS WULANDARI', 'KP. PINTU RT. 003/001, BANTARJAYA', NULL, 'Luar Kantor', 'ND00363216131052026', '0895389444377', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-08, NIK Suami: 3216112502990002, NIK Istri: 3216134101020022, Alamat Suami: KP. RAWA BANGKONG, KELURAHAN SERTAJAYA, KECAMATAN CIKARANG TIMUR, KABUPATEN BEKASI, Alamat Istri: KP. PINTU RT. 003/001, BANTARJAYA, No HP Istri: 082181516369, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: MARDI, Pekerjaan Wali: KARYAWAN SWASTA, Alamat Wali: KP. PINTU RT. 003/001, BANTARJAYA'),

-- Record 4
('2026-06-04', '09:00:00', 'DIAN', 'TIKA', 'KP. KEDUNG LOTONG RT. 003/007 BANTARJAYA', NULL, 'Luar Kantor', 'ND00353216131052026', '', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-08, NIK Suami: 3216130305020002, NIK Istri: 3216134809030002, Alamat Suami: KP. BABAKAN RT. 001/003 KERTASARI, Alamat Istri: KP. KEDUNG LOTONG RT. 003/007 BANTARJAYA, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: PANDI, Pekerjaan Wali: PETANI / PEKEBUN, Alamat Wali: KP. KEDUNG LOTONG RT. 003/007 BANTARJAYA'),

-- Record 5
('2026-06-13', '09:00:00', 'ARI RAMADAN', 'CINDI', 'KP. BOJONG JAYA RT 001/003 SUMBERSARI', NULL, 'Luar Kantor', 'ND00263216131052026', '', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-07, NIK Suami: 3216130304010002, NIK Istri: 3216134701010002, Alamat Suami: KP. KEDUNG LOTONG RT 001/008 BANTARJAYA, Alamat Istri: KP. BOJONG JAYA RT 001/003 SUMBERSARI, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: RUDI, Pekerjaan Wali: WIRASWASTA, Alamat Wali: KP. BOJONG JAYA RT 001/003 SUMBERSARI'),

-- Record 6
('2026-05-29', '10:00:00', 'DEDEN SUHENDAR', 'INDRIYANI', 'KP. BOJONG JAYA RT 002/004 SUMBERSARI', NULL, 'Luar Kantor', 'ND00233216131052026', '', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-07, NIK Suami: 3216132811970004, NIK Istri: 3215017001060003, Alamat Suami: KP. TEGAL PACING RT 006/003 SUMBEREJA, Alamat Istri: KP. BOJONG JAYA RT 002/004 SUMBERSARI, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: KARMA THOPIK, Pekerjaan Wali: BURUH HARIAN LEPAS, Alamat Wali: BUHER RT 001/025 KARANG PAWITAN KARAWANG BARAT'),

-- Record 7
('2026-05-31', '09:00:00', 'DEDE ALDI WIJAYA', 'SITI ROHMAH', 'KP. BAKUNG RT. 002/005 KARANGPATRI', NULL, 'Luar Kantor', 'ND00323216131052026', '0', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-07, NIK Suami: 3216093009010005, NIK Istri: 3216134309000002, Alamat Suami: KP. PULO KAPUK RT. 002/005 DS. MEKARMUKTI, Alamat Istri: KP. BAKUNG RT. 002/005 KARANGPATRI, No HP Istri: 0, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: ABAS, Pekerjaan Wali: BURUH HARIAN LEPAS, Alamat Wali: KP. TELUKHAUR RT. 001/001 KARANGHAUR'),

-- Record 8
('2026-06-06', '10:00:00', 'MUHAMAD NURIL PAJRI', 'SELTIA', 'KP. BABAKAN BANTEN RT 005/003 SUMBERURIP', NULL, 'Luar Kantor', 'ND00333216131052026', '', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-07, NIK Suami: 3208300110030001, NIK Istri: 3216134909040005, Alamat Suami: DUSUN II RT 003 RW 002 DESA GIRIWARINGIN KEC. MALEBER KAB. KUNINGAN JAWA BARAT, Alamat Istri: KP. BABAKAN BANTEN RT 005/003 SUMBERURIP, No HP Istri: 0821, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: SUKRIYA, Pekerjaan Wali: WIRASWASTA, Alamat Wali: KP. BABAKAN BANTEN RT 005/003 SUMBERURIP'),

-- Record 9
('2026-05-27', '15:00:00', 'MARSAN', 'SITI LAILA', 'KP. LEMBANG RT 001/006 KARANGPATRI', NULL, 'Luar Kantor', 'ND00313216131052026', '', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-07, NIK Suami: 3216131106890014, NIK Istri: 3216136505050004, Alamat Suami: KP. LEMBANG RT 001/006 KARANGPATRI, Alamat Istri: KP. LEMBANG RT 001/006 KARANGPATRI, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: WANDI, Pekerjaan Wali: BURUH TANI / PERKEBUNAN, Alamat Wali: KP. LEMBANG RT 001/006 KARANGPATRI'),

-- Record 10
('2026-05-31', '09:00:00', 'FIRMANSYAH', 'SITI MASYITOH', 'KP. KOBAK PASIR RT 002/001 KARANGPATRI', NULL, 'Luar Kantor', 'ND00293216131052026', '', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-07, NIK Suami: 3216130901030004, NIK Istri: 3216134502020003, Alamat Suami: KP. KEDUNG LOTONG RT 003/003 BANTARJAYA, Alamat Istri: KP. KOBAK PASIR RT 002/001 KARANGPATRI, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: MIDA, Pekerjaan Wali: BURUH HARIAN LEPAS, Alamat Wali: KP. KOBAK PASIR RT 002/001 KARANGPATRI'),

-- Record 11
('2026-05-29', '09:00:00', 'YOGI PURWANTO', 'ITA NOPIAYANTI', 'KP. BULAK DAHAM RT. 004/005 KARANGPATRI', NULL, 'Luar Kantor', 'ND00303216131052026', '', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-07, NIK Suami: 3215010401050003, NIK Istri: 3216136511040004, Alamat Suami: TANJUNGPURA BENTENG RT 006 RW 008 TANJUNGMEKAR, Alamat Istri: KP. BULAK DAHAM RT. 004/005 KARANGPATRI, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: MARTONO, Pekerjaan Wali: KARYAWAN SWASTA, Alamat Wali: KP. BULAK DAHAM RT. 004/005 KARANGPATRI'),

-- Record 12
('2026-06-11', '08:00:00', 'KRISNA APRIYANA', 'SITI LASMINI', 'KP. TELUKHAUR RT. 001/001 KARANGHAUR', NULL, 'Luar Kantor', 'ND00273216131052026', '', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-07, NIK Suami: 3216131704010007, NIK Istri: 3216135405030002, Alamat Suami: KP. PANDERESAN RT. 004/010 BANTARJAYA, Alamat Istri: KP. TELUKHAUR RT. 001/001 KARANGHAUR, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: NANA ROSDIANA, Pekerjaan Wali: BURUH HARIAN LEPAS, Alamat Wali: KP. TELUKHAUR RT. 001/001 KARANGHAUR'),

-- Record 13
('2026-06-07', '09:00:00', 'AGGY ILHAM MAULANA', 'NIA PEBRIANI', 'KP. BOJONG SARI RT 005/001 SUMBERSARI', NULL, 'Luar Kantor', 'ND00253216131052026', '', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-07, NIK Suami: 3215301208980001, NIK Istri: 3216134102030001, Alamat Suami: DUSUN KARAJAN RT. 01 RW. 01 PUSAKAJAYA UTARA CILEBAR KARAWANG, Alamat Istri: KP. BOJONG SARI RT 005/001 SUMBERSARI, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: TAUFIK HIDAYAT, Pekerjaan Wali: BURUH HARIAN LEPAS, Alamat Wali: KP. BOJONG SARI RT 005/001 SUMBERSARI'),

-- Record 14
('2026-05-31', '10:00:00', 'IMAM TAUFIK', 'FITRIA ANJANI', 'KP. BOJONG SARI RT 001/002 SUMBERSARI', NULL, 'Luar Kantor', 'ND00243216131052026', '085879444691', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-07, NIK Suami: 3327121711910003, NIK Istri: 3215165004940005, Alamat Suami: DESA KAUMAN KEC. COMAL KAB. PEMALANG, Alamat Istri: KP. BOJONG SARI RT 001/002 SUMBERSARI, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: DASIWAN, Pekerjaan Wali: BURUH TANI / PERKEBUNAN, Alamat Wali: KP. BOJONG SARI RT 001/002 SUMBERSARI'),

-- Record 15
('2026-05-26', '10:00:00', 'KARIM SETIAWAN', 'DARINAH', 'KP. SAYURAN RT 005/003 KERTASARI', NULL, 'KUA / Kantor', 'ND00223216131052026', '', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-06, NIK Suami: 3216130207930005, NIK Istri: 3216135701960006, Alamat Suami: KP. TEKO TENGAH RT 001/003 KERTAJAYA, Alamat Istri: KP. SAYURAN RT 005/003 KERTASARI, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: DARMAN, Pekerjaan Wali: BURUH HARIAN LEPAS, Alamat Wali: KP. SAYURAN RT 005/003 KERTASARI'),

-- Record 16
('2026-06-02', '10:00:00', 'TARMIJI', 'SITI ARIYAH', 'KP. TELUKHAUR RT 001/002 KARANGHAUR', NULL, 'Luar Kantor', 'ND00183216131052026', '', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-06, NIK Suami: 3216130509010004, NIK Istri: 3216136412050006, Alamat Suami: KP. TEKO TENGAH RT 001/003 KERTAJAYA, Alamat Istri: KP. TELUKHAUR RT 001/002 KARANGHAUR, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: SUPARMAN, Pekerjaan Wali: WIRASWASTA, Alamat Wali: KP. TELUKHAUR RT 001/002 KARANGHAUR'),

-- Record 17
('2026-06-01', '09:00:00', 'AKBAR MAULANA', 'NURHAENI', 'KP. TELUKHAUR RT. 001/002 KARANGHAUR', NULL, 'Luar Kantor', 'ND00173216131052026', '', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-06, NIK Suami: 3216131905040001, NIK Istri: 3216136904040001, Alamat Suami: KP. TELUKHAUR RT. 002/003 KARANGHAUR, Alamat Istri: KP. TELUKHAUR RT. 001/002 KARANGHAUR, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: HABIB ZAMANI, Pekerjaan Wali: WIRASWASTA, Alamat Wali: JL. GG LANGGAR RT. 003/007 TANGKI'),

-- Record 18
('2026-06-07', '10:00:00', 'RIYAN HIDAYAT', 'MARDITA', 'KP. TEKO RT. 001/001 KERTAJAYA', NULL, 'Luar Kantor', 'ND00193216131052026', '', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-06, NIK Suami: 3216130707040003, NIK Istri: 3216136202060002, Alamat Suami: KP. TEKO TENGAH RT. 002/003 KERTAJAYA, Alamat Istri: KP. TEKO RT. 001/001 KERTAJAYA, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: ADITIA, Pekerjaan Wali: BURUH HARIAN LEPAS, Alamat Wali: KP. TEKO RT. 002/001 KERTAJAYA'),

-- Record 19
('2026-05-31', '08:00:00', 'MUHAMAD FATUR ROZI', 'KARSIH AMELIANA', 'KP. BABAKAN KONGSI RT. 004/002, SUMBERURIP', NULL, 'Luar Kantor', 'ND00203216131052026', '087785587322', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-06, NIK Suami: 3216136006010004, NIK Istri: 3216135106040002, Alamat Suami: KP. TEGAL PACING RT .006/003, SUMBEREJA, Alamat Istri: KP. BABAKAN KONGSI RT. 004/002, SUMBERURIP, No HP Istri: 087785587322, Email Istri: kuabayuran@gmail.com, Status Wali: HAKIM, Nama Wali: DRS. MA''MUN NAWAWI'),

-- Record 20
('2026-05-25', '10:00:00', 'FAHRUL ROZI', 'LILIS ALIYANTI', 'KP. BAKUNG KULON RT. 011/006, KARANGREJA', NULL, 'Luar Kantor', 'ND00213216131052026', '087785587322', 'kuabayuran@gmail.com',
 'Tgl Daftar: 2026-05-06, NIK Suami: 3216120101020003, NIK Istri: 3216136101040003, Alamat Suami: KP. RENGASBANDUNG RT/RW. 001/005, KARANGSAMBUNG, KEDUNGWARINGIN, Alamat Istri: KP. BAKUNG KULON RT. 011/006, KARANGREJA, No HP Istri: 087785587322, Email Istri: kuabayuran@gmail.com, Status Wali: NASAB, Nama Wali: LILI NARMARUDIN, Pekerjaan Wali: BURUH HARIAN LEPAS, Alamat Wali: KP. BAKUNG KULON RT. 011/006, KARANGREJA')
ON CONFLICT (no_pendaftaran) DO UPDATE SET
  wedding_date = EXCLUDED.wedding_date,
  wedding_time = EXCLUDED.wedding_time,
  groom_name = EXCLUDED.groom_name,
  bride_name = EXCLUDED.bride_name,
  location = EXCLUDED.location,
  phone_number = EXCLUDED.phone_number,
  email = EXCLUDED.email,
  notes = EXCLUDED.notes;

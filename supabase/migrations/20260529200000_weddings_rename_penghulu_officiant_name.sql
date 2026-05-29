-- officiant_name sudah ada sebelumnya; hapus kolom penghulu yang duplikat
ALTER TABLE weddings DROP COLUMN IF EXISTS penghulu;

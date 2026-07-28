-- Normalisasi nama penghulu ke uppercase agar konsisten di DB dan notifikasi WA
UPDATE weddings
SET officiant_name = UPPER(officiant_name)
WHERE officiant_name IS NOT NULL AND officiant_name <> '';

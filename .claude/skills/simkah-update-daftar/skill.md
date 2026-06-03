---
name: simkah-update-daftar
description: "Ambil data pendaftaran nikah terbaru dari SIMKAH dan sync ke database. TRIGGER: ketika user mengatakan 'update daftar', 'sync daftar', 'ambil data pendaftaran', atau 'update data nikah'."
---

# Skill: Update Daftar Pendaftaran dari SIMKAH

Tugas: Login ke SIMKAH, buka **Laporan → Laporan Pendaftaran Nikah**, scrape data per bulan, POST ke `/api/simkah/sync` dengan mode `daftar`.

> ⚠️ Sumber data: **Laporan → Laporan Pendaftaran Nikah** (bukan Pencatatan Nikah → Daftar Nikah)

## Langkah-langkah

### 1. Baca credentials dari .env
```bash
grep -E "SIMKAH_USERNAME|SIMKAH_PASSWORD|SIMKAH_URL" /Users/Jaliel/Dev/mas-kua/.env
```

### 2. Cek data terbaru di DB
```bash
SUPABASE_ACCESS_TOKEN=$(grep SUPABASE_ACCESS_TOKEN /Users/Jaliel/Dev/mas-kua/.env | cut -d= -f2) \
supabase db query --linked --workdir /Users/Jaliel/Dev/mas-kua \
  "SELECT COUNT(*) as total, MAX(no_pendaftaran) as last_no FROM weddings;"
```

### 3. Buka browser dan cek sesi SIMKAH
- Gunakan `mcp__Claude_in_Chrome__tabs_context_mcp` untuk cek tab
- Jika tab SIMKAH sudah login (URL mengandung UUID), langsung ke langkah 5
- Jika belum, buat tab baru → navigate ke `https://simkah4.kemenag.go.id/admin/authentication`

### 4. Login (jika belum)
- Isi Email/Username: `SIMKAH_USERNAME` dari .env
- Isi Password: `SIMKAH_PASSWORD` dari .env
- Klik **MASUK**, tunggu 3 detik
- Jika ada popup, klik **"OK, SAYA MENGERTI !"**

### 5. Navigasi ke Laporan Pendaftaran Nikah
- Klik menu **Laporan** di sidebar (expand dengan klik arrow kiri)
- Klik submenu **Laporan Pendaftaran Nikah**

### 6. Loop per bulan — ambil data dari bulan ini + beberapa bulan ke depan
Untuk setiap bulan yang perlu di-sync (minimal: bulan ini + 3 bulan ke depan):

a. Pastikan filter **Tahun** dan **Bulan** sudah sesuai (default sudah terisi bulan/tahun sekarang)
b. Klik tombol hijau **Lihat Data**
c. Tunggu 2 detik hingga tabel load
d. Jalankan JavaScript scraping berikut:

```javascript
// Laporan Pendaftaran Nikah — mapping kolom (verified 2026-06-03):
// [0]=No [1]=Provinsi [2]=Kab [3]=Kec [4]=KUA
// [5]=Nomor Daftar [6]=Tanggal Daftar
// [7]=Nama Suami [8]=Nama Istri
// [9]=NIK Suami [10]=NIK Istri
// [11]=Alamat Suami [12]=Alamat Istri
// [13]=Kontak Suami [14]=Email Suami [15]=Kontak Istri [16]=Email Istri
// [17]=Jenis Wali [18]=Nama Wali [19]=Pekerjaan Wali [20]=Alamat Wali
// [21]=Hari Akad [22]=Tanggal Akad [23]=Jam Akad [24]=Nikah Di
// [25]=Penghulu [26]=Nomor Akta [27]=...

function scrapeCurrentPage() {
  const rows = document.querySelectorAll('.dx-data-row');
  const data = [];
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length < 25) return;
    const no_daftar = cells[5]?.innerText?.trim();
    if (!no_daftar || !no_daftar.startsWith('ND')) return;
    const nikahDiText = cells[24]?.innerText?.trim() || '';
    data.push({
      no_daftar,
      created_at:  cells[6]?.innerText?.trim(),   // Tanggal Daftar DD-MM-YYYY
      nama_suami:  cells[7]?.innerText?.trim(),
      nama_istri:  cells[8]?.innerText?.trim(),
      tgl_akad:    cells[22]?.innerText?.trim(),  // Tanggal Akad DD-MM-YYYY
      jam_akad:    cells[23]?.innerText?.trim(),  // "10:00 AM"
      lokasi_akad: cells[11]?.innerText?.trim(),  // Alamat Suami sebagai lokasi
      nikah_di:    (nikahDiText.includes('LUAR') || nikahDiText.includes('BEDOL')) ? 2 : 1,
      no_akta:     cells[26]?.innerText?.trim() || null,
    });
  });
  const pageInfo = document.querySelector('.dx-pages')?.innerText || '';
  return { data, pageInfo, total: rows.length };
}
JSON.stringify(scrapeCurrentPage());
```

e. Jika ada halaman berikutnya (`pageInfo` menunjukkan "Page 1 of N"):
   - Klik tombol next page (▶ atau angka halaman berikutnya)
   - Tunggu load, ulangi scraping
f. Kumpulkan semua data dari bulan ini

g. Untuk pindah ke bulan berikutnya:
   - Klik field **Bulan**, ganti ke bulan berikutnya
   - Ulangi dari langkah b

### 7. Kirim data ke database

**Opsi A — jika dev server aktif (localhost:3000):**
```bash
curl -s -X POST http://localhost:3000/api/simkah/sync \
  -H "Content-Type: application/json" \
  -d '{"mode":"daftar","records":[...SEMUA_DATA...]}'
```

**Opsi B — jika server tidak aktif, insert langsung via Supabase CLI:**
```bash
SUPABASE_ACCESS_TOKEN=$(grep SUPABASE_ACCESS_TOKEN /Users/Jaliel/Dev/mas-kua/.env | cut -d= -f2)
# Jalankan SQL INSERT dengan data yang sudah di-parse dari scraping
# Format tanggal: DD-MM-YYYY → YYYY-MM-DD (balik urutan)
# nikah_di: LUAR/BEDOL → 'Luar Kantor', lainnya → 'Kantor'
supabase db query --linked --workdir /Users/Jaliel/Dev/mas-kua "
INSERT INTO public.weddings (no_pendaftaran, registration_date, wedding_date, wedding_time, groom_name, bride_name, location, status)
VALUES (...) ON CONFLICT (no_pendaftaran) DO NOTHING
RETURNING no_pendaftaran, groom_name, wedding_date;
"
```

### 8. Tampilkan hasil
Cetak ringkasan: total inserted, skipped (sudah ada), dan error jika ada.

## Catatan Penting
- **Sumber**: Laporan → Laporan Pendaftaran Nikah (filter per tahun/bulan)
- **DevExtreme DataGrid**: selector `.dx-data-row` untuk baris, `.dx-pages` untuk info pagination
- **Kolom index di-verify 2026-06-03** — jika ada perubahan layout, re-check dengan JS
- **`nikah_di`**: parse dari teks "LUAR KUA / BEDOL" → 2, selain itu → 1
- **Format tanggal**: DD-MM-YYYY → API sudah handle konversi ke YYYY-MM-DD
- **Sesi expired**: jika redirect ke login, ulangi dari langkah 4
- **Bulan yang perlu di-sync**: minimal bulan ini + 3 bulan ke depan untuk data mendatang

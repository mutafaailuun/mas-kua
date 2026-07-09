---
name: simkah-update-akta
description: "Ambil data no akta nikah dan nama penghulu dari Laporan Excel SIMKAH, lalu update ke database. TRIGGER: ketika user mengatakan 'update akta', 'sync akta', 'update penghulu', atau 'lengkapi data akta'."
---

# Skill: Update No Akta & Penghulu dari Laporan Excel SIMKAH

Tugas: Login ke SIMKAH, buka Laporan > Laporan Excel, scrape data no akta + penghulu, POST ke `/api/simkah/sync` dengan mode `akta` dan `penghulu`.

## Langkah-langkah

### 1. Baca credentials dari .env
```bash
grep -E "SIMKAH_USERNAME|SIMKAH_PASSWORD|SIMKAH_URL" /Users/Jaliel/Dev/mas-kua/.env
```

### 2. Buka browser dan navigasi ke SIMKAH
- Gunakan `mcp__Claude_in_Chrome__tabs_context_mcp` untuk cek tab yang ada
- Jika sudah ada tab SIMKAH yang sudah login (URL mengandung UUID dashboard), langsung ke langkah 4
- Jika belum, buat tab baru dengan `mcp__Claude_in_Chrome__tabs_create_mcp`
- Navigate ke `https://simkah4.kemenag.go.id/admin/authentication`

### 3. Login (jika belum)
- Isi field Email/Username dengan `SIMKAH_USERNAME` dari .env
- Isi field Password dengan `SIMKAH_PASSWORD` dari .env
- Klik tombol MASUK
- Tunggu 3 detik hingga dashboard muncul
- Jika ada popup "OK, SAYA MENGERTI !", klik tombol tersebut

### 4. Navigasi ke Laporan Excel
- Klik menu **Laporan** di sidebar (ada arrow expand di kiri)
- Klik submenu **Laporan Excel**

### 5. Set filter bulan/tahun
- Halaman sudah ter-isi dengan KUA PEBAYURAN, tahun dan bulan saat ini
- Pastikan **tahun** dan **bulan** sudah sesuai (ubah jika perlu)
- Klik tombol hijau **Lihat Data**
- Tunggu tabel load (2-3 detik)

### 6. Scrape semua halaman
Jalankan JavaScript berikut:

```javascript
function scrapeCurrentPage() {
  // Ambil header untuk mapping kolom
  const headers = [...document.querySelectorAll('.dx-header-row td')]
    .map(h => h.innerText.trim());

  const noAktaIdx      = headers.indexOf('No Aktanikah');
  const noPendaftaranIdx = headers.indexOf('No Pendaftaran');
  const namaSubyIdx    = headers.indexOf('Nama Suami');
  const namaIstriIdx   = headers.indexOf('Nama Istri');
  const penghulu_hadirIdx = headers.indexOf('Nama Penghulu Hadir');
  const noAktaOldIdx   = headers.indexOf('No Aktanikah Lama');
  const tglAkadIdx     = headers.indexOf('Tanggal Akad');

  const rows = document.querySelectorAll('.dx-data-row');
  const data = [];
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const no_daftar = cells[noPendaftaranIdx]?.innerText?.trim();
    const no_akta   = cells[noAktaIdx]?.innerText?.trim();
    if (!no_daftar) return;
    data.push({
      no_daftar,
      no_akta:         no_akta || null,
      no_akta_nikah:   no_akta || null,
      nama_suami:      cells[namaSubyIdx]?.innerText?.trim(),
      nama_istri:      cells[namaIstriIdx]?.innerText?.trim(),
      penghulu_hadir:  cells[penghulu_hadirIdx]?.innerText?.trim() || null,
      tgl_akad:        cells[tglAkadIdx]?.innerText?.trim(),
    });
  });

  const pageInfo = document.querySelector('.dx-pages')?.innerText || '';
  return { data, pageInfo, total: rows.length };
}
JSON.stringify(scrapeCurrentPage());
```

- Catat hasil scraping halaman ini
- Cek `pageInfo` apakah ada halaman berikutnya
- Jika ada, klik tombol next page, tunggu load, ulangi scraping
- Kumpulkan semua data

### 7. Split data: akta vs penghulu

Dari data yang sudah terkumpul, pisahkan:

**Records untuk mode `akta`** — yang punya no_akta:
```json
{ "no_daftar": "ND...", "no_akta": "3216131..." }
```

**Records untuk mode `penghulu`** — yang punya penghulu_hadir:
```json
{ "no_pendaftaran": "ND...", "penghulu_hadir": "Drs. ...", "no_akta_nikah": "..." }
```

### 8. Update database

**Opsi A — jika dev server aktif (localhost:3000):**
```bash
# Mode akta
curl -s -X POST http://localhost:3000/api/simkah/sync \
  -H "Content-Type: application/json" \
  -d '{"mode":"akta","records":[...AKTA_RECORDS...]}'

# Mode penghulu
curl -s -X POST http://localhost:3000/api/simkah/sync \
  -H "Content-Type: application/json" \
  -d '{"mode":"penghulu","records":[...PENGHULU_RECORDS...]}'
```

**Opsi B — jika server tidak aktif, update langsung via Supabase CLI (LEBIH EFISIEN):**
```bash
SUPABASE_ACCESS_TOKEN=$(grep SUPABASE_ACCESS_TOKEN /Users/Jaliel/Dev/mas-kua/.env | cut -d= -f2) \
supabase db query --linked --workdir /Users/Jaliel/Dev/mas-kua "
UPDATE public.weddings AS w
SET
  no_akta        = v.no_akta,
  officiant_name = v.penghulu
FROM (VALUES
  ('ND...', '3216131...', 'Nama Penghulu'),
  ('ND...', '3216131...', 'Nama Penghulu')
) AS v(no_pendaftaran, no_akta, penghulu)
WHERE w.no_pendaftaran = v.no_pendaftaran
RETURNING w.no_pendaftaran, w.no_akta, w.officiant_name;
"
```
> ⚠️ Escape tanda kutip tunggal dalam nama dengan `''` (dua kutip), contoh: `'Drs. MA''MUN NAWAWI'`

### 9. Tangani record yang tidak match (no_pendaftaran NULL)

Setelah query UPDATE selesai, bandingkan jumlah RETURNING rows dengan total data SIMKAH. Jika ada yang tidak match, kemungkinan besar record tersebut **tidak punya `no_pendaftaran` di database** (NULL).

Untuk setiap record yang tidak terupdate:
1. Cari berdasarkan nama suami + istri:
```bash
supabase db query --linked --workdir /Users/Jaliel/Dev/mas-kua "
SELECT id, no_pendaftaran, groom_name, bride_name FROM public.weddings
WHERE groom_name ILIKE '%NAMA_SUAMI%' AND bride_name ILIKE '%NAMA_ISTRI%';
"
```
2. Jika ditemukan dengan `no_pendaftaran = NULL`, update langsung pakai `id` sekaligus isi `no_pendaftaran`:
```bash
supabase db query --linked --workdir /Users/Jaliel/Dev/mas-kua "
UPDATE public.weddings
SET
  no_pendaftaran = 'ND...',
  no_akta = '3216131...',
  officiant_name = 'Nama Penghulu'
WHERE id = 'uuid-dari-langkah-1'
RETURNING id, no_pendaftaran, no_akta, officiant_name;
"
```

### 10. Tampilkan hasil
Cetak ringkasan: total updated (akta + penghulu), berapa yang tidak ditemukan di DB (no match).

## Catatan Penting
- **Laporan Excel hanya menampilkan nikah yang sudah selesai** (sudah akad) — cocok untuk update akta
- Kolom `No Aktanikah` = nomor akta nikah resmi
- Kolom `Nama Penghulu Hadir` = penghulu yang hadir pada akad (bukan pemeriksa)
- Header mapping dilakukan dinamis — tidak perlu hard-code index kolom
- Jika ingin ambil bulan lalu: ubah filter bulan di halaman sebelum klik Lihat Data
- Format date: SIMKAH menggunakan `DD-MM-YYYY` — API sudah handle konversi
- Untuk update beberapa bulan sekaligus: ulangi langkah 5-10 dengan bulan berbeda
- **Record dengan `no_pendaftaran = NULL` di DB tidak akan ter-update oleh query JOIN** — selalu bandingkan jumlah RETURNING dengan total data SIMKAH, dan tangani sisanya via langkah 9
- Klik angka **50** di pagination bawah tabel sebelum scrape agar semua data muat 1 halaman
- Untuk expand submenu Laporan: klik **arrow di kiri** nama menu (koordinat x ≈ 14), bukan teks menunya
- Tombol MASUK login: klik koordinat langsung lebih andal daripada pakai ref jika form_input sudah diisi

## Temuan Sesi (verified 2026-06-11/12/15)

### Login
- Gunakan `setNativeValue` + dispatch `input/change` agar React form state ter-trigger — tidak perlu `keydown/keyup`
- Setelah field terisi, cukup `.click()` tombol MASUK — tidak perlu dispatch form submit event secara terpisah
- Setelah login, sering ada popup "OK, SAYA MENGERTI !" — tutup dulu sebelum klik menu
- **Sesi bisa expired tiba-tiba** (redirect ke `/admin/authentication`) — deteksi dengan cek `location.href` atau `document.title`; login ulang dari awal

### Navigasi Menu
- **Jangan klik `li` langsung** — klik `.dx-item` di dalamnya: `laporanExcelNode.querySelector('.dx-item').click()`
- Expand menu Laporan: klik `.dx-treeview-toggle-item-visibility` pada node Laporan, lalu tunggu sebentar sebelum klik submenu
- Jika konten halaman belum muncul setelah klik, cek apakah ada popup yang memblokir, tutup dulu

### Scraping Laporan Excel
- Format tanggal di kolom data sudah **ISO (YYYY-MM-DD)** — bukan DD-MM-YYYY seperti dugaan awal
- Semua 74 record (Juni 2026) punya `no_akta` dan `penghulu_hadir` — tidak ada yang kosong
- **Jumlah data bisa bertambah** antar sesi (62 → 74 dalam 1 hari) karena akad terus berjalan
- Kumpulkan data dari browser via `window._allData`, lalu simpan ke file JSON (`/tmp/simkah_data.json`) dan build SQL via Python — hindari return string panjang dari JS (bisa ter-block/truncated)

### Duplikat no_akta di DB — wajib dibersihkan setelah update akta
- **Penyebab**: record dengan `no_pendaftaran` berbeda (misal ND Juni vs ND Mei pendaftaran urut kecil) bisa mendapat `no_akta` yang sama karena JOIN UPDATE cocok ke keduanya
- **Deteksi**: `SELECT no_akta, COUNT(*), array_agg(no_pendaftaran) FROM weddings WHERE no_akta IS NOT NULL GROUP BY no_akta HAVING COUNT(*) > 1`
- **Fix**: NULL-kan `no_akta` pada record yang **tidak ada di SIMKAH Laporan Excel** (yang ada di SIMKAH = yang benar):
  ```sql
  UPDATE public.weddings SET no_akta = NULL
  WHERE no_pendaftaran IN ('ND...', 'ND...', ...)
  ```
- Sesi Juni 2026: ditemukan 25 pasang duplikat — semua berhasil dibersihkan dengan NULL-kan 25 record yang salah

### Record tidak match di DB
- Record tidak match bisa karena: (1) `no_pendaftaran = NULL` di DB, (2) belum pernah di-sync, (3) duplikat akta di SIMKAH
- Untuk case (1): cari by `groom_name ILIKE` + `bride_name ILIKE`, lalu UPDATE sekaligus set `no_pendaftaran`
- Untuk case (3): query `WHERE no_akta = '...'` untuk cek apakah akta sudah milik record lain

### Supabase CLI
- Gunakan `grep -v "new version\|recommend\|https://"` untuk filter output update CLI yang berisik
- Query panjang (74+ VALUES) berjalan lancar — tidak perlu dibagi batch

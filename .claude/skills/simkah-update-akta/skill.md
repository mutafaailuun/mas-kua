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

### 9. Tampilkan hasil
Cetak ringkasan: total updated (akta + penghulu), berapa yang tidak ditemukan di DB (no match).

## Catatan Penting
- **Laporan Excel hanya menampilkan nikah yang sudah selesai** (sudah akad) — cocok untuk update akta
- Kolom `No Aktanikah` = nomor akta nikah resmi
- Kolom `Nama Penghulu Hadir` = penghulu yang hadir pada akad (bukan pemeriksa)
- Header mapping dilakukan dinamis — tidak perlu hard-code index kolom
- Jika ingin ambil bulan lalu: ubah filter bulan di halaman sebelum klik Lihat Data
- Format date: SIMKAH menggunakan `DD-MM-YYYY` — API sudah handle konversi
- Untuk update beberapa bulan sekaligus: ulangi langkah 5-9 dengan bulan berbeda

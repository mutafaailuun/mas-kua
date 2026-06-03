---
name: simkah-update-daftar
description: "Ambil data pendaftaran nikah terbaru dari SIMKAH dan sync ke database. TRIGGER: ketika user mengatakan 'update daftar', 'sync daftar', 'ambil data pendaftaran', atau 'update data nikah'."
---

# Skill: Update Daftar Pendaftaran dari SIMKAH

Tugas: Login ke SIMKAH, buka halaman Daftar Nikah, scrape data terbaru, POST ke `/api/simkah/sync` dengan mode `daftar`.

## Langkah-langkah

### 1. Baca credentials dari .env
```bash
grep -E "SIMKAH_USERNAME|SIMKAH_PASSWORD|SIMKAH_URL" /Users/Jaliel/Dev/mas-kua/.env
```

### 2. Cek tanggal sync terakhir
Cek `no_pendaftaran` terbaru di DB untuk tahu mulai dari mana scraping:
```bash
SUPABASE_ACCESS_TOKEN=$(grep SUPABASE_ACCESS_TOKEN /Users/Jaliel/Dev/mas-kua/.env | cut -d= -f2) \
supabase db query --linked --workdir /Users/Jaliel/Dev/mas-kua \
  "SELECT registration_date FROM weddings ORDER BY registration_date DESC LIMIT 1;"
```

### 3. Buka browser dan navigasi ke SIMKAH
- Gunakan `mcp__Claude_in_Chrome__tabs_context_mcp` untuk cek tab yang ada
- Jika sudah ada tab SIMKAH yang sudah login (URL mengandung UUID dashboard), langsung ke langkah 5
- Jika belum, buka tab baru dengan `mcp__Claude_in_Chrome__tabs_create_mcp`
- Navigate ke `https://simkah4.kemenag.go.id/admin/authentication`

### 4. Login
- Isi field Email/Username dengan `SIMKAH_USERNAME` dari .env
- Isi field Password dengan `SIMKAH_PASSWORD` dari .env
- Klik tombol MASUK
- Tunggu 3 detik hingga dashboard muncul (URL berubah ke UUID)
- Jika ada popup notifikasi, klik "OK, SAYA MENGERTI !"

### 5. Navigasi ke Daftar Nikah
- Klik menu **Pencatatan Nikah** di sidebar (ada arrow expand di kiri)
- Klik submenu **Daftar Nikah**

### 6. Filter data terbaru
- Isi field **Tgl Akad Dari** dengan tanggal hari ini (format dd/mm/yyyy)
  - Gunakan tanggal hari ini untuk ambil semua yang akan datang
  - ATAU kosongkan filter untuk ambil semua data baru sejak sync terakhir
- Klik tombol **Tampilkan**
- Tunggu tabel load

### 7. Scrape semua halaman
Jalankan JavaScript berikut di browser untuk scrape halaman saat ini:

```javascript
// Scrape semua baris data dari DevExtreme grid
function scrapeCurrentPage() {
  const rows = document.querySelectorAll('.dx-data-row');
  const data = [];
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 11) {
      const noDaftar = cells[2]?.innerText?.trim();
      if (noDaftar && noDaftar.startsWith('ND')) {
        data.push({
          no_daftar: noDaftar,
          created_at: cells[3]?.innerText?.trim(),
          nama_suami: cells[5]?.innerText?.trim(),
          nama_istri: cells[7]?.innerText?.trim(),
          tgl_akad: cells[8]?.innerText?.trim(),
          jam_akad: cells[9]?.innerText?.trim(),
          lokasi_akad: cells[10]?.innerText?.trim(),
          nikah_di: cells[10]?.innerText?.includes('KUA') || cells[10]?.innerText?.includes('KANTOR') ? 1 : 2,
        });
      }
    }
  });
  return data;
}

// Cek info pagination
const pageInfo = document.querySelector('.dx-page-sizes')?.parentElement?.innerText || '';
JSON.stringify({ data: scrapeCurrentPage(), pageInfo });
```

- Catat hasil scraping
- Cek apakah ada tombol "Next" atau halaman berikutnya (cek `pageInfo`)
- Jika ada halaman berikutnya: klik tombol next page, tunggu load, ulangi scraping
- Kumpulkan semua data dari semua halaman

### 8. POST ke API lokal
Setelah semua data terkumpul, kirim ke API:

```bash
curl -s -X POST http://localhost:3000/api/simkah/sync \
  -H "Content-Type: application/json" \
  -d '{"mode":"daftar","records":[...DATA...]}'
```

Ganti `[...DATA...]` dengan array JSON hasil scraping.

### 9. Tampilkan hasil
Cetak ringkasan: berapa inserted, skipped, dan jika ada error.

## Catatan Penting
- SIMKAH pakai SPA (Single Page App) — URL dashboard adalah UUID, bukan path readable
- DevExtreme DataGrid: selector `.dx-data-row` untuk baris data
- Pagination info ada di elemen dengan class `.dx-page-sizes`
- Jika sesi expired (redirect ke login), ulangi dari langkah 4
- Field `nikah_di`: 1 = Kantor KUA, 2 = Luar Kantor
- Format tanggal SIMKAH: `DD-MM-YYYY` — API sudah handle konversi

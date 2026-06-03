---
name: simkah-update-daftar
description: "Ambil data pendaftaran nikah terbaru dari SIMKAH dan sync ke database. TRIGGER: ketika user mengatakan 'update daftar', 'update pendaftaran', 'sync daftar', atau 'ambil data pendaftaran'."
---

# Skill: Update Daftar Pendaftaran dari SIMKAH

Tugas: Login ke SIMKAH, buka **Laporan → Laporan Pendaftaran Nikah**, ambil pendaftaran dengan **Tanggal Daftar dari hari ini mundur 7 hari**, insert yang belum ada ke database.

> ⚠️ Sumber data: **Laporan → Laporan Pendaftaran Nikah** (bukan Pencatatan Nikah → Daftar Nikah)

## Langkah-langkah

### 1. Hitung rentang tanggal (hari ini − 7 hari)
```bash
TODAY=$(date +%Y-%m-%d)
WEEK_AGO=$(date -v-7d +%Y-%m-%d 2>/dev/null || date -d "7 days ago" +%Y-%m-%d)
echo "Rentang: $WEEK_AGO s/d $TODAY"

# Tentukan bulan yang perlu di-load (biasanya 1, kadang 2 jika lintas bulan)
MONTH_TODAY=$(date +%B)       # e.g. "June"
YEAR_TODAY=$(date +%Y)        # e.g. "2026"
MONTH_PREV=$(date -v-7d +%B 2>/dev/null || date -d "7 days ago" +%B)
YEAR_PREV=$(date -v-7d +%Y 2>/dev/null || date -d "7 days ago" +%Y)
echo "Bulan yang di-load: $MONTH_PREV/$YEAR_PREV dan $MONTH_TODAY/$YEAR_TODAY"
```

### 2. Baca credentials dari .env
```bash
grep -E "SIMKAH_USERNAME|SIMKAH_PASSWORD" /Users/Jaliel/Dev/mas-kua/.env
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

### 6. Load dan scrape per bulan
Laporan hanya bisa filter per bulan. Load bulan-bulan yang masuk rentang 7 hari:
- Jika `MONTH_PREV == MONTH_TODAY` → cukup load 1 bulan
- Jika berbeda (hari ini awal bulan) → load 2 bulan: bulan lalu + bulan ini

Untuk setiap bulan:

**a.** Set field **Bulan** ke bulan yang dituju (klik field, ketik nama bulan Inggris, e.g. "June")

**b.** Klik tombol hijau **Lihat Data**, tunggu 2 detik

**c.** Jalankan JavaScript scraping + filter 7 hari:

```javascript
// Hitung batas tanggal (7 hari ke belakang dari hari ini)
const today = new Date();
today.setHours(23, 59, 59, 0);
const weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);
weekAgo.setHours(0, 0, 0, 0);

function parseSimkahDate(str) {
  // Format: DD-MM-YYYY
  if (!str || !str.includes('-')) return null;
  const [d, m, y] = str.split('-');
  if (!d || !m || !y) return null;
  return new Date(`${y}-${m}-${d}T00:00:00`);
}

function scrapeAndFilter() {
  const rows = document.querySelectorAll('.dx-data-row');
  const all = [], filtered = [];

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length < 25) return;
    const no_daftar = cells[5]?.innerText?.trim();
    if (!no_daftar || !no_daftar.startsWith('ND')) return;

    const tglDaftarStr = cells[6]?.innerText?.trim();
    const tglDaftar = parseSimkahDate(tglDaftarStr);
    const nikahDiText = cells[24]?.innerText?.trim() || '';

    const record = {
      no_daftar,
      created_at:  tglDaftarStr,
      nama_suami:  cells[7]?.innerText?.trim(),
      nama_istri:  cells[8]?.innerText?.trim(),
      tgl_akad:    cells[22]?.innerText?.trim(),
      jam_akad:    cells[23]?.innerText?.trim(),
      lokasi_akad: cells[11]?.innerText?.trim(),
      nikah_di:    (nikahDiText.includes('LUAR') || nikahDiText.includes('BEDOL')) ? 2 : 1,
      no_akta:     cells[26]?.innerText?.trim() || null,
    };

    all.push(record);
    // Filter: hanya yang tgl_daftar dalam 7 hari terakhir
    if (tglDaftar && tglDaftar >= weekAgo && tglDaftar <= today) {
      filtered.push(record);
    }
  });

  const pageInfo = document.querySelector('.dx-pages')?.innerText || '';
  return { filtered, total_in_page: all.length, pageInfo,
           range: `${weekAgo.toISOString().slice(0,10)} s/d ${today.toISOString().slice(0,10)}` };
}
JSON.stringify(scrapeAndFilter());
```

**d.** Jika ada halaman berikutnya (pageInfo: "Page 1 of N > 1"):
- Klik tombol next (▶), tunggu 2 detik, ulangi JS di atas
- Hentikan jika tidak ada lagi record yang masuk rentang 7 hari

**e.** Kumpulkan semua `filtered` records dari semua halaman dan bulan

### 7. Kirim data ke database

**Opsi A — jika dev server aktif (localhost:3000):**
```bash
curl -s -X POST http://localhost:3000/api/simkah/sync \
  -H "Content-Type: application/json" \
  -d '{"mode":"daftar","records":[...FILTERED_DATA...]}'
```

**Opsi B — jika server tidak aktif, insert langsung via Supabase CLI:**
```bash
# Konversi tanggal DD-MM-YYYY → YYYY-MM-DD sebelum insert
# jam_akad "9:00 AM" → "09:00:00", "10:00 AM" → "10:00:00"
# nikah_di: 2 → 'Luar Kantor', 1 → 'Kantor'
SUPABASE_ACCESS_TOKEN=$(grep SUPABASE_ACCESS_TOKEN /Users/Jaliel/Dev/mas-kua/.env | cut -d= -f2) \
supabase db query --linked --workdir /Users/Jaliel/Dev/mas-kua "
INSERT INTO public.weddings
  (no_pendaftaran, registration_date, wedding_date, wedding_time, groom_name, bride_name, location, status)
VALUES
  ('ND...', '2026-06-03', '2026-06-19', '10:00:00', 'NAMA SUAMI', 'NAMA ISTRI', 'ALAMAT...', 'Luar Kantor'),
  ...
ON CONFLICT (no_pendaftaran) DO NOTHING
RETURNING no_pendaftaran, groom_name, wedding_date;
"
```

### 8. Tampilkan hasil
Cetak ringkasan:
- Rentang tanggal daftar yang dicari
- Total ditemukan di SIMKAH (dalam 7 hari)
- Inserted (baru), Skipped (sudah ada)
- Error jika ada

## Mapping Kolom Laporan Pendaftaran Nikah (verified 2026-06-03)
| Index | Nama Kolom |
|-------|-----------|
| [5]  | Nomor Daftar (`no_daftar`) |
| [6]  | Tanggal Daftar (`created_at`) — DD-MM-YYYY |
| [7]  | Nama Suami |
| [8]  | Nama Istri |
| [9]  | NIK Suami |
| [10] | NIK Istri |
| [11] | Alamat Suami (dipakai sebagai `lokasi_akad`) |
| [22] | Tanggal Akad — DD-MM-YYYY |
| [23] | Jam Akad — "HH:MM AM/PM" |
| [24] | Nikah Di — "LUAR KUA / BEDOL" atau "KUA/KANTOR" |
| [25] | Penghulu |
| [26] | Nomor Akta Nikah |

## Catatan Penting
- **Filter 7 hari** diterapkan di JavaScript setelah data di-load (bukan di filter SIMKAH)
- **Laporan filter per bulan** — jika hari ini tgl 1-7, load juga bulan sebelumnya
- **IB...** (Isbat Nikah) otomatis dilewati karena filter `startsWith('ND')`
- **`nikah_di`**: "LUAR KUA / BEDOL" → 2 (Luar Kantor), lainnya → 1 (Kantor)
- **Format tanggal SIMKAH**: DD-MM-YYYY — konversi manual ke YYYY-MM-DD saat insert
- **Sesi expired**: jika redirect ke login, ulangi dari langkah 4

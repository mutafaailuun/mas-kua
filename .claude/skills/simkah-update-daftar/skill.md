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

## Mapping Kolom Laporan Pendaftaran Nikah (verified 2026-06-12)
| Index | Nama Kolom |
|-------|-----------|
| [5]  | Nomor Daftar (`no_daftar`) |
| [6]  | Tanggal Daftar — **DD-MM-YYYY** (perlu konversi ke YYYY-MM-DD) |
| [7]  | Nama Suami |
| [8]  | Nama Istri |
| [11] | Alamat Suami (dipakai sebagai `location`) |
| [22] | Tanggal Akad — **DD-MM-YYYY** |
| [23] | Jam Akad — **"HH:MM AM/PM"** (perlu konversi ke HH:MM:SS) |
| [24] | Nikah Di — "LUAR KUA / BEDOL" → `'Luar Kantor'`, lainnya → `'Kantor'` |

> ⚠️ Header tabel menggunakan merged cells sehingga index di header tidak sama dengan index di data row. Gunakan index data row di atas, bukan dari `headers.indexOf()`.

## Catatan Penting
- **Laporan Pendaftaran Nikah filter berdasarkan bulan DAFTAR** (bukan bulan akad)
- **Laporan Excel filter berdasarkan bulan AKAD** — ini yang dipakai untuk update akta
- **Filter 7 hari tidak relevan** jika tujuan adalah sync semua akad bulan ini — lebih tepat: cek selisih DB vs SIMKAH dengan `NOT IN` query
- **IB...** (Isbat Nikah) otomatis dilewati karena filter `startsWith('ND')`
- **Format tanggal**: Tanggal Daftar dan Tanggal Akad di Laporan Pendaftaran adalah **DD-MM-YYYY** — konversi ke `YYYY-MM-DD` sebelum insert
- **Format jam**: `"10:00 AM"` → `"10:00:00"`, `"07:00 AM"` → `"07:00:00"` — gunakan regex AM/PM
- **`nikah_di`**: nilai di DB adalah string `'Luar Kantor'` atau `'Kantor'` (bukan integer 1/2)
- **Sesi expired**: jika redirect ke login, ulangi dari langkah 4
- **Tab browser bisa freeze** setelah operasi berat — jika timeout, buat tab baru dan login ulang

## Temuan Sesi (verified 2026-06-12/15)

### Strategi sync yang lebih efisien
Daripada filter 7 hari (yang bisa miss record lama), gunakan pendekatan:
1. Query DB: `SELECT no_pendaftaran FROM weddings WHERE no_pendaftaran LIKE '%3216131MMYYYY%'` untuk tahu record bulan apa yang sudah ada
2. Scrape Laporan Pendaftaran bulan ini di SIMKAH (set 50/page agar muat 1 halaman)
3. Bandingkan: `window._daftarSimkah.filter(r => !dbSet.has(r.no_pendaftaran))`
4. INSERT hanya yang belum ada (`ON CONFLICT DO NOTHING`)

### Strategi alternatif via Laporan Excel
1. Scrape semua no_daftar dari Laporan Excel bulan ini (akad bulan ini)
2. Cek mana yang belum ada di DB via `NOT IN` query
3. Untuk yang belum ada → cari di Laporan Pendaftaran (sesuai bulan registrasinya)
4. INSERT yang ditemukan, skip yang tidak ditemukan (mungkin duplikat akta)

### Navigasi & scraping Laporan Pendaftaran
- Setelah klik menu, langsung klik **Lihat Data** — filter KUA sudah auto-terisi KUA PEBAYURAN dan bulan/tahun berjalan
- Set **50/page** sebelum scrape: `document.querySelector('.dx-page-size[aria-label="50"]')?.click()` atau cari `.dx-page-size` dengan `innerText === '50'`
- Tunggu 2 detik setelah set 50/page sebelum scrape — data reload

### Deteksi sesi expired
- Cek `location.href` — jika mengandung `/admin/authentication`, sesi expired
- Cek `document.title` — jika "Sign In", sesi expired
- Langsung login ulang: isi field + klik MASUK + tutup popup + expand Laporan + klik submenu

### Script konversi tanggal & waktu (JavaScript)
```javascript
function convertDate(str) {
  if (!str) return null;
  if (str.includes('-')) {
    const parts = str.split('-');
    if (parts[0].length === 4) return str; // sudah YYYY-MM-DD
    return `${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`;
  }
  return str;
}
function convertTime(str) {
  if (!str) return '00:00:00';
  const m = str.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return str.includes(':') ? str + ':00' : '00:00:00';
  let h = parseInt(m[1]); const min = m[2]; const p = m[3].toUpperCase();
  if (p==='PM' && h!==12) h+=12; if (p==='AM' && h===12) h=0;
  return `${String(h).padStart(2,'0')}:${min}:00`;
}
```

### Laporan Pendaftaran vs Laporan Excel
- **Laporan Pendaftaran Juni** hanya tampilkan yang **daftar di Juni** (bukan akad di Juni)
- Record yang daftar di April/Mei tapi akad di Juni → ada di Laporan Excel tapi tidak di Laporan Pendaftaran Juni
- Untuk cari record seperti ini: switch bulan ke bulan registrasinya di Laporan Pendaftaran

### INSERT ke DB
```sql
INSERT INTO public.weddings
  (no_pendaftaran, registration_date, wedding_date, wedding_time, groom_name, bride_name, location, status)
VALUES (...)
ON CONFLICT (no_pendaftaran) DO NOTHING
RETURNING no_pendaftaran, groom_name, wedding_date;
```

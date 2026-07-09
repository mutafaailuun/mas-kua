# Skill: simkah-ajukan-jaspro

**TRIGGER:** ketika user mengatakan "ajukan jaspro", "ajukan transpor", "ajukan pencairan", "pengajuan pencairan", atau "ajukan semua" di SIMKAH.

## Tujuan
Proses pengajuan pencairan **Jaspro dan/atau Transport** di SIMKAH untuk semua data yang masih berstatus "Belum Di Ajukan" (warna kuning). Selalu ajukan keduanya (Jaspro + Transport) kecuali user minta salah satu saja.

---

## Langkah-langkah

### 1. Buka SIMKAH dan Login
- URL: `https://simkah4.kemenag.go.id/login`
- Kredensial dari `.env`: `SIMKAH_USERNAME` / `SIMKAH_PASSWORD`
- Setelah login, tutup popup notifikasi yang muncul

### 2. Navigasi ke Jaspro Transpor > Pengajuan Pencairan
- Klik ikon chevron (▶) di kiri tulisan **Jaspro Transpor** di sidebar untuk expand
- Klik submenu **Pengajuan Pencairan**
- Tunggu halaman loading selesai

### 3. Cari Data dengan Filter Bulan
- Isi **Tahun**: tahun berjalan
- Pilih **Bulan**: bulan yang diminta (selalu tanya bulan jika tidak disebutkan)
- Klik tombol **Cari** — tunggu data muncul

### 4. Set Tampilan ke 50
- Setelah data muncul, scroll ke **bawah tabel** — akan terlihat tombol **15 | 30 | 50**
- Klik **50** agar semua data tampil sekaligus
- Jika data ≤ 15 maka tidak perlu, tapi tetap klik untuk memastikan

### 5. Baca Status Semua Baris
Gunakan `get_page_text` untuk membaca status semua baris sekaligus — lebih cepat daripada screenshot per baris. Dari teks halaman, identifikasi baris mana yang:
- **Jaspro = Belum Di Ajukan** → perlu diajukan Jaspro
- **Transport = Belum Di Ajukan** → perlu diajukan Transport
- Keduanya kuning → ajukan Jaspro dulu, baru Transport

### 6. Navigasi ke Baris yang Tidak Terlihat
Jika baris 1-5 tidak tampil di layar (virtual scroll), gunakan:
```
mcp__Claude_in_Chrome__find: "NAMA_SUAMI row aksi button"
computer: scroll_to ref_xxx
```
Ini lebih cepat daripada scroll manual.

### 7. Proses Setiap Baris Kuning
Untuk setiap baris yang perlu diajukan:

**A. Jika hanya perlu Transport (Jaspro sudah Di Ajukan):**
1. Klik ikon Aksi (≡) → dropdown hanya menampilkan **Pengajuan Pencairan Transport**
2. Klik → form terbuka (sudah di-scroll) → klik **Ajukan** (pojok kanan bawah, koordinat ~1396, 810)
3. Tunggu "Berhasil" → klik **OK**

**B. Jika perlu Jaspro + Transport (keduanya kuning):**
1. Klik Aksi → klik **Pengajuan Pencairan Jaspro** → Ajukan → OK
2. Klik Aksi lagi di baris yang sama → klik **Pengajuan Pencairan Transport** → Ajukan → OK

**C. Jika hanya perlu Jaspro:**
1. Klik Aksi → klik **Pengajuan Pencairan Jaspro** → Ajukan → OK

### 8. Selesai
Tidak ada lagi baris kuning = selesai. Laporkan rekap ke user.

---

## Tips Teknis yang Dipelajari

### Browser & Tab
- Gunakan `tabs_context_mcp createIfEmpty: true` untuk buat tab baru
- Chrome di Mac adalah tier "read" — harus pakai `mcp__Claude_in_Chrome__*` untuk interaksi
- Navigate langsung ke `https://simkah4.kemenag.go.id/login` (jangan lewat homepage)

### Login
- Popup muncul setelah login — tutup dengan klik tombol "OK, SAYA MENGERTI!" atau ikon ✕
- Setelah login, URL berubah ke UUID panjang (itu normal)

### Sidebar Jaspro Transpor
- Klik ikon chevron di koordinat kiri (~14, y_baris) untuk expand, bukan teks menunya
- Submenu muncul: Pengajuan Pencairan, Verifikasi Pencairan, dll.

### Tabel Virtual Scroll
- Tabel menggunakan **virtual scroll** — baris 1-5 bisa hilang saat scroll ke bawah
- Solusi: gunakan `find` dengan nama wajib bayar untuk locate dan `scroll_to ref_xxx`
- Tombol **15 | 30 | 50** ada di **footer halaman** (bukan header tabel) — scroll ke paling bawah

### Baca Status Cepat
- Gunakan `get_page_text` untuk baca semua status baris sekaligus
- Format di teks: `[No]\nDi Ajukan/Belum Di Ajukan [Jaspro] [Transport]`
- Lebih cepat daripada screenshot per baris

### Form Pengajuan
- Form langsung scroll sendiri ke atas saat dibuka
- Tombol **Ajukan** selalu di pojok kanan bawah (koordinat ~1396, 799-810)
- Scroll ke bawah dulu jika tombol tidak terlihat
- Loading setelah klik Ajukan bisa 2-5 detik — tunggu popup "Berhasil"

### Dropdown Aksi
- Jika **hanya 1 opsi** muncul di dropdown = yang lain sudah diajukan
- Jika **2 opsi** muncul = keduanya belum diajukan
- Koordinat aksi di kolom ke-2 dari kiri (kolom AKSI), sekitar x=311

### Koordinat Umum (resolusi 1456x834)
- Tombol Ajukan: `(1396, 799)` atau `(1396, 810)`
- Tombol OK popup: `(887, 519)`
- Kolom AKSI: x ≈ 311

---

## Catatan Alur Kerja Optimal

Urutan terbaik untuk banyak baris:
1. `get_page_text` → identifikasi semua baris kuning sekaligus
2. Proses dari atas ke bawah, **ajukan Jaspro semua baris dulu**, baru **Transport semua baris**
3. Atau proses per baris (Jaspro + Transport) jika lebih sedikit

Jika baris tidak terlihat di viewport: gunakan `find` bukan scroll manual.

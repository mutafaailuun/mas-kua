# Tutorial: SIMKAH - Auto Pencairan Jaspro & Transport (Userscript)

Userscript ini mengotomatisasi proses **Pengajuan Pencairan Jaspro (Jasa Profesi) dan Transport** di SIMKAH. Cukup satu klik, semua baris di halaman akan diproses otomatis — tidak perlu klik satu per satu.

---

## Daftar Isi

1. [Install Violentmonkey](#1-install-violentmonkey)
2. [Install Script](#2-install-script)
3. [Cara Pakai](#3-cara-pakai)
4. [Cara Kerja Script](#4-cara-kerja-script)
5. [Kustomisasi untuk KUA Lain](#5-kustomisasi-untuk-kua-lain)
6. [FAQ & Troubleshooting](#6-faq--troubleshooting)

---

## 1. Install Violentmonkey

**Violentmonkey** adalah ekstensi browser gratis untuk menjalankan userscript.

| Browser | Link Install |
|---------|-------------|
| Google Chrome | [Chrome Web Store → Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegedbjjioahcomkefmabc) |
| Mozilla Firefox | [Firefox Add-ons → Violentmonkey](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/) |
| Microsoft Edge | [Edge Add-ons → Violentmonkey](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao) |

**Langkah:**
1. Klik link sesuai browser Anda
2. Klik **Add to Chrome** / **Add to Firefox** / **Get**
3. Konfirmasi izin yang diminta
4. Ikon Violentmonkey (🐵) akan muncul di toolbar browser

---

## 2. Install Script

### A. Buka Editor Violentmonkey

1. Klik ikon 🐵 di toolbar browser
2. Klik **+** (New Script)
3. Halaman editor kosong akan terbuka

### B. Tempel Script

1. **Hapus semua isi** editor yang ada (Ctrl+A → Delete)
2. Salin seluruh isi script dari file [`simkah-auto-pencairan.user.js`](https://gist.github.com/mutafaailuun/f80acf8bbde0c70553ab86240f59ae6b)
3. Tempel ke editor (Ctrl+V)
4. Klik **Save** (Ctrl+S)

Script kini aktif. Segarkan halaman SIMKAH jika sudah terbuka.

---

## 3. Cara Pakai

### Prasyarat
- Sudah login ke SIMKAH
- Buka halaman **Pencairan Jaspro/Transport → Pengajuan Pencairan**

### Langkah

1. Masuk ke halaman **Pengajuan Pencairan** di SIMKAH.

   > Jika Anda berada di halaman yang benar, tombol 🚀 **Auto Cairkan Halaman Ini** akan muncul di **kiri bawah** layar.

2. **Klik tombol** 🚀 Auto Cairkan Halaman Ini

3. Script akan otomatis:
   - Menelusuri semua baris di tabel dari atas ke bawah
   - Mendeteksi baris dengan status **"Belum Di Ajukan"** (kolom Jaspro & Transport)
   - Klik menu **Aksi → Pengajuan Pencairan Jaspro** atau **Pengajuan Pencairan Transport**
   - Klik tombol **Ajukan** di modal yang muncul
   - Klik **OK** pada notifikasi SweetAlert
   - Lanjut ke baris berikutnya, ulangi sampai semua selesai

4. Setelah semua baris diproses, muncul alert:  
   ✅ **Semua pencairan Transpor dan Jaspro di halaman ini sudah diajukan!**

### Membatalkan Proses

Klik tombol lagi saat sedang memproses (berwarna kuning/oranye). Tombol akan berubah menjadi merah 🛑 dan proses berhenti.

---

## 4. Cara Kerja Script

| Langkah | Penjelasan |
|---------|-----------|
| **Deteksi Halaman** | Script memeriksa elemen `#title` setiap 1 detik. Tombol hanya muncul jika judul mengandung "PENGAJUAN PENCAIRAN" |
| **Wait Grid** | Menunggu loading panel DevExtreme selesai sebelum berinteraksi dengan tabel |
| **Iterasi Baris** | Membaca semua `tr.dx-data-row`, mencari kolom `aria-colindex="3"` (Jaspro) dan `aria-colindex="4"` (Transport) yang berisi "Belum Di Ajukan" |
| **Klik Aksi** | Mengklik tombol aksi di kolom `aria-colindex="2"`, lalu memilih menu dropdown yang sesuai |
| **Ajukan + Konfirmasi** | Klik tombol **Ajukan** di modal, lalu klik **OK** pada SweetAlert |
| **Loop** | Kembali ke langkah iterasi baris sampai semua baris selesai |

### Prioritas Proses

Untuk setiap baris, **Jaspro** diproses terlebih dahulu, baru **Transport**. Ini mencegah konflik jika ada perubahan UI setelah submit.

---

## 5. Kustomisasi untuk KUA Lain

Script ini menggunakan `aria-colindex` untuk mengidentifikasi kolom. Jika struktur tabel di versi SIMKAH Anda berbeda, sesuaikan indeks berikut:

> Buka script di editor Violentmonkey untuk mengedit bagian-bagian di bawah.

---

### 5.1 Indeks Kolom Tabel

Cari bagian berikut di script (sekitar **baris 133–134**):

```js
const tdJaspro = row.querySelector('td[aria-colindex="3"]');
const tdTransport = row.querySelector('td[aria-colindex="4"]');
```

- `aria-colindex="3"` → kolom **Jaspro**
- `aria-colindex="4"` → kolom **Transport**

Jika kolom Jaspro/Transport berada di posisi lain, ganti angkanya.  
**Tip:** klik kanan → Inspect pada sel tabel untuk melihat `aria-colindex`-nya.

---

### 5.2 Kolom Aksi

Cari baris berikut (sekitar **baris 140**):

```js
const aksiCell = row.querySelector('td[aria-colindex="2"]');
```

`aria-colindex="2"` → kolom **Aksi** (tempat tombol dropdown berada). Sesuaikan jika berbeda.

---

### 5.3 Label Menu Dropdown

Cari baris berikut (sekitar **baris 149 dan 163**):

```js
const btnJaspro = document.querySelector('div[aria-label="Pengajuan Pencairan Jaspro"]');
const btnTransport = document.querySelector('div[aria-label="Pengajuan Pencairan Transport"]');
```

Jika label menu di SIMKAH Anda berbeda, ganti teksnya sesuai yang muncul di dropdown.

---

### 5.4 URL SIMKAH

Bagian paling atas script (baris **7**):

```js
// @match        https://simkah4.kemenag.go.id/*
```

**Tidak perlu diubah.** Tanda `*` di akhir URL berarti script aktif di semua halaman domain `simkah4.kemenag.go.id` — termasuk URL dengan kode unik tiap KUA. Script otomatis berjalan di KUA manapun selama menggunakan domain yang sama.

---

## 6. FAQ & Troubleshooting

**Q: Tombol tidak muncul di halaman Pengajuan Pencairan**
> Periksa apakah halaman memiliki elemen `<div id="title">` yang berisi teks "PENGAJUAN PENCAIRAN". Jika judul halaman menggunakan struktur berbeda, script perlu disesuaikan (lihat bagian 4 — ganti selector di fungsi `checkVisibility`).

**Q: Proses macet / tidak lanjut ke baris berikutnya**
> Coba klik tombol untuk menghentikan, lalu klik lagi untuk memulai ulang. Mungkin modal atau notifikasi tidak tertutup sempurna — refresh halaman jika perlu.

**Q: Salah klik / menu tidak kebuka**
> Pastikan tidak ada popup blocker yang menghalangi. Beberapa baris mungkin perlu jeda lebih lama — script sudah diberi jeda 1-2 detik antar langkah.

**Q: Bisa digunakan di KUA lain?**
> Ya. Lihat [bagian 5](#5-kustomisasi-untuk-kua-lain) untuk menyesuaikan indeks kolom dan label menu.

**Q: Aman digunakan?**
> Script hanya berinteraksi dengan elemen UI SIMKAH (klik tombol, isi form). Tidak mengirim data ke pihak luar. Tidak menyimpan data apapun. Source code bisa dilihat langsung di Violentmonkey editor.

**Q: Script berhenti di SweetAlert, tidak lanjut**
> SweetAlert mungkin memiliki delay animasi. Script sudah menunggu hingga 7.5 detik untuk mendeteksi tombol konfirmasi. Jika masih gagal, coba refresh halaman.

---

## Informasi Script

| | |
|---|---|
| **Nama** | SIMKAH - Auto Pencairan Jaspro & Transport |
| **Versi** | 1.3.0 |
| **Kompatibel** | Chrome, Firefox, Edge |
| **Requires** | Violentmonkey |
| **URL Target** | `https://simkah4.kemenag.go.id/*` |
| **Source Code** | [GitHub Gist](https://gist.github.com/mutafaailuun/f80acf8bbde0c70553ab86240f59ae6b) |

---

*Dibuat oleh KUA Pebayuran · Bebas digunakan dan dimodifikasi untuk KUA lain*

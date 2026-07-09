# Tutorial: SIMKAH - Lampiran Dokumentasi Akad (Userscript)

Userscript ini membantu petugas KUA membuat **Lampiran Dokumentasi Peristiwa Nikah Luar Kantor** secara otomatis langsung dari halaman SIMKAH — tanpa perlu membuka aplikasi lain.

---

## Daftar Isi

1. [Install Violentmonkey](#1-install-violentmonkey)
2. [Install Script](#2-install-script)
3. [Cara Pakai](#3-cara-pakai)
4. [Kustomisasi untuk KUA Lain](#4-kustomisasi-untuk-kua-lain)
5. [FAQ & Troubleshooting](#5-faq--troubleshooting)

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

   ![Klik tanda +](https://i.imgur.com/placeholder.png)

3. Halaman editor kosong akan terbuka

### B. Tempel Script

1. **Hapus semua isi** editor yang ada (Ctrl+A → Delete)
2. Salin seluruh isi script dari file `simkah-lampiran-dokumentasi.user.js`
3. Tempel ke editor (Ctrl+V)
4. Klik **Save** (Ctrl+S)

Script kini aktif. Segarkan halaman SIMKAH jika sudah terbuka.

---

## 3. Cara Pakai

### Prasyarat
- Sudah login ke SIMKAH
- Buka halaman **Akta Nikah → Pencatatan Pernikahan**

### Langkah per Pasangan

1. **Temukan baris** nikah yang ingin dibuat lampirannya

2. Di kolom **"Upload Dokumentasi Akad"**, klik tombol **📄 Buat** (muncul di samping badge BELUM/SUDAH)

   > Jika tombol belum muncul, coba gulir halaman ke bawah atau tunggu beberapa detik.

3. **Isi form** yang muncul:
   - Data nikah (No. Pendaftaran, No. Akta, dll.) sudah terisi otomatis
   - Pilih **Penghulu** dari dropdown
   - Klik **Pilih File** → pilih foto dokumentasi akad

4. Klik **⚙️ Generate & Upload**

5. Script akan:
   - Membuat gambar lampiran resolusi tinggi (~300 DPI)
   - Mengklik menu **Action → Upload Dokumentasi Akad** secara otomatis
   - Mengisi file ke form upload SIMKAH

6. Setelah file masuk, klik tombol **SIMPAN** di halaman upload SIMKAH

> **Catatan:** Jika upload otomatis gagal, file akan terunduh otomatis ke komputer Anda. Upload manual via menu Action → Upload Dokumentasi Akad.

---

## 4. Kustomisasi untuk KUA Lain

Buka script di editor Violentmonkey, lalu cari dan ubah bagian berikut:

---

### 4.1 Nama KUA di Dokumen

Cari baris (sekitar **baris 321**):

```js
ctx.fillText("KANTOR URUSAN AGAMA KECAMATAN PEBAYURAN", baseW / 2, y);
```

Ganti `PEBAYURAN` dengan nama kecamatan KUA Anda:

```js
ctx.fillText("KANTOR URUSAN AGAMA KECAMATAN KARAWANG BARAT", baseW / 2, y);
```

---

### 4.2 Daftar Nama Penghulu

Cari blok `<select id="vm-penghulu"` (sekitar **baris 158–163**):

```html
<option value="DRS. H. MA'MUN NAWAWI">DRS. H. MA'MUN NAWAWI</option>
<option value="NUNU HUSNUL HITAM, SHI.">NUNU HUSNUL HITAM, SHI.</option>
<option value="JALALUDIN, S.H.">JALALUDIN, S.H.</option>
```

Hapus semua baris `<option>` di atas, lalu isi dengan nama-nama penghulu di KUA Anda. Contoh:

```html
<option value="H. AHMAD FAUZI, S.AG.">H. AHMAD FAUZI, S.AG.</option>
<option value="DRS. IBRAHIM">DRS. IBRAHIM</option>
<option value="SITI FATIMAH, S.HI.">SITI FATIMAH, S.HI.</option>
```

Format: `value` = teks yang akan muncul di dokumen (tulis huruf kapital).

---

### 4.3 URL SIMKAH

Bagian paling atas script (baris **7**):

```js
// @match        https://simkah4.kemenag.go.id/*
```

**Tidak perlu diubah.** Tanda `*` di akhir URL berarti script aktif di semua halaman domain `simkah4.kemenag.go.id` — termasuk URL dengan kode unik tiap KUA (misalnya `/8b01cbba-...`). Script otomatis berjalan di KUA manapun selama menggunakan domain yang sama.

---

### 4.4 Indeks Kolom Tabel (jika tabel berbeda)

> Hanya perlu diubah jika tombol **📄 Buat** tidak muncul atau data yang terisi salah.

Cari fungsi `extractRowData` (sekitar **baris 116–124**):

```js
function extractRowData(cells) {
    return {
        noPendaftaran: cells[4]?.textContent.trim() || "",  // kolom ke-5
        noAkta:        cells[5]?.textContent.trim() || "",  // kolom ke-6
        namaSuami:     cells[7]?.textContent.trim() || "",  // kolom ke-8
        namaIstri:     cells[9]?.textContent.trim() || "",  // kolom ke-10
        tanggalAkad:   cells[10]?.textContent.trim() || "", // kolom ke-11
    };
}
```

Angka dalam `cells[N]` adalah **indeks kolom mulai dari 0**. Hitung kolom dari kiri di tabel SIMKAH Anda:

| Kolom ke- | Indeks |
|-----------|--------|
| 1 | 0 |
| 2 | 1 |
| 3 | 2 |
| … | … |
| 5 | 4 |

Sesuaikan angka jika urutan kolom tabel di versi SIMKAH Anda berbeda.

Selain itu, juga sesuaikan baris ini (sekitar **baris 105**):

```js
const cell = cells[11]; // kolom "Upload Dokumentasi Akad"
```

Ganti `11` dengan indeks kolom Upload Dokumentasi Akad di tabel Anda.

---

## 5. FAQ & Troubleshooting

**Q: Tombol 📄 Buat tidak muncul**
> Tunggu beberapa detik setelah halaman selesai dimuat. Jika tetap tidak muncul, periksa apakah URL halaman sesuai dengan `@match` di script.

**Q: Data (nama, tanggal) yang muncul di form salah**
> Indeks kolom mungkin berbeda. Lihat [bagian 4.4](#44-indeks-kolom-tabel-jika-tabel-berbeda).

**Q: Upload otomatis gagal, file malah terunduh**
> Normal jika struktur halaman upload SIMKAH berubah. Upload file yang terunduh secara manual via **Action → Upload Dokumentasi Akad**.

**Q: Ukuran file > 3MB**
> Script otomatis mengompres hingga 3 tahap. Jika masih > 3MB, kompres foto asli Anda terlebih dahulu (gunakan [Squoosh](https://squoosh.app) atau aplikasi serupa).

**Q: Foto di dokumen tampak kecil**
> Gunakan foto dengan orientasi landscape atau berukuran minimal 1200×900px untuk hasil terbaik.

---

## Informasi Script

| | |
|---|---|
| **Nama** | SIMKAH - Lampiran Dokumentasi Akad |
| **Versi** | 1.4.2 |
| **Kompatibel** | Chrome, Firefox, Edge |
| **Requires** | Violentmonkey |
| **URL Target** | `https://simkah4.kemenag.go.id/*` |

---

*Dibuat oleh KUA Pebayuran · Bebas digunakan dan dimodifikasi untuk KUA lain*

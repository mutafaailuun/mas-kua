<template>
  <div class="min-h-screen bg-gray-50 raleway">
    <!-- Hero -->
    <section class="bg-emerald-800 text-white py-16 md:py-24">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-block mb-4">
          <span class="text-6xl md:text-7xl font-extrabold tracking-tight">48</span>
        </div>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Jenis Layanan KUA
        </h1>
        <p class="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto">
          Melayani dengan Hati, Mengabdi untuk Umat
        </p>
      </div>
    </section>

    <!-- Layanan Grid -->
    <section class="py-16 md:py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <!-- Header Card -->
            <div class="bg-emerald-700 text-white px-6 py-5 flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                <Icon :name="category.icon" class="w-5 h-5" />
              </div>
              <h2 class="text-lg font-bold leading-tight">{{ category.title }}</h2>
            </div>

            <!-- List -->
            <div class="p-6">
              <ol class="space-y-3">
                <li
                  v-for="(item, idx) in category.items"
                  :key="idx"
                  class="flex items-start gap-3 text-gray-700"
                >
                  <span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    {{ idx + 1 }}
                  </span>
                  <span class="text-sm leading-relaxed">{{ item }}</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const categories = [
  {
    title: "Nikah, Isbat dan Rujuk",
    icon: "lucide:heart-handshake",
    items: [
      "Pendaftaran Kehendak Nikah",
      "Pemeriksaan Nikah",
      "Surat Ikrar berwakil Wali",
      "Pengumuman Nikah",
      "Pelaksanaan dan Pencatatan Nikah",
      "Penyerahan Buku Nikah",
      "Pelaporan Nikah",
      "Penerbitan Surat Rekomendasi Nikah",
      "Perbaikan data Nikah",
      "Perubahan data Nikah",
      "Legalisasi buku Nikah",
      "Penerbitan Surat Keterangan Status belum menikah",
      "Pendaftaran bukti nikah luar negeri",
      "Pencatatan isbat Nikah",
      "Pencatatan Perjanjian Nikah",
      "Pencatatan pembatalan/perubahan perjanjian nikah",
      "Pencatatan Rujuk",
      "Pengajuan Pembatalan Nikah",
    ],
  },
  {
    title: "Bimbingan dan Penerangan Agama Islam",
    icon: "lucide:book-open",
    items: [
      "Bimbingan dan Penyuluhan Keagamaan",
      "Sosialisasi dan edukasi produk halal",
      "Pencegahan Konflik Sosial berdimensi keagamaan",
    ],
  },
  {
    title: "Tata Usaha dan Administrasi",
    icon: "lucide:clipboard-list",
    items: ["Persuratan", "Kearsipan"],
  },
  {
    title: "Zakat dan Wakaf",
    icon: "lucide:hand-coins",
    items: [
      "Bimbingan Zakat dan Wakaf",
      "Pembuatan AIW/APAIW",
      "Pendaftaran Wakaf",
      "Mutasi harta benda wakaf",
      "Pengurusan AIW/APAIW yang rusak",
      "Surat rekomendasi penggantian nazir",
      "Penerbitan surat pengesahan nazir dan penggantian nazir (penyeragaman SOP)",
    ],
  },
  {
    title: "Kemasjidan",
    icon: "lucide:building-2",
    items: [
      "Penerbitan Id Masjid/Mushola melalui SIMAS",
      "Penerbitan Surat Keterangan Terdaftar Masjid/Mushola",
      "Surat Rekomendasi bantuan",
      "Surat rekomendasi perubahan status mushola menjadi masjid",
      "Perubahan data masjid/mushola",
      "Surat rekomendasi penetapan kepengurusan masjid besar",
    ],
  },
  {
    title: "Bimbingan Perkawinan dan Keluarga Sakinah",
    icon: "lucide:users",
    items: [
      "Bimbingan Perkawinan Pra-Nikah",
      "Bimbingan Keluarga Sakinah",
      "Bimbingan Konseling dan Mediasi Keluarga",
    ],
  },
  {
    title: "Bimbingan dan Penerangan Agama Islam",
    icon: "lucide:landmark",
    items: [
      "Penyediaan data keagamaan dan sarana keagamaan",
      "Surat rekomendasi bantuan keagamaan",
      "Rekomendasi Pendirian majelis ta'lim",
    ],
  },
  {
    title: "Konsultasi Syariah",
    icon: "lucide:scale",
    items: [
      "Konsultasi Hukum islam (Fiqih Ibadah, Hukum Keluarga)",
      "Kalibrasi Arah Kiblat",
    ],
  },
  {
    title: "Fungsi Tambahan (Penugasan Menteri)",
    icon: "lucide:shield-check",
    items: [
      "Deteksi dan cegah dini konflik sosial berdimensi agama",
      "Jaminan produk halal",
    ],
  },
];
</script>

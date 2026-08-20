<template>
  <div class="min-h-screen bg-white">
    <!-- Hero -->
    <section class="bg-emerald-800 text-white py-20 md:py-28">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Profil Organisasi</h1>
        <p class="text-emerald-100 text-lg max-w-2xl mx-auto">
          Kantor Urusan Agama (KUA) Kecamatan Pebayuran
        </p>
      </div>
    </section>

    <!-- Deskripsi -->
    <section class="py-16 md:py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="prose prose-lg mx-auto text-gray-700">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Deskripsi Organisasi</h2>
          <p class="leading-relaxed text-justify">
            KUA Kecamatan Pebayuran berlokasi di Jalan Raya Pebayuran, Kelurahan Kertasari,
            Pebayuran, Kabupaten Bekasi. Kantor Urusan Agama (KUA) Kecamatan Pebayuran adalah
            unit kerja di bawah naungan Kantor Kementerian Agama Kabupaten Bekasi yang bertugas
            melaksanakan sebagian tugas pemerintah di bidang urusan agama Islam di tingkat
            kecamatan. Layanan utamanya meliputi pencatatan nikah dan rujuk, bimbingan keluarga,
            kemasjidan, dan produk halal.
          </p>
        </div>
      </div>
    </section>

    <!-- Visi, Misi, dan Nilai -->
    <section class="py-16 md:py-20 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="grid md:grid-cols-2 gap-12">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Visi</h2>
            <p class="text-gray-700 leading-relaxed">
              Terwujudnya Masyarakat Kec. Pebayuran yang Taat Beragama, Rukun, Cerdas, dan
              Sejahtera Lahir dan Batin.
            </p>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Misi</h2>
            <ol class="list-decimal list-inside space-y-3 text-gray-700">
              <li>Meningkatkan kualitas pelaksanaan pelayanan, pengawasan, pencatatan, pelaporan Nikah dan rujuk.</li>
              <li>Meningkatkan kualitas penyusunan statistik layanan dan bimbingan masyarakat Islam.</li>
              <li>Meningkatkan kualitas pelayanan pengelolaan dokumentasi dan sistem informasi manajemen KUA Kec. Pebayuran.</li>
              <li>Meningkatkan kualitas pelayanan bimbingan keluarga sakinah.</li>
              <li>Meningkatkan kualitas pelayanan bimbingan kemasjidan.</li>
              <li>Meningkatkan kualitas pelayanan bimbingan Hisab Ru'yat dan pembinaan syari'ah.</li>
              <li>Meningkatkan kualitas pelayanan bimbingan dan penerangan agama islam.</li>
              <li>Meningkatkan kualitas pelayanan bimbingan Zakat dan Wakaf.</li>
              <li>Meningkatkan kualitas pelaksanaan ketatausahaan dan kerumahtanggaan KUA Kec. Pebayuran.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- Kepala KUA -->
    <section class="py-16 md:py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
          Kepala KUA Kecamatan Pebayuran
        </h2>

        <div class="relative border-l-4 border-emerald-200 ml-4 md:ml-6 space-y-8">
          <div
            v-for="(item, index) in kepalaKuaList"
            :key="index"
            class="relative pl-8 md:pl-12"
          >
            <span
              class="absolute -left-[11px] top-1.5 h-5 w-5 rounded-full bg-emerald-600 ring-4 ring-white"
            ></span>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 class="text-lg font-semibold text-gray-900">{{ item.nama }}</h3>
              <span class="text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap">
                {{ item.periode }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const kepalaKuaList = [
  { nama: "BAHARUDIN DJAMIL", periode: "1979–1980" },
  { nama: "A. YUNUS, BA", periode: "1980–1983" },
  { nama: "H.M. DASAN", periode: "1983–1984" },
  { nama: "MADRO'I KOSIM", periode: "1984–1990" },
  { nama: "H. SABIH", periode: "1990–1991" },
  { nama: "DRS. H. KHOLID. AS", periode: "1991–1996" },
  { nama: "PUDIN SAEPUDIN, S.AG.", periode: "1996–2000" },
  { nama: "H. MIDA SUHARJA, S. AG.", periode: "2000–2004" },
  { nama: "DEDE SUHONO, S. AG.", periode: "2004–2011" },
  { nama: "DRS. H. AGUS SUJADI", periode: "2011–2016" },
  { nama: "H. ANAS YAZID FATHONI, S.AG.", periode: "2016–2017" },
  { nama: "DRS. H. MA'MUN NAWAWI", periode: "2017–2018" },
  { nama: "DRS. H. BUNYAMIN", periode: "2019–2025" },
  { nama: "DRS. H. MA'MUN NAWAWI", periode: "2025–SEKARANG" },
];
</script>

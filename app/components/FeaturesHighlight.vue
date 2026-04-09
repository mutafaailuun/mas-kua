<script setup>
import { Icon } from "@iconify/vue";
const emit = defineEmits(["scrollToSection"]);

const onButtonClick = (sectionId) => {
  emit("scrollToSection", sectionId);
};
</script>

<template>
  <section class="bg-white py-20 raleway">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">
      <h2 class="text-sm font-bold tracking-wide text-emerald-600 uppercase mb-3">
        Inovasi Layanan
      </h2>
      <h3 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
        Hadir Lebih Dekat dengan Fitur Terbaru Kami
      </h3>
      <p class="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
        Berkomitmen memberikan transparansi dan kemudahan informasi, MAS KUA menghadirkan inovasi digital untuk menjawab kebutuhan Anda akan kecepatan akses jadwal pernikahan dan wawasan keluarga.
      </p>

      <div class="grid md:grid-cols-2 gap-8 text-left">
        <!-- Feature 1: Jadwal Nikah -->
        <div class="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icon icon="lucide:calendar-clock" class="w-24 h-24 text-emerald-900" />
          </div>
          <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <Icon icon="lucide:calendar-clock" class="w-7 h-7" />
          </div>
          <h4 class="text-2xl font-bold text-gray-900 mb-3">Jadwal Nikah Real-Time</h4>
          <p class="text-gray-600 mb-6 leading-relaxed relative z-10">
            Tak perlu lagi datang ke kantor untuk mengecek ketersediaan waktu. Pantau jadwal pelaksanaan akad nikah di seluruh wilayah Kecamatan Pebayuran secara aktual dari layar Anda.
          </p>
          <a @click.prevent="onButtonClick('jadwal')" href="#jadwal" class="inline-flex items-center text-emerald-600 font-bold hover:text-emerald-700 cursor-pointer relative z-10">
            Lihat Jadwal Sekarang <Icon icon="lucide:arrow-right" class="w-5 h-5 ml-1" />
          </a>
        </div>

        <!-- Feature 2: Artikel -->
        <div class="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icon icon="lucide:book-open-text" class="w-24 h-24 text-emerald-900" />
          </div>
          <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <Icon icon="lucide:book-open-text" class="w-7 h-7" />
          </div>
          <h4 class="text-2xl font-bold text-gray-900 mb-3">Portal Artikel & Wawasan</h4>
          <p class="text-gray-600 mb-6 leading-relaxed relative z-10">
            Temukan panduan lengkap persiapan pernikahan, literasi keluarga sakinah, hingga inspirasi membangun rumah tangga idaman melalui sajian artikel pilihan yang diperbarui secara berkala.
          </p>
          <NuxtLink to="/articles" class="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 relative z-10">
            Jelajahi Artikel <Icon icon="lucide:arrow-right" class="w-5 h-5 ml-1" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

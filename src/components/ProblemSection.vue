<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <section class="bg-white py-20 raleway">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">
        Pernah Mengalami Hal Ini?
      </h2>
      <p class="text-gray-600 mb-12 max-w-2xl mx-auto">
        Kami memahami kendala yang sering Anda hadapi. Itulah mengapa kami
        berinovasi.
      </p>
      <div class="grid md:grid-cols-3 gap-8 text-left">
        <div
          class="group bg-gray-50 p-6 rounded-lg shadow-sm hover:bg-red-600 hover:-translate-y-2 transition-all duration-300 cursor-pointer hover:text-white"
        >
          <Icon
            icon="material-symbols:help-center-outline"
            class="text-4xl text-yellow-500 mb-4 group-hover:text-white transition-all duration-300"
          />
          <h3 class="font-semibold text-lg mb-2">Minim Informasi</h3>
          <p
            class="text-gray-600 group-hover:text-white transition-all duration-300"
          >
            Bingung dengan alur, persyaratan, dan dokumen yang harus disiapkan?
          </p>
        </div>
        <div
          class="group bg-gray-50 p-6 rounded-lg shadow-sm hover:bg-red-600 hover:-translate-y-2 transition-all duration-300 cursor-pointer hover:text-white"
        >
          <Icon
            icon="ph:files-duotone"
            class="text-4xl text-red-500 mb-4 group-hover:text-white transition-all duration-300"
          />
          <h3 class="font-semibold text-lg mb-2">Berkas Tidak Lengkap</h3>
          <p
            class="text-gray-600 group-hover:text-white transition-all duration-300"
          >
            Harus bolak-balik ke kantor karena ada berkas yang kurang atau
            salah?
          </p>
        </div>
        <div
          class="group bg-gray-50 p-6 rounded-lg shadow-sm hover:bg-red-600 hover:-translate-y-2 transition-all duration-300 cursor-pointer hover:text-white"
        >
          <Icon
            icon="pepicons-pop:countdown-circle-filled"
            class="text-4xl text-blue-500 mb-4 group-hover:text-white transition-all duration-300"
          />
          <h3 class="font-semibold text-lg mb-2">Waktu Terbuang</h3>
          <p
            class="text-gray-600 group-hover:text-white transition-all duration-300"
          >
            Kehabisan waktu produktif hanya untuk bertanya hal-hal mendasar?
          </p>
        </div>
      </div>
      <p class="mt-12 text-xl text-green-700 font-semibold">
        MAS KUA hadir untuk mengakhiri semua kebingungan itu.
      </p>
    </div>
  </section>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <section class="bg-white py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">
        Pernah Mengalami Hal Ini?
      </h2>
      <p class="text-gray-600 mb-12 max-w-2xl mx-auto">
        Kami memahami kendala yang sering Anda hadapi. Itulah mengapa kami
        berinovasi.
      </p>
      <div class="grid md:grid-cols-3 gap-8 text-left">
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
          <Icon
            icon="material-symbols:help-center-outline"
            class="text-4xl text-yellow-500 mb-4"
          />
          <h3 class="font-semibold text-lg mb-2">Informasi Tidak Jelas</h3>
          <p class="text-gray-600">
            Bingung dengan alur, persyaratan, dan dokumen yang harus disiapkan?
          </p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
          <Icon icon="ph:files-duotone" class="text-4xl text-red-500 mb-4" />
          <h3 class="font-semibold text-lg mb-2">Berkas Tidak Lengkap</h3>
          <p class="text-gray-600">
            Harus bolak-balik ke kantor karena ada berkas yang kurang atau
            salah?
          </p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
          <Icon
            icon="pepicons-pop:countdown-circle-filled"
            class="text-4xl text-blue-500 mb-4"
          />
          <h3 class="font-semibold text-lg mb-2">Waktu Terbuang</h3>
          <p class="text-gray-600">
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

<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <section
    id="kontak"
    class="py-20 bg-gradient-to-r from-green-700 to-green-500 raleway"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold text-white mb-4">
        Masih Ada Pertanyaan Lain?
      </h2>
      <p class="text-green-100 max-w-2xl mx-auto mb-8">
        Jangan ragu untuk menghubungi kami. Tim MAS KUA siap membantu Anda
        mendapatkan informasi yang akurat pada jam kerja.
      </p>
      <a
        href="https://wa.me/6287785587322"
        target="_blank"
        class="inline-flex items-center gap-3 bg-white text-green-700 font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
      >
        <Icon icon="akar-icons:whatsapp-fill" class="w-6 h-6" />
        Hubungi Kami di WhatsApp Sekarang!
      </a>
    </div>
  </section>
</template>

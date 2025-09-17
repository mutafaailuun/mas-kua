<script setup>
import { Icon } from "@iconify/vue";
</script>
<template>
  <section class="bg-gray-50 py-20 raleway">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">
        Solusi Cerdas di Genggaman Anda
      </h2>
      <p class="text-gray-600 mb-12 max-w-3xl mx-auto">
        MAS KUA (Media Aspirasi & Solusi Kantor Urusan Agama) adalah platform
        layanan informasi terpadu yang kami ciptakan untuk memberikan pelayanan
        yang lebih responsif, transparan, dan efisien.
      </p>
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div
          class="group bg-white p-8 rounded-lg shadow-md border-t-4 border-green-600 text-left hover:-translate-y-2 transition-all duration-300 cursor-pointer hover:bg-green-600 hover:text-white"
        >
          <Icon
            icon="icon-park-solid:web-page"
            class="text-4xl text-green-600 mb-4 group-hover:text-white transition-all duration-300"
          />
          <h3 class="text-xl font-bold mb-2">Landing Page (Anda di sini)</h3>
          <p
            class="text-gray-600 group-hover:text-white transition-all duration-300"
          >
            Pusat informasi lengkap yang bisa Anda akses 24 jam. Temukan
            panduan, syarat, dan FAQ secara mandiri.
          </p>
        </div>
        <div
          class="group bg-white p-8 rounded-lg shadow-md border-t-4 border-green-600 text-left hover:-translate-y-2 transition-all duration-300 cursor-pointer hover:bg-green-600 hover:text-white"
        >
          <Icon
            icon="akar-icons:whatsapp-fill"
            class="text-4xl text-green-600 mb-4 group-hover:text-white transition-all duration-300"
          />
          <h3 class="text-xl font-bold mb-2">WhatsApp KUA Pebayuran</h3>
          <p
            class="text-gray-600 group-hover:text-white transition-all duration-300"
          >
            Asisten virtual Anda untuk tanya jawab cepat dan personal pada jam
            kerja.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

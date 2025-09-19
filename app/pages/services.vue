<script setup>
import AccordionItem from "/components/AccordionItem.vue";
import { Icon } from "@iconify/vue";
import { services } from "../data/services.js";
</script>

<template>
  <section
    id="layanan"
    class="py-20 bg-white raleway overflow-x-hidden flex justify-center flex-col"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900">
          Panduan Lengkap Layanan KUA Pebayuran
        </h2>
        <p class="text-gray-600 mt-2 max-w-2xl mx-auto">
          Semua yang perlu Anda ketahui tentang layanan utama kami, disajikan
          secara jelas dan terperinci.
        </p>
      </div>
      <div class="max-w-3xl mx-auto space-y-4">
        <AccordionItem
          v-for="(service, index) in services"
          :key="index"
          :title="service.title"
          :is-html="true"
        >
          {{ service.content }}
        </AccordionItem>
      </div>
    </div>
  </section>
</template>

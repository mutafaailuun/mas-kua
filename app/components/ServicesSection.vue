<script setup>
import AccordionItem from "./AccordionItem.vue";
import { Icon } from "@iconify/vue";
defineProps({
  services: Array,
});
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
          v-for="(service, index) in services.slice(0, 4)"
          :key="index"
          :title="service.title"
          :is-html="true"
        >
          {{ service.content }}
        </AccordionItem>
      </div>
    </div>
    <a
      href="/services"
      class="text-white mx-auto mt-10 bg-green-500 hover:bg-green-600 font-semibold py-3 px-6 rounded-lg transition-colors"
    >
      <button
        class="flex flex-row justify-center items-center gap-2 cursor-pointer"
      >
        <Icon
          icon="tabler:square-rounded-arrow-right-filled"
          width="20"
          height="20"
        />
        <span>Lebih lanjut</span>
      </button></a
    >
  </section>
</template>

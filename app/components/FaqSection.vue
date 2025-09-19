<script setup>
import { Icon } from "@iconify/vue";
import AccordionItem from "./AccordionItem.vue";

defineProps({
  faqs: Array,
});
</script>

<template>
  <section id="faq" class="py-20 bg-gray-50 raleway flex flex-col">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900">
          Yang Sering Ditanyakan (FAQ)
        </h2>
        <p class="text-gray-600 mt-2">
          Jawaban cepat untuk pertanyaan paling umum.
        </p>
      </div>
      <div class="max-w-3xl mx-auto space-y-4">
        <AccordionItem
          v-for="(faq, index) in faqs.slice(0, 4)"
          :key="index"
          :title="faq.question"
        >
          {{ faq.answer }}
        </AccordionItem>
      </div>
    </div>
    <a
      href="/faq"
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

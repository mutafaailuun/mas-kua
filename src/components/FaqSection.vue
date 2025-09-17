<script setup>
import AccordionItem from "./AccordionItem.vue";

defineProps({
  faqs: Array,
});
</script>

<template>
  <section id="faq" class="py-20 bg-gray-50 raleway">
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
          v-for="(faq, index) in faqs"
          :key="index"
          :title="faq.question"
        >
          {{ faq.answer }}
        </AccordionItem>
      </div>
    </div>
  </section>
</template>

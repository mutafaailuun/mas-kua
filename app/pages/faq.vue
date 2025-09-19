<script setup>
import { Icon } from "@iconify/vue";
import AccordionItem from "../components/AccordionItem.vue";
import { faqs } from "../data/faqs.js";
</script>

<template>
  <section id="faq" class="py-5 bg-gray-50 raleway flex flex-col mt-20">
    <div class="py-10 mx-auto px-4 sm:px-6 lg:px-8">
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
          :is-html="true"
        >
          {{ faq.answer }}
        </AccordionItem>
      </div>
    </div>
  </section>
</template>

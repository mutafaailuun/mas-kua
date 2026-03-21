<template>
  <div class="bg-white min-h-screen py-20 pb-32">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <NuxtLink
        to="/faq"
        class="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 mb-8 transition-colors"
      >
        <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
        Kembali ke Daftar FAQ
      </NuxtLink>

      <div
        v-if="faq"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12"
      >
        <h1
          class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 border-b border-gray-100 pb-6"
        >
          {{ faq.question }}
        </h1>
        <div
          class="prose prose-emerald max-w-none prose-ul:my-2 prose-p:my-2 text-gray-700"
          v-html="faq.answer"
        ></div>
      </div>

      <div v-else class="text-center py-20">
        <Icon name="lucide:circle-help" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-gray-900">FAQ tidak ditemukan</h2>
        <p class="text-gray-500 mt-2">Maaf, FAQ yang Anda cari tidak tersedia.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import { faqs } from "~/data/faqs.js";
import { slugify } from "~/utils/slugify";

const route = useRoute();

const faq = computed(() => {
  const currentSlug = String(route.params.slug);
  return faqs.value.find((item) => slugify(item.question) === currentSlug);
});

useHead({
  title: faq.value ? `${faq.value.question} | FAQ KUA` : "FAQ | MasKua",
});
</script>

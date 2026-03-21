<template>
  <div class="bg-white min-h-screen py-20 pb-32">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/layanan" class="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 mb-8 transition-colors">
        <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
        Kembali ke Daftar Layanan
      </NuxtLink>
      
      <div v-if="service" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 border-b border-gray-100 pb-6">{{ service.title }}</h1>
        <div class="prose prose-emerald max-w-none prose-h4:text-xl prose-h5:text-lg prose-ul:my-2 prose-p:my-2 prose-h4:mt-8 prose-h4:mb-4 text-gray-700" v-html="service.content"></div>
      </div>
      
      <div v-else class="text-center py-20">
        <Icon name="lucide:file-question" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-gray-900">Layanan tidak ditemukan</h2>
        <p class="text-gray-500 mt-2">Maaf, layanan yang Anda cari tidak tersedia.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { services } from '~/data/services.js'
import { slugify } from '~/utils/slugify'

const route = useRoute()

// Compute slugs dynamically to match the incoming param
const service = computed(() => {
  const currentSlug = route.params.slug
  return services.value.find(s => slugify(s.title) === currentSlug)
})

useHead({
  title: service.value ? `${service.value.title} | Layanan KUA` : 'Layanan | MasKua'
})
</script>

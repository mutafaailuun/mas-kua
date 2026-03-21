<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
    <div class="relative h-48 w-full shrink-0 overflow-hidden">
      <img 
        v-if="article.thumbnail" 
        :src="article.thumbnail" 
        :alt="article.title" 
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <div v-else class="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-200">
        <Icon name="lucide:image" class="w-12 h-12" />
      </div>
      <div class="absolute top-4 left-4">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white text-emerald-700 shadow-sm">
          {{ article.category || 'Artikel' }}
        </span>
      </div>
    </div>
    
    <div class="p-6 flex flex-col flex-1">
      <div class="flex items-center text-xs text-gray-500 mb-3 space-x-4">
        <span class="flex items-center">
          <Icon name="lucide:calendar" class="w-3 h-3 mr-1" />
          {{ formatDate(article.created_at) }}
        </span>
        <span class="flex items-center" v-if="article.views !== undefined">
          <Icon name="lucide:eye" class="w-3 h-3 mr-1" />
          {{ article.views }} views
        </span>
      </div>
      
      <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
        <NuxtLink :to="`/articles/${article.slug}`" class="hover:text-emerald-600 transition-colors">
          {{ article.title }}
        </NuxtLink>
      </h3>
      
      <div class="text-gray-600 text-sm mb-4 line-clamp-3 prose-sm flex-1" v-html="excerpt"></div>
      
      <div class="mt-auto pt-4 border-t border-gray-100">
        <NuxtLink :to="`/articles/${article.slug}`" class="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 group">
          Baca selengkapnya
          <Icon name="lucide:arrow-right" class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Simple logic to strip HTML tags for the excerpt if it's HTML content
const excerpt = computed(() => {
  if (!props.article.content) return ''
  const stripped = props.article.content.replace(/<[^>]+>/g, '')
  if (stripped.length > 120) {
    return stripped.substring(0, 120) + '...'
  }
  return stripped
})
</script>

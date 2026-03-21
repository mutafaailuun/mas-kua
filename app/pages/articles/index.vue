<template>
  <div class="bg-gray-50 min-h-screen py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Daftar Artikel</h1>
        <p class="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Temukan berbagai inspirasi, tips, dan informasi menarik seputar pernikahan.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-20">
        <Icon name="lucide:loader-2" class="w-12 h-12 text-emerald-600 animate-spin" />
      </div>

      <!-- Articles Grid -->
      <div v-else-if="articles.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <Icon name="lucide:file-x" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-medium text-gray-900">Belum ada artikel</h3>
        <p class="text-gray-500 mt-2">Nantikan artikel-artikel menarik dari kami.</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-16 flex items-center justify-center space-x-2">
        <button 
          @click="changePage(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Sebelumnya
        </button>
        
        <span class="text-sm text-gray-700 mx-4">
          Halaman <span class="font-semibold">{{ currentPage }}</span> dari <span class="font-semibold">{{ totalPages }}</span>
        </span>
        
        <button 
          @click="changePage(currentPage + 1)" 
          :disabled="currentPage === totalPages"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleCard from '~/components/ArticleCard.vue'

const supabase = useSupabaseClient()
const articles = ref<any[]>([])
const loading = ref(true)

// Pagination states
const currentPage = ref(1)
const itemsPerPage = 6
const totalItems = ref(0)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage) || 1)

const fetchArticles = async () => {
  loading.value = true
  
  const from = (currentPage.value - 1) * itemsPerPage
  const to = from + itemsPerPage - 1
  
  try {
    const { data, error, count } = await supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(from, to)
      
    if (error) throw error
    
    articles.value = data || []
    if (count !== null) totalItems.value = count
  } catch (error) {
    console.error('Error fetching articles:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchArticles()
})

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
  fetchArticles()
}

// Meta tags
useHead({
  title: 'Artikel | MasKua',
  meta: [
    { name: 'description', content: 'Kumpulan artikel seputar persiapan pernikahan dan rumah tangga.' }
  ]
})
</script>

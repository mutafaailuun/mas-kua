<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
        <div class="p-3 rounded-lg bg-emerald-50 text-emerald-600 mr-4">
          <Icon name="lucide:file-text" class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Total Articles</p>
          <p class="text-2xl font-semibold text-gray-900">{{ loading ? '...' : totalArticles }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
        <div class="p-3 rounded-lg bg-blue-50 text-blue-600 mr-4">
          <Icon name="lucide:check-circle" class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Published</p>
          <p class="text-2xl font-semibold text-gray-900">{{ loading ? '...' : publishedArticles }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const supabase = useSupabaseClient()
const loading = ref(true)
const totalArticles = ref(0)
const publishedArticles = ref(0)

onMounted(async () => {
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('id, published') as { data: any[], error: any }
    
    if (error) throw error
    
    if (articles) {
      totalArticles.value = articles.length
      publishedArticles.value = articles.filter(a => a.published).length
    }
  } catch (err) {
    console.error('Error fetching dashboard stats', err)
  } finally {
    loading.value = false
  }
})
</script>

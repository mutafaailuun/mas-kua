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

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
        <div class="p-3 rounded-lg bg-pink-50 text-pink-600 mr-4">
          <Icon name="lucide:heart" class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Total Weddings</p>
          <p class="text-2xl font-semibold text-gray-900">{{ loading ? '...' : totalWeddings }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
        <div class="p-3 rounded-lg bg-amber-50 text-amber-600 mr-4">
          <Icon name="lucide:calendar" class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">This Month</p>
          <p class="text-2xl font-semibold text-gray-900">{{ loading ? '...' : weddingsThisMonth }}</p>
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
const totalWeddings = ref(0)
const weddingsThisMonth = ref(0)

onMounted(async () => {
  try {
    const [articlesRes, weddingsRes] = await Promise.all([
      supabase.from('articles').select('id, published'),
      supabase.from('weddings').select('id, wedding_date')
    ])
    
    if (articlesRes.error) throw articlesRes.error
    if (weddingsRes.error) throw weddingsRes.error
    
    if (articlesRes.data) {
      totalArticles.value = articlesRes.data.length
      publishedArticles.value = articlesRes.data.filter(a => a.published).length
    }

    if (weddingsRes.data) {
      totalWeddings.value = weddingsRes.data.length
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()
      
      weddingsThisMonth.value = weddingsRes.data.filter(w => {
        const d = new Date(w.wedding_date)
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear
      }).length
    }
  } catch (err) {
    console.error('Error fetching dashboard stats', err)
  } finally {
    loading.value = false
  }
})
</script>

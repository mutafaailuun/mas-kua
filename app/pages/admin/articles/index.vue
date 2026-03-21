<template>
  <div>
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Articles</h2>
        <p class="mt-1 text-sm text-gray-500">Manage all blog posts and content here.</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <NuxtLink 
          to="/admin/articles/create"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto"
        >
          <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
          Create Article
        </NuxtLink>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div v-if="loading" class="p-8 text-center text-gray-500">
        <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin mx-auto mb-2" />
        Loading articles...
      </div>
      
      <div v-else-if="articles.length === 0" class="p-12 text-center">
        <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Icon name="lucide:file-x" class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-1">No articles yet</h3>
        <p class="text-gray-500 mb-6">Get started by creating your first article.</p>
        <NuxtLink 
          to="/admin/articles/create"
          class="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          <Icon name="lucide:plus" class="w-4 h-4 mr-1" />
          Create Article
        </NuxtLink>
      </div>

      <table v-else class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title / Slug</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            <th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="article in articles" :key="article.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
              <div v-if="article.thumbnail" class="h-10 w-10 shrink-0">
                <img class="h-10 w-10 rounded-md object-cover" :src="article.thumbnail" alt="" />
              </div>
              <div v-else class="h-10 w-10 shrink-0 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                <Icon name="lucide:image" class="w-5 h-5" />
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm font-medium text-gray-900">{{ article.title }}</div>
              <div class="text-sm text-gray-500">/{{ article.slug }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {{ article.category || 'Uncategorized' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="article.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
              >
                {{ article.published ? 'Published' : 'Draft' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ new Date(article.created_at).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <NuxtLink :to="`/admin/articles/${article.id}`" class="text-emerald-600 hover:text-emerald-900 mr-4">Edit</NuxtLink>
              <button @click="deleteArticle(article.id)" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const supabase = useSupabaseClient()
const articles = ref<any[]>([])
const loading = ref(true)

const fetchArticles = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (error) throw error
    articles.value = data || []
  } catch (error) {
    console.error('Error fetching articles:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchArticles()
})

const deleteArticle = async (id: string) => {
  if (!confirm('Are you sure you want to delete this article?')) return
  
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id)
      
    if (error) throw error
    
    // Remove from local list to avoid refetching
    articles.value = articles.value.filter(a => a.id !== id)
  } catch (error) {
    console.error('Error deleting article:', error)
    alert('Failed to delete article')
  }
}
</script>

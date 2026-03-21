<template>
  <div class="bg-white min-h-screen py-16">
    <div v-if="loading" class="flex justify-center py-20">
      <Icon name="lucide:loader-2" class="w-12 h-12 text-emerald-600 animate-spin" />
    </div>

    <div v-else-if="!article" class="text-center py-20">
      <h1 class="text-2xl font-bold text-gray-900">Artikel tidak ditemukan</h1>
      <NuxtLink to="/articles" class="mt-4 inline-block text-emerald-600 hover:text-emerald-700">Kembali ke daftar artikel</NuxtLink>
    </div>

    <article v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <header class="text-center mb-12">
        <div class="mb-4">
          <span class="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800">
            {{ article.category || 'Artikel' }}
          </span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          {{ article.title }}
        </h1>
        <div class="flex items-center justify-center text-gray-500 space-x-6 text-sm">
          <span class="flex items-center">
            <Icon name="lucide:calendar" class="w-4 h-4 mr-2" />
            {{ formatDate(article.created_at) }}
          </span>
          <span v-if="article.views !== undefined" class="flex items-center">
            <Icon name="lucide:eye" class="w-4 h-4 mr-2" />
            {{ article.views }} kali dibaca
          </span>
        </div>
      </header>

      <!-- Featured Image -->
      <div v-if="article.thumbnail" class="mb-12 rounded-2xl overflow-hidden shadow-lg">
        <img :src="article.thumbnail" :alt="article.title" class="w-full h-auto object-cover max-h-[500px]" />
      </div>

      <!-- Content -->
      <div class="prose prose-lg prose-emerald max-w-none mx-auto text-gray-700" v-html="article.content">
      </div>
      
      <!-- Footer / Back -->
      <div class="mt-16 pt-8 border-t border-gray-100 text-center">
        <NuxtLink to="/articles" class="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
          <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
          Kembali ke Semua Artikel
        </NuxtLink>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const supabase = useSupabaseClient()

const article = ref<any>(null)
const loading = ref(true)

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  try {
    const slug = String(route.params.slug)
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      
    if (error) throw error
    
    article.value = data
    
    // Set meta tags for SEO and Social Media once data is loaded
    if (data) {
      useHead({
        title: `${data.title} | MasKua`,
        meta: [
          { name: 'description', content: data.content?.replace(/<[^>]+>/g, '').substring(0, 160) || data.title },
          { property: 'og:title', content: data.title },
          { property: 'og:description', content: data.content?.replace(/<[^>]+>/g, '').substring(0, 160) || data.title },
          { property: 'og:image', content: data.featured_image || data.thumbnail || '' },
          { property: 'og:type', content: 'article' }
        ]
      })
    }
  } catch (error) {
    console.error('Error fetching article:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Basic prose styling for the generated HTML content */
.prose h2 {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  color: #111827;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.prose h3 {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}
.prose p {
  margin-bottom: 1rem;
  line-height: 1.625;
}
.prose ul {
  list-style-type: disc;
  padding-left: 1.25rem;
  margin-bottom: 1rem;
}
.prose li {
  margin-top: 0.5rem;
}
.prose a {
  color: #059669;
}
.prose a:hover {
  text-decoration: underline;
}
</style>

<template>
  <div>
    <div v-if="loadingInit" class="flex justify-center py-12">
      <Icon name="lucide:loader-2" class="w-8 h-8 text-emerald-600 animate-spin" />
    </div>
    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-md max-w-4xl mx-auto">
      {{ error }}
      <div class="mt-4">
        <button @click="router.back()" class="underline">Go Back</button>
      </div>
    </div>
    <AdminArticleEditor 
      v-else 
      :initial-data="initialData" 
      :is-editing="true" 
      @save="handleSave" 
    />
  </div>
</template>

<script setup lang="ts">
import AdminArticleEditor from '~/components/admin/ArticleEditor.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const loadingInit = ref(true)
const initialData = ref<any>(null)
const error = ref('')

onMounted(async () => {
  try {
    const id = String(route.params.id)
    const { data, error: fetchErr } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single()
      
    if (fetchErr) throw fetchErr
    
    if (data) {
      initialData.value = data
    } else {
      error.value = 'Article not found'
    }
  } catch (err: any) {
    console.error('Error fetching article:', err)
    error.value = 'Failed to load article data. It might have been deleted.'
  } finally {
    loadingInit.value = false
  }
})

const handleSave = async (payload: any) => {
  try {
    const id = String(route.params.id)
    
    // Remove id from payload if it exists so we don't try to update the PK
    const { id: _, created_at, updated_at, ...updateData } = payload
    
    updateData.updated_at = new Date().toISOString()
    
    const { error: updateErr } = await supabase
      .from('articles')
      .update(updateData)
      .eq('id', id)
      
    if (updateErr) {
      if (updateErr.code === '23505') {
        alert('Slug must be unique. An article with this slug already exists.')
      } else {
        alert(updateErr.message)
      }
      throw updateErr
    }
    
    router.push('/admin/articles')
  } catch (err) {
    console.error('Error updating article:', err)
  }
}
</script>

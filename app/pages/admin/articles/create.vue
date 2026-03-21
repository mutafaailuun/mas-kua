<template>
  <div>
    <AdminArticleEditor @save="handleSave" />
  </div>
</template>

<script setup lang="ts">
import AdminArticleEditor from '~/components/admin/ArticleEditor.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const supabase = useSupabaseClient()
const router = useRouter()

const handleSave = async (payload: any) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([payload as any])
      .select()
      
    if (error) {
      if (error.code === '23505') {
        alert('Slug must be unique. An article with this slug already exists.')
      } else {
        alert(error.message)
      }
      throw error
    }
    
    router.push('/admin/articles')
  } catch (err) {
    console.error('Error creating article:', err)
  }
}
</script>

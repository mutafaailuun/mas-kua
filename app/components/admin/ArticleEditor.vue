<template>
  <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">{{ isEditing ? 'Edit Article' : 'Create New Article' }}</h2>
      <button 
        @click="router.back()"
        class="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
      >
        &larr; Back to articles
      </button>
    </div>

    <form @submit.prevent="saveArticle" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Title -->
        <div class="col-span-2 md:col-span-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input 
            v-model="form.title" 
            type="text" 
            required
            @input="generateSlug"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="Enter article title"
          />
        </div>

        <!-- Slug -->
        <div class="col-span-2 md:col-span-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input 
            v-model="form.slug" 
            type="text" 
            readonly
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed sm:text-sm"
            placeholder="article-url-slug"
          />
          <p class="mt-1 text-xs text-gray-500">Slug otomatis dibuat dari judul artikel.</p>
        </div>

        <!-- Category -->
        <div class="col-span-2 md:col-span-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input 
            v-model="form.category" 
            type="text" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="e.g. Technology, Lifestyle"
          />
        </div>

        <!-- Published status -->
        <div class="col-span-2 md:col-span-1 flex items-center h-full pt-6">
          <div class="flex items-center">
            <input 
              id="published" 
              v-model="form.published" 
              type="checkbox" 
              class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label for="published" class="ml-2 block text-sm text-gray-900 font-medium font-medium">
              Publish immediately
            </label>
          </div>
        </div>

        <!-- Thumbnail URL -->
        <div class="col-span-2 md:col-span-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image URL</label>
          <input 
            v-model="form.thumbnail" 
            type="text" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="https://example.com/image.jpg"
          />
          <div v-if="form.thumbnail" class="mt-2 text-sm text-gray-500">Preview:</div>
          <img v-if="form.thumbnail" :src="form.thumbnail" class="mt-1 h-20 w-auto rounded object-cover" />
        </div>

        <!-- Featured (OG) Image URL -->
        <div class="col-span-2 md:col-span-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Featured/OG Image URL</label>
          <input 
            v-model="form.featured_image" 
            type="text" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="For Social Media sharing (1200x630)"
          />
          <p class="mt-1 text-xs text-gray-500">If empty, fallback to thumbnail could be used by front-end.</p>
        </div>
      </div>

      <!-- Content -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <ClientOnly>
          <TiptapEditor v-model="form.content" />
          <template #fallback>
            <div class="min-h-[300px] flex items-center justify-center border border-gray-300 rounded-md bg-gray-50 text-gray-400">
              <Icon name="lucide:loader-2" class="w-6 h-6 animate-spin mr-2" />
              Memuat Editor...
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- Errors -->
      <div v-if="errorMsg" class="bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-100">
        {{ errorMsg }}
      </div>

      <!-- Submit button -->
      <div class="flex justify-end border-t border-gray-100 pt-6">
        <button 
          type="button" 
          @click="router.back()"
          class="mr-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          :disabled="loading"
          class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors"
        >
          <Icon v-if="loading" name="lucide:loader-2" class="w-4 h-4 mr-2 inline animate-spin" />
          {{ isEditing ? 'Update Article' : 'Create Article' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import TiptapEditor from './TiptapEditor.vue'
const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['save'])
const router = useRouter()
const loading = ref(false)
const errorMsg = ref('')

const form = ref({
  title: '',
  slug: '',
  category: '',
  thumbnail: '',
  featured_image: '',
  content: '',
  published: false,
})

// Initialize form
onMounted(() => {
  if (props.isEditing && props.initialData) {
    form.value = { ...form.value, ...props.initialData }
  }
})

const generateSlug = () => {
  // Always auto-generate slug according to new requirements
  form.value.slug = form.value.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const saveArticle = async () => {
  loading.value = true
  errorMsg.value = ''
  
  try {
    const payload = { ...form.value }
    emit('save', payload)
  } catch (err: any) {
    errorMsg.value = err.message || 'An error occurred during save'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <div class="mb-8">
      <NuxtLink 
        to="/admin/weddings"
        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors"
      >
        <Icon name="lucide:heart" class="w-4 h-4 mr-1" />
        Kembali ke Daftar
      </NuxtLink>
      <h2 class="mt-4 text-2xl font-bold text-gray-900">Edit Jadwal Pernikahan</h2>
      <p class="mt-1 text-sm text-gray-500">Ubah detail informasi akad nikah di bawah ini.</p>
    </div>

    <div v-if="loading" class="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center text-gray-500">
      <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin mx-auto mb-2" />
      Memuat data...
    </div>

    <form v-else @submit.prevent="updateWedding" class="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Akad</label>
          <input 
            v-model="form.wedding_date"
            type="date"
            required
            class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>

        <!-- Time -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Jam Akad</label>
          <input 
            v-model="form.wedding_time"
            type="time"
            required
            class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>

        <!-- Groom -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Calon Suami</label>
          <input 
            v-model="form.groom_name"
            type="text"
            required
            class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>

        <!-- Bride -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Calon Istri</label>
          <input 
            v-model="form.bride_name"
            type="text"
            required
            class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>
      </div>

      <!-- Location -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Lokasi / Tempat Akad</label>
        <input 
          v-model="form.location"
          type="text"
          required
          class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Officiant -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Penghulu</label>
          <input 
            v-model="form.officiant_name"
            type="text"
            class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status Lokasi</label>
          <select 
            v-model="form.status"
            class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          >
            <option value="Kantor">Kantor (KUA)</option>
            <option value="Luar Kantor">Luar Kantor (Bedol)</option>
          </select>
        </div>
      </div>

      <!-- Notes -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Keterangan Tambahan (Opsional)</label>
        <textarea 
          v-model="form.notes"
          rows="3"
          class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        ></textarea>
      </div>

      <!-- Actions -->
      <div class="pt-4 flex items-center justify-end space-x-4 border-t border-gray-100">
        <button 
          type="button" 
          @click="router.push('/admin/weddings')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Batal
        </button>
        <button 
          type="submit"
          :disabled="submitting"
          class="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
        >
          <Icon v-if="submitting" name="lucide:loader-2" class="w-4 h-4 mr-2 animate-spin" />
          Update Jadwal
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const supabase = useSupabaseClient()
const router = useRouter()
const route = useRoute()
const loading = ref(true)
const submitting = ref(false)

const form = reactive({
  wedding_date: '',
  wedding_time: '',
  groom_name: '',
  bride_name: '',
  location: '',
  officiant_name: '',
  status: '',
  notes: ''
})

const fetchWedding = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('weddings')
      .select('*')
      .eq('id', route.params.id)
      .single()
      
    if (error) throw error
    if (data) {
      Object.assign(form, {
        wedding_date: data.wedding_date,
        wedding_time: data.wedding_time,
        groom_name: data.groom_name,
        bride_name: data.bride_name,
        location: data.location,
        officiant_name: data.officiant_name || '',
        status: data.status,
        notes: data.notes || ''
      })
    }
  } catch (error) {
    console.error('Error fetching wedding:', error)
    alert('Gagal memuat data jadwal')
    router.push('/admin/weddings')
  } finally {
    loading.value = false
  }
}

const updateWedding = async () => {
  submitting.value = true
  try {
    const { error } = await supabase
      .from('weddings')
      .update(form)
      .eq('id', route.params.id)
      
    if (error) throw error
    
    router.push('/admin/weddings')
  } catch (error) {
    console.error('Error updating wedding:', error)
    alert('Gagal mengupdate jadwal')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchWedding()
})
</script>

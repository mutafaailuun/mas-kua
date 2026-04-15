<template>
  <div class="max-w-3xl mx-auto">
    <div class="mb-8">
      <NuxtLink 
        to="/admin/weddings"
        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors"
      >
        <Icon name="lucide:arrow-left" class="w-4 h-4 mr-1" />
        Kembali ke Daftar
      </NuxtLink>
      <h2 class="mt-4 text-2xl font-bold text-gray-900">Tambah Jadwal Pernikahan</h2>
      <p class="mt-1 text-sm text-gray-500">Masukkan detail informasi akad nikah di bawah ini.</p>
    </div>

    <form @submit.prevent="saveWedding" class="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Registration Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Pendaftaran</label>
          <input 
            v-model="form.registration_date"
            type="date"
            class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>
        
        <div class="hidden md:block"></div>

        <!-- Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Akad</label>
          <input 
            v-model="form.wedding_date"
            type="date"
            required
            class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>

        <!-- Time -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Jam Akad</label>
          <input 
            v-model="form.wedding_time"
            type="time"
            required
            class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>

        <!-- Groom -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Calon Suami</label>
          <input 
            v-model="form.groom_name"
            type="text"
            required
            placeholder="Contoh: Ahmad Subagja"
            class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>

        <!-- Bride -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Calon Istri</label>
          <input 
            v-model="form.bride_name"
            type="text"
            required
            placeholder="Contoh: Siti Aminah"
            class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
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
          placeholder="Contoh: KUA Pebayuran atau Alamat Rumah"
          class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Officiant -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Penghulu</label>
          <select 
            v-model="form.officiant_name"
            class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          >
            <option value="">-- Pilih Penghulu --</option>
            <option value="Drs. H. Ma'mun Nawawi">Drs. H. Ma'mun Nawawi</option>
            <option value="Nunu Husnul Hitam, SH.I">Nunu Husnul Hitam, SH.I</option>
            <option value="Jalaludin, S.H">Jalaludin, S.H</option>
          </select>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status Lokasi</label>
          <select 
            v-model="form.status"
            class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
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
          placeholder="Contoh: Wali Hakim, Persyaratan kurang, dll"
          class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
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
          Simpan Jadwal
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
const submitting = ref(false)

const form = reactive({
  registration_date: '',
  wedding_date: '',
  wedding_time: '',
  groom_name: '',
  bride_name: '',
  location: '',
  officiant_name: '',
  status: 'Luar Kantor',
  notes: ''
})

const saveWedding = async () => {
  submitting.value = true
  try {
    const { error } = await supabase
      .from('weddings')
      .insert([form])
      
    if (error) throw error
    
    router.push('/admin/weddings')
  } catch (error) {
    console.error('Error saving wedding:', error)
    alert('Gagal menyimpan jadwal')
  } finally {
    submitting.value = false
  }
}
</script>

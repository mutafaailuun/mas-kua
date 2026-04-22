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

      <!-- Kontak Catin -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            No. HP Catin
            <span class="ml-1 text-xs font-normal text-gray-400">(Opsional, untuk notif WA)</span>
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 text-sm select-none">+62</span>
            <input
              v-model="form.phone_number"
              type="tel"
              placeholder="812 3456 7890"
              class="block w-full pl-12 pr-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email Catin
            <span class="ml-1 text-xs font-normal text-gray-400">(Opsional)</span>
          </label>
          <input
            v-model="form.email"
            type="email"
            placeholder="contoh@email.com"
            class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>
      </div>

      <!-- Notes -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Keterangan Tambahan (Opsional)</label>
        <textarea
          v-model="form.notes"
          rows="3"
          class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        ></textarea>
      </div>

      <!-- Kirim Notifikasi WA -->
      <div v-if="form.phone_number" class="rounded-xl border border-green-200 bg-green-50 p-4">
        <div class="flex items-start gap-3">
          <Icon name="lucide:message-circle" class="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-green-800">Kirim Notifikasi WhatsApp</p>
            <p class="text-xs text-green-600 mt-0.5">Kirim konfirmasi bahwa data catin sudah terdaftar di sistem KUA.</p>
          </div>
          <button
            type="button"
            @click="kirimKonfirmasi"
            :disabled="sendingWa"
            class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60 transition-colors"
          >
            <Icon :name="sendingWa ? 'lucide:loader-2' : 'lucide:send'" class="w-3.5 h-3.5" :class="{ 'animate-spin': sendingWa }" />
            {{ sendingWa ? 'Mengirim...' : 'Kirim Verifikasi' }}
          </button>
        </div>
        <p v-if="waResult" class="mt-2 text-xs" :class="waResult.ok ? 'text-green-700' : 'text-red-600'">
          {{ waResult.message }}
        </p>
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

    <AdminConflictDialog
      :visible="showConflictDialog"
      :officiant-name="form.officiant_name"
      :conflicts="conflictingWeddings"
      @cancel="showConflictDialog = false"
      @confirm="doUpdate"
    />
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
const showConflictDialog = ref(false)
const conflictingWeddings = ref<any[]>([])
const { checkConflict } = useScheduleConflict()

const form = reactive({
  registration_date: '',
  wedding_date: '',
  wedding_time: '',
  groom_name: '',
  bride_name: '',
  location: '',
  officiant_name: '',
  status: '',
  notes: '',
  phone_number: '',
  email: '',
})

const sendingWa = ref(false)
const waResult = ref<{ ok: boolean; message: string } | null>(null)

const kirimKonfirmasi = async () => {
  sendingWa.value = true
  waResult.value = null
  try {
    await $fetch('/api/notify/catin', {
      method: 'POST',
      body: { type: 'konfirmasi', wedding_id: route.params.id },
    })
    waResult.value = { ok: true, message: `✓ Pesan konfirmasi berhasil dikirim ke ${form.phone_number}` }
  } catch (err: any) {
    waResult.value = { ok: false, message: `✗ Gagal kirim: ${err?.data?.message ?? err?.message}` }
  } finally {
    sendingWa.value = false
  }
}

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
        registration_date: data.registration_date || '',
        wedding_date: data.wedding_date,
        wedding_time: data.wedding_time,
        groom_name: data.groom_name,
        bride_name: data.bride_name,
        location: data.location,
        officiant_name: data.officiant_name || '',
        status: data.status,
        notes: data.notes || '',
        phone_number: data.phone_number || '',
        email: data.email || '',
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

const doUpdate = async () => {
  showConflictDialog.value = false
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

const updateWedding = async () => {
  if (form.officiant_name) {
    const conflicts = await checkConflict(
      form.officiant_name,
      form.wedding_date,
      form.wedding_time,
      route.params.id as string
    )
    if (conflicts.length > 0) {
      conflictingWeddings.value = conflicts
      showConflictDialog.value = true
      return
    }
  }
  await doUpdate()
}

onMounted(() => {
  fetchWedding()
})
</script>

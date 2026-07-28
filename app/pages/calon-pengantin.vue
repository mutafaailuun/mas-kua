<script setup>
useSeoMeta({
  title: 'Formulir Calon Pengantin — KUA Pebayuran',
  description: 'Isi formulir calon pengantin untuk memudahkan pelayanan pendaftaran nikah di KUA Kecamatan Pebayuran.',
  ogTitle: 'Formulir Calon Pengantin — KUA Pebayuran',
  ogDescription: 'Isi formulir calon pengantin untuk memudahkan pelayanan pendaftaran nikah di KUA Kecamatan Pebayuran.',
  ogType: 'website',
  ogUrl: 'https://kuapebayuran.com/calon-pengantin',
})

const { sendMessage } = useWhatsApp()
const supabase = useSupabaseClient()

const form = reactive({
  groom_name: '',
  bride_name: '',
  phone_number: '',
  email: '',
})

const submitting = ref(false)
const submitted = ref(false)
const error = ref('')

const handleSubmit = async () => {
  submitting.value = true
  error.value = ''

  try {
    const { error: dbError } = await supabase
      .from('wedding_inquiries')
      .insert({
        groom_name: form.groom_name.trim(),
        bride_name: form.bride_name.trim(),
        phone_number: form.phone_number.trim(),
        email: form.email.trim() || null,
        source: 'website',
      })

    if (dbError) throw dbError

    const message = [
      'Assalamualaikum Wr. Wb.',
      '',
      'Saya ingin mengirimkan data calon pengantin:',
      `*Nama Calon Pengantin Pria:* ${form.groom_name}`,
      `*Nama Calon Pengantin Wanita:* ${form.bride_name}`,
      `*Nomor Telepon:* ${form.phone_number}`,
      ...(form.email ? [`*Email:* ${form.email}`] : []),
      '',
      'Mohon informasi lebih lanjut mengenai pendaftaran nikah. Terima kasih.',
    ].join('\n')

    sendMessage(message)
    submitted.value = true
  } catch (err) {
    console.error('Error saving inquiry:', err)
    error.value = 'Gagal menyimpan data. Silakan coba lagi atau hubungi KUA secara langsung.'
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  form.groom_name = ''
  form.bride_name = ''
  form.phone_number = ''
  form.email = ''
  error.value = ''
  submitted.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-20 pt-32">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <NuxtLink 
          to="/"
          class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <Icon name="lucide:arrow-left" class="w-4 h-4 mr-1" />
          Kembali ke Beranda
        </NuxtLink>
        <h1 class="mt-4 text-3xl font-bold text-gray-900">Formulir Calon Pengantin</h1>
        <p class="mt-2 text-gray-600">
          Lengkapi data calon pengantin di bawah ini. Tim KUA Kecamatan Pebayuran akan menghubungi Anda melalui WhatsApp.
        </p>
      </div>

      <div 
        v-if="submitted" 
        class="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center"
      >
        <div class="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <Icon name="lucide:check" class="w-6 h-6 text-emerald-600" />
        </div>
        <h2 class="text-lg font-semibold text-emerald-800">Data Berhasil Dikirim</h2>
        <p class="mt-2 text-emerald-700">
          Terima kasih telah mengisi formulir. Silakan lanjutkan konfirmasi melalui WhatsApp yang telah terbuka.
        </p>
        <button
          type="button"
          @click="resetForm"
          class="mt-6 inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors"
        >
          <Icon name="lucide:rotate-ccw" class="w-4 h-4 mr-2" />
          Isi Formulir Lagi
        </button>
      </div>

      <form 
        v-else 
        @submit.prevent="handleSubmit" 
        class="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nama Calon Pengantin Pria -->
          <div>
            <label for="groom_name" class="block text-sm font-medium text-gray-700 mb-1">
              Nama Calon Pengantin Pria <span class="text-red-500">*</span>
            </label>
            <input
              id="groom_name"
              v-model="form.groom_name"
              type="text"
              required
              placeholder="Contoh: Ahmad Fauzi"
              class="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
          </div>

          <!-- Nama Calon Pengantin Wanita -->
          <div>
            <label for="bride_name" class="block text-sm font-medium text-gray-700 mb-1">
              Nama Calon Pengantin Wanita <span class="text-red-500">*</span>
            </label>
            <input
              id="bride_name"
              v-model="form.bride_name"
              type="text"
              required
              placeholder="Contoh: Siti Aminah"
              class="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
          </div>
        </div>

        <!-- Nomor Telepon -->
        <div>
          <label for="phone_number" class="block text-sm font-medium text-gray-700 mb-1">
            Nomor Telepon / WhatsApp <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 text-sm select-none">+62</span>
            <input
              id="phone_number"
              v-model="form.phone_number"
              type="tel"
              required
              inputmode="tel"
              placeholder="812 3456 7890"
              class="block w-full pl-14 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
          </div>
          <p class="mt-1.5 text-xs text-gray-500">
            Masukkan nomor WhatsApp aktif untuk konfirmasi dan informasi lebih lanjut.
          </p>
        </div>

        <!-- Email (Opsional) -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email <span class="text-xs font-normal text-gray-400">(Opsional)</span>
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            inputmode="email"
            placeholder="contoh@email.com"
            class="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>

        <!-- Error -->
        <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {{ error }}
        </div>

        <!-- Actions -->
        <div class="pt-4 border-t border-gray-100">
          <button
            type="submit"
            :disabled="submitting"
            class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Icon v-if="submitting" name="lucide:loader-2" class="w-5 h-5 mr-2 animate-spin" />
            <Icon v-else name="lucide:send" class="w-5 h-5 mr-2" />
            {{ submitting ? 'Mengirim...' : 'Kirim via WhatsApp' }}
          </button>
        </div>

        <p class="text-xs text-center text-gray-500">
          Dengan mengirim formulir ini, Anda menyetujui data di atas digunakan untuk keperluan pelayanan KUA.
        </p>
      </form>
    </div>
  </div>
</template>

<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Surat Menyurat</h2>
      <p class="mt-1 text-sm text-gray-500">Pilih template surat, isi form, lalu cetak atau unduh hasilnya.</p>
    </div>

    <!-- Template Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <!-- Surat Keterangan Ralat -->
      <NuxtLink
        to="/admin/surat/ralat"
        class="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all p-6 flex flex-col gap-4"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-100 transition-colors">
            <Icon name="lucide:file-edit" class="w-7 h-7" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">Surat Keterangan Ralat</h3>
            <p class="text-xs text-gray-500 mt-0.5">Koreksi data dalam buku nikah</p>
          </div>
        </div>
        <p class="text-sm text-gray-600 leading-relaxed">
          Menerangkan perbedaan antara data yang tertulis dalam kutipan Akta Nikah dengan data yang sebenarnya, dilengkapi dokumen pendukung.
        </p>
        <div class="mt-auto flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
          Buat Surat
          <Icon name="lucide:arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </NuxtLink>

      <!-- Surat Keterangan Umum -->
      <NuxtLink
        to="/admin/surat/umum"
        class="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all p-6 flex flex-col gap-4"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
            <Icon name="lucide:file-text" class="w-7 h-7" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">Surat Keterangan Umum</h3>
            <p class="text-xs text-gray-500 mt-0.5">Berbagai surat keterangan (Kepolisian, BPJS, dsb.)</p>
          </div>
        </div>
        <p class="text-sm text-gray-600 leading-relaxed">
          Template surat keterangan umum untuk berbagai keperluan seperti laporan kehilangan, pendaftaran BPJS, atau keterangan status pernikahan.
        </p>
        <div class="mt-auto flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
          Buat Surat
          <Icon name="lucide:arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </NuxtLink>

    </div>

    <!-- ── Log Surat Keluar ── -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Log Surat Keluar</h3>
          <p class="text-sm text-gray-500 mt-0.5">Otomatis tercatat setiap kali surat dicetak.</p>
        </div>
        <button
          @click="fetchSurat"
          class="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <Icon name="lucide:refresh-cw" class="w-4 h-4 mr-1" :class="{ 'animate-spin': loading }" />
          Refresh
        </button>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center py-16 text-gray-400">
          <Icon name="lucide:loader-2" class="w-5 h-5 animate-spin mr-2" />
          Memuat data...
        </div>

        <!-- Empty state -->
        <div v-else-if="suratList.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-400">
          <Icon name="lucide:inbox" class="w-10 h-10 mb-3 text-gray-300" />
          <p class="text-sm">Belum ada surat yang dicetak.</p>
          <p class="text-xs mt-1 text-gray-300">Surat akan muncul di sini setelah dicetak.</p>
        </div>

        <!-- Table -->
        <table v-else class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50 text-left">
              <th class="px-5 py-3 font-medium text-gray-500 w-10">No.</th>
              <th class="px-5 py-3 font-medium text-gray-500">Nomor Surat</th>
              <th class="px-5 py-3 font-medium text-gray-500 w-36">Tanggal</th>
              <th class="px-5 py-3 font-medium text-gray-500">Perihal</th>
              <th class="px-5 py-3 font-medium text-gray-500">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(surat, i) in suratList"
              :key="surat.id"
              class="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <td class="px-5 py-3 text-gray-400 tabular-nums">{{ i + 1 }}</td>
              <td class="px-5 py-3 font-mono text-xs text-gray-700">{{ surat.nomor_surat }}</td>
              <td class="px-5 py-3 text-gray-600 whitespace-nowrap">
                {{ surat.tanggal_surat ? formatTanggal(surat.tanggal_surat) : '—' }}
              </td>
              <td class="px-5 py-3 text-gray-800">{{ surat.perihal }}</td>
              <td class="px-5 py-3 text-gray-500">{{ surat.keterangan || '—' }}</td>
            </tr>
          </tbody>
        </table>
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

interface SuratKeluar {
  id: string
  nomor_surat: string
  tanggal_surat: string | null
  jenis_surat: string
  perihal: string
  keterangan: string | null
  created_at: string
}

const suratList = ref<SuratKeluar[]>([])
const loading = ref(true)

const fetchSurat = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('surat_keluar')
      .select('*')
      .order('tanggal_surat', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) throw error
    suratList.value = (data as SuratKeluar[]) ?? []
  } catch (e) {
    console.error('Gagal memuat surat keluar:', e)
  } finally {
    loading.value = false
  }
}

const formatTanggal = (raw: string) => {
  const d = new Date(raw + 'T00:00:00')
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

onMounted(fetchSurat)
</script>

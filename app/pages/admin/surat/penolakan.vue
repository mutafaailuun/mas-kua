<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <NuxtLink to="/admin/surat"
        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">
        <Icon name="lucide:arrow-left" class="w-4 h-4 mr-1" />
        Kembali ke Surat Menyurat
      </NuxtLink>
      <h2 class="mt-3 text-2xl font-bold text-gray-900">Formulir Penolakan Kehendak Nikah Rujuk</h2>
      <p class="mt-1 text-sm text-gray-500">Model N7 — Isi form di bawah ini, preview akan muncul secara otomatis.</p>

      <!-- Nomor surat terdahulu -->
      <div v-if="lastSurat" class="mt-3 inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2 text-sm">
        <Icon name="lucide:history" class="w-4 h-4 shrink-0 text-amber-500" />
        <span class="text-amber-700">Surat penolakan terakhir:</span>
        <span class="font-mono font-semibold text-amber-900">{{ lastSurat.nomor_surat }}</span>
        <span class="text-amber-500">·</span>
        <span class="text-amber-600">{{ lastSurat.perihal }}</span>
        <span v-if="lastSurat.tanggal_surat" class="text-amber-500 text-xs">({{ formatTanggalShort(lastSurat.tanggal_surat) }})</span>
      </div>
      <div v-else-if="lastSuratLoading" class="mt-3 inline-flex items-center gap-2 text-sm text-gray-400">
        <Icon name="lucide:loader-2" class="w-3.5 h-3.5 animate-spin" />
        Memuat nomor surat terdahulu...
      </div>
    </div>

    <div class="flex gap-8 items-start">

      <!-- ─── FORM PANEL ─── -->
      <div class="w-full lg:w-[420px] shrink-0 space-y-5">

        <!-- Identitas Surat -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Identitas Surat</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Urut Surat</label>
            <div class="flex items-center gap-2">
              <input v-model="form.nomor_urut" type="number" min="1" placeholder="001"
                class="w-24 px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm text-center font-mono" />
              <span class="text-sm text-gray-400 font-mono truncate">/KUA.10.16.13/PW.01/{{ bulanTahunNomor }}</span>
            </div>
            <p class="mt-1 text-xs text-gray-400">Nomor lengkap: <span class="font-mono text-gray-600">{{ nomorSurat }}</span></p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Surat</label>
              <input v-model="form.tanggal_raw" type="date"
                class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
              <input v-model="form.lokasi" type="text" placeholder="Pebayuran"
                class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Lampiran</label>
            <input v-model="form.lampiran" type="text" placeholder="—"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kepala / Penanda Tangan</label>
            <select v-model="form.kepala"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
              <option value="Drs. H. Ma'mun Nawawi">Drs. H. Ma'mun Nawawi</option>
              <option value="Nunu Husnul Hitam, SH.I">Nunu Husnul Hitam, SH.I</option>
              <option value="Jalaludin, S.H">Jalaludin, S.H</option>
            </select>
          </div>
        </div>

        <!-- Penerima -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Penerima</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Calon Pengantin/Wali</label>
            <input v-model="form.nama_penerima" type="text" placeholder="AHMAD FAUZI"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <input v-model="form.alamat_penerima" type="text" placeholder="Kp. Pebayuran, RT/RW..."
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>
        </div>

        <!-- Data Calon Pasangan -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Data Permohonan</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Calon (Pihak 1)</label>
            <input v-model="form.nama_catin" type="text" placeholder="BUDI SANTOSO"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Calon (Pihak 2)</label>
            <input v-model="form.nama_pasangan" type="text" placeholder="SITI AMINAH"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>
        </div>

        <!-- Pilihan -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Keputusan</h3>

          <div class="space-y-3">
            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" v-model="form.pilihan_dapat"
                class="mt-0.5 h-4 w-4 rounded text-emerald-600 border-gray-300 focus:ring-emerald-500" />
              <span class="text-sm text-gray-700">Pernikahan <strong>dapat dilaksanakan</strong> dengan melengkapi persyaratan</span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" v-model="form.pilihan_tolak"
                class="mt-0.5 h-4 w-4 rounded text-red-500 border-gray-300 focus:ring-red-500" />
              <span class="text-sm text-gray-700">Pernikahan <strong>tidak dapat dilaksanakan (ditolak)</strong></span>
            </label>
          </div>

          <!-- Syarat Dapat -->
          <div v-if="form.pilihan_dapat" class="space-y-3 pt-2 border-t border-gray-100">
            <p class="text-xs text-gray-500">Persyaratan yang perlu dilengkapi:</p>
            <div v-for="(_, i) in form.syarat_dapat" :key="'dapat-'+i">
              <label class="block text-xs font-medium text-gray-600 mb-1">Syarat {{ i + 1 }}</label>
              <input v-model="form.syarat_dapat[i]" type="text" placeholder="Contoh: Melengkapi KTP"
                class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
            </div>
          </div>

          <!-- Alasan Tolak -->
          <div v-if="form.pilihan_tolak" class="space-y-3 pt-2 border-t border-gray-100">
            <p class="text-xs text-gray-500">Persyaratan yang tidak dilengkapi:</p>
            <div v-for="(_, i) in form.syarat_tolak" :key="'tolak-'+i">
              <label class="block text-xs font-medium text-gray-600 mb-1">Alasan {{ i + 1 }}</label>
              <input v-model="form.syarat_tolak[i]" type="text" placeholder="Contoh: Belum cukup umur"
                class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
            </div>
          </div>
        </div>

        <!-- Cetak -->
        <button @click="printSurat"
          class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors">
          <Icon name="lucide:printer" class="w-4 h-4 mr-2" />
          Cetak / Unduh Surat
        </button>
      </div>

      <!-- ─── PREVIEW PANEL ─── -->
      <div class="hidden lg:block flex-1 min-w-0">
        <div class="sticky top-8">
          <div class="flex items-center justify-between mb-3">
            <p class="text-sm font-medium text-gray-500">Preview Surat</p>
            <button @click="printSurat"
              class="inline-flex items-center text-xs font-medium text-emerald-600 hover:text-emerald-700">
              <Icon name="lucide:printer" class="w-3.5 h-3.5 mr-1" />
              Cetak
            </button>
          </div>
          <div class="rounded-xl border border-gray-200 shadow-lg bg-gray-100 p-4">
            <div style="width: 492px; height: 696px; overflow: hidden; margin: 0 auto;">
              <div style="width: 794px; transform: scale(0.62); transform-origin: top left;">
                <AdminSuratPenolakanPreview
                  :form="previewForm"
                  :nomor-surat="nomorSurat"
                  :tanggal-formatted="tanggalFormatted"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Hidden print target -->
    <div id="surat-print-content" ref="printTargetRef" aria-hidden="true">
      <AdminSuratPenolakanPreview
        :form="previewForm"
        :nomor-surat="nomorSurat"
        :tanggal-formatted="tanggalFormatted"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRaw } from 'vue'
import AdminSuratPenolakanPreview from '~/components/admin/SuratPenolakanPreview.vue'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const form = reactive({
  nomor_urut: '',
  tanggal_raw: '',
  lokasi: 'Pebayuran',
  kepala: "Drs. H. Ma'mun Nawawi",
  lampiran: '',
  nama_penerima: '',
  alamat_penerima: '',
  nama_catin: '',
  nama_pasangan: '',
  pilihan_dapat: false,
  pilihan_tolak: false,
  syarat_dapat: ['', '', ''],
  syarat_tolak: ['', '', ''],
})

const tanggalRef = computed(() => {
  if (form.tanggal_raw) return new Date(form.tanggal_raw + 'T00:00:00')
  return new Date()
})

const bulanTahunNomor = computed(() => {
  const d = tanggalRef.value
  const bulan = String(d.getMonth() + 1).padStart(2, '0')
  return `${bulan}/${d.getFullYear()}`
})

const nomorSurat = computed(() => {
  const nomor = form.nomor_urut ? String(form.nomor_urut).padStart(3, '0') : '___'
  return `${nomor}/KUA.10.16.13/PW.01/${bulanTahunNomor.value}`
})

const tanggalFormatted = computed(() => {
  if (!form.tanggal_raw) return '_______________'
  return new Date(form.tanggal_raw + 'T00:00:00').toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
})

const previewForm = computed(() => ({
  lokasi: form.lokasi,
  kepala: form.kepala,
  lampiran: form.lampiran,
  nama_penerima: form.nama_penerima,
  alamat_penerima: form.alamat_penerima,
  nama_catin: form.nama_catin,
  nama_pasangan: form.nama_pasangan,
  pilihan_dapat: form.pilihan_dapat,
  pilihan_tolak: form.pilihan_tolak,
  syarat_dapat: [...form.syarat_dapat],
  syarat_tolak: [...form.syarat_tolak],
}))

const supabase = useSupabaseClient()
const printTargetRef = ref<HTMLElement | null>(null)

const lastSurat = ref<{ nomor_surat: string; perihal: string; tanggal_surat: string | null } | null>(null)
const lastSuratLoading = ref(true)

const formatTanggalShort = (raw: string) =>
  new Date(raw + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

onMounted(async () => {
  try {
    const { data } = await supabase
      .from('surat_keluar')
      .select('nomor_surat, perihal, tanggal_surat')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    lastSurat.value = data ?? null
  } catch {
    lastSurat.value = null
  } finally {
    lastSuratLoading.value = false
  }
})

const saveSuratKeluar = async () => {
  if (!form.nomor_urut) return
  const pihak = [form.nama_catin, form.nama_pasangan].filter(Boolean).join(' / ')
  await supabase.from('surat_keluar').upsert({
    nomor_surat: nomorSurat.value,
    tanggal_surat: form.tanggal_raw || null,
    jenis_surat: 'penolakan_nikah',
    perihal: pihak ? `Penolakan Nikah/Rujuk a.n. ${pihak}` : 'Penolakan Kehendak Nikah/Rujuk',
    form_data: toRaw(form),
  }, { onConflict: 'nomor_surat' })
}

const printSurat = async () => {
  const printContent = printTargetRef.value?.innerHTML
  if (!printContent) return

  await saveSuratKeluar()

  const printWindow = window.open('', '_blank', 'width=1024,height=768')
  if (!printWindow) return

  printWindow.document.write(`
    <!doctype html>
    <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>Formulir Penolakan Kehendak Nikah Rujuk</title>
        <style>
          @page { size: A4 portrait; margin: 0; }
          html, body { margin: 0; padding: 0; background: #fff; }
          body { font-family: "Times New Roman", Times, serif; }
          .surat-paper { width: 794px !important; min-height: 1123px !important; margin: 0 auto; box-sizing: border-box; }
        </style>
      </head>
      <body>${printContent}</body>
    </html>
  `)
  printWindow.document.close()
  printWindow.onload = () => {
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }
}
</script>

<style>
#surat-print-content {
  position: fixed;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
}
</style>

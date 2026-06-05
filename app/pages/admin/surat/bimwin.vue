<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <NuxtLink to="/admin/surat"
        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">
        <Icon name="lucide:arrow-left" class="w-4 h-4 mr-1" />
        Kembali ke Surat Menyurat
      </NuxtLink>
      <h2 class="mt-3 text-2xl font-bold text-gray-900">Bimbingan Perkawinan (BIMWIN)</h2>
      <p class="mt-1 text-sm text-gray-500">Isi form, lalu cetak undangan, daftar hadir, atau tanda terima sertifikat.</p>
    </div>

    <div class="flex gap-8 items-start">

      <!-- ── FORM PANEL ── -->
      <div class="w-full lg:w-[440px] shrink-0 space-y-5">

        <!-- Identitas -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Identitas Surat & Acara</h3>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Urut Surat</label>
              <div class="flex items-center gap-1.5">
                <input v-model="form.nomor_urut" type="number" min="1" placeholder="001"
                  class="w-20 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-center font-mono" />
                <span class="text-xs text-gray-400 font-mono truncate">/KUA../PW.01/{{ bulanTahunNomor }}</span>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Surat</label>
              <input v-model="form.tanggal_raw" type="date"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal BIMWIN</label>
              <input v-model="form.tanggal_bimwin_raw" type="date"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Jam BIMWIN</label>
              <input v-model="form.jam_bimwin" type="text" placeholder="09.30"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
          </div>

          <!-- Nama Tujuan Undangan -->
          <div class="pt-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Tujuan Undangan</label>
            <div class="space-y-2">
              <div>
                <label class="block text-xs text-gray-500 mb-0.5">Catin Pria</label>
                <input v-model="form.nama_catin_pria" type="text" placeholder="Nama Calon Suami"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 uppercase" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-0.5">Catin Wanita</label>
                <input v-model="form.nama_catin_wanita" type="text" placeholder="Nama Calon Isteri"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 uppercase" />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kepala / Penanda Tangan</label>
            <select v-model="form.kepala" @change="autoNip"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400">
              <option value="Drs. H. Ma'mun Nawawi">Drs. H. Ma'mun Nawawi</option>
              <option value="Nunu Husnul Hitam, SH.I">Nunu Husnul Hitam, SH.I</option>
              <option value="Jalaludin, S.H">Jalaludin, S.H</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">NIP</label>
            <input v-model="form.nip" type="text" placeholder="196705051998031001"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
              <input v-model="form.lokasi" type="text" placeholder="Pebayuran"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Jumlah Baris Tabel</label>
              <input v-model.number="form.jumlah_baris" type="number" min="5" max="100" placeholder="15"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-center" />
              <p class="text-xs text-gray-400 mt-0.5">Termasuk baris kosong (5–100)</p>
            </div>
          </div>
        </div>

        <!-- Daftar Pasangan -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Daftar Pasangan
              <span class="ml-1 text-xs font-normal text-gray-400 normal-case">(maks. 100)</span>
            </h3>
            <button v-if="pasangan.length < 100" @click="tambahPasangan"
              class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
              <Icon name="lucide:plus" class="w-3.5 h-3.5" />
              Tambah
            </button>
          </div>

          <div v-if="pasangan.length === 0" class="text-center py-6 text-gray-400 text-sm">
            Belum ada pasangan. Klik Tambah untuk memulai.
          </div>

          <div v-for="(p, i) in pasangan" :key="i"
            class="rounded-lg border border-gray-100 bg-gray-50 p-3 space-y-2.5">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-semibold text-gray-500">Pasangan {{ i + 1 }}</span>
              <button @click="hapusPasangan(i)"
                class="p-1 text-gray-300 hover:text-red-500 transition-colors rounded">
                <Icon name="lucide:x" class="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Nama Calon Suami</label>
              <input v-model="p.nama_suami" type="text" placeholder="NAMA SUAMI"
                class="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-400 uppercase" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Nama Calon Isteri</label>
              <input v-model="p.nama_istri" type="text" placeholder="NAMA ISTERI"
                class="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-400 uppercase" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Tanggal Nikah</label>
              <input v-model="p.tanggal_nikah" type="date"
                class="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-400" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Alamat <span class="text-gray-400 font-normal">(untuk tanda terima)</span></label>
              <input v-model="p.alamat" type="text" placeholder="Kp. ..."
                class="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-400" />
            </div>
          </div>
        </div>

        <!-- Tombol Cetak -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Cetak Dokumen</h3>

          <button @click="printUndangan"
            class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
            <Icon name="lucide:mail" class="w-4 h-4" />
            Cetak Undangan
          </button>

          <button @click="printDaftarHadir"
            class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors">
            <Icon name="lucide:clipboard-list" class="w-4 h-4" />
            Cetak Daftar Hadir
          </button>

          <button @click="printSertifikat"
            class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors">
            <Icon name="lucide:award" class="w-4 h-4" />
            Cetak Tanda Terima Sertifikat
            <span class="text-xs font-normal opacity-80">(landscape)</span>
          </button>
        </div>

      </div>

      <!-- ── PREVIEW PANEL ── -->
      <div class="hidden lg:block flex-1 min-w-0">
        <div class="sticky top-8">

          <!-- Tab selector -->
          <div class="flex gap-1 mb-3 bg-gray-100 rounded-lg p-1 w-fit">
            <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key as 'undangan' | 'daftar_hadir' | 'sertifikat'"
              class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
              :class="activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'">
              {{ tab.label }}
            </button>
          </div>

          <!-- Undangan preview -->
          <template v-if="activeTab === 'undangan'">
            <p class="text-sm font-medium text-gray-500 mb-2">
              Preview Undangan
              <span class="text-xs font-normal text-gray-400 ml-1">— nama dikosongkan, cetak 1x lalu fotokopi</span>
            </p>
            <div class="rounded-xl border border-gray-200 shadow-lg bg-gray-100 p-4">
              <div style="width: 492px; height: 696px; overflow: hidden; margin: 0 auto;">
                <div style="width: 794px; transform: scale(0.62); transform-origin: top left;">
                  <AdminBimwinUndanganPreview
                    :form="form"
                    :nomor-surat="nomorSurat"
                    :tanggal-surat-formatted="tanggalSuratFormatted"
                  />
                </div>
              </div>
            </div>
          </template>

          <!-- Daftar hadir preview -->
          <template v-else-if="activeTab === 'daftar_hadir'">
            <p class="text-sm font-medium text-gray-500 mb-2">Preview Daftar Hadir</p>
            <div class="rounded-xl border border-gray-200 shadow-lg bg-gray-100 p-4">
              <div style="width: 492px; height: 696px; overflow: hidden; margin: 0 auto;">
                <div style="width: 794px; transform: scale(0.62); transform-origin: top left;">
                  <AdminBimwinDaftarHadirPreview :form="form" :pasangan="pasangan" :jumlah-baris="jumlahBaris" />
                </div>
              </div>
            </div>
          </template>

          <!-- Sertifikat preview (landscape) -->
          <template v-else>
            <p class="text-sm font-medium text-gray-500 mb-2">Preview Tanda Terima Sertifikat <span class="text-xs text-gray-400">(landscape)</span></p>
            <div class="rounded-xl border border-gray-200 shadow-lg bg-gray-100 p-4">
              <div style="width: 492px; height: 349px; overflow: hidden; margin: 0 auto;">
                <div style="width: 1123px; transform: scale(0.438); transform-origin: top left;">
                  <AdminBimwinSertifikatPreview :form="form" :pasangan="pasangan" :jumlah-baris="jumlahBaris" />
                </div>
              </div>
            </div>
          </template>

        </div>
      </div>

    </div>

    <!-- Hidden print targets -->
    <div id="bimwin-print-undangan" ref="undanganPrintRef" aria-hidden="true">
      <AdminBimwinUndanganPreview
        :form="form"
        :nomor-surat="nomorSurat"
        :tanggal-surat-formatted="tanggalSuratFormatted"
      />
    </div>
    <div id="bimwin-print-daftar" ref="daftarPrintRef" aria-hidden="true">
      <AdminBimwinDaftarHadirPreview :form="form" :pasangan="pasangan" :jumlah-baris="jumlahBaris" />
    </div>
    <div id="bimwin-print-sertifikat" ref="sertifikatPrintRef" aria-hidden="true">
      <AdminBimwinSertifikatPreview :form="form" :pasangan="pasangan" :jumlah-baris="jumlahBaris" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminBimwinUndanganPreview from '~/components/admin/BimwinUndanganPreview.vue'
import AdminBimwinDaftarHadirPreview from '~/components/admin/BimwinDaftarHadirPreview.vue'
import AdminBimwinSertifikatPreview from '~/components/admin/BimwinSertifikatPreview.vue'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const NIP_MAP: Record<string, string> = {
  "Drs. H. Ma'mun Nawawi": '196705051998031001',
  "Nunu Husnul Hitam, SH.I": '',
  "Jalaludin, S.H": '',
}

const form = reactive({
  nomor_urut: '',
  tanggal_raw: new Date().toISOString().slice(0, 10),
  tanggal_bimwin_raw: '',
  jam_bimwin: '09.30',
  lokasi: 'Pebayuran',
  kepala: "Drs. H. Ma'mun Nawawi",
  nip: '196705051998031001',
  jumlah_baris: 15,
  nama_catin_pria: '',
  nama_catin_wanita: '',
})

const pasangan = reactive<Array<{ nama_suami: string; nama_istri: string; tanggal_nikah: string; alamat: string }>>([])

const tabs = [
  { key: 'undangan', label: 'Undangan' },
  { key: 'daftar_hadir', label: 'Daftar Hadir' },
  { key: 'sertifikat', label: 'Tanda Terima' },
]
const activeTab = ref<'undangan' | 'daftar_hadir' | 'sertifikat'>('undangan')
const previewIdx = ref(0)
const undanganPrintRef = ref<HTMLElement | null>(null)
const daftarPrintRef = ref<HTMLElement | null>(null)
const sertifikatPrintRef = ref<HTMLElement | null>(null)

// ── Computed ────────────────────────────────────────────────────────────────
const tanggalRef = computed(() => {
  if (form.tanggal_raw) return new Date(form.tanggal_raw + 'T00:00:00')
  return new Date()
})

const bulanTahunNomor = computed(() => {
  const d = tanggalRef.value
  const bulan = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][d.getMonth()]
  return `${bulan}/${d.getFullYear()}`
})

const nomorSurat = computed(() => {
  const n = form.nomor_urut ? String(form.nomor_urut).padStart(3, '0') : '___'
  return `${n}/KUA.10.16.13/PW.01/${bulanTahunNomor.value}`
})

const tanggalSuratFormatted = computed(() => {
  if (!form.tanggal_raw) return '_______________'
  return new Date(form.tanggal_raw + 'T00:00:00').toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
})

// ── Methods ──────────────────────────────────────────────────────────────────
const autoNip = () => { form.nip = NIP_MAP[form.kepala] ?? '' }

const jumlahBaris = computed(() => Math.min(100, Math.max(5, form.jumlah_baris || 15)))

const tambahPasangan = () => {
  if (pasangan.length >= 100) return
  pasangan.push({ nama_suami: '', nama_istri: '', tanggal_nikah: '', alamat: '' })
}

const hapusPasangan = (i: number) => {
  pasangan.splice(i, 1)
  if (previewIdx.value >= pasangan.length) previewIdx.value = Math.max(0, pasangan.length - 1)
}

const openPrintWindow = (html: string, landscape = false) => {
  const w = window.open('', '_blank', 'width=1200,height=900')
  if (!w) return
  const size = landscape ? 'A4 landscape' : 'A4 portrait'
  w.document.write(`<!doctype html><html lang="id"><head><meta charset="UTF-8">
    <title>BIMWIN</title>
    <style>
      @page { size: ${size}; margin: 0; }
      html, body { margin: 0; padding: 0; background: #fff; }
      body { font-family: "Times New Roman", Times, serif; }
      .page-break { page-break-after: always; }
    </style>
  </head><body>${html}</body></html>`)
  w.document.close()
  w.onload = () => { w.focus(); w.print(); w.close() }
}

const printUndangan = () => {
  const html = undanganPrintRef.value?.innerHTML
  if (!html) return
  console.log(`[Cetak Undangan BIMWIN] ${nomorSurat.value}`)
  console.log(`  Catin Pria  : ${form.nama_catin_pria || '(kosong)'}`)
  console.log(`  Catin Wanita: ${form.nama_catin_wanita || '(kosong)'}`)
  openPrintWindow(html, false)
}

const printDaftarHadir = () => {
  const html = daftarPrintRef.value?.innerHTML
  if (!html) return
  openPrintWindow(html, false)
}

const printSertifikat = () => {
  const html = sertifikatPrintRef.value?.innerHTML
  if (!html) return
  openPrintWindow(html, true)
}
</script>

<style>
#bimwin-print-undangan,
#bimwin-print-daftar,
#bimwin-print-sertifikat {
  position: fixed;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
}
</style>

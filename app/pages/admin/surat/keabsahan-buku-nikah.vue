<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <NuxtLink
        to="/admin/surat"
        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors"
      >
        <Icon name="lucide:arrow-left" class="w-4 h-4 mr-1" />
        Kembali ke Surat Menyurat
      </NuxtLink>
      <h2 class="mt-3 text-2xl font-bold text-gray-900">Surat Permohonan Keabsahan Buku Nikah</h2>
      <p class="mt-1 text-sm text-gray-500">Isi form di bawah ini, preview surat akan muncul secara otomatis.</p>
    </div>

    <div class="flex gap-8 items-start">

      <!-- ─── FORM PANEL ─── -->
      <div class="w-full lg:w-[420px] shrink-0 space-y-5">

        <!-- Identitas Pemohon -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Identitas Pemohon</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Pemohon</label>
            <input v-model="form.nama" type="text" placeholder="PRIMAWATI"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tempat / Tgl. Lahir</label>
            <input v-model="form.ttl" type="text" placeholder="Jakarta, 17-10-1990"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
            <input v-model="form.pekerjaan" type="text" placeholder="Karyawan Swasta"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <textarea v-model="form.alamat" rows="2" placeholder="Jejeg, RT/RW. 004/003, Kel. Jejeg, Kec. Bumijawa, Kab. Tegal"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"></textarea>
          </div>
        </div>

        <!-- Data Akta Nikah -->
        <div class="bg-white rounded-xl border border-blue-100 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-blue-700 uppercase tracking-wide">Data Akta Nikah</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Akta Nikah</label>
            <input v-model="form.nomor_akta" type="text" placeholder="243/41/II/2015"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Suami (dalam akta)</label>
            <input v-model="form.nama_suami" type="text" placeholder="WASIMAN"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Istri (dalam akta)</label>
            <input v-model="form.nama_istri" type="text" placeholder="IIK IKRIANA"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">KUA Kecamatan</label>
              <input v-model="form.kua_kecamatan" type="text" placeholder="Pebayuran"
                class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Kab./Kota</label>
              <input v-model="form.kua_kabupaten" type="text" placeholder="Bekasi"
                class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
            </div>
          </div>
        </div>

        <!-- Surat -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Info Surat</h3>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Surat</label>
              <input v-model="form.tanggal_raw" type="date"
                class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
              <input v-model="form.lokasi" type="text" placeholder="Bekasi"
                class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
            </div>
          </div>
        </div>

        <!-- Print Button -->
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
            <p class="text-xs text-gray-400 text-center mb-3">Halaman 1 – Surat Permohonan</p>
            <div style="width: 492px; height: 696px; overflow: hidden; margin: 0 auto;">
              <div style="width: 794px; transform: scale(0.62); transform-origin: top left;">
                <AdminSuratKeabsahanBukuNikahPreview
                  :form="form"
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
      <AdminSuratKeabsahanBukuNikahPreview
        :form="form"
        :tanggal-formatted="tanggalFormatted"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const form = reactive({
  nama: '',
  ttl: '',
  pekerjaan: '',
  alamat: '',
  nomor_akta: '',
  nama_suami: '',
  nama_istri: '',
  kua_kecamatan: '',
  kua_kabupaten: 'Bekasi',
  tanggal_raw: '',
  lokasi: 'Bekasi',
})

const tanggalFormatted = computed(() => {
  if (!form.tanggal_raw) return '_______________'
  const d = new Date(form.tanggal_raw + 'T00:00:00')
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
})

const printTargetRef = ref<HTMLElement | null>(null)

const printSurat = () => {
  const printContent = printTargetRef.value?.innerHTML
  if (!printContent) return

  const printWindow = window.open('', '_blank', 'width=1024,height=768')
  if (!printWindow) return

  printWindow.document.write(`
    <!doctype html>
    <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <base href="${window.location.origin}">
        <title>Surat Permohonan Keabsahan Buku Nikah</title>
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

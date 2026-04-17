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
      <h2 class="mt-3 text-2xl font-bold text-gray-900">Surat Keterangan Umum</h2>
      <p class="mt-1 text-sm text-gray-500">Pilih jenis surat, isi form, preview akan muncul otomatis.</p>
    </div>

    <div class="flex gap-8 items-start">

      <!-- ─── FORM PANEL ─── -->
      <div class="w-full lg:w-[420px] shrink-0 space-y-5">

        <!-- Identitas Surat -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Identitas Surat</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Jenis Surat</label>
            <select v-model="form.jenis"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
              <option value="tercatat">Nikah Tercatat</option>
              <option value="tercatat_terlambat">Nikah Tercatat – Buku Nikah Belum Terbit</option>
              <option value="tercatat_kepolisian">Nikah Tercatat – Keperluan Kepolisian</option>
              <option value="tidak_tercatat">Nikah Tidak Tercatat</option>
              <option value="tidak_tercatat_isbat">Tidak Tercatat – Keperluan Isbat Nikah</option>
              <option value="tidak_tercatat_bpjs">Tidak Tercatat – Keperluan BPJS</option>
              <option value="buku_nikah_palsu">Buku Nikah Palsu / Tidak Terdaftar</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Urut Surat</label>
            <div class="flex items-center gap-2">
              <input v-model="form.nomor_urut" type="number" min="1" placeholder="047"
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
              <input v-model="form.lokasi" type="text" placeholder="Bekasi"
                class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
            </div>
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

        <!-- Data Pasangan -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Data Pasangan</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Suami</label>
            <input v-model="form.nama_suami" type="text" placeholder="SUMARNO"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Isteri</label>
            <input v-model="form.nama_istri" type="text" placeholder="SURIANI"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Nikah</label>
            <input v-model="form.tanggal_nikah" type="date"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div v-if="form.jenis !== 'tercatat_kepolisian'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Tempat Nikah</label>
            <input v-model="form.tempat_nikah" type="text" placeholder="KUA Kecamatan Pebayuran"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>
        </div>

        <!-- Nomor Akta Nikah (untuk tercatat standar) -->
        <div v-if="form.jenis === 'tercatat' || form.jenis === 'tercatat_terlambat'"
          class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Data Akta Nikah</h3>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Akta Nikah</label>
            <input v-model="form.nomor_akta" type="text" placeholder="0412/2005"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Perforasi</label>
            <input v-model="form.nomor_perforasi" type="text" placeholder="5504977"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>
        </div>

        <!-- Data Kepolisian (detail per orang + nomor register + seri + perforasi) -->
        <div v-if="form.jenis === 'tercatat_kepolisian'"
          class="bg-white rounded-xl border border-blue-100 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-blue-700 uppercase tracking-wide">Data Suami</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tempat / Tgl. Lahir</label>
            <input v-model="form.ttl_suami" type="text" placeholder="Bekasi, 02-11-1985"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
            <input v-model="form.pekerjaan_suami" type="text" placeholder="Wiraswasta"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <textarea v-model="form.alamat_suami" rows="2" placeholder="Kp. Bolang RT.006/RW.005, Bantarsari, Pebayuran, Bekasi"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"></textarea>
          </div>
        </div>

        <div v-if="form.jenis === 'tercatat_kepolisian'"
          class="bg-white rounded-xl border border-pink-100 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-pink-700 uppercase tracking-wide">Data Isteri</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tempat / Tgl. Lahir</label>
            <input v-model="form.ttl_istri" type="text" placeholder="Bekasi, 06-03-1988"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
            <input v-model="form.pekerjaan_istri" type="text" placeholder="Mengurus Rumah Tangga"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <textarea v-model="form.alamat_istri" rows="2" placeholder="Kp. Bolang RT.006/RW.005, Bantarsari, Pebayuran, Bekasi"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"></textarea>
          </div>
        </div>

        <div v-if="form.jenis === 'tercatat_kepolisian'"
          class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Data Register Nikah</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Akta Nikah</label>
            <input v-model="form.nomor_akta" type="text" placeholder="577/17/VII/2008"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Seri</label>
              <input v-model="form.seri" type="text" placeholder="CD"
                class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">No. Perforasi</label>
              <input v-model="form.nomor_perforasi" type="text" placeholder="5504977"
                class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
            </div>
          </div>
        </div>

        <!-- Data Buku Nikah Palsu -->
        <div v-if="form.jenis === 'buku_nikah_palsu'"
          class="bg-white rounded-xl border border-amber-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-amber-700 uppercase tracking-wide">Data Buku Nikah</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Akta Nikah (tertulis di buku nikah)</label>
            <input v-model="form.nomor_akta" type="text" placeholder="0412/2005"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama PPN Tertulis (di buku nikah)</label>
            <input v-model="form.nama_ppn_palsu" type="text" placeholder="Nama PPN yang tercatat"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama PPN Bertugas (yang sebenarnya)</label>
            <input v-model="form.nama_ppn_asli" type="text" placeholder="Nama PPN KUA yang sebenarnya"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
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
            <div style="width: 492px; height: 696px; overflow: hidden; margin: 0 auto;">
              <div style="width: 794px; transform: scale(0.62); transform-origin: top left;">
                <AdminSuratKeteranganPreview
                  :form="form"
                  :jenis="form.jenis"
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
      <AdminSuratKeteranganPreview
        :form="form"
        :jenis="form.jenis"
        :nomor-surat="nomorSurat"
        :tanggal-formatted="tanggalFormatted"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminSuratKeteranganPreview from '~/components/admin/SuratKeteranganPreview.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const form = reactive({
  jenis: 'tercatat',
  nomor_urut: '',
  tanggal_raw: '',
  lokasi: 'Bekasi',
  kepala: "Drs. H. Ma'mun Nawawi",
  nama_suami: '',
  nama_istri: '',
  tanggal_nikah: '',
  tempat_nikah: '',
  nomor_register: '',
  nomor_akta: '',
  nama_ppn_palsu: '',
  nama_ppn_asli: '',
  // tercatat_kepolisian
  ttl_suami: '',
  pekerjaan_suami: '',
  alamat_suami: '',
  ttl_istri: '',
  pekerjaan_istri: '',
  alamat_istri: '',
  seri: '',
  nomor_perforasi: '',
})

const tanggalRef = computed(() => {
  if (form.tanggal_raw) return new Date(form.tanggal_raw + 'T00:00:00')
  return new Date()
})

const bulanTahunNomor = computed(() => {
  const d = tanggalRef.value
  const bulan = String(d.getMonth() + 1).padStart(2, '0')
  const tahun = d.getFullYear()
  return `${bulan}/${tahun}`
})

const nomorSurat = computed(() => {
  const nomor = form.nomor_urut ? String(form.nomor_urut).padStart(3, '0') : '___'
  return `${nomor}/KUA.10.16.13/PW.01/${bulanTahunNomor.value}`
})

const tanggalFormatted = computed(() => {
  if (!form.tanggal_raw) return '_______________'
  const d = new Date(form.tanggal_raw + 'T00:00:00')
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
})

const perihalSurat = computed(() => {
  const namaPihak = [form.nama_suami, form.nama_istri].filter(Boolean).join(' / ')
  const jenisLabel: Record<string, string> = {
    tercatat: 'Surat Keterangan Nikah Tercatat',
    tercatat_terlambat: 'Surat Keterangan Nikah Tercatat (Terlambat)',
    tercatat_kepolisian: 'Surat Keterangan Pernikahan',
    tidak_tercatat: 'Surat Keterangan Nikah Tidak Tercatat',
    tidak_tercatat_isbat: 'Surat Keterangan Tidak Tercatat (Isbat Nikah)',
    tidak_tercatat_bpjs: 'Surat Keterangan Tidak Tercatat (BPJS)',
    buku_nikah_palsu: 'Surat Keterangan Buku Nikah',
  }
  const label = jenisLabel[form.jenis] ?? 'Surat Keterangan'
  return namaPihak ? `${label} a.n. ${namaPihak}` : label
})

const supabase = useSupabaseClient()
const printTargetRef = ref<HTMLElement | null>(null)

const saveSuratKeluar = async () => {
  if (!form.nomor_urut) return
  try {
    await supabase.from('surat_keluar').upsert({
      nomor_surat: nomorSurat.value,
      tanggal_surat: form.tanggal_raw || null,
      jenis_surat: form.jenis,
      perihal: perihalSurat.value,
    }, { onConflict: 'nomor_surat' })
  } catch (e) {
    console.error('Gagal menyimpan log surat:', e)
  }
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <base href="${window.location.origin}">
        <title>Surat Keterangan</title>
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

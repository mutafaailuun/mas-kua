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
      <h2 class="mt-3 text-2xl font-bold text-gray-900">Surat Keterangan Ralat</h2>
      <p class="mt-1 text-sm text-gray-500">Isi form di bawah ini, preview akan muncul secara otomatis.</p>
    </div>

    <div class="flex gap-8 items-start">

      <!-- ─── FORM PANEL ─── -->
      <div class="w-full lg:w-[420px] shrink-0 space-y-5">

        <!-- Nomor Surat -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Identitas Surat</h3>

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

        <!-- Data Akta Nikah -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Data Akta Nikah</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Akta Nikah</label>
            <input v-model="form.nomor_akta" type="text" placeholder="57/42/1990"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Seri</label>
              <input v-model="form.seri" type="text" placeholder="PH"
                class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Perforasi</label>
              <input v-model="form.nomor_perforasi" type="text" placeholder="0506450"
                class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Suami (sesuai buku nikah)</label>
            <input v-model="form.nama_suami" type="text" placeholder="ADE SURATMAN"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Istri (sesuai buku nikah)</label>
            <input v-model="form.nama_istri" type="text" placeholder="AI ZAKIAH"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>
        </div>

        <!-- Surat Kelurahan -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Surat Keterangan Kelurahan</h3>
          <p class="text-xs leading-relaxed text-gray-500">
            Opsional. Jika warga tidak membawa surat dari kelurahan, kosongkan bagian ini dan gunakan dokumen pendukung lain pada kolom koreksi.
          </p>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kelurahan / Desa</label>
            <input v-model="form.kelurahan" type="text" placeholder="Kertasari (opsional)"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Surat Kelurahan</label>
            <input v-model="form.nomor_kel" type="text" placeholder="400.12.2.1/68/IV/2026 (opsional)"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>
        </div>

        <!-- Koreksi 1 -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Koreksi Data #1</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kolom yang Dikoreksi</label>
            <select v-model="koreksi[0].kolom"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
              <option value="Nama Istri">Nama Istri</option>
              <option value="Nama Suami">Nama Suami</option>
              <option value="Tempat Lahir Istri">Tempat Lahir Istri</option>
              <option value="Tempat Lahir Suami">Tempat Lahir Suami</option>
              <option value="Tanggal Lahir Istri">Tanggal Lahir Istri</option>
              <option value="Tanggal Lahir Suami">Tanggal Lahir Suami</option>
              <option value="Nama Ayah Istri">Nama Ayah Istri</option>
              <option value="Nama Ayah Suami">Nama Ayah Suami</option>
              <option value="Nama Ibu Istri">Nama Ibu Istri</option>
              <option value="Nama Ibu Suami">Nama Ibu Suami</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tertulis (Data Salah)</label>
            <input v-model="koreksi[0].tertulis" type="text" placeholder="AI ZAKIAH"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Seharusnya (Data Benar)</label>
            <input v-model="koreksi[0].seharusnya" type="text" placeholder="ZAKIAH MUHIBAH"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Data Pendukung</label>
            <textarea v-model="koreksi[0].data_pendukung" rows="4"
              placeholder="1. KTP&#10;2. KK (Kartu Keluarga)&#10;3. Surat Keterangan Kelurahan ..."
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"></textarea>
          </div>
        </div>

        <!-- Toggle Koreksi Kedua -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <label class="flex items-center gap-3 cursor-pointer select-none">
            <div class="relative">
              <input type="checkbox" v-model="hasKoreksiKedua" class="sr-only" />
              <div class="w-10 h-6 rounded-full transition-colors"
                :class="hasKoreksiKedua ? 'bg-emerald-500' : 'bg-gray-300'"></div>
              <div class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform"
                :class="hasKoreksiKedua ? 'translate-x-4' : 'translate-x-0'"></div>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-700">Tambah Koreksi Data #2</p>
              <p class="text-xs text-gray-400">Aktifkan jika ada dua data yang perlu dikoreksi</p>
            </div>
          </label>
        </div>

        <!-- Koreksi 2 (Conditional) -->
        <div v-if="hasKoreksiKedua" class="bg-white rounded-xl border border-emerald-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Koreksi Data #2</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kolom yang Dikoreksi</label>
            <select v-model="koreksi[1].kolom"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
              <option value="Nama Suami">Nama Suami</option>
              <option value="Nama Istri">Nama Istri</option>
              <option value="Tempat Lahir Istri">Tempat Lahir Istri</option>
              <option value="Tempat Lahir Suami">Tempat Lahir Suami</option>
              <option value="Tanggal Lahir Istri">Tanggal Lahir Istri</option>
              <option value="Tanggal Lahir Suami">Tanggal Lahir Suami</option>
              <option value="Nama Ayah Istri">Nama Ayah Istri</option>
              <option value="Nama Ayah Suami">Nama Ayah Suami</option>
              <option value="Nama Ibu Istri">Nama Ibu Istri</option>
              <option value="Nama Ibu Suami">Nama Ibu Suami</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tertulis (Data Salah)</label>
            <input v-model="koreksi[1].tertulis" type="text" placeholder="ADE SURATMAN"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Seharusnya (Data Benar)</label>
            <input v-model="koreksi[1].seharusnya" type="text" placeholder="ADE SUPATMAN"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Data Pendukung</label>
            <textarea v-model="koreksi[1].data_pendukung" rows="4"
              placeholder="1. KTP&#10;2. KK (Kartu Keluarga)&#10;3. Surat Keterangan Kelurahan ..."
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"></textarea>
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

          <!-- Scaled letter wrapper -->
          <div class="rounded-xl border border-gray-200 shadow-lg bg-gray-100 p-4">
            <!--
              Transform scale shrinks visually but NOT in layout.
              So we use overflow:hidden + explicit clip dimensions so the 302px
              of extra layout width (794 - 492) doesn't create a scrollbar.
              Height clip = 1123 * 0.62 ≈ 696px.
            -->
            <div style="width: 492px; height: 696px; overflow: hidden; margin: 0 auto;">
              <div style="width: 794px; transform: scale(0.62); transform-origin: top left;">
                <AdminSuratRalatPreview
                  :form="form"
                  :nomor-surat="nomorSurat"
                  :koreksi="koreksi"
                  :has-koreksi-kedua="hasKoreksiKedua"
                  :tanggal-formatted="tanggalFormatted"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Hidden print target (full size, always rendered, hidden visually) -->
    <div id="surat-print-content" ref="printTargetRef" aria-hidden="true">
      <AdminSuratRalatPreview
        :form="form"
        :nomor-surat="nomorSurat"
        :koreksi="koreksi"
        :has-koreksi-kedua="hasKoreksiKedua"
        :tanggal-formatted="tanggalFormatted"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRaw } from 'vue'
import AdminSuratRalatPreview from '~/components/admin/SuratRalatPreview.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const form = reactive({
  nomor_urut: '',
  tanggal_raw: '',
  lokasi: 'Bekasi',
  kepala: "Drs. H. Ma'mun Nawawi",
  nomor_akta: '',
  seri: '',
  nomor_perforasi: '',
  nama_suami: '',
  nama_istri: '',
  kelurahan: '',
  nomor_kel: '',
})

const koreksi = reactive([
  { kolom: 'Nama Istri', tertulis: '', seharusnya: '', data_pendukung: '' },
  { kolom: 'Nama Suami', tertulis: '', seharusnya: '', data_pendukung: '' },
] as [
  { kolom: string; tertulis: string; seharusnya: string; data_pendukung: string },
  { kolom: string; tertulis: string; seharusnya: string; data_pendukung: string }
])

const hasKoreksiKedua = ref(false)

// Derive month/year from the letter date, fallback to today
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

const supabase = useSupabaseClient()
const printTargetRef = ref<HTMLElement | null>(null)
const saving = ref(false)

// Build perihal string from current form data
const perihalSurat = computed(() => {
  const namaPihak = [form.nama_suami, form.nama_istri].filter(Boolean).join(' / ')
  return namaPihak
    ? `Surat Keterangan Ralat a.n. ${namaPihak}`
    : 'Surat Keterangan Ralat'
})

const saveSuratKeluar = async () => {
  if (!form.nomor_urut) return // jangan simpan jika nomor belum diisi
  saving.value = true
  try {
    await supabase.from('surat_keluar').upsert({
      nomor_surat: nomorSurat.value,
      tanggal_surat: form.tanggal_raw || null,
      jenis_surat: 'ralat',
      perihal: perihalSurat.value,
      form_data: {
        ...toRaw(form),
        koreksi: koreksi.map(k => ({ ...toRaw(k) })),
        hasKoreksiKedua: hasKoreksiKedua.value,
      },
    }, { onConflict: 'nomor_surat' })
  } catch (e) {
    console.error('Gagal menyimpan log surat:', e)
  } finally {
    saving.value = false
  }
}

const printSurat = async () => {
  const printContent = printTargetRef.value?.innerHTML
  if (!printContent) return

  // Simpan ke log surat keluar
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
        <title>Surat Keterangan Ralat</title>
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

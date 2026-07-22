<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <NuxtLink to="/admin/surat"
        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">
        <Icon name="lucide:arrow-left" class="w-4 h-4 mr-1" />
        Kembali ke Surat Menyurat
      </NuxtLink>
      <h2 class="mt-3 text-2xl font-bold text-gray-900 flex items-center gap-2">
        Surat Rekomendasi Wali Nikah
        <span v-if="editId" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-sky-100 text-sky-700">
          <Icon name="lucide:pencil" class="w-3 h-3 mr-1" />
          Mode Edit
        </span>
      </h2>
      <p class="mt-1 text-sm text-gray-500">Isi form di bawah ini, preview akan muncul secara otomatis. Dicetak di kertas <strong>F4</strong>.</p>

      <!-- Nomor surat terdahulu -->
      <div v-if="lastSurat" class="mt-3 inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2 text-sm">
        <Icon name="lucide:history" class="w-4 h-4 shrink-0 text-amber-500" />
        <span class="text-amber-700">Surat terakhir:</span>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Kepala / Penanda Tangan</label>
            <select v-model="form.kepala"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
              <option value="Drs. H. Ma'mun Nawawi">Drs. H. Ma'mun Nawawi</option>
              <option value="Nunu Husnul Hitam, SH.I">Nunu Husnul Hitam, SH.I</option>
              <option value="Jalaludin, S.H">Jalaludin, S.H</option>
            </select>
          </div>
        </div>

        <!-- Tujuan -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Tujuan</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kecamatan Tujuan</label>
            <input v-model="form.kec_tujuan" type="text" placeholder="Klirong"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kab/Kota Tujuan</label>
            <input v-model="form.kab_tujuan" type="text" placeholder="Kebumen"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>
        </div>

        <!-- Data Wali -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Data Wali</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Wali</label>
            <input v-model="form.wali_nama" type="text" placeholder="IWAN HERMAWAN"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Bin</label>
            <input v-model="form.wali_bin" type="text" placeholder="YAHYA (Alm.)"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tempat/Tgl. Lahir</label>
            <input v-model="form.wali_ttl" type="text" placeholder="Bekasi, 05-06-1982"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
            <input v-model="form.wali_pekerjaan" type="text" placeholder="Wiraswasta"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <textarea v-model="form.wali_alamat" rows="2" placeholder="Kp. Kedung Lotong RT/RW. 002/007, Desa Bantarjaya, Kec. Pebayuran, Kab. Bekasi"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"></textarea>
          </div>
        </div>

        <!-- Data Perempuan -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Data Perempuan</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input v-model="form.pr_nama" type="text" placeholder="MELISA"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Binti</label>
            <input v-model="form.pr_binti" type="text" placeholder="YAHYA (Alm)"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm uppercase" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tempat/Tgl. Lahir</label>
            <input v-model="form.pr_ttl" type="text" placeholder="Bekasi, 16-05-1995"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <textarea v-model="form.pr_alamat" rows="2" placeholder="Kp. Kedung Lotong RT/RW. 003/007, Desa Bantarjaya, Kec. Pebayuran, Kab. Bekasi"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"></textarea>
          </div>
        </div>

        <!-- Surat Keterangan Desa & Hubungan -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Surat Keterangan Desa</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Desa</label>
            <input v-model="form.desa" type="text" placeholder="Bantarjaya"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Surat Keterangan Desa</label>
            <input v-model="form.no_sk_desa" type="text" placeholder="581/001/BTJ/V11/2026"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Surat Keterangan</label>
            <input v-model="form.tgl_sk_desa" type="text" placeholder="21 Juli 2026"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hubungan Wali</label>
            <input v-model="form.hubungan" type="text" placeholder="mis. Saudara Laki-laki Seayah Seibu"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
          </div>
        </div>

        <!-- Cetak -->
        <button @click="printSurat"
          class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors">
          <Icon name="lucide:printer" class="w-4 h-4 mr-2" />
          Cetak / Unduh Surat (F4)
        </button>
      </div>

      <!-- ─── PREVIEW PANEL ─── -->
      <div class="hidden lg:block flex-1 min-w-0">
        <div class="sticky top-8">
          <div class="flex items-center justify-between mb-3">
            <p class="text-sm font-medium text-gray-500">Preview Surat — <strong class="text-fuchsia-600">Kertas F4</strong></p>
            <button @click="printSurat"
              class="inline-flex items-center text-xs font-medium text-emerald-600 hover:text-emerald-700">
              <Icon name="lucide:printer" class="w-3.5 h-3.5 mr-1" />
              Cetak
            </button>
          </div>
          <div class="rounded-xl border border-gray-200 shadow-lg bg-gray-100 p-3">
            <div style="width: 492px; height: 818px; overflow: hidden; margin: 0 auto;">
              <div style="width: 794px; transform: scale(0.62); transform-origin: top left;">
                <AdminSuratRekomWaliPreview
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
      <AdminSuratRekomWaliPreview
        :form="previewForm"
        :nomor-surat="nomorSurat"
        :tanggal-formatted="tanggalFormatted"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRaw } from 'vue'
import AdminSuratRekomWaliPreview from '~/components/admin/SuratRekomWaliPreview.vue'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const form = reactive({
  nomor_urut: '',
  tanggal_raw: '',
  lokasi: 'Pebayuran',
  kepala: "Drs. H. Ma'mun Nawawi",
  kec_tujuan: '',
  kab_tujuan: '',
  wali_nama: '',
  wali_bin: '',
  wali_ttl: '',
  wali_pekerjaan: '',
  wali_alamat: '',
  desa: '',
  no_sk_desa: '',
  tgl_sk_desa: '',
  hubungan: '',
  pr_nama: '',
  pr_binti: '',
  pr_ttl: '',
  pr_alamat: '',
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
  kec_tujuan: form.kec_tujuan,
  kab_tujuan: form.kab_tujuan,
  wali_nama: form.wali_nama,
  wali_bin: form.wali_bin,
  wali_ttl: form.wali_ttl,
  wali_pekerjaan: form.wali_pekerjaan,
  wali_alamat: form.wali_alamat,
  desa: form.desa,
  no_sk_desa: form.no_sk_desa,
  tgl_sk_desa: form.tgl_sk_desa,
  hubungan: form.hubungan,
  pr_nama: form.pr_nama,
  pr_binti: form.pr_binti,
  pr_ttl: form.pr_ttl,
  pr_alamat: form.pr_alamat,
}))

const supabase = useSupabaseClient()
const route = useRoute()
const printTargetRef = ref<HTMLElement | null>(null)

const lastSurat = ref<{ nomor_surat: string; perihal: string; tanggal_surat: string | null } | null>(null)
const lastSuratLoading = ref(true)

const editId = ref<string | null>(null)

const formatTanggalShort = (raw: string) =>
  new Date(raw + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

onMounted(async () => {
  const editParam = route.query.edit as string | undefined
  if (editParam) {
    const { data, error } = await supabase
      .from('surat_keluar')
      .select('*')
      .eq('id', editParam)
      .single() as { data: { id: string; form_data: Record<string, any> | null } | null; error: any }
    if (!error && data) {
      editId.value = data.id
      Object.assign(form, data.form_data ?? {})
    }
  }

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
  const payload = {
    nomor_surat: nomorSurat.value,
    tanggal_surat: form.tanggal_raw || null,
    jenis_surat: 'rekomendasi_wali',
    perihal: form.wali_nama ? `Rekomendasi Wali Nikah a.n. ${form.wali_nama}` : 'Rekomendasi Wali Nikah',
    form_data: toRaw(form),
  }
  if (editId.value) {
    await supabase.from('surat_keluar').update(payload).eq('id', editId.value)
  } else {
    await supabase.from('surat_keluar').upsert(payload, { onConflict: 'nomor_surat' })
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
        <title>Surat Rekomendasi Wali Nikah</title>
        <style>
          @page { size: 210mm 330mm; margin: 0; }
          html, body { margin: 0; padding: 0; background: #fff; }
          body { font-family: "Times New Roman", Times, serif; }
          .surat-paper { width: 794px !important; min-height: 1247px !important; margin: 0 auto; box-sizing: border-box; }
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

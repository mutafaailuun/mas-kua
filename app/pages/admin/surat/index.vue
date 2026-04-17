<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Surat Menyurat</h2>
      <p class="mt-1 text-sm text-gray-500">Pilih template surat, isi form, lalu cetak atau unduh hasilnya.</p>
    </div>

    <!-- Template Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <NuxtLink to="/admin/surat/ralat"
        class="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all p-6 flex flex-col gap-4">
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
          Menerangkan perbedaan antara data yang tertulis dalam kutipan Akta Nikah dengan data yang sebenarnya.
        </p>
        <div class="mt-auto flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
          Buat Surat <Icon name="lucide:arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/surat/umum"
        class="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all p-6 flex flex-col gap-4">
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
          Buat Surat <Icon name="lucide:arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </NuxtLink>
    </div>

    <!-- ── Log Surat Keluar ── -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Log Surat Keluar</h3>
          <p class="text-sm text-gray-500 mt-0.5">Otomatis tercatat setiap kali surat dicetak, atau tambah manual.</p>
        </div>
        <div class="flex items-center gap-2">
          <button @click="fetchSurat"
            class="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 transition-colors">
            <Icon name="lucide:refresh-cw" class="w-4 h-4 mr-1" :class="{ 'animate-spin': loading }" />
            Refresh
          </button>
          <button @click="openForm()"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
            <Icon name="lucide:plus" class="w-4 h-4" />
            Tambah
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div v-if="loading" class="flex items-center justify-center py-16 text-gray-400">
          <Icon name="lucide:loader-2" class="w-5 h-5 animate-spin mr-2" />
          Memuat data...
        </div>

        <div v-else-if="suratList.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-400">
          <Icon name="lucide:inbox" class="w-10 h-10 mb-3 text-gray-300" />
          <p class="text-sm">Belum ada surat yang tercatat.</p>
        </div>

        <table v-else class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50 text-left">
              <th class="px-4 py-3 font-medium text-gray-500 w-10">No.</th>
              <th class="px-4 py-3 font-medium text-gray-500">Nomor Surat</th>
              <th class="px-4 py-3 font-medium text-gray-500 w-32">Tanggal</th>
              <th class="px-4 py-3 font-medium text-gray-500 w-36">Jenis</th>
              <th class="px-4 py-3 font-medium text-gray-500">Perihal</th>
              <th class="px-4 py-3 font-medium text-gray-500 w-32">Keterangan</th>
              <th class="px-4 py-3 w-24"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(surat, i) in suratList" :key="surat.id"
              class="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
              <td class="px-4 py-3 text-gray-400 tabular-nums">{{ i + 1 }}</td>
              <td class="px-4 py-3 font-mono text-xs text-gray-700">{{ surat.nomor_surat }}</td>
              <td class="px-4 py-3 text-gray-600 whitespace-nowrap">
                {{ surat.tanggal_surat ? formatTanggal(surat.tanggal_surat) : '—' }}
              </td>
              <td class="px-4 py-3">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                  :class="jenisColor(surat.jenis_surat)">
                  {{ jenisLabel(surat.jenis_surat) }}
                </span>
              </td>
              <td class="px-4 py-3 text-gray-800">{{ surat.perihal }}</td>
              <td class="px-4 py-3 text-gray-500 text-xs">{{ surat.keterangan || '—' }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-end gap-1">
                  <!-- Print ulang (hanya jika ada form_data) -->
                  <button v-if="surat.form_data" @click="printFromLog(surat)" title="Cetak Ulang"
                    :disabled="printing === surat.id"
                    class="p-1.5 rounded text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors disabled:opacity-40">
                    <Icon :name="printing === surat.id ? 'lucide:loader-2' : 'lucide:printer'"
                      class="w-3.5 h-3.5" :class="{ 'animate-spin': printing === surat.id }" />
                  </button>
                  <button @click="openForm(surat)" title="Edit"
                    class="p-1.5 rounded text-gray-400 hover:text-sky-600 hover:bg-sky-50 transition-colors">
                    <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
                  </button>
                  <button @click="deleteSurat(surat)" title="Hapus"
                    class="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                    <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ── MODAL TAMBAH / EDIT ── -->
    <Teleport to="body">
      <div v-if="showForm"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeForm">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-lg">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 class="font-semibold text-gray-900">
              {{ editId ? 'Edit Surat Keluar' : 'Tambah Surat Keluar' }}
            </h3>
            <button @click="closeForm" class="text-gray-400 hover:text-gray-600">
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>

          <div class="px-6 py-5 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="block text-xs font-medium text-gray-700 mb-1">Nomor Surat <span class="text-red-500">*</span></label>
                <input v-model="form.nomor_surat" type="text" placeholder="mis. 001/KUA.10.16.13/PW.01/IV/2026"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Tanggal Surat</label>
                <input v-model="form.tanggal_surat" type="date"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Jenis Surat</label>
                <select v-model="form.jenis_surat"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent">
                  <optgroup label="Surat Keterangan">
                    <option value="tercatat">Nikah Tercatat</option>
                    <option value="tercatat_terlambat">Nikah Tercatat – Buku Belum Terbit</option>
                    <option value="tercatat_kepolisian">Nikah – Keperluan Kepolisian</option>
                    <option value="tidak_tercatat">Nikah Tidak Tercatat</option>
                    <option value="tidak_tercatat_isbat">Tidak Tercatat – Isbat Nikah</option>
                    <option value="tidak_tercatat_bpjs">Tidak Tercatat – BPJS</option>
                    <option value="buku_nikah_palsu">Buku Nikah Palsu</option>
                    <option value="ralat">Ralat Akta Nikah</option>
                  </optgroup>
                  <optgroup label="Surat Lainnya">
                    <option value="umum">Umum</option>
                    <option value="rekomendasi">Rekomendasi</option>
                    <option value="keterangan">Keterangan</option>
                    <option value="lainnya">Lainnya</option>
                  </optgroup>
                </select>
              </div>
              <div class="col-span-2">
                <label class="block text-xs font-medium text-gray-700 mb-1">Perihal <span class="text-red-500">*</span></label>
                <input v-model="form.perihal" type="text" placeholder="mis. Surat Keterangan Nikah a.n. ..."
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" />
              </div>
              <div class="col-span-2">
                <label class="block text-xs font-medium text-gray-700 mb-1">Keterangan</label>
                <textarea v-model="form.keterangan" rows="2" placeholder="Catatan tambahan (opsional)"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none" />
              </div>
            </div>
          </div>

          <div class="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
            <button @click="closeForm"
              class="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
              Batal
            </button>
            <button @click="saveSurat" :disabled="saving || !form.nomor_surat || !form.perihal"
              class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors">
              <Icon :name="saving ? 'lucide:loader-2' : 'lucide:save'" class="w-4 h-4" :class="{ 'animate-spin': saving }" />
              {{ saving ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ── Hidden reprint target ── -->
    <div id="reprint-content" ref="reprintRef" aria-hidden="true">
      <template v-if="reprintSurat">
        <AdminSuratKeteranganPreview
          v-if="isKeteranganType(reprintSurat.jenis_surat)"
          :form="reprintFormData"
          :jenis="reprintSurat.jenis_surat"
          :nomor-surat="reprintSurat.nomor_surat"
          :tanggal-formatted="reprintTanggal"
        />
        <AdminSuratRalatPreview
          v-else-if="reprintSurat.jenis_surat === 'ralat'"
          :form="reprintFormData"
          :nomor-surat="reprintSurat.nomor_surat"
          :koreksi="reprintKoreksi"
          :has-koreksi-kedua="reprintHasKoreksiKedua"
          :tanggal-formatted="reprintTanggal"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import AdminSuratKeteranganPreview from '~/components/admin/SuratKeteranganPreview.vue'
import AdminSuratRalatPreview from '~/components/admin/SuratRalatPreview.vue'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const supabase = useSupabaseClient()

// ── Types ─────────────────────────────────────────────────────────
interface SuratKeluar {
  id: string
  nomor_surat: string
  tanggal_surat: string | null
  jenis_surat: string
  perihal: string
  keterangan: string | null
  form_data: Record<string, any> | null
  created_at: string
}

// ── State ─────────────────────────────────────────────────────────
const suratList = ref<SuratKeluar[]>([])
const loading = ref(true)

// Form modal
const showForm = ref(false)
const saving = ref(false)
const editId = ref<string | null>(null)
const form = reactive({
  nomor_surat: '',
  tanggal_surat: '',
  jenis_surat: 'umum',
  perihal: '',
  keterangan: '',
})

// Reprint
const reprintSurat = ref<SuratKeluar | null>(null)
const reprintRef = ref<HTMLElement | null>(null)
const printing = ref<string | null>(null)

// ── Jenis helpers ─────────────────────────────────────────────────
const KETERANGAN_TYPES = new Set([
  'tercatat', 'tercatat_terlambat', 'tercatat_kepolisian',
  'tidak_tercatat', 'tidak_tercatat_isbat', 'tidak_tercatat_bpjs', 'buku_nikah_palsu',
])

const isKeteranganType = (jenis: string) => KETERANGAN_TYPES.has(jenis)

const JENIS_LABELS: Record<string, string> = {
  tercatat: 'Tercatat',
  tercatat_terlambat: 'Tercatat (Terlambat)',
  tercatat_kepolisian: 'Kepolisian',
  tidak_tercatat: 'Tidak Tercatat',
  tidak_tercatat_isbat: 'Isbat Nikah',
  tidak_tercatat_bpjs: 'BPJS',
  buku_nikah_palsu: 'Buku Palsu',
  ralat: 'Ralat',
  umum: 'Umum',
  rekomendasi: 'Rekomendasi',
  keterangan: 'Keterangan',
  lainnya: 'Lainnya',
}

const jenisLabel = (jenis: string) => JENIS_LABELS[jenis] ?? jenis

const jenisColor = (jenis: string) => {
  if (isKeteranganType(jenis)) return 'bg-emerald-50 text-emerald-700'
  if (jenis === 'ralat') return 'bg-amber-50 text-amber-700'
  if (jenis === 'rekomendasi') return 'bg-blue-50 text-blue-700'
  return 'bg-gray-100 text-gray-600'
}

// ── Reprint computed ──────────────────────────────────────────────
const reprintFormData = computed(() => {
  const fd = reprintSurat.value?.form_data ?? {}
  return {
    lokasi: fd.lokasi ?? 'Bekasi',
    kepala: fd.kepala ?? '',
    nama_suami: fd.nama_suami ?? '',
    nama_istri: fd.nama_istri ?? '',
    tanggal_nikah: fd.tanggal_nikah ?? '',
    tempat_nikah: fd.tempat_nikah ?? '',
    nomor_register: fd.nomor_register ?? '',
    nomor_akta: fd.nomor_akta ?? '',
    nama_ppn_asli: fd.nama_ppn_asli ?? '',
    nama_ppn_palsu: fd.nama_ppn_palsu ?? '',
    ttl_suami: fd.ttl_suami ?? '',
    pekerjaan_suami: fd.pekerjaan_suami ?? '',
    alamat_suami: fd.alamat_suami ?? '',
    ttl_istri: fd.ttl_istri ?? '',
    pekerjaan_istri: fd.pekerjaan_istri ?? '',
    alamat_istri: fd.alamat_istri ?? '',
    seri: fd.seri ?? '',
    nomor_perforasi: fd.nomor_perforasi ?? '',
    // ralat-specific
    kelurahan: fd.kelurahan ?? '',
    nomor_kel: fd.nomor_kel ?? '',
  }
})

const reprintTanggal = computed(() => {
  const raw = reprintSurat.value?.tanggal_surat
  if (!raw) return '_______________'
  return new Date(raw + 'T00:00:00').toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
})

const reprintKoreksi = computed(() => {
  const koreksi = reprintSurat.value?.form_data?.koreksi ?? []
  const empty = { kolom: '', tertulis: '', seharusnya: '', data_pendukung: '' }
  return [koreksi[0] ?? empty, koreksi[1] ?? empty] as [any, any]
})

const reprintHasKoreksiKedua = computed(() =>
  reprintSurat.value?.form_data?.hasKoreksiKedua ?? false
)

// ── Print from log ────────────────────────────────────────────────
const printFromLog = async (surat: SuratKeluar) => {
  printing.value = surat.id
  reprintSurat.value = surat
  await nextTick()

  const printContent = reprintRef.value?.innerHTML
  if (!printContent) {
    printing.value = null
    reprintSurat.value = null
    return
  }

  const printWindow = window.open('', '_blank', 'width=1024,height=768')
  if (!printWindow) {
    printing.value = null
    reprintSurat.value = null
    return
  }

  printWindow.document.write(`
    <!doctype html>
    <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>${surat.perihal}</title>
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

  setTimeout(() => {
    printing.value = null
    reprintSurat.value = null
  }, 1500)
}

// ── Fetch ─────────────────────────────────────────────────────────
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

// ── Form helpers ──────────────────────────────────────────────────
const resetForm = () => {
  editId.value = null
  form.nomor_surat = ''
  form.tanggal_surat = new Date().toISOString().slice(0, 10)
  form.jenis_surat = 'umum'
  form.perihal = ''
  form.keterangan = ''
}

const openForm = (surat?: SuratKeluar) => {
  resetForm()
  if (surat) {
    editId.value = surat.id
    form.nomor_surat = surat.nomor_surat
    form.tanggal_surat = surat.tanggal_surat ?? ''
    form.jenis_surat = surat.jenis_surat
    form.perihal = surat.perihal
    form.keterangan = surat.keterangan ?? ''
  }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  resetForm()
}

// ── Save (insert or update) ───────────────────────────────────────
const saveSurat = async () => {
  if (!form.nomor_surat.trim() || !form.perihal.trim()) return
  saving.value = true
  try {
    const payload = {
      nomor_surat: form.nomor_surat.trim(),
      tanggal_surat: form.tanggal_surat || null,
      jenis_surat: form.jenis_surat,
      perihal: form.perihal.trim(),
      keterangan: form.keterangan.trim() || null,
    }

    if (editId.value) {
      const { error } = await supabase
        .from('surat_keluar')
        .update(payload)
        .eq('id', editId.value)
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('surat_keluar')
        .insert(payload)
      if (error) throw error
    }

    closeForm()
    await fetchSurat()
  } catch (e: any) {
    alert(`Gagal menyimpan: ${e?.message ?? 'Terjadi kesalahan'}`)
  } finally {
    saving.value = false
  }
}

// ── Delete ────────────────────────────────────────────────────────
const deleteSurat = async (surat: SuratKeluar) => {
  if (!confirm(`Hapus surat "${surat.nomor_surat}"?`)) return
  const { error } = await supabase.from('surat_keluar').delete().eq('id', surat.id)
  if (error) { alert('Gagal menghapus.'); return }
  suratList.value = suratList.value.filter(s => s.id !== surat.id)
}

// ── Helpers ───────────────────────────────────────────────────────
const formatTanggal = (raw: string) =>
  new Date(raw + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

onMounted(fetchSurat)
</script>

<style>
#reprint-content {
  position: fixed;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
}
</style>

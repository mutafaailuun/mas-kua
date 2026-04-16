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
              <th class="px-5 py-3 font-medium text-gray-500 w-10">No.</th>
              <th class="px-5 py-3 font-medium text-gray-500">Nomor Surat</th>
              <th class="px-5 py-3 font-medium text-gray-500 w-36">Tanggal</th>
              <th class="px-5 py-3 font-medium text-gray-500">Perihal</th>
              <th class="px-5 py-3 font-medium text-gray-500">Keterangan</th>
              <th class="px-5 py-3 w-16"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(surat, i) in suratList" :key="surat.id"
              class="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
              <td class="px-5 py-3 text-gray-400 tabular-nums">{{ i + 1 }}</td>
              <td class="px-5 py-3 font-mono text-xs text-gray-700">{{ surat.nomor_surat }}</td>
              <td class="px-5 py-3 text-gray-600 whitespace-nowrap">
                {{ surat.tanggal_surat ? formatTanggal(surat.tanggal_surat) : '—' }}
              </td>
              <td class="px-5 py-3 text-gray-800">{{ surat.perihal }}</td>
              <td class="px-5 py-3 text-gray-500">{{ surat.keterangan || '—' }}</td>
              <td class="px-5 py-3 text-right">
                <div class="flex items-center justify-end gap-1">
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
          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 class="font-semibold text-gray-900">
              {{ editId ? 'Edit Surat Keluar' : 'Tambah Surat Keluar' }}
            </h3>
            <button @click="closeForm" class="text-gray-400 hover:text-gray-600">
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>

          <!-- Body -->
          <div class="px-6 py-5 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="block text-xs font-medium text-gray-700 mb-1">Nomor Surat <span class="text-red-500">*</span></label>
                <input v-model="form.nomor_surat" type="text" placeholder="mis. 001/KUA.10.11/PW.01/IV/2026"
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
                  <option value="umum">Umum</option>
                  <option value="ralat">Ralat</option>
                  <option value="rekomendasi">Rekomendasi</option>
                  <option value="keterangan">Keterangan</option>
                  <option value="lainnya">Lainnya</option>
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

          <!-- Footer -->
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

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

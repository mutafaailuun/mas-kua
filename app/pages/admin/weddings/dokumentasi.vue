<template>
  <div>
    <!-- ── PAGE HEADER ── -->
    <div class="sm:flex sm:items-center sm:justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Dokumentasi Akad</h2>
        <p class="mt-1 text-sm text-gray-500">Upload dan kelola foto dokumentasi setiap peristiwa nikah.</p>
      </div>
      <button
        @click="openBulkModal"
        class="mt-4 sm:mt-0 inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
      >
        <Icon name="lucide:file-down" class="w-4 h-4" />
        Export PDF Bulanan
      </button>
    </div>

    <!-- ── FILTERS ── -->
    <div class="mb-5 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div class="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div class="col-span-2 md:col-span-1">
          <label class="block text-xs font-medium text-gray-700 mb-1">Cari Nama</label>
          <div class="relative">
            <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input v-model="searchQuery" type="text" placeholder="Suami / Istri..."
              class="block w-full pl-9 pr-3 py-2 text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Bulan</label>
          <select v-model="filterMonth" class="block w-full px-3 py-2 text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500">
            <option value="">Semua</option>
            <option v-for="(name, idx) in BULAN_INDO" :key="idx" :value="idx + 1">{{ name }}</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Tahun</label>
          <select v-model="filterYear" class="block w-full px-3 py-2 text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500">
            <option value="">Semua</option>
            <option v-for="y in availableYears" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
          <select v-model="filterStatus" class="block w-full px-3 py-2 text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500">
            <option value="">Semua</option>
            <option value="Kantor">Kantor</option>
            <option value="Luar Kantor">Luar Kantor</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Tanggal Akad</label>
          <input v-model="filterDate" type="date"
            class="block w-full px-3 py-2 text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500" />
        </div>
        <div class="flex items-end">
          <button v-if="hasActiveFilters" @click="clearFilters"
            class="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 py-2">
            <Icon name="lucide:x" class="w-4 h-4" />Reset
          </button>
        </div>
      </div>
    </div>

    <!-- ── TABLE ── -->
    <div class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div v-if="loading" class="p-10 text-center text-gray-400">
        <Icon name="lucide:loader-2" class="w-7 h-7 animate-spin mx-auto mb-2" />
        Memuat data...
      </div>
      <div v-else-if="filteredWeddings.length === 0" class="p-12 text-center text-gray-400">
        <Icon name="lucide:search-x" class="w-10 h-10 mx-auto mb-3 text-gray-300" />
        <p class="text-sm">Tidak ada data pernikahan ditemukan.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 text-sm">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">No.</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Daftar</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Akta</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Suami</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Istri</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Akad</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
              <th class="px-4 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="(wedding, i) in paginatedWeddings"
              :key="wedding.id"
              class="hover:bg-gray-50/60 transition-colors"
            >
              <td class="px-4 py-3 text-gray-400 tabular-nums">{{ startIndex + i + 1 }}</td>

              <!-- ── No. Pendaftaran (inline edit) ── -->
              <td class="px-4 py-2">
                <input
                  :value="wedding.no_pendaftaran ?? ''"
                  @blur="e => saveEdit(wedding, 'no_pendaftaran', (e.target as HTMLInputElement).value)"
                  @keydown.enter.prevent="(e) => (e.target as HTMLInputElement).blur()"
                  @keydown.escape.prevent="(e) => (e.target as HTMLInputElement).blur()"
                  placeholder="—"
                  class="w-28 px-2 py-1 text-sm rounded border border-transparent hover:border-gray-300 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-transparent focus:bg-white transition-colors placeholder-gray-300"
                />
              </td>

              <!-- ── No. Akta (inline edit) ── -->
              <td class="px-4 py-2">
                <input
                  :value="wedding.no_akta ?? ''"
                  @blur="e => saveEdit(wedding, 'no_akta', (e.target as HTMLInputElement).value)"
                  @keydown.enter.prevent="(e) => (e.target as HTMLInputElement).blur()"
                  @keydown.escape.prevent="(e) => (e.target as HTMLInputElement).blur()"
                  placeholder="—"
                  class="w-28 px-2 py-1 text-sm rounded border border-transparent hover:border-gray-300 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-transparent focus:bg-white transition-colors placeholder-gray-300"
                />
              </td>

              <!-- Nama Suami -->
              <td class="px-2 py-1.5">
                <input
                  :value="wedding.groom_name"
                  @blur="e => saveEdit(wedding, 'groom_name', (e.target as HTMLInputElement).value)"
                  @keydown.enter.prevent="e => (e.target as HTMLInputElement).blur()"
                  @keydown.escape.prevent="e => { (e.target as HTMLInputElement).value = wedding.groom_name; (e.target as HTMLInputElement).blur() }"
                  class="w-full min-w-32 px-2 py-1 text-sm font-medium text-gray-900 rounded border border-transparent hover:border-gray-300 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-transparent focus:bg-white transition-colors"
                />
              </td>

              <!-- Nama Istri -->
              <td class="px-2 py-1.5">
                <input
                  :value="wedding.bride_name"
                  @blur="e => saveEdit(wedding, 'bride_name', (e.target as HTMLInputElement).value)"
                  @keydown.enter.prevent="e => (e.target as HTMLInputElement).blur()"
                  @keydown.escape.prevent="e => { (e.target as HTMLInputElement).value = wedding.bride_name; (e.target as HTMLInputElement).blur() }"
                  class="w-full min-w-32 px-2 py-1 text-sm text-gray-700 rounded border border-transparent hover:border-gray-300 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-transparent focus:bg-white transition-colors"
                />
              </td>

              <!-- Tanggal Akad -->
              <td class="px-2 py-1.5">
                <input
                  type="date"
                  :value="wedding.wedding_date"
                  @change="e => saveEdit(wedding, 'wedding_date', (e.target as HTMLInputElement).value)"
                  class="w-36 px-2 py-1 text-sm text-gray-600 rounded border border-transparent hover:border-gray-300 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-transparent focus:bg-white transition-colors"
                />
              </td>

              <!-- Status -->
              <td class="px-2 py-1.5">
                <select
                  :value="wedding.status"
                  @change="e => saveEdit(wedding, 'status', (e.target as HTMLSelectElement).value)"
                  class="px-2 py-1 text-xs font-medium rounded-full border border-transparent hover:border-gray-300 focus:outline-none focus:ring-1 focus:border-emerald-400 focus:ring-emerald-400 transition-colors cursor-pointer"
                  :class="wedding.status === 'Kantor' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'"
                >
                  <option value="Kantor">Kantor</option>
                  <option value="Luar Kantor">Luar Kantor</option>
                </select>
              </td>
              <td class="px-4 py-3 text-center">
                <span
                  class="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                  :class="(photoCounts[wedding.id] ?? 0) > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'"
                >
                  <Icon name="lucide:image" class="w-3 h-3" />
                  {{ (photoCounts[wedding.id] ?? 0) > 0 ? 'Ada' : 'Belum' }}
                </span>
              </td>

              <!-- ── DROPDOWN AKSI ── -->
              <td class="px-3 py-3 text-right">
                <button
                  @click.stop="toggleMenu(wedding.id, $event)"
                  class="p-1.5 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  :class="{ 'text-indigo-600 bg-indigo-50': openMenuId === wedding.id }"
                >
                  <Icon name="lucide:more-horizontal" class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredWeddings.length > pageSize" class="border-t border-gray-100 px-4 py-3 flex items-center justify-between text-sm text-gray-600">
        <span>Menampilkan {{ startIndex + 1 }}–{{ endIndex }} dari {{ filteredWeddings.length }}</span>
        <div class="flex gap-1">
          <button @click="page--" :disabled="page === 1" class="px-2 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
            <Icon name="lucide:chevron-left" class="w-4 h-4" />
          </button>
          <span class="px-3 py-1">{{ page }} / {{ totalPages }}</span>
          <button @click="page++" :disabled="page >= totalPages" class="px-2 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
            <Icon name="lucide:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- ── HIDDEN FILE INPUT (single) ── -->
    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />

    <!-- ── PREVIEW MODAL ── -->
    <Teleport to="body">
      <div
        v-if="previewWedding"
        class="fixed inset-0 z-50 flex flex-col bg-black/60"
        @click.self="closePreview"
      >
        <div class="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-200 shrink-0">
          <div class="text-sm font-medium text-gray-800">
            Preview — {{ previewWedding.groom_name }} & {{ previewWedding.bride_name }}
          </div>
          <div class="flex items-center gap-2">
            <button @click="exportJpg(previewWedding)" :disabled="exportingId === previewWedding.id"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-amber-300 text-amber-700 hover:bg-amber-50 disabled:opacity-50">
              <Icon :name="exportingId === previewWedding.id ? 'lucide:loader-2' : 'lucide:image'" class="w-3.5 h-3.5" :class="{'animate-spin': exportingId === previewWedding.id}" />
              Export JPG
            </button>
            <button @click="exportPdf(previewWedding)"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-red-300 text-red-700 hover:bg-red-50">
              <Icon name="lucide:file-text" class="w-3.5 h-3.5" />
              Export PDF
            </button>
            <button @click="closePreview" class="ml-2 text-gray-400 hover:text-gray-700">
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>
        </div>
        <div class="flex-1 overflow-auto flex items-start justify-center py-8 px-4">
          <div v-if="previewLoading" class="text-white flex items-center gap-2 mt-20">
            <Icon name="lucide:loader-2" class="w-5 h-5 animate-spin" />
            Memuat foto...
          </div>
          <div v-else ref="previewRef" style="transform-origin: top center;">
            <AdminDokumentasiAkadPreview
              :wedding="previewWedding"
              :photos="previewPhotos"
            />
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ── ACTION DROPDOWN (teleported to avoid overflow clipping) ── -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="openMenuId && openMenuWedding"
          :style="{ position: 'fixed', top: menuPosition.top + 'px', right: menuPosition.right + 'px' }"
          class="w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-[9999] origin-top-right"
          @click.stop
        >
          <button @click="openPreview(openMenuWedding); closeMenu()"
            class="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <Icon name="lucide:eye" class="w-4 h-4 text-sky-500 shrink-0" />
            Preview
          </button>

          <button @click="triggerUpload(openMenuWedding); closeMenu()"
            :disabled="uploadingId === openMenuWedding.id"
            class="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">
            <Icon :name="uploadingId === openMenuWedding.id ? 'lucide:loader-2' : 'lucide:upload'"
              class="w-4 h-4 text-emerald-500 shrink-0" :class="{'animate-spin': uploadingId === openMenuWedding.id}" />
            {{ (photoCounts[openMenuWedding.id] ?? 0) > 0 ? 'Ganti Foto' : 'Upload Foto' }}
          </button>

          <button
            v-if="(photoCounts[openMenuWedding.id] ?? 0) > 0"
            @click="deletePhoto(openMenuWedding); closeMenu()"
            class="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
            <Icon name="lucide:trash-2" class="w-4 h-4 shrink-0" />
            Hapus Foto
          </button>

          <div class="border-t border-gray-100 my-1" />

          <button @click="exportJpg(openMenuWedding); closeMenu()"
            :disabled="exportingId === openMenuWedding.id"
            class="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">
            <Icon :name="exportingId === openMenuWedding.id ? 'lucide:loader-2' : 'lucide:image'"
              class="w-4 h-4 text-amber-500 shrink-0" :class="{'animate-spin': exportingId === openMenuWedding.id}" />
            Export JPG
          </button>

          <button @click="exportPdf(openMenuWedding); closeMenu()"
            class="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <Icon name="lucide:file-text" class="w-4 h-4 text-red-500 shrink-0" />
            Export PDF
          </button>
        </div>
      </Transition>
    </Teleport>

    <!-- ── UPLOAD SUCCESS MODAL (shadcn-vue Dialog) ── -->
    <Dialog :open="showSuccessModal" @update:open="showSuccessModal = $event">
      <DialogContent class="sm:max-w-md text-center">
        <DialogHeader class="items-center">
          <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <Icon name="lucide:check-circle-2" class="h-8 w-8 text-emerald-600" />
          </div>
          <DialogTitle class="text-center text-xl">Foto Berhasil Diupload</DialogTitle>
          <DialogDescription class="text-center" v-if="successWedding">
            Foto dokumentasi untuk
            <span class="font-semibold text-gray-700">{{ successWedding.groom_name }}</span>
            &amp;
            <span class="font-semibold text-gray-700">{{ successWedding.bride_name }}</span>
            telah tersimpan ke cloud storage dan database.
          </DialogDescription>
        </DialogHeader>
        <div class="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            @click="successWedding && openPreview(successWedding); showSuccessModal = false"
            class="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <Icon name="lucide:eye" class="h-4 w-4" />
            Preview Dokumentasi
          </button>
          <button
            @click="showSuccessModal = false"
            class="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Tutup
          </button>
        </div>
      </DialogContent>
    </Dialog>

    <!-- ── BULK EXPORT MODAL ── -->
    <Teleport to="body">
      <div
        v-if="showBulkModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="showBulkModal = false"
      >
        <div class="bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[80vh] flex flex-col">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
            <h3 class="font-semibold text-gray-900">Export PDF Bulanan</h3>
            <button @click="showBulkModal = false" class="text-gray-400 hover:text-gray-600">
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>
          <div class="px-5 py-4 border-b border-gray-100 shrink-0">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Bulan</label>
                <select v-model="bulkMonth" class="block w-full px-3 py-2 text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500">
                  <option v-for="(name, idx) in BULAN_INDO" :key="idx" :value="idx + 1">{{ name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Tahun</label>
                <select v-model="bulkYear" class="block w-full px-3 py-2 text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500">
                  <option v-for="y in availableYears" :key="y" :value="y">{{ y }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="flex-1 overflow-y-auto px-5 py-3">
            <div v-if="bulkWeddings.length === 0" class="py-8 text-center text-sm text-gray-400">
              Tidak ada data untuk bulan ini.
            </div>
            <div v-else>
              <label class="flex items-center gap-2 py-2 border-b border-gray-100 mb-2 cursor-pointer">
                <input type="checkbox"
                  :checked="bulkSelected.length === bulkWeddings.length"
                  :indeterminate="bulkSelected.length > 0 && bulkSelected.length < bulkWeddings.length"
                  @change="toggleSelectAll"
                  class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <span class="text-sm font-medium text-gray-700">Pilih Semua ({{ bulkWeddings.length }} peristiwa)</span>
              </label>
              <label v-for="w in bulkWeddings" :key="w.id"
                class="flex items-center gap-2 py-2 border-b border-gray-50 cursor-pointer hover:bg-gray-50 rounded px-1">
                <input type="checkbox" :value="w.id" v-model="bulkSelected"
                  class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-gray-800 truncate">{{ w.groom_name }}</div>
                  <div class="text-xs text-gray-500 truncate">{{ w.bride_name }} · {{ formatDate(w.wedding_date) }}</div>
                </div>
                <span class="text-xs px-2 py-0.5 rounded-full shrink-0"
                  :class="w.status === 'Kantor' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'">
                  {{ w.status }}
                </span>
              </label>
            </div>
          </div>
          <div class="px-5 py-4 border-t border-gray-100 flex items-center justify-between shrink-0">
            <span class="text-sm text-gray-500">{{ bulkSelected.length }} dipilih</span>
            <div class="flex gap-2">
              <button @click="showBulkModal = false" class="px-4 py-2 text-sm rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">
                Batal
              </button>
              <button @click="executeBulkExport" :disabled="bulkSelected.length === 0 || bulkExporting"
                class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">
                <Icon :name="bulkExporting ? 'lucide:loader-2' : 'lucide:printer'" class="w-4 h-4" :class="{'animate-spin': bulkExporting}" />
                {{ bulkExporting ? 'Menyiapkan...' : 'Export PDF' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import AdminDokumentasiAkadPreview from '~/components/admin/DokumentasiAkadPreview.vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '~/components/ui/dialog'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const supabase = useSupabaseClient()

const BULAN_INDO = [
  'Januari','Februari','Maret','April','Mei','Juni',
  'Juli','Agustus','September','Oktober','November','Desember'
]
const BULAN_INDO_UPPER = BULAN_INDO.map(b => b.toUpperCase())

// ── State ─────────────────────────────────────────────────────────
const weddings = ref<any[]>([])
const photoCounts = ref<Record<string, number>>({})
const loading = ref(true)

const searchQuery = ref('')
const filterMonth = ref<number | ''>('')
const filterYear = ref<number | ''>('')
const filterStatus = ref('')
const filterDate = ref('')
const page = ref(1)
const pageSize = 15

// Upload
const fileInputRef = ref<HTMLInputElement | null>(null)
const uploadTargetWedding = ref<any>(null)
const uploadingId = ref<string | null>(null)

// Success modal
const showSuccessModal = ref(false)
const successWedding = ref<any>(null)

// Preview modal
const previewWedding = ref<any>(null)
const previewPhotos = ref<any[]>([])
const previewLoading = ref(false)
const previewRef = ref<HTMLElement | null>(null)

// Export
const exportingId = ref<string | null>(null)

// Dropdown menu
const openMenuId = ref<string | null>(null)
const menuPosition = ref({ top: 0, right: 0 })
const openMenuWedding = computed(() => weddings.value.find(w => w.id === openMenuId.value) ?? null)

// Bulk modal
const showBulkModal = ref(false)
const bulkMonth = ref(new Date().getMonth() + 1)
const bulkYear = ref(new Date().getFullYear())
const bulkSelected = ref<string[]>([])
const bulkExporting = ref(false)

// ── Lifecycle ────────────────────────────────────────────────────
onMounted(() => {
  document.addEventListener('click', closeMenu)
})


// ── Data Fetching ────────────────────────────────────────────────
const fetchWeddings = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('weddings')
      .select('*')
      .order('wedding_date', { ascending: false })
      .order('wedding_time', { ascending: false })
    if (error) throw error
    weddings.value = data ?? []
    await fetchPhotoCounts()
  } catch (e) {
    console.error('Error fetching weddings:', e)
  } finally {
    loading.value = false
  }
}

const fetchPhotoCounts = async () => {
  try {
    const { data, error } = await supabase.from('wedding_photos').select('wedding_id')
    if (error) throw error
    const counts: Record<string, number> = {}
    for (const row of data ?? []) {
      counts[row.wedding_id] = (counts[row.wedding_id] ?? 0) + 1
    }
    photoCounts.value = counts
  } catch (e) {
    console.warn('wedding_photos table not found (run migration):', e)
  }
}

const fetchPhotosForWedding = async (weddingId: string) => {
  const { data, error } = await supabase
    .from('wedding_photos')
    .select('id, photo_url, order_index')
    .eq('wedding_id', weddingId)
    .order('order_index', { ascending: true })
  if (error) throw error
  return data ?? []
}

// ── Computed ─────────────────────────────────────────────────────
const availableYears = computed(() => {
  const years = new Set(weddings.value.map(w => new Date(w.wedding_date + 'T00:00:00').getFullYear()))
  return [...years].sort((a, b) => b - a)
})

const hasActiveFilters = computed(() =>
  searchQuery.value !== '' || filterMonth.value !== '' || filterYear.value !== '' || filterStatus.value !== '' || filterDate.value !== ''
)

const filteredWeddings = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return weddings.value.filter(w => {
    if (q && !w.groom_name.toLowerCase().includes(q) && !w.bride_name.toLowerCase().includes(q)) return false
    if (filterStatus.value && w.status !== filterStatus.value) return false
    if (filterDate.value && w.wedding_date !== filterDate.value) return false
    const d = new Date(w.wedding_date + 'T00:00:00')
    if (filterMonth.value !== '' && d.getMonth() + 1 !== filterMonth.value) return false
    if (filterYear.value !== '' && d.getFullYear() !== filterYear.value) return false
    return true
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredWeddings.value.length / pageSize)))
const startIndex = computed(() => (page.value - 1) * pageSize)
const endIndex = computed(() => Math.min(startIndex.value + pageSize, filteredWeddings.value.length))
const paginatedWeddings = computed(() => filteredWeddings.value.slice(startIndex.value, endIndex.value))

watch([searchQuery, filterMonth, filterYear, filterStatus, filterDate], () => { page.value = 1 })

const bulkWeddings = computed(() =>
  weddings.value
    .filter(w => {
      const d = new Date(w.wedding_date + 'T00:00:00')
      return d.getMonth() + 1 === bulkMonth.value && d.getFullYear() === bulkYear.value
    })
    .sort((a, b) => a.wedding_date.localeCompare(b.wedding_date))
)

watch([bulkMonth, bulkYear], () => { bulkSelected.value = [] })

// ── Helpers ──────────────────────────────────────────────────────
const clearFilters = () => {
  searchQuery.value = ''
  filterMonth.value = ''
  filterYear.value = ''
  filterStatus.value = ''
  filterDate.value = ''
}

const formatDate = (d: string) =>
  new Date(d + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

// Extract R2 key from either proxy URL (/api/photo/key) or legacy R2 public URL
const extractKey = (url: string): string | null => {
  if (!url) return null
  if (url.startsWith('/api/photo/')) return url.replace('/api/photo/', '')
  // Legacy: https://pub-xxx.r2.dev/key
  const m = url.match(/r2\.dev\/(.+)$/)
  return m ? m[1] : null
}

const formatTanggalUpper = (raw: string) => {
  const d = new Date(raw + 'T00:00:00')
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${dd}-${mm}-${d.getFullYear()}`
}

// ── Dropdown menu ────────────────────────────────────────────────
const toggleMenu = (id: string, event?: MouseEvent) => {
  if (openMenuId.value === id) { openMenuId.value = null; return }
  if (event) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    menuPosition.value = { top: rect.bottom + 4, right: window.innerWidth - rect.right }
  }
  openMenuId.value = id
}

const closeMenu = () => {
  openMenuId.value = null
}

// ── Inline edit ──────────────────────────────────────────────────
type WeddingField = 'no_pendaftaran' | 'no_akta' | 'groom_name' | 'bride_name' | 'wedding_date' | 'status'

// Fields that must not be empty
const REQUIRED_FIELDS: WeddingField[] = ['groom_name', 'bride_name', 'wedding_date', 'status']

const saveEdit = async (wedding: any, field: WeddingField, value: string) => {
  const trimmed = value.trim()
  const current = wedding[field] ?? ''

  // Don't save if unchanged
  if (trimmed === current) return

  // Prevent clearing required fields
  if (REQUIRED_FIELDS.includes(field) && !trimmed) return

  // Optimistic update
  const idx = weddings.value.findIndex(w => w.id === wedding.id)
  const newVal = REQUIRED_FIELDS.includes(field) ? trimmed : (trimmed || null)
  if (idx !== -1) weddings.value[idx][field] = newVal

  const { error } = await supabase
    .from('weddings')
    .update({ [field]: newVal })
    .eq('id', wedding.id)

  if (error) {
    console.error(`Save ${field} error:`, error)
    if (idx !== -1) weddings.value[idx][field] = wedding[field]
  }
}

// ── Upload (single photo, replace if exists) ─────────────────────
const triggerUpload = (wedding: any) => {
  uploadTargetWedding.value = wedding
  fileInputRef.value?.click()
}

const handleFileChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || !files.length || !uploadTargetWedding.value) return
  const wedding = uploadTargetWedding.value
  uploadingId.value = wedding.id

  try {
    // Delete existing photo first (replace behaviour)
    const existingCount = photoCounts.value[wedding.id] ?? 0
    if (existingCount > 0) {
      const existingPhotos = await fetchPhotosForWedding(wedding.id)
      for (const photo of existingPhotos) {
        const key = extractKey(photo.photo_url)
        if (key) await $fetch('/api/upload/photo', { method: 'DELETE', body: { key } }).catch(() => {})
      }
      await supabase.from('wedding_photos').delete().eq('wedding_id', wedding.id)
    }

    // Upload single file
    const file = files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', `wedding-docs/${wedding.id}`)

    const { publicUrl } = await $fetch<{ publicUrl: string; key: string }>(
      '/api/upload/photo',
      { method: 'POST', body: formData }
    )

    const { error: dbError } = await supabase.from('wedding_photos').insert({
      wedding_id: wedding.id,
      photo_url: publicUrl,
      order_index: 0,
    })
    if (dbError) throw dbError

    photoCounts.value[wedding.id] = 1

    if (previewWedding.value?.id === wedding.id) {
      previewPhotos.value = await fetchPhotosForWedding(wedding.id)
    }

    successWedding.value = wedding
    showSuccessModal.value = true
  } catch (err: any) {
    console.error('Upload error:', err)
    alert(`Gagal mengupload foto: ${err?.data?.message ?? err?.message ?? 'Periksa konfigurasi R2 di .env'}`)
  } finally {
    uploadingId.value = null
    if (fileInputRef.value) fileInputRef.value.value = ''
  }
}

// ── Delete photo ─────────────────────────────────────────────────
const deletePhoto = async (wedding: any) => {
  if (!confirm(`Hapus foto dokumentasi ${wedding.groom_name} & ${wedding.bride_name}?`)) return

  try {
    const photos = await fetchPhotosForWedding(wedding.id)
    for (const photo of photos) {
      const key = extractKey(photo.photo_url)
      if (key) await $fetch('/api/upload/photo', { method: 'DELETE', body: { key } }).catch(() => {})
    }
    await supabase.from('wedding_photos').delete().eq('wedding_id', wedding.id)
    photoCounts.value[wedding.id] = 0
    if (previewWedding.value?.id === wedding.id) previewPhotos.value = []
  } catch (err: any) {
    console.error('Delete error:', err)
    alert('Gagal menghapus foto.')
  }
}

// ── Preview ──────────────────────────────────────────────────────
const openPreview = async (wedding: any) => {
  previewWedding.value = wedding
  previewPhotos.value = []
  previewLoading.value = true
  try {
    previewPhotos.value = await fetchPhotosForWedding(wedding.id)
  } catch { previewPhotos.value = [] }
  finally { previewLoading.value = false }
}

const closePreview = () => {
  previewWedding.value = null
  previewPhotos.value = []
}

// ── Export JPG ───────────────────────────────────────────────────
const exportJpg = async (wedding: any) => {
  exportingId.value = wedding.id
  let photos = previewWedding.value?.id === wedding.id ? previewPhotos.value : []
  if (photos.length === 0) {
    try { photos = await fetchPhotosForWedding(wedding.id) } catch { photos = [] }
  }

  const container = document.createElement('div')
  container.style.cssText = 'position:fixed;left:-9999px;top:0;z-index:-1;'
  document.body.appendChild(container)

  const { createApp, defineComponent, h } = await import('vue')
  const app = createApp(defineComponent({
    setup() { return () => h(AdminDokumentasiAkadPreview, { wedding, photos }) }
  }))
  app.mount(container)

  await new Promise(r => setTimeout(r, 800))

  try {
    const html2canvas = (await import('html2canvas')).default
    const canvas = await html2canvas(container.firstElementChild as HTMLElement, {
      useCORS: true, scale: 2, backgroundColor: '#ffffff', logging: false,
    })
    const link = document.createElement('a')
    link.download = `Dokumentasi_${wedding.groom_name}_${wedding.bride_name}.jpg`.replace(/\s+/g, '_')
    link.href = canvas.toDataURL('image/jpeg', 0.92)
    link.click()
  } catch (err) {
    console.error('JPG export error:', err)
    alert('Gagal export JPG. Coba gunakan Export PDF.')
  } finally {
    app.unmount()
    document.body.removeChild(container)
    exportingId.value = null
  }
}

// ── Export PDF ───────────────────────────────────────────────────
const exportPdf = async (wedding: any) => {
  let photos = previewWedding.value?.id === wedding.id ? previewPhotos.value : []
  if (photos.length === 0) {
    try { photos = await fetchPhotosForWedding(wedding.id) } catch { photos = [] }
  }
  openPrintWindow([{ wedding, photos }])
}

// ── Bulk Export ──────────────────────────────────────────────────
const openBulkModal = () => {
  bulkMonth.value = new Date().getMonth() + 1
  bulkYear.value = new Date().getFullYear()
  bulkSelected.value = []
  showBulkModal.value = true
}

const toggleSelectAll = () => {
  bulkSelected.value = bulkSelected.value.length === bulkWeddings.value.length
    ? []
    : bulkWeddings.value.map(w => w.id)
}

const executeBulkExport = async () => {
  bulkExporting.value = true
  try {
    const selected = bulkWeddings.value.filter(w => bulkSelected.value.includes(w.id))
    const pages = await Promise.all(
      selected.map(async wedding => {
        const photos = await fetchPhotosForWedding(wedding.id).catch(() => [])
        return { wedding, photos }
      })
    )
    openPrintWindow(pages)
    showBulkModal.value = false
  } catch (e) {
    console.error('Bulk export error:', e)
    alert('Gagal membuat PDF.')
  } finally {
    bulkExporting.value = false
  }
}

// ── Print Window ─────────────────────────────────────────────────
const buildPageHtml = (wedding: any, photos: any[]) => {
  const isKantor = wedding.status === 'Kantor'
  const d = new Date(wedding.wedding_date + 'T00:00:00')
  const bulan = BULAN_INDO_UPPER[d.getMonth()]
  const tahun = d.getFullYear()
  const tanggal = formatTanggalUpper(wedding.wedding_date)
  const noAkta = wedding.no_akta || '___________________________'
  const noPendaftaran = wedding.no_pendaftaran || '___________________________'

  const photoHtml = photos.length > 0
    ? `<div style="display:flex;flex-direction:column;align-items:center;gap:16px;margin-top:8px;">
        ${photos.map(p => `<div style="width:100%;display:flex;justify-content:center;">
          <img src="${p.photo_url}" crossorigin="anonymous" style="max-width:80%;height:auto;display:block;object-fit:contain;" />
        </div>`).join('')}
       </div>`
    : `<div style="min-height:260px;border:1.5px solid black;display:flex;align-items:center;justify-content:center;color:#ccc;font-size:12px;margin-top:8px;">[ Foto Dokumentasi ]</div>`

  return `
    <div class="page">
      <div style="text-align:center;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:bold;letter-spacing:0.4px;">
          LAMPIRAN DOKUMENTASI PERISTIWA NIKAH ${isKantor ? 'KANTOR' : 'LUAR KANTOR'}
        </div>
        <div style="font-size:14px;font-weight:bold;">KANTOR URUSAN AGAMA KECAMATAN PEBAYURAN</div>
        <div style="font-size:13px;font-weight:bold;margin-top:2px;">BULAN ${bulan} TAHUN ${tahun}</div>
      </div>
      <div style="border-top:2.5px solid black;margin-bottom:18px;"></div>
      <table style="border-collapse:collapse;font-size:13px;line-height:1.9;margin-bottom:16px;">
        <tr>
          <td style="width:190px;">NO. PENDAFTARAN</td>
          <td style="padding:0 10px;">:</td>
          <td style="font-weight:bold;">${noPendaftaran}</td>
        </tr>
        <tr>
          <td>NO. AKTA NIKAH</td>
          <td style="padding:0 10px;">:</td>
          <td style="font-weight:bold;">${noAkta}</td>
        </tr>
        <tr>
          <td>NAMA SUAMI</td>
          <td style="padding:0 10px;">:</td>
          <td style="font-weight:bold;">${wedding.groom_name}</td>
        </tr>
        <tr>
          <td>NAMA ISTRI</td>
          <td style="padding:0 10px;">:</td>
          <td style="font-weight:bold;">${wedding.bride_name}</td>
        </tr>
        <tr>
          <td>TANGGAL AKAD</td>
          <td style="padding:0 10px;">:</td>
          <td style="font-weight:bold;">${tanggal}</td>
        </tr>
      </table>
      ${photoHtml}
    </div>`
}

const openPrintWindow = (pages: { wedding: any; photos: any[] }[]) => {
  const w = window.open('', '_blank')
  if (!w) { alert('Pop-up diblokir browser. Izinkan pop-up untuk halaman ini.'); return }

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
  <title>Dokumentasi Akad</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Liberation Serif', 'Times New Roman', serif; font-size: 13px; background: white; }
    .page { width: 794px; min-height: 1123px; padding: 56px 70px; margin: 0 auto; background: white; }
    .page + .page { page-break-before: always; }
    @media print {
      body { margin: 0; }
      .page { margin: 0; page-break-after: always; }
    }
  </style></head><body>
  ${pages.map(({ wedding, photos }) => buildPageHtml(wedding, photos)).join('')}
  <script>window.onload=()=>{setTimeout(()=>{window.print()},600)}<\/script>
  </body></html>`

  w.document.write(html)
  w.document.close()
}

onMounted(() => {
  fetchWeddings()
  document.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenu)
})
</script>

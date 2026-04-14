<template>
  <div>
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Jadwal Pernikahan</h2>
        <p class="mt-1 text-sm text-gray-500">Kelola semua jadwal akad nikah di sini.</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <NuxtLink 
          to="/admin/weddings/create"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto"
        >
          <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
          Tambah Jadwal
        </NuxtLink>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-7 gap-4">
        <!-- Search -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Cari Nama Catin</label>
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="lucide:search" class="h-4 w-4 text-gray-400" />
            </div>
            <input 
              v-model="searchQuery"
              type="text" 
              class="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500" 
              placeholder="Nama..."
            >
          </div>
        </div>

        <!-- Filter Reg Date -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Tgl Daftar</label>
          <input 
            v-model="filterRegDate"
            type="date" 
            class="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          >
        </div>

        <!-- Filter From Date -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Dari Tgl Akad</label>
          <input 
            v-model="filterFromDate"
            type="date" 
            class="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          >
        </div>

        <!-- Filter Specific Date -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Tgl Akad</label>
          <input 
            v-model="filterDate"
            type="date" 
            class="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          >
        </div>

        <!-- Filter Officiant -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Penghulu</label>
          <select 
            v-model="filterOfficiant"
            class="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Semua</option>
            <option value="UNASSIGNED">(Belum Ditentukan)</option>
            <option v-for="officiant in uniqueOfficiants" :key="officiant" :value="officiant">
              {{ officiant }}
            </option>
          </select>
        </div>

        <!-- Filter Status -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
          <select 
            v-model="filterStatus"
            class="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Semua</option>
            <option value="Kantor">Kantor</option>
            <option value="Luar Kantor">Luar Kantor</option>
          </select>
        </div>

        <!-- Sort Order -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Urutan</label>
          <select 
            v-model="sortOrder"
            class="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="desc">Terbaru</option>
            <option value="asc">Terlama</option>
          </select>
        </div>
      </div>
      
      <!-- Clear Filters Button -->
      <div class="mt-4 flex justify-end" v-if="hasActiveFilters">
        <button @click="clearFilters" class="text-sm text-gray-500 hover:text-gray-700 flex items-center">
          <Icon name="lucide:x" class="w-4 h-4 mr-1" />
          Hapus Filter
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden mb-6">
      <div v-if="loading" class="p-8 text-center text-gray-500">
        <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin mx-auto mb-2" />
        Memuat data...
      </div>
      
      <div v-else-if="filteredWeddings.length === 0" class="p-12 text-center">
        <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Icon name="lucide:search-x" class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-1">Tidak ada data</h3>
        <p class="text-gray-500">Coba ubah kata kunci pencarian atau filter Anda.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Daftar</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal & Jam Akad</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catin</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penghulu</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="relative px-6 py-3"><span class="sr-only">Aksi</span></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="wedding in paginatedWeddings" :key="wedding.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ wedding.registration_date ? formatDate(wedding.registration_date) : '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ formatDate(wedding.wedding_date) }}</div>
                <div class="text-sm text-gray-500">{{ wedding.wedding_time.substring(0, 5) }} WIB</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ wedding.groom_name }}</div>
                <div class="text-xs text-gray-400 font-medium my-0.5">DENGAN</div>
                <div class="text-sm font-medium text-gray-900">{{ wedding.bride_name }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 max-w-xs truncate" :title="wedding.location">{{ wedding.location }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ wedding.officiant_name || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="wedding.status === 'Kantor' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'"
                >
                  {{ wedding.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <NuxtLink :to="`/admin/weddings/${wedding.id}`" class="text-emerald-600 hover:text-emerald-900 mr-4">Edit</NuxtLink>
                <button @click="deleteWedding(wedding.id)" class="text-red-600 hover:text-red-900">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div v-if="filteredWeddings.length > 0" class="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button @click="currentPage--" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
            Previous
          </button>
          <button @click="currentPage++" :disabled="currentPage >= totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div class="flex items-center space-x-4">
            <p class="text-sm text-gray-700">
              Menampilkan
              <span class="font-medium">{{ startIndex + 1 }}</span>
              sampai
              <span class="font-medium">{{ endIndex }}</span>
              dari
              <span class="font-medium">{{ filteredWeddings.length }}</span>
              hasil
            </p>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-700">Tampilkan:</span>
              <select v-model="itemsPerPage" class="block w-full py-1 pl-2 pr-8 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                <option :value="7">7</option>
                <option :value="15">15</option>
                <option :value="30">30</option>
                <option :value="50">50</option>
              </select>
            </div>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                @click="currentPage--" 
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span class="sr-only">Previous</span>
                <Icon name="lucide:chevron-left" class="h-5 w-5" />
              </button>
              
              <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                Halaman {{ currentPage }} dari {{ totalPages }}
              </span>

              <button 
                @click="currentPage++" 
                :disabled="currentPage >= totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span class="sr-only">Next</span>
                <Icon name="lucide:chevron-right" class="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const supabase = useSupabaseClient()
const weddings = ref<any[]>([])
const loading = ref(true)

// Filter & Search State
const searchQuery = ref('')
const filterFromDate = ref('')
const filterDate = ref('')
const filterRegDate = ref('')
const filterOfficiant = ref('')
const filterStatus = ref('')
const sortOrder = ref('desc') // Default to newest first

// Pagination State
const currentPage = ref(1)
const itemsPerPage = ref(7) // Updated default to 7

const fetchWeddings = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('weddings')
      .select('*')
      // Initial fetch can be any order, we sort in computed
      .order('wedding_date', { ascending: false })
      .order('wedding_time', { ascending: false })
      
    if (error) throw error
    weddings.value = data || []
  } catch (error) {
    console.error('Error fetching weddings:', error)
  } finally {
    loading.value = false
  }
}

// Computed: Unique Officiants for dropdown
const uniqueOfficiants = computed(() => {
  const officiants = weddings.value.map(w => w.officiant_name).filter(Boolean)
  return [...new Set(officiants)].sort()
})

// Computed: Filtered & Sorted Weddings
const filteredWeddings = computed(() => {
  let result = weddings.value.filter(wedding => {
    // Search
    const searchLower = searchQuery.value.toLowerCase()
    const matchesSearch = !searchQuery.value || 
      (wedding.groom_name && wedding.groom_name.toLowerCase().includes(searchLower)) ||
      (wedding.bride_name && wedding.bride_name.toLowerCase().includes(searchLower))

    // Filter From Date
    const matchesFromDate = !filterFromDate.value || wedding.wedding_date >= filterFromDate.value

    // Filter Date
    const matchesDate = !filterDate.value || wedding.wedding_date === filterDate.value

    // Filter Registration Date
    const matchesRegDate = !filterRegDate.value || wedding.registration_date === filterRegDate.value

    // Filter Officiant
    let matchesOfficiant = true
    if (filterOfficiant.value !== '') {
      if (filterOfficiant.value === 'UNASSIGNED') {
        matchesOfficiant = !wedding.officiant_name
      } else {
        matchesOfficiant = wedding.officiant_name === filterOfficiant.value
      }
    }

    // Filter Status
    const matchesStatus = !filterStatus.value || wedding.status === filterStatus.value

    return matchesSearch && matchesFromDate && matchesDate && matchesRegDate && matchesOfficiant && matchesStatus
  })

  // Apply Sorting
  return result.sort((a, b) => {
    const dateA = new Date(`${a.wedding_date}T${a.wedding_time}`).getTime()
    const dateB = new Date(`${b.wedding_date}T${b.wedding_time}`).getTime()
    
    if (sortOrder.value === 'asc') {
      return dateA - dateB
    } else {
      return dateB - dateA
    }
  })
})

// Computed: Pagination variables
const totalPages = computed(() => Math.ceil(filteredWeddings.value.length / itemsPerPage.value) || 1)
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredWeddings.value.length))

const paginatedWeddings = computed(() => {
  return filteredWeddings.value.slice(startIndex.value, endIndex.value)
})

// Check if any filter is active
const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' || filterFromDate.value !== '' || filterDate.value !== '' || filterRegDate.value !== '' || filterOfficiant.value !== '' || filterStatus.value !== ''
})

const clearFilters = () => {
  searchQuery.value = ''
  filterFromDate.value = ''
  filterDate.value = ''
  filterRegDate.value = ''
  filterOfficiant.value = ''
  filterStatus.value = ''
  sortOrder.value = 'asc'
}

// Reset pagination when filters or sort change
watch([searchQuery, filterFromDate, filterDate, filterRegDate, filterOfficiant, filterStatus, sortOrder, itemsPerPage], () => {
  currentPage.value = 1
})

const deleteWedding = async (id: string) => {
  if (!confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) return
  
  try {
    const { error } = await supabase
      .from('weddings')
      .delete()
      .eq('id', id)
      
    if (error) throw error
    weddings.value = weddings.value.filter(w => w.id !== id)
  } catch (error) {
    console.error('Error deleting wedding:', error)
    alert('Gagal menghapus jadwal')
  }
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

onMounted(() => {
  fetchWeddings()
})
</script>

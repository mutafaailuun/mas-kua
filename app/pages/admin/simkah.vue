<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Sync SIMKAH</h2>
      <p class="mt-1 text-sm text-gray-500">
        Sinkronisasi data dari SIMKAH: pendaftaran baru, nomor akta, dan nama penghulu.
      </p>
    </div>

    <!-- Status Cards -->
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <p class="text-xs text-gray-500">Terakhir Sync</p>
        <p class="mt-1 text-lg font-semibold text-gray-900">{{ lastSyncLabel }}</p>
      </div>
      <div class="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <p class="text-xs text-gray-500">Ditambah (hari ini)</p>
        <p class="mt-1 text-lg font-semibold text-emerald-600">{{ todayStats.inserted }}</p>
      </div>
      <div class="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <p class="text-xs text-gray-500">Diperbarui (hari ini)</p>
        <p class="mt-1 text-lg font-semibold text-blue-600">{{ todayStats.updated }}</p>
      </div>
    </div>

    <!-- Trigger Sync Manual -->
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="font-semibold text-gray-900">Sync Manual</h3>
          <p class="text-sm text-gray-500 mt-1">
            Tarik data terbaru dari SIMKAH sekarang. Pastikan tab SIMKAH aktif di Chrome.
          </p>
        </div>
        <button
          @click="requestSync"
          :disabled="syncRequested"
          class="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
        >
          <Icon name="lucide:refresh-cw" class="w-4 h-4" :class="syncRequested ? 'animate-spin' : ''" />
          {{ syncRequested ? 'Permintaan dikirim...' : 'Sync Sekarang' }}
        </button>
      </div>

      <div v-if="syncRequested" class="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800">
        Permintaan sync terkirim. Claude Code akan menjalankan sync otomatis dalam beberapa saat.
        Pastikan Claude Code sedang aktif.
      </div>
    </div>

    <!-- Log Sync -->
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 class="font-semibold text-gray-900 mb-4">Riwayat Sync</h3>
      <div v-if="loading" class="text-center py-8 text-gray-400">
        <Icon name="lucide:loader-2" class="w-6 h-6 animate-spin mx-auto" />
      </div>
      <div v-else-if="syncLogs.length === 0" class="text-center py-8 text-gray-400 text-sm">
        Belum ada riwayat sync.
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="log in syncLogs"
          :key="log.id"
          class="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
        >
          <Icon
            :name="log.status === 'success' ? 'lucide:check-circle-2' : 'lucide:x-circle'"
            class="w-4 h-4 mt-0.5 shrink-0"
            :class="log.status === 'success' ? 'text-emerald-600' : 'text-red-500'"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-900">{{ log.summary }}</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ formatTime(log.created_at) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Rekap Data Kosong -->
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 class="font-semibold text-gray-900 mb-3">Status Kelengkapan Data</h3>
      <div v-if="loadingStats" class="text-center py-4 text-gray-400">
        <Icon name="lucide:loader-2" class="w-5 h-5 animate-spin mx-auto" />
      </div>
      <div v-else class="grid grid-cols-2 gap-4">
        <div class="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
          <p class="text-xs text-yellow-700">Tanpa No. Akta</p>
          <p class="text-xl font-bold text-yellow-900">{{ dbStats.noAkta }}</p>
          <p class="text-xs text-yellow-600">pernikahan mendatang</p>
        </div>
        <div class="p-3 rounded-lg bg-orange-50 border border-orange-200">
          <p class="text-xs text-orange-700">Tanpa Penghulu</p>
          <p class="text-xl font-bold text-orange-900">{{ dbStats.noPenghulu }}</p>
          <p class="text-xs text-orange-600">pernikahan mendatang</p>
        </div>
        <div class="p-3 rounded-lg bg-blue-50 border border-blue-200">
          <p class="text-xs text-blue-700">Tanpa No. HP</p>
          <p class="text-xl font-bold text-blue-900">{{ dbStats.noHP }}</p>
          <p class="text-xs text-blue-600">pernikahan mendatang</p>
        </div>
        <div class="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
          <p class="text-xs text-emerald-700">Total Mendatang</p>
          <p class="text-xl font-bold text-emerald-900">{{ dbStats.total }}</p>
          <p class="text-xs text-emerald-600">dari hari ini ke depan</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const supabase = useSupabaseClient()

const loading = ref(true)
const loadingStats = ref(true)
const syncRequested = ref(false)
const syncLogs = ref<any[]>([])
const todayStats = ref({ inserted: 0, updated: 0 })
const dbStats = ref({ noAkta: 0, noPenghulu: 0, noHP: 0, total: 0 })
const lastSyncLabel = ref('Belum pernah')

function formatTime(ts: string) {
  return new Date(ts).toLocaleString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

async function requestSync() {
  syncRequested.value = true
  try {
    await supabase.from('simkah_sync_log').insert({ status: 'requested', summary: 'Sync manual diminta dari dashboard' })
  } catch {}
  setTimeout(() => { syncRequested.value = false }, 5000)
}

async function fetchLogs() {
  loading.value = true
  try {
    const { data } = await supabase
      .from('simkah_sync_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    syncLogs.value = data ?? []
    if (data && data.length > 0) {
      lastSyncLabel.value = formatTime(data[0].created_at)
    }
    // Stats hari ini
    const today = new Date().toISOString().split('T')[0]
    const todayLogs = (data ?? []).filter(l => l.created_at?.startsWith(today) && l.status === 'success')
    todayStats.value = {
      inserted: todayLogs.reduce((s: number, l: any) => s + (l.inserted ?? 0), 0),
      updated: todayLogs.reduce((s: number, l: any) => s + (l.updated ?? 0), 0),
    }
  } finally {
    loading.value = false
  }
}

async function fetchDbStats() {
  loadingStats.value = true
  try {
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase
      .from('weddings')
      .select('no_akta, officiant_name, phone_number')
      .gte('wedding_date', today)
    const rows = data ?? []
    dbStats.value = {
      total: rows.length,
      noAkta: rows.filter(r => !r.no_akta).length,
      noPenghulu: rows.filter(r => !r.officiant_name || r.officiant_name === '').length,
      noHP: rows.filter(r => !r.phone_number).length,
    }
  } finally {
    loadingStats.value = false
  }
}

onMounted(() => {
  fetchLogs()
  fetchDbStats()
})
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>

    <!-- ── STAT CARDS ── -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="p-3 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
          <Icon name="lucide:file-text" class="w-5 h-5" />
        </div>
        <div>
          <p class="text-xs font-medium text-gray-500">Total Artikel</p>
          <p class="text-2xl font-bold text-gray-900">{{ loading ? '…' : totalArticles }}</p>
        </div>
      </div>
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="p-3 rounded-lg bg-blue-50 text-blue-600 shrink-0">
          <Icon name="lucide:check-circle" class="w-5 h-5" />
        </div>
        <div>
          <p class="text-xs font-medium text-gray-500">Published</p>
          <p class="text-2xl font-bold text-gray-900">{{ loading ? '…' : publishedArticles }}</p>
        </div>
      </div>
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="p-3 rounded-lg bg-pink-50 text-pink-600 shrink-0">
          <Icon name="lucide:heart" class="w-5 h-5" />
        </div>
        <div>
          <p class="text-xs font-medium text-gray-500">Total Nikah</p>
          <p class="text-2xl font-bold text-gray-900">{{ loading ? '…' : totalWeddings }}</p>
        </div>
      </div>
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="p-3 rounded-lg bg-amber-50 text-amber-600 shrink-0">
          <Icon name="lucide:calendar" class="w-5 h-5" />
        </div>
        <div>
          <p class="text-xs font-medium text-gray-500">Bulan Ini</p>
          <p class="text-2xl font-bold text-gray-900">{{ loading ? '…' : weddingsThisMonth }}</p>
        </div>
      </div>
    </div>

    <!-- ── JADWAL AKAD NIKAH ── -->
    <div class="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div class="mb-4">
        <h3 class="text-sm font-semibold text-gray-800">Jadwal Akad Nikah</h3>
        <p class="text-xs text-gray-400 mt-0.5">Daftar akad nikah terjadwal secara real-time.</p>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 bg-gray-100 rounded-full p-1 w-fit mb-4">
        <button
          v-for="tab in scheduleTabs"
          :key="tab.key"
          @click="scheduleTab = tab.key"
          :class="[
            'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all',
            scheduleTab === tab.key
              ? 'bg-white text-emerald-700 shadow-sm border border-emerald-200'
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          <Icon :name="tab.icon" class="w-4 h-4" />
          {{ tab.label }}
        </button>
      </div>

      <!-- Empty state -->
      <div v-if="filteredSchedule.length === 0" class="border-2 border-dashed border-gray-200 rounded-xl py-10 flex flex-col items-center gap-3 text-gray-400">
        <Icon name="lucide:calendar-x" class="w-10 h-10" />
        <p class="text-sm">{{ emptyScheduleMessage }}</p>
      </div>

      <!-- Wedding rows -->
      <div v-else class="space-y-2">
        <div
          v-for="w in filteredSchedule"
          :key="w.id"
          class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100"
        >
          <div class="p-2.5 rounded-lg bg-pink-50 text-pink-500 shrink-0">
            <Icon name="lucide:heart" class="w-4 h-4" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-gray-800 truncate">{{ w.groom_name }} & {{ w.bride_name }}</p>
            <p class="text-xs text-gray-500 mt-0.5 truncate">{{ w.location ?? '—' }}</p>
            <p v-if="w.officiant_name" class="text-xs text-gray-400 truncate">{{ w.officiant_name }}</p>
          </div>
          <div class="text-right shrink-0">
            <p class="text-sm font-medium text-gray-700">{{ w.wedding_time ? w.wedding_time.slice(0, 5) : '—' }}</p>
            <span
              :class="[
                'text-xs px-2 py-0.5 rounded-full',
                w.status === 'Kantor' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              ]"
            >{{ w.status }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── CHARTS ROW ── -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">

      <!-- Bar Chart: Nikah per Bulan -->
      <div class="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-sm font-semibold text-gray-800">Jumlah Nikah per Bulan</h3>
            <p class="text-xs text-gray-400 mt-0.5">Total peristiwa nikah tiap bulan</p>
          </div>
          <select
            v-model="barYear"
            class="text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          >
            <option v-for="y in availableYears" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
        <div class="relative h-56">
          <canvas ref="barCanvasRef" />
        </div>
      </div>

      <!-- Pie Chart: Nikah per Desa -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-sm font-semibold text-gray-800">Sebaran per Desa</h3>
            <p class="text-xs text-gray-400 mt-0.5">Persentase lokasi nikah</p>
          </div>
          <div class="flex gap-1.5">
            <select
              v-model="pieMonth"
              class="text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            >
              <option value="0">Semua Bulan</option>
              <option v-for="(name, idx) in BULAN_INDO" :key="idx" :value="idx + 1">{{ name }}</option>
            </select>
            <select
              v-model="pieYear"
              class="text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            >
              <option v-for="y in availableYears" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
        </div>
        <div class="relative h-44">
          <canvas ref="pieCanvasRef" />
        </div>
        <!-- Legend -->
        <div class="mt-3 space-y-1 max-h-28 overflow-y-auto">
          <div v-for="(item, i) in pieLegend" :key="i" class="flex items-center gap-2 text-xs text-gray-600">
            <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ background: item.color }" />
            <span class="truncate flex-1">{{ item.label }}</span>
            <span class="font-medium tabular-nums shrink-0">{{ item.count }} ({{ item.pct }}%)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend,
         ArcElement, PieController } from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, PieController)

definePageMeta({ layout: 'admin', middleware: 'admin' })

const supabase = useSupabaseClient()

const BULAN_INDO = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
const BULAN_FULL = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

// ── State ─────────────────────────────────────────────────────────
const loading = ref(true)
const totalArticles = ref(0)
const publishedArticles = ref(0)
const totalWeddings = ref(0)
const weddingsThisMonth = ref(0)
const weddings = ref<any[]>([])

const now = new Date()
const barYear = ref(now.getFullYear())
const pieMonth = ref(0)
const pieYear = ref(now.getFullYear())

const availableYears = computed(() => {
  const years = new Set(weddings.value.map(w => new Date(w.wedding_date + 'T00:00:00').getFullYear()))
  years.add(now.getFullYear())
  return [...years].sort((a, b) => b - a)
})

// ── Canvas refs ───────────────────────────────────────────────────
const barCanvasRef = ref<HTMLCanvasElement | null>(null)
const pieCanvasRef = ref<HTMLCanvasElement | null>(null)
let barChart: Chart | null = null
let pieChart: Chart | null = null

// ── Desa extractor ────────────────────────────────────────────────
const DESA_PEBAYURAN = [
  'KARANGHARJA', 'KARANGPATRI', 'KARANGHAUR', 'KARANGJAYA',
  'BANTARSARI',  'BANTARJAYA',  'KERTASARI',  'KARANGREJA',
  'KARANGSEGAR', 'SUMBERURIP',  'SUMBEREJA',  'SUMBERSARI',
  'KERTAJAYA',
]

const extractDesa = (location: string): string => {
  if (!location) return 'Lainnya'
  const loc = location.toUpperCase()

  // 1. Scan known desa names first (most reliable)
  for (const desa of DESA_PEBAYURAN) {
    if (loc.includes(desa)) return desa
  }

  // 2. Try regex: text after RT/RW pattern
  const m = loc.match(/RT\.?\s*\d+[\/.]\d+\s+(?:DS\.?\s+)?([A-Z][A-Z\s]+)$/)
  if (m) {
    const candidate = m[1].trim()
    // Check if candidate contains a known desa substring
    const found = DESA_PEBAYURAN.find(d => candidate.includes(d))
    if (found) return found
  }

  // 3. Match "DS XXXXX" or "DESA XXXXX" pattern
  const ds = loc.match(/(?:DS\.?|DESA)\s+([A-Z]+)/)
  if (ds) {
    const found = DESA_PEBAYURAN.find(d => d.includes(ds[1]) || ds[1].includes(d))
    if (found) return found
  }

  return 'Lainnya'
}

// ── Colour palette ────────────────────────────────────────────────
const PALETTE = [
  '#10b981','#3b82f6','#f59e0b','#ef4444','#8b5cf6',
  '#06b6d4','#f97316','#ec4899','#84cc16','#6366f1',
  '#14b8a6','#e11d48','#a855f7','#0ea5e9','#f43f5e',
]

// ── Bar chart data ────────────────────────────────────────────────
const barData = computed(() => {
  const counts = Array(12).fill(0)
  weddings.value.forEach(w => {
    const d = new Date(w.wedding_date + 'T00:00:00')
    if (d.getFullYear() === barYear.value) counts[d.getMonth()]++
  })
  return counts
})

// ── Pie chart data ────────────────────────────────────────────────
const pieData = computed(() => {
  const filtered = weddings.value.filter(w => {
    const d = new Date(w.wedding_date + 'T00:00:00')
    const yearOk = d.getFullYear() === pieYear.value
    const monthOk = pieMonth.value === 0 || d.getMonth() + 1 === pieMonth.value
    return yearOk && monthOk
  })
  const map: Record<string, number> = {}
  filtered.forEach(w => {
    const desa = w.status === 'Kantor' ? 'KUA Pebayuran' : extractDesa(w.location ?? '')
    map[desa] = (map[desa] ?? 0) + 1
  })
  return Object.entries(map).sort((a, b) => b[1] - a[1])
})

const pieLegend = computed(() => {
  const total = pieData.value.reduce((s, [, n]) => s + n, 0)
  return pieData.value.map(([label, count], i) => ({
    label,
    count,
    pct: total ? Math.round(count / total * 100) : 0,
    color: PALETTE[i % PALETTE.length],
  }))
})

// ── Chart render ──────────────────────────────────────────────────
const renderBar = () => {
  if (!barCanvasRef.value) return
  if (barChart) barChart.destroy()
  barChart = new Chart(barCanvasRef.value, {
    type: 'bar',
    data: {
      labels: BULAN_INDO,
      datasets: [{
        label: 'Jumlah Nikah',
        data: barData.value,
        backgroundColor: '#10b981cc',
        borderColor: '#10b981',
        borderWidth: 1.5,
        borderRadius: 5,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => BULAN_FULL[items[0].dataIndex],
            label: (item) => ` ${item.raw} peristiwa nikah`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1, font: { size: 11 } },
          grid: { color: '#f1f5f9' },
        },
        x: { ticks: { font: { size: 11 } }, grid: { display: false } },
      },
    },
  })
}

const renderPie = () => {
  if (!pieCanvasRef.value) return
  if (pieChart) pieChart.destroy()
  const labels = pieData.value.map(([l]) => l)
  const data   = pieData.value.map(([, n]) => n)
  const colors = labels.map((_, i) => PALETTE[i % PALETTE.length])

  pieChart = new Chart(pieCanvasRef.value, {
    type: 'pie',
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors, borderWidth: 1.5, borderColor: '#fff' }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (item) => {
              const total = (item.dataset.data as number[]).reduce((a, b) => a + b, 0)
              const pct = total ? Math.round((item.raw as number) / total * 100) : 0
              return ` ${item.label}: ${item.raw} (${pct}%)`
            },
          },
        },
      },
    },
  })
}

// ── Schedule tabs ─────────────────────────────────────────────────
const scheduleTab = ref<'today' | 'tomorrow' | 'week'>('today')

const scheduleTabs = [
  { key: 'today',    label: 'Hari Ini',   icon: 'lucide:calendar-check' },
  { key: 'tomorrow', label: 'Besok',      icon: 'lucide:calendar-clock' },
  { key: 'week',     label: 'Minggu Ini', icon: 'lucide:calendar-range' },
] as const

const toDateStr = (d: Date) => d.toISOString().slice(0, 10)

const filteredSchedule = computed(() => {
  const todayStr    = toDateStr(now)
  const tomorrow    = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  const tomorrowStr = toDateStr(tomorrow)

  const daysFromMon = now.getDay() === 0 ? 6 : now.getDay() - 1
  const weekStart   = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysFromMon)
  const weekEnd     = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysFromMon + 6)
  const weekStartStr = toDateStr(weekStart)
  const weekEndStr   = toDateStr(weekEnd)

  return weddings.value
    .filter(w => {
      const d = w.wedding_date
      if (scheduleTab.value === 'today')    return d === todayStr
      if (scheduleTab.value === 'tomorrow') return d === tomorrowStr
      return d >= weekStartStr && d <= weekEndStr
    })
    .sort((a, b) => (a.wedding_time ?? '').localeCompare(b.wedding_time ?? ''))
})

const emptyScheduleMessage = computed(() => {
  if (scheduleTab.value === 'today')    return 'Tidak ada jadwal akad nikah hari ini.'
  if (scheduleTab.value === 'tomorrow') return 'Tidak ada jadwal akad nikah besok.'
  return 'Tidak ada jadwal akad nikah minggu ini.'
})

// ── Watchers ──────────────────────────────────────────────────────
watch(barYear, () => nextTick(renderBar))
watch([pieMonth, pieYear], () => nextTick(renderPie))

// ── Data fetch ────────────────────────────────────────────────────
onMounted(async () => {
  try {
    const [articlesRes, weddingsRes] = await Promise.all([
      supabase.from('articles').select('id, published'),
      supabase.from('weddings').select('id, wedding_date, wedding_time, groom_name, bride_name, location, officiant_name, status'),
    ])
    if (articlesRes.error) throw articlesRes.error
    if (weddingsRes.error) throw weddingsRes.error

    if (articlesRes.data) {
      totalArticles.value = articlesRes.data.length
      publishedArticles.value = articlesRes.data.filter(a => a.published).length
    }
    if (weddingsRes.data) {
      weddings.value = weddingsRes.data
      totalWeddings.value = weddingsRes.data.length
      weddingsThisMonth.value = weddingsRes.data.filter(w => {
        const d = new Date(w.wedding_date + 'T00:00:00')
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      }).length
    }
  } catch (err) {
    console.error('Dashboard fetch error:', err)
  } finally {
    loading.value = false
    await nextTick()
    renderBar()
    renderPie()
  }
})

onUnmounted(() => {
  barChart?.destroy()
  pieChart?.destroy()
})
</script>

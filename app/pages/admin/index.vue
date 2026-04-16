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
const extractDesa = (location: string): string => {
  if (!location) return 'Lainnya'
  // Match text after RT/RW numbers, e.g. "RT 002/005 BANTARJAYA" → BANTARJAYA
  const m = location.match(/RT\.?\s*\d+[\/.]\d+\s+(?:DS\.?\s+)?([A-Z][A-Z\s]+)$/i)
  if (m) return m[1].trim().toUpperCase()
  // Fallback: match "DS XXXXX" or "DESA XXXXX"
  const ds = location.match(/(?:DS\.?|DESA)\s+([A-Z][A-Z\s]+)/i)
  if (ds) return ds[1].trim().toUpperCase()
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
    const desa = extractDesa(w.location ?? '')
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

// ── Watchers ──────────────────────────────────────────────────────
watch(barYear, () => nextTick(renderBar))
watch([pieMonth, pieYear], () => nextTick(renderPie))

// ── Data fetch ────────────────────────────────────────────────────
onMounted(async () => {
  try {
    const [articlesRes, weddingsRes] = await Promise.all([
      supabase.from('articles').select('id, published'),
      supabase.from('weddings').select('id, wedding_date, location'),
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

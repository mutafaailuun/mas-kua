<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Kalkulator Hari Kerja</h2>
      <p class="mt-1 text-sm text-gray-500">
        Menghitung hari kerja berdasarkan hari libur nasional & cuti bersama Indonesia.
        Syarat minimum: <strong>11 hari kerja</strong> (10 hari kerja + 1 hari pengaman).
      </p>
    </div>

    <!-- Tabs Mode -->
    <div class="flex gap-1 bg-gray-100 rounded-full p-1 w-fit mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="mode = tab.key"
        :class="[
          'px-5 py-1.5 rounded-full text-sm font-medium transition-all',
          mode === tab.key
            ? 'bg-white text-emerald-700 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">

      <!-- MODE 1: Dari tanggal daftar → akad paling awal -->
      <template v-if="mode === 'daftar'">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Pendaftaran</label>
          <input
            v-model="inputDaftar"
            type="date"
            class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
          <p class="mt-1 text-xs text-gray-400">Tanggal catin mendaftar ke KUA</p>
        </div>

        <button
          @click="hitungDariDaftar"
          :disabled="!inputDaftar || loading"
          class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon v-if="loading" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          <Icon v-else name="lucide:calculator" class="w-4 h-4" />
          Hitung Akad Paling Awal
        </button>

        <div v-if="hasilDaftar" class="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
          <p class="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Akad paling awal dapat dilaksanakan</p>
          <p class="text-2xl font-bold text-emerald-900">{{ hasilDaftar.hari }}</p>
          <p class="text-base text-emerald-700">{{ hasilDaftar.tanggal }}</p>
          <div class="mt-3 pt-3 border-t border-emerald-200">
            <p class="text-xs text-emerald-600">{{ hasilDaftar.keterangan }}</p>
          </div>
        </div>
      </template>

      <!-- MODE 2: Dari tanggal akad → batas pendaftaran -->
      <template v-else-if="mode === 'akad'">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Akad</label>
          <input
            v-model="inputAkad"
            type="date"
            class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
          <p class="mt-1 text-xs text-gray-400">Tanggal rencana pelaksanaan akad nikah</p>
        </div>

        <button
          @click="hitungDariAkad"
          :disabled="!inputAkad || loading"
          class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon v-if="loading" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          <Icon v-else name="lucide:calendar-check" class="w-4 h-4" />
          Hitung Batas Pendaftaran
        </button>

        <div v-if="hasilAkad" class="rounded-lg bg-blue-50 border border-blue-200 p-4">
          <p class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Batas pendaftaran (paling lambat)</p>
          <p class="text-2xl font-bold text-blue-900">{{ hasilAkad.hari }}</p>
          <p class="text-base text-blue-700">{{ hasilAkad.tanggal }}</p>
          <div class="mt-3 pt-3 border-t border-blue-200">
            <p class="text-xs text-blue-600">{{ hasilAkad.keterangan }}</p>
          </div>
        </div>
      </template>

      <!-- MODE 3: Validasi dua tanggal -->
      <template v-else>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Pendaftaran</label>
            <input
              v-model="inputValidDaftar"
              type="date"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Akad</label>
            <input
              v-model="inputValidAkad"
              type="date"
              class="block w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
          </div>
        </div>

        <button
          @click="hitungValidasi"
          :disabled="!inputValidDaftar || !inputValidAkad || loading"
          class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon v-if="loading" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          <Icon v-else name="lucide:shield-check" class="w-4 h-4" />
          Validasi
        </button>

        <div v-if="hasilValidasi !== null" class="rounded-lg p-4" :class="hasilValidasi.ok ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
          <div class="flex items-center gap-2 mb-2">
            <Icon
              :name="hasilValidasi.ok ? 'lucide:check-circle-2' : 'lucide:x-circle'"
              class="w-5 h-5"
              :class="hasilValidasi.ok ? 'text-green-600' : 'text-red-500'"
            />
            <p class="font-semibold text-sm" :class="hasilValidasi.ok ? 'text-green-800' : 'text-red-700'">
              {{ hasilValidasi.ok ? 'Pendaftaran Valid' : 'Pendaftaran Tidak Valid' }}
            </p>
          </div>
          <p class="text-sm" :class="hasilValidasi.ok ? 'text-green-700' : 'text-red-600'">
            Jarak antara pendaftaran dan akad:
            <strong>{{ hasilValidasi.jumlah }} hari kerja</strong>
          </p>
          <p v-if="!hasilValidasi.ok" class="text-xs mt-1 text-red-500">
            Kurang {{ 11 - hasilValidasi.jumlah }} hari kerja dari syarat minimum 11 hari kerja (10+1). Perlu dispensasi.
          </p>
          <p v-else class="text-xs mt-1 text-green-600">
            Memenuhi syarat minimum 11 hari kerja (10+1) sebelum akad.
          </p>
        </div>
      </template>

    </div>

    <!-- Info Hari Libur yang Dipakai -->
    <div v-if="liburDipakai.length > 0" class="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <Icon name="lucide:info" class="w-4 h-4 text-gray-400" />
        Hari Libur / Cuti Bersama yang Diperhitungkan
      </h3>
      <ul class="space-y-1.5">
        <li
          v-for="libur in liburDipakai"
          :key="libur.date"
          class="flex items-start gap-2 text-sm"
        >
          <span class="shrink-0 text-xs font-mono text-gray-400 pt-0.5 w-24">{{ formatTanggalPendek(libur.date) }}</span>
          <span class="text-gray-700">{{ libur.name }}</span>
          <span
            class="shrink-0 text-xs px-1.5 py-0.5 rounded-full"
            :class="libur.is_national_holiday ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'"
          >
            {{ libur.is_national_holiday ? 'Libur' : 'Cuti' }}
          </span>
        </li>
      </ul>
    </div>

    <!-- Error -->
    <div v-if="apiError" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
      <Icon name="lucide:wifi-off" class="w-4 h-4 shrink-0" />
      Gagal memuat data hari libur. Periksa koneksi internet.
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const { tambahHariKerja, kurangHariKerja, hitungHariKerja, formatTanggal } = useHariKerja()

const tabs = [
  { key: 'daftar', label: 'Dari Tgl Daftar' },
  { key: 'akad', label: 'Dari Tgl Akad' },
  { key: 'validasi', label: 'Validasi' },
]
const mode = ref<'daftar' | 'akad' | 'validasi'>('daftar')

const loading = ref(false)
const apiError = ref(false)

const inputDaftar = ref('')
const inputAkad = ref('')
const inputValidDaftar = ref('')
const inputValidAkad = ref('')

interface HitungHasil {
  hari: string
  tanggal: string
  keterangan: string
}

const hasilDaftar = ref<HitungHasil | null>(null)
const hasilAkad = ref<HitungHasil | null>(null)
const hasilValidasi = ref<{ ok: boolean; jumlah: number } | null>(null)
const liburDipakai = ref<{ date: string; name: string; is_national_holiday: boolean }[]>([])

function formatTanggalPendek(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function buatHasil(date: Date, prefix: string): HitungHasil {
  const full = formatTanggal(date)
  const parts = full.split(', ')
  return {
    hari: parts[0] ?? '',
    tanggal: parts.slice(1).join(', ') || full,
    keterangan: `${prefix} setelah memperhitungkan hari libur nasional & cuti bersama.`,
  }
}

async function ambilLiburDiRange(from: string, to: string) {
  apiError.value = false
  liburDipakai.value = []
  const start = new Date(from + 'T00:00:00')
  const end = new Date(to + 'T00:00:00')
  const years = new Set<number>()
  for (let y = start.getFullYear(); y <= end.getFullYear(); y++) years.add(y)

  const allData: { date: string; name: string; is_national_holiday: boolean }[] = []
  for (const y of years) {
    try {
      const data = await $fetch<{ date: string; name: string; is_national_holiday: boolean }[]>(
        `https://libur.deno.dev/api?year=${y}`
      )
      allData.push(...data)
    } catch {
      apiError.value = true
    }
  }

  // Filter hanya yang masuk di range
  liburDipakai.value = allData.filter(h => {
    const d = h.date.slice(0, 10)
    return d > from && d <= to
  }).sort((a, b) => a.date.localeCompare(b.date))
}

async function hitungDariDaftar() {
  if (!inputDaftar.value) return
  loading.value = true
  hasilDaftar.value = null
  try {
    const result = await tambahHariKerja(inputDaftar.value, 11)
    if (result) {
      hasilDaftar.value = buatHasil(result, '11 hari kerja (10+1) dihitung maju')
      await ambilLiburDiRange(inputDaftar.value, result.toISOString().slice(0, 10))
    }
  } finally {
    loading.value = false
  }
}

async function hitungDariAkad() {
  if (!inputAkad.value) return
  loading.value = true
  hasilAkad.value = null
  try {
    const result = await kurangHariKerja(inputAkad.value, 11)
    if (result) {
      hasilAkad.value = buatHasil(result, '11 hari kerja (10+1) dihitung mundur dari tanggal akad')
      await ambilLiburDiRange(result.toISOString().slice(0, 10), inputAkad.value)
    }
  } finally {
    loading.value = false
  }
}

async function hitungValidasi() {
  if (!inputValidDaftar.value || !inputValidAkad.value) return
  loading.value = true
  hasilValidasi.value = null
  try {
    const jumlah = await hitungHariKerja(inputValidDaftar.value, inputValidAkad.value)
    hasilValidasi.value = { ok: jumlah >= 11, jumlah }
    const start = inputValidDaftar.value < inputValidAkad.value ? inputValidDaftar.value : inputValidAkad.value
    const end = inputValidDaftar.value < inputValidAkad.value ? inputValidAkad.value : inputValidDaftar.value
    await ambilLiburDiRange(start, end)
  } finally {
    loading.value = false
  }
}

// Reset hasil saat mode berubah
watch(mode, () => {
  hasilDaftar.value = null
  hasilAkad.value = null
  hasilValidasi.value = null
  liburDipakai.value = []
  apiError.value = false
})
</script>

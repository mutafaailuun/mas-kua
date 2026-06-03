<template>
  <div v-if="weddingDate" class="rounded-lg border p-4" :class="panelClass">
    <div class="flex items-start gap-3">
      <Icon name="lucide:calendar-clock" class="w-5 h-5 shrink-0 mt-0.5" :class="iconClass" />
      <div class="text-sm w-full">
        <p class="font-semibold mb-2" :class="titleClass">Pengecekan 10 Hari Kerja</p>

        <div v-if="loading" class="flex items-center gap-2 text-gray-500">
          <Icon name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          <span>Menghitung hari libur nasional...</span>
        </div>

        <template v-else>
          <!-- Batas pendaftaran -->
          <div class="flex flex-wrap items-baseline gap-1 mb-1">
            <span class="text-gray-600">Batas pendaftaran (maks):</span>
            <span class="font-medium text-gray-900">{{ batasPendaftaranStr }}</span>
          </div>

          <!-- Status validasi -->
          <div v-if="registrationDate" class="mt-2 flex items-center gap-2 text-sm font-medium" :class="statusClass">
            <Icon :name="validasiOk ? 'lucide:check-circle-2' : 'lucide:x-circle'" class="w-4 h-4 shrink-0" />
            <span v-if="validasiOk">
              Pendaftaran valid — {{ hariKerjaHitung }} hari kerja sebelum akad
            </span>
            <span v-else>
              Baru {{ hariKerjaHitung }} hari kerja — kurang dari min. 10 hari kerja (perlu dispensasi)
            </span>
          </div>
          <div v-else class="mt-1 text-xs text-gray-400">
            Isi tanggal pendaftaran untuk melihat status validasi.
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  weddingDate: string
  registrationDate: string
}>()

const { kurangHariKerja, hitungHariKerja, formatTanggal } = useHariKerja()

const loading = ref(false)
const batasPendaftaranStr = ref('')
const hariKerjaHitung = ref(0)

const validasiOk = computed(() => hariKerjaHitung.value >= 10)

const panelClass = computed(() => {
  if (!props.registrationDate) return 'bg-blue-50 border-blue-200'
  return validasiOk.value ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
})

const iconClass = computed(() => {
  if (!props.registrationDate) return 'text-blue-500'
  return validasiOk.value ? 'text-green-600' : 'text-red-500'
})

const titleClass = computed(() => {
  if (!props.registrationDate) return 'text-blue-800'
  return validasiOk.value ? 'text-green-800' : 'text-red-800'
})

const statusClass = computed(() =>
  validasiOk.value ? 'text-green-700' : 'text-red-600'
)

let latestCallId = 0

watch(
  [() => props.weddingDate, () => props.registrationDate],
  async ([weddingDate, registrationDate]) => {
    const callId = ++latestCallId
    if (!weddingDate) {
      batasPendaftaranStr.value = ''
      hariKerjaHitung.value = 0
      return
    }
    loading.value = true
    const batas = await kurangHariKerja(weddingDate, 10)
    if (callId !== latestCallId) return
    batasPendaftaranStr.value = batas ? formatTanggal(batas) : '-'
    if (registrationDate) {
      const count = await hitungHariKerja(registrationDate, weddingDate)
      if (callId !== latestCallId) return
      hariKerjaHitung.value = count
    } else {
      hariKerjaHitung.value = 0
    }
    loading.value = false
  },
  { immediate: true }
)
</script>

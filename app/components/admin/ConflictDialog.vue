<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="$emit('cancel')"
    >
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <!-- Header -->
        <div class="flex items-center gap-3 p-5 border-b border-red-100 bg-red-50">
          <div class="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <Icon name="lucide:alert-triangle" class="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 class="text-base font-semibold text-red-900">Jadwal Bentrok!</h3>
            <p class="text-sm text-red-600">Penghulu sudah memiliki jadwal di waktu yang sama</p>
          </div>
        </div>

        <!-- Body -->
        <div class="p-5">
          <p class="text-sm text-gray-600 mb-3">
            <span class="font-semibold text-gray-800">{{ officiantName }}</span>
            sudah terdaftar pada jadwal berikut:
          </p>
          <ul class="space-y-2">
            <li
              v-for="w in conflicts"
              :key="w.id"
              class="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200"
            >
              <Icon name="lucide:calendar-x" class="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div class="text-sm">
                <div class="font-medium text-gray-900">{{ w.groom_name }} &amp; {{ w.bride_name }}</div>
                <div class="text-gray-500">{{ formatDateTime(w.wedding_date, w.wedding_time) }} &bull; {{ w.location || 'Lokasi belum diisi' }}</div>
              </div>
            </li>
          </ul>
          <p class="mt-4 text-sm text-gray-500">
            Apakah Anda tetap ingin menyimpan jadwal ini?
          </p>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 px-5 py-4 bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            @click="$emit('cancel')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="button"
            @click="$emit('confirm')"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700"
          >
            <Icon name="lucide:save" class="w-4 h-4 mr-1.5" />
            Tetap Simpan
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  officiantName: string
  conflicts: Array<{
    id: string
    groom_name: string
    bride_name: string
    wedding_date: string
    wedding_time: string
    location: string
  }>
}>()

defineEmits<{
  cancel: []
  confirm: []
}>()

const formatDateTime = (date: string, time: string) => {
  const d = new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  return `${d}, ${time.substring(0, 5)} WIB`
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen pt-24 pb-16">
    <!-- Page Header -->
    <div class="bg-emerald-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-3xl sm:text-4xl font-extrabold">Jadwal Akad Nikah</h1>
        <p class="mt-3 text-emerald-200 text-lg max-w-2xl mx-auto">
          Pantau jadwal pelaksanaan akad nikah di Kecamatan Pebayuran secara real-time.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <!-- Stats Bar -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
          <p class="text-2xl sm:text-3xl font-extrabold text-emerald-700">{{ monthlyTotal }}</p>
          <p class="text-xs sm:text-sm text-gray-500 mt-0.5">Total Bulan Ini</p>
        </div>
        <div class="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
          <p class="text-2xl sm:text-3xl font-extrabold text-blue-600">{{ monthlyKantor }}</p>
          <p class="text-xs sm:text-sm text-gray-500 mt-0.5">Nikah di Kantor</p>
        </div>
        <div class="bg-white rounded-2xl p-4 text-center shadow-sm border border-amber-100">
          <p class="text-2xl sm:text-3xl font-extrabold text-amber-600">{{ monthlyLuar }}</p>
          <p class="text-xs sm:text-sm text-gray-500 mt-0.5">Nikah di Luar</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Calendar Panel -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <!-- Calendar Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-emerald-700">
            <button
              @click="prevMonth"
              class="p-2 rounded-lg hover:bg-emerald-600 text-white transition-colors"
            >
              <Icon icon="lucide:chevron-left" class="w-5 h-5" />
            </button>
            <h2 class="text-lg font-bold text-white">
              {{ currentMonthLabel }}
            </h2>
            <button
              @click="nextMonth"
              class="p-2 rounded-lg hover:bg-emerald-600 text-white transition-colors"
            >
              <Icon icon="lucide:chevron-right" class="w-5 h-5" />
            </button>
          </div>

          <!-- Days of Week -->
          <div class="grid grid-cols-7 border-b border-gray-100">
            <div
              v-for="day in ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']"
              :key="day"
              class="py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider"
            >
              {{ day }}
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="flex justify-center items-center py-20">
            <Icon icon="lucide:loader-2" class="w-8 h-8 text-emerald-600 animate-spin" />
          </div>

          <!-- Calendar Grid -->
          <div v-else class="grid grid-cols-7">
            <!-- Empty cells for first week offset -->
            <div
              v-for="n in firstDayOffset"
              :key="`empty-${n}`"
              class="min-h-[80px] border-b border-r border-gray-50 bg-gray-50/50"
            ></div>

            <!-- Day cells -->
            <div
              v-for="day in daysInMonth"
              :key="day"
              @click="selectDate(day)"
              class="min-h-[80px] border-b border-r border-gray-100 p-1.5 cursor-pointer transition-colors group"
              :class="[
                isSelected(day) ? 'bg-emerald-50 ring-2 ring-inset ring-emerald-400' : 'hover:bg-gray-50',
                isToday(day) ? 'font-bold' : '',
              ]"
            >
              <!-- Date Number -->
              <div class="flex items-center justify-center w-7 h-7 rounded-full mb-1 text-sm font-semibold"
                :class="[
                  isToday(day) ? 'bg-emerald-600 text-white' : isSelected(day) ? 'bg-emerald-500 text-white' : 'text-gray-700 group-hover:bg-emerald-100 group-hover:text-emerald-700'
                ]"
              >
                {{ day }}
              </div>

              <!-- Wedding badges -->
              <div class="space-y-0.5">
                <div
                  v-for="(w, idx) in (weddingsByDate[dateString(day)] || []).slice(0, 2)"
                  :key="w.id"
                  class="text-[10px] leading-tight px-1 py-0.5 rounded truncate"
                  :class="w.status.includes('Luar') ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'"
                >
                  {{ w.groom_name.split(' ')[0] }}
                </div>
                <div
                  v-if="(weddingsByDate[dateString(day)] || []).length > 2"
                  class="text-[10px] text-gray-400 pl-1"
                >
                  +{{ (weddingsByDate[dateString(day)] || []).length - 2 }} lainnya
                </div>
              </div>
            </div>
          </div>

          <!-- Legend -->
          <div class="flex items-center gap-4 px-6 py-3 border-t border-gray-100 bg-gray-50/50">
            <span class="flex items-center gap-1.5 text-xs text-gray-500">
              <span class="w-3 h-3 rounded-sm bg-blue-100 border border-blue-300 inline-block"></span>
              Nikah di Kantor
            </span>
            <span class="flex items-center gap-1.5 text-xs text-gray-500">
              <span class="w-3 h-3 rounded-sm bg-amber-100 border border-amber-300 inline-block"></span>
              Nikah di Luar Kantor
            </span>
          </div>
        </div>

        <!-- Detail Panel -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <!-- Detail Header -->
          <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 class="font-bold text-gray-900 flex items-center gap-2">
              <Icon icon="lucide:calendar-check" class="w-5 h-5 text-emerald-600" />
              {{ selectedDateLabel }}
            </h3>
            <p class="text-sm text-gray-500 mt-0.5">
              {{ selectedDayWeddings.length }} jadwal akad nikah
            </p>
          </div>

          <!-- Detail List -->
          <div class="flex-1 overflow-y-auto divide-y divide-gray-50">
            <div v-if="selectedDayWeddings.length === 0" class="flex flex-col items-center justify-center py-16 text-center px-6">
              <Icon icon="lucide:calendar-x" class="w-10 h-10 text-gray-200 mb-3" />
              <p class="text-gray-400 text-sm">Tidak ada jadwal akad nikah</p>
              <p class="text-gray-300 text-xs mt-1">untuk tanggal ini</p>
            </div>

            <div
              v-for="(w, idx) in selectedDayWeddings"
              :key="w.id"
              class="px-5 py-4 hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  {{ idx + 1 }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-900 text-sm leading-snug">
                    {{ w.groom_name }}
                    <span class="text-emerald-600">&</span>
                    {{ w.bride_name }}
                  </p>
                  <div class="mt-1.5 space-y-1">
                    <div class="flex items-center gap-1.5 text-xs text-gray-500">
                      <Icon icon="lucide:clock" class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      {{ w.wedding_time.substring(0, 5) }} WIB
                    </div>
                    <div class="flex items-start gap-1.5 text-xs text-gray-500">
                      <Icon icon="lucide:map-pin" class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span class="line-clamp-2">{{ w.location }}</span>
                    </div>
                    <div class="flex items-center gap-1.5 text-xs text-gray-500">
                      <Icon icon="lucide:user-check" class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      {{ w.officiant_name }}
                    </div>
                  </div>
                  <span
                    class="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    :class="w.status.includes('Luar') ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'"
                  >
                    {{ w.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Full Monthly List -->
      <div class="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h3 class="font-bold text-gray-900 flex items-center gap-2">
            <Icon icon="lucide:list" class="w-5 h-5 text-emerald-600" />
            Semua Jadwal — {{ currentMonthLabel }}
          </h3>
          <span class="text-sm text-gray-500 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">
            {{ monthlyTotal }} nikah
          </span>
        </div>

        <div v-if="loading" class="flex justify-center py-12">
          <Icon icon="lucide:loader-2" class="w-8 h-8 text-emerald-600 animate-spin" />
        </div>

        <div v-else-if="monthlyWeddings.length === 0" class="text-center py-16">
          <Icon icon="lucide:calendar-x" class="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p class="text-gray-400">Belum ada jadwal akad nikah bulan ini.</p>
        </div>

        <div v-else class="divide-y divide-gray-50">
          <template v-for="(group, date) in groupedByDate" :key="date">
            <!-- Date Group Header -->
            <div class="px-6 py-3 bg-emerald-50/60 flex items-center gap-3 sticky top-0">
              <div class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {{ new Date(date).getDate() }}
              </div>
              <div>
                <p class="font-semibold text-emerald-800 text-sm">{{ formatFullDate(date) }}</p>
                <p class="text-xs text-emerald-600">{{ group.length }} akad nikah</p>
              </div>
            </div>

            <!-- Weddings in Group -->
            <div
              v-for="(w, idx) in group"
              :key="w.id"
              class="px-6 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <div class="text-center w-16 flex-shrink-0">
                <p class="text-sm font-bold text-emerald-700">{{ w.wedding_time.substring(0, 5) }}</p>
                <p class="text-[10px] text-gray-400 uppercase">WIB</p>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-gray-900 text-sm truncate">
                  {{ w.groom_name }} <span class="text-emerald-500">&</span> {{ w.bride_name }}
                </p>
                <p class="text-xs text-gray-500 truncate mt-0.5">
                  <span class="inline-flex items-center gap-1">
                    <Icon icon="lucide:map-pin" class="w-3 h-3 text-emerald-400" />
                    {{ w.location }}
                  </span>
                  <span class="mx-2 text-gray-300">·</span>
                  <span class="inline-flex items-center gap-1">
                    <Icon icon="lucide:user-check" class="w-3 h-3 text-emerald-400" />
                    {{ w.officiant_name }}
                  </span>
                </p>
              </div>
              <span
                class="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                :class="w.status.includes('Luar') ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'"
              >
                {{ w.status.includes('Luar') ? 'Luar' : 'Kantor' }}
              </span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Tables } from "~/types/database.types";

type Wedding = Tables<"weddings">;

useHead({
  title: "Jadwal Akad Nikah | KUA Kecamatan Pebayuran",
  meta: [
    {
      name: "description",
      content:
        "Pantau jadwal pelaksanaan akad nikah di Kecamatan Pebayuran secara real-time.",
    },
  ],
});

const today = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth()); // 0-indexed

const selectedDay = ref<number | null>(today.getDate());
const monthlyWeddings = ref<Wedding[]>([]);
const loading = ref(true);

// --- Computed ---

const currentMonthLabel = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).toLocaleDateString(
    "id-ID",
    { month: "long", year: "numeric" }
  );
});

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDayOffset = computed(() => {
  // getDay() returns 0=Sun, adjust so Mon is first... actually keep Sun first like calendar
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

const weddingsByDate = computed(() => {
  const map: Record<string, Wedding[]> = {};
  for (const w of monthlyWeddings.value) {
    if (!map[w.wedding_date]) map[w.wedding_date] = [];
    map[w.wedding_date].push(w);
  }
  return map;
});

const selectedDayWeddings = computed(() => {
  if (!selectedDay.value) return [];
  return weddingsByDate.value[dateString(selectedDay.value)] || [];
});

const selectedDateLabel = computed(() => {
  if (!selectedDay.value) return "Pilih tanggal";
  return new Date(
    currentYear.value,
    currentMonth.value,
    selectedDay.value
  ).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});

const monthlyTotal = computed(() => monthlyWeddings.value.length);
const monthlyKantor = computed(
  () => monthlyWeddings.value.filter((w) => !w.status.includes("Luar")).length
);
const monthlyLuar = computed(
  () => monthlyWeddings.value.filter((w) => w.status.includes("Luar")).length
);

const groupedByDate = computed(() => {
  const sorted = [...monthlyWeddings.value].sort((a, b) => {
    if (a.wedding_date !== b.wedding_date)
      return a.wedding_date.localeCompare(b.wedding_date);
    return a.wedding_time.localeCompare(b.wedding_time);
  });
  return sorted.reduce((acc, w) => {
    if (!acc[w.wedding_date]) acc[w.wedding_date] = [];
    acc[w.wedding_date].push(w);
    return acc;
  }, {} as Record<string, Wedding[]>);
});

// --- Methods ---

const dateString = (day: number) => {
  const m = String(currentMonth.value + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${currentYear.value}-${m}-${d}`;
};

const isToday = (day: number) => {
  return (
    day === today.getDate() &&
    currentMonth.value === today.getMonth() &&
    currentYear.value === today.getFullYear()
  );
};

const isSelected = (day: number) => day === selectedDay.value;

const selectDate = (day: number) => {
  selectedDay.value = day;
};

const formatFullDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const fetchMonthWeddings = async () => {
  loading.value = true;
  let supabase;
  try {
    supabase = useSupabaseClient();
  } catch (e) {
    loading.value = false;
    return;
  }
  try {
    const m = String(currentMonth.value + 1).padStart(2, "0");
    const startDate = `${currentYear.value}-${m}-01`;
    const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
    const endDate = `${currentYear.value}-${m}-${String(lastDay).padStart(2, "0")}`;

    const { data, error } = await supabase
      .from("weddings")
      .select("*")
      .gte("wedding_date", startDate)
      .lte("wedding_date", endDate)
      .order("wedding_date")
      .order("wedding_time");

    if (error) throw error;
    monthlyWeddings.value = data || [];
  } catch (e) {
    console.error("Error fetching weddings:", e);
  } finally {
    loading.value = false;
  }
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  selectedDay.value = null;
  fetchMonthWeddings();
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  selectedDay.value = null;
  fetchMonthWeddings();
};

onMounted(fetchMonthWeddings);
</script>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Tables } from "~/types/database.types";

type Wedding = Tables<"weddings">;

const todayWeddings = ref<Wedding[]>([]);
const tomorrowWeddings = ref<Wedding[]>([]);
const weeklyWeddings = ref<Wedding[]>([]);
const loading = ref(true);

const fetchWeddings = async () => {
	loading.value = true;
	let supabase;
	try {
		supabase = useSupabaseClient();
	} catch (error) {
		console.error("Supabase client unavailable:", error);
		loading.value = false;
		return;
	}
	try {
		const getLocalYMD = (d: Date) => {
			const y = d.getFullYear();
			const m = String(d.getMonth() + 1).padStart(2, "0");
			const dStr = String(d.getDate()).padStart(2, "0");
			return `${y}-${m}-${dStr}`;
		};

		const now = new Date();
		const todayStr = getLocalYMD(now);

		const tomorrow = new Date(now);
		tomorrow.setDate(now.getDate() + 1);
		const tomorrowStr = getLocalYMD(tomorrow);

		// Get start and end of week (Monday to Sunday)
		const day = now.getDay();
		const diffToMon = day === 0 ? -6 : 1 - day;
		const startOfWeek = new Date(now);
		startOfWeek.setDate(now.getDate() + diffToMon);
		const startOfWeekStr = getLocalYMD(startOfWeek);

		const endOfWeek = new Date(startOfWeek);
		endOfWeek.setDate(startOfWeek.getDate() + 6);
		const endOfWeekStr = getLocalYMD(endOfWeek);

		const [todayRes, tomorrowRes, weeklyRes] = await Promise.all([
			supabase
				.from("weddings")
				.select("*")
				.eq("wedding_date", todayStr)
				.order("wedding_time"),
			supabase
				.from("weddings")
				.select("*")
				.eq("wedding_date", tomorrowStr)
				.order("wedding_time"),
			supabase
				.from("weddings")
				.select("*")
				.gte("wedding_date", startOfWeekStr)
				.lte("wedding_date", endOfWeekStr)
				.order("wedding_date")
				.order("wedding_time"),
		]);

		todayWeddings.value = todayRes.data || [];
		tomorrowWeddings.value = tomorrowRes.data || [];
		weeklyWeddings.value = weeklyRes.data || [];
	} catch (error) {
		console.error("Error fetching weddings:", error);
	} finally {
		loading.value = false;
	}
};

onMounted(fetchWeddings);

const activeTab = ref("today");

const tabs = [
	{ id: "today", name: "Hari Ini", icon: "lucide:calendar-check" },
	{ id: "tomorrow", name: "Besok", icon: "lucide:calendar-days" },
	{ id: "weekly", name: "Minggu Ini", icon: "lucide:calendar-range" },
];

const formatDate = (dateStr: string) => {
	return new Date(dateStr).toLocaleDateString("id-ID", {
		weekday: "long",
		day: "numeric",
		month: "long",
	});
};

const groupByDate = (weddings: Wedding[]) => {
	return weddings.reduce(
		(acc, wedding) => {
			const date = wedding.wedding_date;
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(wedding);
			return acc;
		},
		{} as Record<string, Wedding[]>,
	);
};
</script>

<template>
	<section id="jadwal" class="py-16 bg-white overflow-hidden">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-sm font-bold tracking-wide text-emerald-600 uppercase">
					Informasi Layanan
				</h2>
				<p class="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
					Jadwal Akad Nikah
				</p>
				<p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
					Pantau jadwal pelaksanaan akad nikah di wilayah Kecamatan Pebayuran
					secara real-time.
				</p>
			</div>

			<div class="max-w-4xl mx-auto">
				<!-- Tabs Navigation -->
				<div
					class="flex flex-wrap justify-center gap-2 mb-8 p-1 bg-gray-100 rounded-xl"
				>
					<button
						v-for="tab in tabs"
						:key="tab.id"
						@click="activeTab = tab.id"
						class="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
						:class="
							activeTab === tab.id
								? 'bg-white text-emerald-700 shadow-sm'
								: 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
						"
					>
						<Icon :icon="tab.icon" class="w-4 h-4" />
						{{ tab.name }}
					</button>
				</div>

				<!-- Content Area -->
				<div v-if="loading" class="flex justify-center py-20">
					<Icon
						icon="lucide:loader-2"
						class="w-10 h-10 text-emerald-600 animate-spin"
					/>
				</div>

				<div v-else class="space-y-6">
					<!-- Today's Weddings -->
					<div
						v-if="activeTab === 'today'"
						class="animate-in fade-in slide-in-from-bottom-4 duration-500"
					>
						<div
							v-if="todayWeddings.length === 0"
							class="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200"
						>
							<Icon
								icon="lucide:calendar-x"
								class="w-12 h-12 text-gray-300 mx-auto mb-3"
							/>
							<p class="text-gray-500 font-medium">
								Tidak ada jadwal akad nikah hari ini.
							</p>
						</div>
						<div v-else class="grid gap-4">
							<div
								v-for="w in todayWeddings"
								:key="w.id"
								class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center gap-4"
							>
								<div
									class="bg-emerald-50 text-emerald-700 font-bold px-4 py-2 rounded-xl text-center min-w-[100px]"
								>
									{{ w.wedding_time.substring(0, 5) }}
									<span class="text-xs block font-normal">WIB</span>
								</div>
								<div class="flex-grow">
									<h3 class="font-bold text-gray-900 text-lg">
										{{ w.groom_name }} & {{ w.bride_name }}
									</h3>
									<div
										class="flex flex-wrap gap-x-6 gap-y-1 mt-1 text-sm text-gray-600"
									>
										<span class="flex items-center gap-1.5">
											<Icon
												icon="lucide:map-pin"
												class="w-4 h-4 text-emerald-500"
											/>
											{{ w.location }}
										</span>
										<span class="flex items-center gap-1.5">
											<Icon
												icon="lucide:user-check"
												class="w-4 h-4 text-emerald-500"
											/>
											{{ w.officiant_name }}
										</span>
									</div>
								</div>
								<div class="flex items-center shrink-0">
									<span
										class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
										:class="
											w.status.includes('Luar')
												? 'bg-amber-100 text-amber-700'
												: 'bg-blue-100 text-blue-700'
										"
									>
										{{ w.status }}
									</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Tomorrow's Weddings -->
					<div
						v-if="activeTab === 'tomorrow'"
						class="animate-in fade-in slide-in-from-bottom-4 duration-500"
					>
						<div
							v-if="tomorrowWeddings.length === 0"
							class="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200"
						>
							<Icon
								icon="lucide:calendar-x"
								class="w-12 h-12 text-gray-300 mx-auto mb-3"
							/>
							<p class="text-gray-500 font-medium">
								Tidak ada jadwal akad nikah untuk besok.
							</p>
						</div>
						<div v-else class="grid gap-4">
							<div
								v-for="w in tomorrowWeddings"
								:key="w.id"
								class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center gap-4"
							>
								<div
									class="bg-emerald-50 text-emerald-700 font-bold px-4 py-2 rounded-xl text-center min-w-[100px]"
								>
									{{ w.wedding_time.substring(0, 5) }}
									<span class="text-xs block font-normal">WIB</span>
								</div>
								<div class="flex-grow">
									<h3 class="font-bold text-gray-900 text-lg">
										{{ w.groom_name }} & {{ w.bride_name }}
									</h3>
									<div
										class="flex flex-wrap gap-x-6 gap-y-1 mt-1 text-sm text-gray-600"
									>
										<span class="flex items-center gap-1.5">
											<Icon
												icon="lucide:map-pin"
												class="w-4 h-4 text-emerald-500"
											/>
											{{ w.location }}
										</span>
										<span class="flex items-center gap-1.5">
											<Icon
												icon="lucide:user-check"
												class="w-4 h-4 text-emerald-500"
											/>
											{{ w.officiant_name }}
										</span>
									</div>
								</div>
								<div class="flex items-center shrink-0">
									<span
										class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
										:class="
											w.status.includes('Luar')
												? 'bg-amber-100 text-amber-700'
												: 'bg-blue-100 text-blue-700'
										"
									>
										{{ w.status }}
									</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Weekly Summary -->
					<div
						v-if="activeTab === 'weekly'"
						class="animate-in fade-in slide-in-from-bottom-4 duration-500"
					>
						<div
							v-if="weeklyWeddings.length === 0"
							class="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200"
						>
							<Icon
								icon="lucide:calendar-x"
								class="w-12 h-12 text-gray-300 mx-auto mb-3"
							/>
							<p class="text-gray-500 font-medium">
								Belum ada data akad nikah untuk minggu ini.
							</p>
						</div>
						<div v-else class="space-y-8">
							<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
								<div
									class="bg-emerald-600 text-white p-6 rounded-2xl text-center shadow-lg shadow-emerald-100"
								>
									<p class="text-sm font-medium opacity-80 mb-1">
										Total Minggu Ini
									</p>
									<p class="text-4xl font-extrabold">
										{{ weeklyWeddings.length }}
									</p>
								</div>
								<div
									class="bg-white p-6 rounded-2xl text-center border border-emerald-100 shadow-sm"
								>
									<p class="text-sm font-medium text-gray-500 mb-1 text-center">
										Nikah di Kantor
									</p>
									<p class="text-4xl font-extrabold text-emerald-700">
										{{
											weeklyWeddings.filter((w) => !w.status.includes("Luar"))
												.length
										}}
									</p>
								</div>
								<div
									class="bg-white p-6 rounded-2xl text-center border border-amber-100 shadow-sm"
								>
									<p class="text-sm font-medium text-gray-500 mb-1 text-center">
										Nikah di Luar
									</p>
									<p class="text-4xl font-extrabold text-amber-600">
										{{
											weeklyWeddings.filter((w) => w.status.includes("Luar"))
												.length
										}}
									</p>
								</div>
							</div>

							<!-- List by day -->
							<div class="grid gap-6">
								<div
									v-for="(group, date) in groupByDate(weeklyWeddings)"
									:key="date"
									class="relative pl-8 border-l-2 border-emerald-100 py-1"
								>
									<div
										class="absolute w-4 h-4 bg-emerald-500 rounded-full -left-[9px] top-1.5 border-4 border-white"
									></div>
									<h4
										class="font-bold text-emerald-800 mb-3 flex items-center gap-2"
									>
										<Icon icon="lucide:calendar" class="w-4 h-4" />
										{{ formatDate(date) }}
										<span
											class="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-auto"
											>{{ group.length }} Peristiwa</span
										>
									</h4>
									<div class="grid gap-3">
										<div
											v-for="w in group"
											:key="w.id"
											class="bg-gray-50 rounded-xl p-3 text-sm flex items-center justify-between border border-transparent hover:border-emerald-100 hover:bg-white transition-all"
										>
											<div class="font-medium text-gray-900">
												<span class="text-emerald-600 font-bold mr-2">{{
													w.wedding_time.substring(0, 5)
												}}</span>
												{{ w.groom_name }} & {{ w.bride_name }}
											</div>
											<span
												class="text-[10px] font-bold uppercase text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded"
											>
												{{ w.status.includes("Luar") ? "Luar" : "Kantor" }}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.animate-in {
	animation: animate-in 0.5s ease-out;
}

@keyframes animate-in {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>

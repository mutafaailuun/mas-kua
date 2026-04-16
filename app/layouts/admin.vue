<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside
      class="bg-white border-r border-gray-200 flex flex-col shrink-0 transition-all duration-300 ease-in-out"
      :class="collapsed ? 'w-16' : 'w-64'"
    >
      <!-- Logo + toggle -->
      <div class="h-16 flex items-center border-b border-gray-200 px-3 shrink-0" :class="collapsed ? 'justify-center' : 'justify-between px-5'">
        <h1
          v-if="!collapsed"
          class="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent whitespace-nowrap overflow-hidden"
        >
          CMS Admin
        </h1>
        <button
          @click="collapsed = !collapsed"
          class="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
          :title="collapsed ? 'Buka sidebar' : 'Tutup sidebar'"
        >
          <Icon :name="collapsed ? 'lucide:panel-left-open' : 'lucide:panel-left-close'" class="w-5 h-5" />
        </button>
      </div>

      <!-- Nav -->
      <nav class="flex-1 py-4 space-y-1 overflow-hidden" :class="collapsed ? 'px-2' : 'px-3'">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :exact="item.exact"
          class="flex items-center py-2 text-sm font-medium rounded-md transition-colors group relative"
          :class="[collapsed ? 'justify-center px-2' : 'px-3']"
          active-class="bg-emerald-50 text-emerald-700"
          inactive-class="text-gray-700 hover:bg-gray-100"
        >
          <Icon :name="item.icon" class="w-5 h-5 shrink-0" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed" class="whitespace-nowrap">{{ item.label }}</span>

          <!-- Tooltip when collapsed -->
          <div
            v-if="collapsed"
            class="absolute left-full ml-2 z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-800 rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity"
          >
            {{ item.label }}
          </div>
        </NuxtLink>
      </nav>

      <!-- Logout -->
      <div class="border-t border-gray-200 shrink-0" :class="collapsed ? 'p-2' : 'p-4'">
        <button
          @click="handleLogout"
          class="flex items-center w-full py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors group relative"
          :class="collapsed ? 'justify-center px-2' : 'px-3'"
          title="Log out"
        >
          <Icon name="lucide:log-out" class="w-5 h-5 shrink-0" :class="collapsed ? '' : 'mr-3'" />
          <span v-if="!collapsed">Log out</span>
          <div
            v-if="collapsed"
            class="absolute left-full ml-2 z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-800 rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity"
          >
            Log out
          </div>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10 shrink-0">
        <div class="flex items-center text-sm font-medium text-gray-500">
          <Icon name="lucide:layout-dashboard" class="w-5 h-5 mr-2 text-emerald-600" />
          Admin Area
        </div>
      </header>

      <div class="flex-1 overflow-auto p-8 relative">
        <div class="max-w-6xl mx-auto">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()

const collapsed = ref(false)

const navItems = [
  { to: '/admin', icon: 'lucide:layout-dashboard', label: 'Dashboard', exact: true },
  { to: '/admin/articles', icon: 'lucide:file-text', label: 'Articles', exact: false },
  { to: '/admin/weddings', icon: 'lucide:heart', label: 'Jadwal Nikah', exact: true },
  { to: '/admin/weddings/dokumentasi', icon: 'lucide:camera', label: 'Dokumentasi Akad', exact: false },
  { to: '/admin/surat', icon: 'lucide:file-pen', label: 'Surat Menyurat', exact: false },
]

supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') router.push('/admin/login')
})

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/admin/login')
}
</script>

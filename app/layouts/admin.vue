<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div class="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 class="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          CMS Admin
        </h1>
      </div>
      
      <nav class="flex-1 py-4 px-3 space-y-1">
        <NuxtLink 
          to="/admin" 
          class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
          active-class="bg-emerald-50 text-emerald-700"
          inactive-class="text-gray-700 hover:bg-gray-100"
          :exact="true"
        >
          <Icon name="lucide:layout-dashboard" class="w-5 h-5 mr-3 shrink-0" />
          Dashboard
        </NuxtLink>
        <NuxtLink 
          to="/admin/articles" 
          class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
          active-class="bg-emerald-50 text-emerald-700"
          inactive-class="text-gray-700 hover:bg-gray-100"
        >
          <Icon name="lucide:file-text" class="w-5 h-5 mr-3 shrink-0" />
          Articles
        </NuxtLink>
        <NuxtLink 
          to="/admin/weddings" 
          class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
          active-class="bg-emerald-50 text-emerald-700"
          inactive-class="text-gray-700 hover:bg-gray-100"
        >
          <Icon name="lucide:heart" class="w-5 h-5 mr-3 shrink-0" />
          Weddings
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-gray-200">
        <button 
          @click="handleLogout"
          class="flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          <Icon name="lucide:log-out" class="w-5 h-5 mr-3 shrink-0" />
          Log out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Top header (optional, empty for now but good for spacing/breadcrumbs) -->
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
        <div class="flex items-center text-sm font-medium text-gray-500">
          <Icon name="lucide:layout-dashboard" class="w-5 h-5 mr-2 text-emerald-600" />
          Admin Area
        </div>
      </header>
      
      <!-- Page Content -->
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

// Security: Listen for session expiration or sign out
supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    router.push('/admin/login')
  }
})

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/admin/login')
}
</script>

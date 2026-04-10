<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const user = useSupabaseUser();
const emit = defineEmits(["scrollToSection"]);

const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const onNavLinkClick = (sectionId) => {
  emit("scrollToSection", sectionId);
  mobileMenuOpen.value = false;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 raleway"
    :class="{ 'shadow-md': isScrolled }"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <a href="/">
          <div class="flex items-center gap-3">
            <img src="/logo.png" alt="Logo KUA" class="h-12 w-auto" />
            <h2 class="text-2xl font-bold text-green-700">MAS KUA</h2>
          </div>
        </a>

        <nav
          class="hidden md:flex items-center gap-8 font-medium text-gray-600"
        >
          <a href="/layanan" class="hover:text-green-600">Layanan</a>
          <a href="/jadwal" class="hover:text-green-600">Jadwal Nikah</a>
          <a href="/faq" class="hover:text-green-600">FAQ</a>
          <a
            href="https://wa.me/6287785587322"
            target="_blank"
            class="hover:text-green-600"
            >Hubungi Kami</a
          >
          <NuxtLink 
            v-if="user" 
            to="/admin" 
            class="flex items-center justify-center p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors"
            title="Ke Dashboard Admin"
          >
            <Icon name="lucide:layout-dashboard" class="w-5 h-5" />
          </NuxtLink>
        </nav>

        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden z-30"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <nav
      v-show="mobileMenuOpen"
      class="md:hidden bg-white shadow-lg absolute top-full left-0 w-full"
    >
      <div class="flex flex-col p-4">
        <NuxtLink
          v-if="user"
          to="/admin"
          class="flex items-center gap-2 py-2 px-4 text-emerald-600 bg-emerald-50 rounded mb-2 font-semibold"
        >
          <Icon name="lucide:layout-dashboard" class="w-5 h-5" />
          Dashboard Admin
        </NuxtLink>
        <a
          href="/layanan"
          class="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded"
          >Layanan</a
        >
        <a
          href="/jadwal"
          class="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded"
          >Jadwal Nikah</a
        >
        <a
          @click.prevent="onNavLinkClick('faq')"
          href="#faq"
          class="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded"
          >FAQ</a
        >
        <a
          @click.prevent="onNavLinkClick('kontak')"
          href="#kontak"
          class="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded"
          >Hubungi Kami</a
        >
      </div>
    </nav>
  </header>
</template>

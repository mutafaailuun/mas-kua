<script setup>
import { Icon } from "@iconify/vue";
import { services } from "~/data/services.js";
import { slugify } from "~/utils/slugify";
</script>

<template>
  <section
    id="layanan"
    class="py-20 bg-gray-50 raleway min-h-screen"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-extrabold text-gray-900 tracking-tight">
          Panduan Lengkap Layanan KUA Pebayuran
        </h2>
        <p class="text-xl text-gray-500 mt-4 max-w-3xl mx-auto">
          Semua yang perlu Anda ketahui tentang layanan utama kami, disajikan
          secara jelas dan terperinci.
        </p>
      </div>
      
      <!-- Grid layout for services making them clickable -->
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(service, index) in services"
          :key="index"
          :to="`/layanan/${slugify(service.title)}`"
          class="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-300 group hover:-translate-y-1"
        >
          <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Icon :icon="service.icon || 'lucide:file-text'" class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">{{ service.title }}</h3>
          <p class="text-sm text-gray-500 mt-auto pt-4 flex items-center text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Lihat Persyaratan <Icon icon="lucide:arrow-right" class="w-4 h-4 ml-1" />
          </p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

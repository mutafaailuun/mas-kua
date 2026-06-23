<script setup>
const emit = defineEmits(["scrollToSection"]);
const onButtonClick = (sectionId) => emit("scrollToSection", sectionId);
</script>

<template>
  <section class="relative min-h-screen flex flex-col justify-center overflow-hidden bg-emerald-950 raleway">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-[0.04]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <!-- Gradient overlay kiri -->
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-transparent to-emerald-800/40 pointer-events-none"></div>

    <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
      <div class="max-w-4xl mx-auto text-center">

        <!-- Badge instansi -->
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-200 text-sm font-medium px-4 py-2 rounded-full mb-8">
          <Icon name="lucide:shield-check" class="w-4 h-4 text-emerald-400" />
          Kementerian Agama Republik Indonesia
        </div>

        <!-- Logo + nama instansi -->
        <div class="flex flex-col items-center mb-10">
          <div class="flex items-center gap-5 mb-6">
            <img src="/logo-kemenag.png" alt="Logo Kemenag" class="h-20 w-auto drop-shadow-lg" />
          </div>

          <h1 class="text-white font-extrabold leading-tight">
            <span class="block text-xl sm:text-2xl font-semibold text-emerald-300 tracking-widest uppercase mb-2">
              Kantor Urusan Agama
            </span>
            <span class="block text-4xl sm:text-5xl lg:text-6xl">
              Kecamatan Pebayuran
            </span>
            <span class="block text-lg sm:text-xl text-white/60 font-normal mt-2 tracking-wide">
              Kabupaten Bekasi — Jawa Barat
            </span>
          </h1>
        </div>

        <!-- Tagline -->
        <p class="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Melayani masyarakat dalam urusan pernikahan, konsultasi keluarga, dan administrasi keagamaan
          dengan <span class="text-emerald-300 font-semibold">transparan, cepat, dan profesional</span>.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="https://wa.me/6287785587322"
            target="_blank"
            class="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-green-900/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Icon name="akar-icons:whatsapp-fill" class="w-5 h-5" />
            Hubungi via WhatsApp
          </a>
          <button
            @click="onButtonClick('jadwal')"
            class="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <Icon name="lucide:calendar-days" class="w-5 h-5 text-emerald-300" />
            Jadwal Akad Nikah
          </button>
          <NuxtLink
            to="/layanan"
            class="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <Icon name="lucide:file-text" class="w-5 h-5 text-emerald-300" />
            Persyaratan Layanan
          </NuxtLink>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-5 text-center">
            <div class="text-3xl font-extrabold text-white mb-1">500+</div>
            <div class="text-emerald-300 text-sm font-medium">Pasang Menikah</div>
            <div class="text-white/40 text-xs mt-0.5">Per Tahun</div>
          </div>
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-5 text-center">
            <div class="text-3xl font-extrabold text-white mb-1">14</div>
            <div class="text-emerald-300 text-sm font-medium">Desa Wilayah</div>
            <div class="text-white/40 text-xs mt-0.5">Kec. Pebayuran</div>
          </div>
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-5 text-center">
            <div class="text-3xl font-extrabold text-white mb-1">0 Jam</div>
            <div class="text-emerald-300 text-sm font-medium">Biaya Nikah</div>
            <div class="text-white/40 text-xs mt-0.5">Di Kantor KUA</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom wave -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full h-12 sm:h-16 text-gray-50" fill="currentColor">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { Icon } from "@iconify/vue";
const emit = defineEmits(["scrollToSection"]);

const onButtonClick = (sectionId) => {
  emit("scrollToSection", sectionId);
};
</script>

<template>
  <section class="pt-32 pb-20 bg-gray-50 raleway">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="text-center md:text-left">
          <h1
            class="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
          >
            Urusan di KUA Jadi Lebih Mudah & Pasti
          </h1>
          <p class="text-lg text-gray-600 mb-8">
            Selamat datang di MAS KUA, pusat informasi digital resmi KUA
            Kecamatan Pebayuran. Semua yang Anda butuhkan, dari syarat nikah
            hingga FAQ, kini ada di ujung jari.
          </p>
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <a
              href="https://wa.me/6287785587322"
              target="_blank"
              class="flex items-center justify-center gap-3 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-all transform hover:-translate-y-1"
            >
              <Icon icon="akar-icons:whatsapp-fill" class="w-5 h-5" />
              Tanya via WhatsApp
            </a>
            <a
              href="#layanan"
              @click.prevent="onButtonClick('layanan')"
              class="bg-white text-green-600 border-2 border-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-green-600 hover:text-white transition-colors flex align-center justify-center gap-3"
            >
              <Icon icon="ic:baseline-format-list-numbered" class="w-5 h-5" />
              Lihat Semua Layanan
            </a>
          </div>
        </div>
        <div class="flex justify-center">
          <img
            src="/hero-1.png"
            alt="Ilustrasi Pelayanan KUA"
            class="max-w-xs md:max-w-sm lg:max-w-md w-full"
          />
        </div>
      </div>
    </div>
  </section>
</template>

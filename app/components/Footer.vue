<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <footer class="bg-gray-900 text-white raleway pt-10">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <img src="/logo.png" alt="Logo KUA" class="h-12 w-auto" />
            <div>
              <p class="text-2xl font-bold">MAS KUA</p>
              <p class="text-sm text-gray-400">KUA Pebayuran, Kab. Bekasi</p>
            </div>
          </div>
          <p class="text-gray-400">
            Jl. Raya Pebayuran, Kelurahan Kertasari,<br />
            Pebayuran, Kab. Bekasi
          </p>
          <div>
            <p class="font-semibold text-gray-200">Jam Pelayanan:</p>
            <p class="text-gray-400">Senin - Kamis, 07:30 - 16:00 WIB</p>
            <p class="text-gray-400">Jumat, 07:30 - 16:30 WIB</p>
          </div>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">Tautan Penting</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="https://kemenagkabbekasi.co.id"
                target="_blank"
                class="text-gray-400 hover:text-green-400"
                >Website Kemenag Kab. Bekasi</a
              >
            </li>
            <li>
              <a
                href="https://kemenag.go.id"
                target="_blank"
                class="text-gray-400 hover:text-green-400"
                >Website Kemenag RI</a
              >
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">Sosial Media</h4>
          <div class="flex gap-4">
            <a
              href="https://wa.me/6287785587322"
              aria-label="WhatsApp"
              class="text-gray-400 hover:text-green-400"
              target="_blank"
              ><Icon icon="akar-icons:whatsapp-fill" class="w-7 h-7"
            /></a>
            <a
              href="https://instagram.com/kuapebayuran"
              target="_blank"
              aria-label="Instagram"
              class="text-gray-400 hover:text-green-400"
              ><Icon icon="mdi:instagram" class="w-7 h-7"
            /></a>
          </div>
        </div>
      </div>

      <div
        class="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500"
      >
        <p>
          © 2025 KUA Kecamatan Pebayuran | Inisiasi oleh Jalaludin, Peserta
          Latsar CPNS.
        </p>
      </div>
    </div>
  </footer>
</template>

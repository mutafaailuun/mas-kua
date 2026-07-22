<script setup>
useSeoMeta({
  title: 'Auto Pencairan Jaspro & Transport — Userscript SIMKAH | KUA Pebayuran',
  description: 'Userscript otomatis untuk pengajuan pencairan Jaspro dan Transport di SIMKAH. Satu klik untuk memproses semua baris.',
  ogTitle: 'Auto Pencairan Jaspro & Transport | KUA Pebayuran',
  ogDescription: 'Userscript otomatis untuk pengajuan pencairan Jaspro dan Transport di SIMKAH. Satu klik untuk memproses semua baris.',
  ogType: 'website',
  ogUrl: 'https://kuapebayuran.com/userscripts/auto-pencairan',
})

const installUrl = 'https://gist.githubusercontent.com/mutafaailuun/f80acf8bbde0c70553ab86240f59ae6b/raw/simkah-auto-pencairan.user.js'
const copyText = ref('')

onMounted(async () => {
  const res = await fetch(installUrl)
  copyText.value = await res.text()
})

function copyScript() {
  navigator.clipboard.writeText(copyText.value)
}
</script>

<template>
  <section class="py-5 bg-gray-50 raleway mt-20">
    <div class="py-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">

      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Auto Pencairan Jaspro & Transport
        </h1>
        <p class="text-gray-600 text-sm">Userscript SIMKAH · v1.3.0</p>
      </div>

      <!-- Install CTA -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-10 text-center shadow-lg">
        <p class="text-white text-lg font-semibold mb-4">Butuh Violentmonkey dulu? <a href="https://violentmonkey.github.io/" target="_blank" class="underline underline-offset-2">Install Violentmonkey</a></p>
        <a
          :href="installUrl"
          class="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition shadow-md text-lg"
        >
          <Icon name="lucide:download" class="w-5 h-5" />
          Install Script (1 Klik)
        </a>
        <p class="text-blue-100 text-sm mt-3">Klik link di atas, Violentmonkey akan mendeteksi dan menawarkan instalasi otomatis</p>
      </div>

      <!-- Cara Manual -->
      <div class="bg-white rounded-xl p-6 mb-10 border shadow-sm">
        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Icon name="lucide:clipboard-paste" class="w-5 h-5 text-blue-600" />
          Cara Manual (Copy-Paste)
        </h2>
        <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Klik ikon 🐵 Violentmonkey di toolbar</li>
          <li>Klik <strong>+</strong> (New Script)</li>
          <li>Hapus semua isi editor (Ctrl+A → Delete)</li>
          <li>Copy script di bawah, paste ke editor (Ctrl+V)</li>
          <li>Klik <strong>Save</strong> (Ctrl+S)</li>
        </ol>
        <div class="relative">
          <pre class="bg-gray-900 text-green-400 text-xs p-4 rounded-lg overflow-auto max-h-96"><code>{{ copyText }}</code></pre>
          <button
            @click="copyScript"
            class="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded-md flex items-center gap-1 transition"
          >
            <Icon name="lucide:copy" class="w-3.5 h-3.5" />
            Salin
          </button>
        </div>
      </div>

      <!-- Tutorial -->
      <div class="bg-white rounded-xl p-6 border shadow-sm space-y-6">

        <!-- Cara Pakai -->
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Icon name="lucide:play" class="w-5 h-5 text-emerald-600" />
            Cara Pakai
          </h2>
          <ol class="list-decimal list-inside text-gray-700 space-y-2 ml-2">
            <li>Login ke SIMKAH, buka halaman <strong>Pengajuan Pencairan</strong></li>
            <li>Tombol 🚀 <strong>Auto Cairkan Halaman Ini</strong> muncul di kiri bawah</li>
            <li>Klik tombol — script otomatis memproses semua baris satu per satu</li>
            <li>Selesai! Alert muncul bila semua sudah terproses</li>
          </ol>
          <p class="text-gray-500 text-sm mt-3 ml-2">Klik tombol lagi saat kuning untuk membatalkan proses.</p>
        </div>

        <!-- Cara Kerja -->
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Icon name="lucide:cog" class="w-5 h-5 text-blue-600" />
            Cara Kerja
          </h2>
          <div class="text-gray-700 space-y-2 ml-2">
            <p><strong>Deteksi Halaman</strong> — Memeriksa judul "PENGAJUAN PENCAIRAN" setiap 1 detik. Tombol hanya muncul di halaman yang tepat.</p>
            <p><strong>Wait Grid</strong> — Menunggu loading DevExtreme selesai sebelum berinteraksi.</p>
            <p><strong>Iterasi Baris</strong> — Membaca semua baris dari atas ke bawah, cari yang statusnya "Belum Di Ajukan".</p>
            <p><strong>Auto Klik</strong> — Klik Aksi → menu dropdown → Ajukan → konfirmasi SweetAlert OK.</p>
            <p><strong>Prioritas</strong> — Jaspro diproses lebih dulu, baru Transport.</p>
          </div>
        </div>

        <!-- Kustomisasi KUA Lain -->
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Icon name="lucide:settings" class="w-5 h-5 text-amber-600" />
            Kustomisasi untuk KUA Lain
          </h2>
          <p class="text-gray-600 text-sm mb-3">Jika struktur tabel SIMKAH KUA Anda berbeda, edit script di Violentmonkey dan sesuaikan:</p>
          <div class="bg-gray-50 rounded-lg p-4 text-sm font-mono text-gray-800 space-y-1 overflow-x-auto">
            <p><span class="text-blue-600">aria-colindex="3"</span> → kolom Jaspro</p>
            <p><span class="text-blue-600">aria-colindex="4"</span> → kolom Transport</p>
            <p><span class="text-blue-600">aria-colindex="2"</span> → kolom Aksi</p>
            <p><span class="text-blue-600">aria-label="Pengajuan Pencairan Jaspro"</span> → label menu</p>
          </div>
        </div>

        <!-- FAQ -->
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Icon name="lucide:help-circle" class="w-5 h-5 text-red-500" />
            FAQ
          </h2>
          <div class="space-y-3 ml-2">
            <div>
              <p class="font-semibold text-gray-800 text-sm">Tombol tidak muncul?</p>
              <p class="text-gray-600 text-sm">Pastikan Anda di halaman Pengajuan Pencairan, bukan halaman lain.</p>
            </div>
            <div>
              <p class="font-semibold text-gray-800 text-sm">Proses macet?</p>
              <p class="text-gray-600 text-sm">Klik tombol (warna kuning) untuk stop, lalu klik lagi untuk ulang. Refresh jika perlu.</p>
            </div>
            <div>
              <p class="font-semibold text-gray-800 text-sm">Aman?</p>
              <p class="text-gray-600 text-sm">Script hanya berinteraksi dengan UI SIMKAH. Tidak mengirim data keluar, tidak menyimpan apapun.</p>
            </div>
          </div>
        </div>

      </div>

      <!-- Link ke Gist -->
      <div class="text-center mt-8 text-gray-500 text-sm">
        <a href="https://gist.github.com/mutafaailuun/f80acf8bbde0c70553ab86240f59ae6b" target="_blank" class="hover:text-blue-600 underline underline-offset-2">
          Lihat source di GitHub Gist
        </a>
        <span class="mx-2">·</span>
        <span>KUA Pebayuran</span>
      </div>

    </div>
  </section>
</template>

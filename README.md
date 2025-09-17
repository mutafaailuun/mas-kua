// README.md

# MAS KUA Landing Page

Landing page modern untuk layanan **MAS KUA** (Media Aspirasi & Solusi) KUA Kecamatan Pebayuran.

## 🚀 Fitur

- ✅ Desain modern, bersih, dan profesional
- ✅ Fully responsive (Desktop, Tablet, Mobile)
- ✅ Navigasi yang mudah dan intuitif
- ✅ Accordion untuk informasi layanan dan FAQ
- ✅ Integrasi WhatsApp untuk komunikasi cepat
- ✅ Performa optimal dengan Nuxt 3
- ✅ SEO friendly
- ✅ Aksesibilitas web yang baik

## 📦 Teknologi

- **Framework:** Nuxt.js 3 (Vue 3)
- **Styling:** Tailwind CSS
- **Font:** Inter (Google Fonts)
- **Icons:** SVG icons & Emoji
- **Deployment Ready:** SSG/SSR support

## 🛠️ Instalasi

1. Clone repository ini:

```bash
git clone https://github.com/yourusername/mas-kua-landing.git
cd mas-kua-landing
```

2. Install dependencies:

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

3. Jalankan development server:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

4. Buka browser dan akses `http://localhost:3000`

## 📝 Konfigurasi

### Mengganti Nomor WhatsApp

Edit file `composables/useWhatsApp.js` dan ganti nomor WhatsApp:

```javascript
const phoneNumber = "628123456789"; // Ganti dengan nomor WhatsApp KUA
```

### Menambah/Edit Layanan

Edit bagian `services` di `pages/index.vue`:

```javascript
const services = ref([
  {
    title: "Nama Layanan",
    content: `HTML content layanan`,
  },
]);
```

### Menambah/Edit FAQ

Edit bagian `faqs` di `pages/index.vue`:

```javascript
const faqs = ref([
  {
    question: "Pertanyaan?",
    answer: "Jawaban.",
  },
]);
```

## 🏗️ Build & Deployment

### Build untuk production:

```bash
npm run build
```

### Generate static site:

```bash
npm run generate
```

### Preview build:

```bash
npm run preview
```

## 📂 Struktur Folder

```
mas-kua-landing/
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── ScrollToTop.vue
│   └── LoadingSpinner.vue
├── composables/
│   └── useWhatsApp.js
├── pages/
│   └── index.vue
├── plugins/
│   └── aos.client.js
├── public/
│   └── favicon.ico
├── app.vue
├── nuxt.config.ts
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Customisasi Warna

Untuk mengubah warna tema, edit file `tailwind.config.js`:

```javascript
colors: {
  primary: {
    600: '#2563eb', // Warna utama biru
    // ... warna lainnya
  }
}
```

## 📱 Responsif Breakpoints

- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: > 768px

## 🤝 Kontribusi

Proyek ini merupakan inisiasi dari:

- **Jalaludin** - Peserta Latsar CPNS
- **KUA Kecamatan Pebayuran**

## 📄 Lisensi

© 2025 KUA Kecamatan Pebayuran. All rights reserved.

## 📞 Kontak

- **Alamat:** Jl. Raya Pebayuran, Kelurahan Kertasari, Pebayuran, Kab. Bekasi
- **Jam Pelayanan:** Senin - Jumat, 08:00 - 16:00 WIB
- **WhatsApp:** [Hubungi Kami](https://wa.me/628123456789)

---

**MAS KUA** - Urusan di KUA Jadi Lebih Mudah & Pasti 🚀,
{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
{ name: 'description', content: 'MAS KUA - Media Aspirasi & Solusi KUA Kecamatan Pebayuran. Urusan di KUA jadi lebih mudah dan pasti.' }
],
link: [
{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
]
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  color: #1f2937;
  line-height: 1.6;
}
</style>

---

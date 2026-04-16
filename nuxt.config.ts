// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  nitro: {
    preset: 'netlify',
  },
  devtools: { enabled: true },
  app: {
    head: {
      title: "KUA Pebayuran Bekasi",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Marcellus&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Imperial+Script&family=Oooh+Baby&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
      ],
    },
  },
  css: ["/assets/style.css", "/assets/font.css"],
  modules: ["@nuxt/icon",    "@nuxtjs/supabase"
  ],
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  },
  runtimeConfig: {
    // Server-only (private)
    r2AccountId: process.env.CLOUDFLARE_R2_ACCOUNT_ID,
    r2AccessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    r2SecretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    r2BucketName: process.env.CLOUDFLARE_R2_BUCKET_NAME ?? 'kua-pebayuran',
    // Public (exposed to client)
    public: {
      r2PublicUrl: process.env.CLOUDFLARE_R2_PUBLIC_URL ?? '',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
// trigger dev server reload;

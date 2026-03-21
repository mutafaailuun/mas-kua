<template>
  <div class="font-sans bg-gray-50">
    <!-- <Header @scrollToSection="scrollToSection" /> -->
    <main>
      <HeroSection @scrollToSection="scrollToSection" />
      <ProblemSection />
      <SolutionSection />
      <ServicesSection :services="services" />
      
      <!-- LATEST ARTICLES -->
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-sm font-bold tracking-wide text-emerald-600 uppercase">Artikel Terbaru</h2>
            <p class="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Informasi Terkini Seputar Pernikahan
            </p>
          </div>
          
          <div v-if="loadingLatest" class="flex justify-center py-12">
            <Icon name="lucide:loader-2" class="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
          <div v-else-if="latestArticles.length" class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ArticleCard v-for="article in latestArticles" :key="article.id" :article="article" />
          </div>
          <div v-else class="text-center text-gray-500">Belum ada artikel terbaru.</div>
          
          <div class="mt-12 text-center">
            <NuxtLink to="/articles" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors">
              Lihat Semua Artikel
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- POPULAR ARTICLES -->
      <section class="py-20 bg-emerald-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 class="text-sm font-bold tracking-wide text-emerald-300 uppercase">Terpopuler</h2>
              <p class="mt-2 text-3xl font-extrabold sm:text-4xl text-white">
                Paling Banyak Dibaca
              </p>
            </div>
          </div>
          
          <div v-if="loadingPopular" class="flex justify-center py-12">
            <Icon name="lucide:loader-2" class="w-8 h-8 text-emerald-300 animate-spin" />
          </div>
          <div v-else-if="popularArticles.length" class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ArticleCard v-for="article in popularArticles" :key="article.id" :article="article" />
          </div>
        </div>
      </section>

      <FaqSection :faqs="faqs" />
      <CtaSection />
    </main>
  </div>
</template>

<script setup>
import { services } from "/data/services.js";
import { faqs } from "/data/faqs.js";
import HeroSection from "/components/HeroSection.vue";
import ProblemSection from "/components/ProblemSection.vue";
import SolutionSection from "/components/SolutionSection.vue";
import ServicesSection from "/components/ServicesSection.vue";
import FaqSection from "/components/FaqSection.vue";
import CtaSection from "/components/CtaSection.vue";
import ArticleCard from "/components/ArticleCard.vue";

const supabase = useSupabaseClient()
const latestArticles = ref([])
const popularArticles = ref([])
const loadingLatest = ref(true)
const loadingPopular = ref(true)

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// Fetch data
onMounted(async () => {
  // Fetch Latest
  try {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3)
    latestArticles.value = data || []
  } finally {
    loadingLatest.value = false
  }

  // Fetch Popular (Assuming 'views' column exists and is populated)
  try {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('views', { ascending: false })
      .limit(3)
    popularArticles.value = data || []
  } finally {
    loadingPopular.value = false
  }
})
</script>

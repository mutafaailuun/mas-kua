<!-- <template>
  <div>
    <NuxtPage />
  </div>
</template>
<style>
@import "tailwindcss";
</style> -->

<script setup>
import { services, faqs } from "./data/content.js";

import Header from "./src/components/Header.vue";
import HeroSection from "./src/components/HeroSection.vue";
import ProblemSection from "./src/components/ProblemSection.vue";
import SolutionSection from "./src/components/SolutionSection.vue";
import ServicesSection from "./src/components/ServicesSection.vue";
import FaqSection from "./src/components/FaqSection.vue";
import CtaSection from "./src/components/CtaSection.vue";
import Footer from "./src/components/Footer.vue";

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <div class="font-sans">
    <Header @scrollToSection="scrollToSection" />
    <main>
      <HeroSection @scrollToSection="scrollToSection" />
      <ProblemSection />
      <SolutionSection />
      <ServicesSection :services="services" />
      <FaqSection :faqs="faqs" />
      <CtaSection />
    </main>
    <Footer />
  </div>
</template>

<style>
@import "tailwindcss";
</style>

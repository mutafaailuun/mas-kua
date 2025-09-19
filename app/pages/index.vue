<script setup>
import { services, faqs } from "/data/content.js";
import HeroSection from "/components/HeroSection.vue";
import ProblemSection from "/components/ProblemSection.vue";
import SolutionSection from "/components/SolutionSection.vue";
import ServicesSection from "/components/ServicesSection.vue";
import FaqSection from "/components/FaqSection.vue";
import CtaSection from "/components/CtaSection.vue";

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <div class="font-sans">
    <!-- <Header @scrollToSection="scrollToSection" /> -->
    <main>
      <HeroSection @scrollToSection="scrollToSection" />
      <ProblemSection />
      <SolutionSection />
      <ServicesSection :services="services" />
      <FaqSection :faqs="faqs" />
      <CtaSection />
    </main>
  </div>
</template>

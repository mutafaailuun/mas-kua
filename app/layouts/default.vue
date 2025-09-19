<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
<template>
  <div>
    <Header @scrollToSection="scrollToSection" />
    <slot />
    <Footer />
  </div>
</template>

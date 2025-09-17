<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

defineProps({
  title: String,
  isHtml: {
    type: Boolean,
    default: false,
  },
});

const isOpen = ref(false);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <button
      @click="toggleAccordion"
      class="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 transition-colors duration-300"
      :class="isOpen ? 'bg-green-600 text-white' : 'bg-white hover:bg-gray-50'"
    >
      <span>{{ title }}</span>
      <Icon
        icon="heroicons:chevron-down-20-solid"
        class="w-6 h-6 transform transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>
    <div
      class="grid transition-all duration-500 ease-in-out"
      :class="
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      "
    >
      <div class="overflow-hidden">
        <div class="p-5 bg-white text-gray-600 leading-relaxed">
          <div v-if="isHtml" v-html="$slots.default()[0].children"></div>
          <p v-else><slot /></p>
        </div>
      </div>
    </div>
  </div>
</template>

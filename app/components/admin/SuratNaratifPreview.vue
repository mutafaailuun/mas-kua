<template>
  <SuratKuaDocument
    :title="title"
    :nomor="nomor"
    :nomor-placeholder="nomorPlaceholder"
    :lokasi="lokasi"
    :tanggal-formatted="tanggalFormatted"
    :kepala="kepala"
  >
    <div v-if="openingText" style="text-align: justify; margin-bottom: 16px; text-indent: 2.5em; line-height: 1.7;">
      {{ openingText }}
    </div>

    <ul v-if="bulletItems.length" style="margin: 0 0 16px 18px; padding: 0; line-height: 1.7;">
      <li v-for="(item, index) in bulletItems" :key="index" style="margin-bottom: 8px; text-align: justify;">
        {{ item }}
      </li>
    </ul>

    <div v-for="(paragraph, index) in paragraphs" :key="index" style="text-align: justify; margin-bottom: 10px; text-indent: 2.5em; line-height: 1.7;">
      {{ paragraph }}
    </div>

    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.7; margin-bottom: 36px;">
      {{ closingText }}
    </div>
  </SuratKuaDocument>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  nomor: string
  nomorPlaceholder?: string
  openingText?: string
  bulletItems?: string[]
  paragraphs?: string[]
  closingText: string
  lokasi: string
  tanggalFormatted: string
  kepala: string
}>(), {
  nomorPlaceholder: '___/Kua.___/___.___/___/______',
  openingText: '',
  bulletItems: () => [],
  paragraphs: () => []
})
</script>

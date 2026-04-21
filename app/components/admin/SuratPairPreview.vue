<template>
  <SuratKuaDocument
    :title="title"
    :nomor="nomor"
    :nomor-placeholder="nomorPlaceholder"
    :lokasi="lokasi"
    :tanggal-formatted="tanggalFormatted"
    :kepala="kepala"
  >
    <div style="text-align: justify; margin-bottom: 16px; text-indent: 2.5em; line-height: 1.7;">
      {{ openingText }}
    </div>

    <div v-for="(person, index) in people" :key="index" style="margin-bottom: 10px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tbody>
          <tr>
            <td style="width: 24px; vertical-align: top;">{{ index + 1 }}.</td>
            <td style="width: 130px; vertical-align: top;">Nama</td>
            <td style="width: 16px; vertical-align: top;">:</td>
            <td style="vertical-align: top; font-weight: bold;">{{ person.name || '___' }}</td>
          </tr>
          <tr v-if="person.birthInfo">
            <td></td>
            <td style="vertical-align: top;">Tempat/Tgl. Lahir</td>
            <td style="vertical-align: top;">:</td>
            <td style="vertical-align: top;">{{ person.birthInfo }}</td>
          </tr>
          <tr v-if="person.occupation">
            <td></td>
            <td style="vertical-align: top;">Pekerjaan</td>
            <td style="vertical-align: top;">:</td>
            <td style="vertical-align: top;">{{ person.occupation }}</td>
          </tr>
          <tr v-if="person.address">
            <td></td>
            <td style="vertical-align: top;">Alamat</td>
            <td style="vertical-align: top;">:</td>
            <td style="vertical-align: top; white-space: pre-line;">{{ person.address }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-for="(paragraph, index) in bodyParagraphs" :key="index" style="text-align: justify; margin-bottom: 10px; text-indent: 2.5em; line-height: 1.7;">
      {{ paragraph }}
    </div>

    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.7; margin-bottom: 36px;">
      {{ closingText }}
    </div>
  </SuratKuaDocument>
</template>

<script setup lang="ts">
interface SuratPerson {
  name: string
  birthInfo?: string
  occupation?: string
  address?: string
}

withDefaults(defineProps<{
  title: string
  nomor: string
  nomorPlaceholder?: string
  openingText: string
  people: SuratPerson[]
  bodyParagraphs: string[]
  closingText: string
  lokasi: string
  tanggalFormatted: string
  kepala: string
}>(), {
  nomorPlaceholder: '___/Kua.___/___.___/___/______'
})
</script>

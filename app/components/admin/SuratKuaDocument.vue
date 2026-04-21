<template>
  <div
    class="surat-paper font-['Times_New_Roman',_Times,_serif] text-[13px] leading-relaxed text-black bg-white"
    style="width: 794px; min-height: 1123px; padding: 60px 75px 60px 100px; box-sizing: border-box;"
  >
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 8px;">
      <img
        src="/logo-kua.png"
        alt="Logo KUA"
        style="width: 70px; height: 70px; object-fit: contain; flex-shrink: 0;"
      />

      <div style="flex: 1; text-align: center; line-height: 1.45;">
        <div style="font-size: 14px; font-weight: bold; letter-spacing: 0.3px;">KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
        <div style="font-size: 14px; font-weight: bold;">KANTOR KEMENTERIAN AGAMA KABUPATEN BEKASI</div>
        <div style="font-size: 15px; font-weight: bold;">KANTOR URUSAN AGAMA KECAMATAN PEBAYURAN</div>
        <div style="font-size: 11.5px; margin-top: 2px;">Jl. Raya Pebayuran Kec. Pebayuran 17710 Kabupaten Bekasi</div>
      </div>
    </div>

    <div style="border-top: 3px solid black; margin-bottom: 1px;"></div>
    <div style="border-top: 1px solid black; margin-bottom: 18px;"></div>

    <div style="text-align: center; margin-bottom: 14px;">
      <div style="font-size: 14px; font-weight: bold; text-decoration: underline; letter-spacing: 1px;">{{ title }}</div>
      <div style="font-size: 13px;">Nomor: {{ nomor || nomorPlaceholder }}</div>
    </div>

    <slot />

    <div style="display: flex; justify-content: flex-end;">
      <div style="text-align: center; min-width: 240px;">
        <div>{{ lokasi || 'Bekasi' }}, {{ tanggalFormatted }}</div>
        <div style="margin-top: 2px;">Kepala,</div>
        <div style="height: 64px;"></div>
        <div style="font-weight: bold; text-decoration: underline; letter-spacing: 0.3px;">
          {{ kepala || "Drs. H. Ma'mun Nawawi" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  nomor: string
  nomorPlaceholder?: string
  lokasi: string
  tanggalFormatted: string
  kepala: string
}>(), {
  nomorPlaceholder: '___/Kua.___/___.___/___/______'
})
</script>

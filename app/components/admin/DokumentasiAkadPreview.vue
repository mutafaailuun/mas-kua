<template>
  <div
    class="dok-preview font-['Arial',_sans-serif] text-black bg-white"
    style="width: 794px; min-height: 1123px; padding: 56px 70px 56px 70px; box-sizing: border-box; font-size: 13px; line-height: 1.5;"
  >
    <!-- ══ JUDUL ══ -->
    <div style="text-align: center; margin-bottom: 10px;">
      <div style="font-size: 14px; font-weight: bold; letter-spacing: 0.4px; text-transform: uppercase;">
        LAMPIRAN DOKUMENTASI PERISTIWA NIKAH {{ isKantor ? 'KANTOR' : 'LUAR KANTOR' }}
      </div>
      <div style="font-size: 14px; font-weight: bold;">KANTOR URUSAN AGAMA KECAMATAN PEBAYURAN</div>
      <div style="font-size: 13px; margin-top: 2px;">BULAN {{ bulanNama }} TAHUN {{ tahun }}</div>
    </div>

    <!-- ══ GARIS ══ -->
    <div style="border-top: 2.5px solid black; margin-bottom: 18px;"></div>

    <!-- ══ DATA ══ -->
    <table style="border-collapse: collapse; margin-bottom: 20px; font-size: 13px; line-height: 1.9;">
      <tbody>
        <tr>
          <td style="width: 190px; vertical-align: top; padding: 1px 0;">NO. PENDAFTARAN</td>
          <td style="padding: 1px 10px; vertical-align: top;">:</td>
          <td style="vertical-align: top; font-weight: bold;">{{ noPendaftaran || '___________________________' }}</td>
        </tr>
        <tr>
          <td style="vertical-align: top; padding: 1px 0;">NO. AKTA NIKAH</td>
          <td style="padding: 1px 10px; vertical-align: top;">:</td>
          <td style="vertical-align: top; font-weight: bold;">{{ noAkta || '___________________________' }}</td>
        </tr>
        <tr>
          <td style="vertical-align: top; padding: 1px 0;">NAMA SUAMI</td>
          <td style="padding: 1px 10px; vertical-align: top;">:</td>
          <td style="vertical-align: top; font-weight: bold;">{{ wedding.groom_name }}</td>
        </tr>
        <tr>
          <td style="vertical-align: top; padding: 1px 0;">NAMA ISTRI</td>
          <td style="padding: 1px 10px; vertical-align: top;">:</td>
          <td style="vertical-align: top; font-weight: bold;">{{ wedding.bride_name }}</td>
        </tr>
        <tr>
          <td style="vertical-align: top; padding: 1px 0;">TANGGAL AKAD</td>
          <td style="padding: 1px 10px; vertical-align: top;">:</td>
          <td style="vertical-align: top; font-weight: bold;">{{ formatTanggal(wedding.wedding_date) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- ══ FOTO DOKUMENTASI ══ -->
    <div v-if="photos.length > 0">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
        <div
          v-for="(photo, i) in photos"
          :key="photo.id ?? i"
          style="break-inside: avoid;"
        >
          <img
            :src="photo.photo_url"
            :alt="`Dokumentasi ${i + 1}`"
            crossorigin="anonymous"
            style="width: 100%; height: 260px; object-fit: cover; display: block; border: 1px solid #ddd;"
          />
        </div>
      </div>
    </div>

    <!-- ══ PLACEHOLDER FOTO (belum ada) ══ -->
    <div v-else
      style="height: 280px; border: 1.5px dashed #bbb; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ccc; gap: 8px; margin-top: 4px;"
    >
      <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
      <span style="font-size: 12px;">Belum ada foto dokumentasi</span>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface WeddingPhoto {
  id?: string
  photo_url: string
  order_index?: number
}

const props = defineProps<{
  wedding: {
    groom_name: string
    bride_name: string
    wedding_date: string
    status: string
    notes?: string | null
  }
  photos: WeddingPhoto[]
  noPendaftaran?: string
}>()

const BULAN_INDO = [
  'JANUARI','FEBRUARI','MARET','APRIL','MEI','JUNI',
  'JULI','AGUSTUS','SEPTEMBER','OKTOBER','NOVEMBER','DESEMBER'
]

const isKantor = computed(() => props.wedding.status === 'Kantor')

const bulanNama = computed(() => {
  const d = new Date(props.wedding.wedding_date + 'T00:00:00')
  return BULAN_INDO[d.getMonth()]
})

const tahun = computed(() =>
  new Date(props.wedding.wedding_date + 'T00:00:00').getFullYear()
)

const noAkta = computed(() => {
  if (!props.wedding.notes) return ''
  const m = props.wedding.notes.match(/No\s*Akta[:\s]+(\S+)/i)
  return m ? m[1] : ''
})

const formatTanggal = (raw: string) => {
  const d = new Date(raw + 'T00:00:00')
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
}
</script>

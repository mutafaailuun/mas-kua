<template>
  <div class="surat-paper"
    style="font-family: 'Times New Roman', Times, serif; font-size: 13px; line-height: 1.6; color: #000; background: #fff; width: 210mm; min-height: 297mm; padding: 10mm 20mm 20mm 20mm; box-sizing: border-box;">

    <!-- KOP -->
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 8px;">
      <img src="/logo-kua.png" alt="Logo KUA"
        style="width: 88px; height: 88px; object-fit: contain; flex-shrink: 0;" />
      <div style="flex: 1; text-align: center; line-height: 1.4;">
        <div style="font-size: 17px; font-weight: bold; letter-spacing: 0.3px;">KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
        <div style="font-size: 13px; font-weight: bold;">KANTOR KEMENTERIAN AGAMA KABUPATEN BEKASI</div>
        <div style="font-size: 13px; font-weight: bold;">KANTOR URUSAN AGAMA KECAMATAN PEBAYURAN</div>
        <div style="font-size: 11px; margin-top: 3px;">Jl. Raya Pebayuran, Kecamatan Pebayuran, Kabupaten Bekasi</div>
        <div style="font-size: 11px;">Email: kuabayuran@gmail.com</div>
      </div>
    </div>
    <div style="border-top: 3px solid black; margin-bottom: 1px;"></div>
    <div style="border-top: 1px solid black; margin-bottom: 16px;"></div>

    <!-- Identitas surat -->
    <table style="width: 100%; font-size: 13px; border-collapse: collapse; margin-bottom: 14px;">
      <tr>
        <td style="width: 90px; vertical-align: top; padding: 1px 0;">Nomor</td>
        <td style="width: 12px; vertical-align: top; padding: 1px 0;">:</td>
        <td style="vertical-align: top; padding: 1px 0;">{{ nomorSurat }}</td>
        <td style="text-align: right; vertical-align: top; padding: 1px 0; white-space: nowrap;">
          {{ form.lokasi || 'Pebayuran' }}, {{ tanggalSuratFormatted }}
        </td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 1px 0;">Lamp.</td>
        <td style="vertical-align: top; padding: 1px 0;">:</td>
        <td colspan="2" style="vertical-align: top; padding: 1px 0;">-</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 1px 0;">Perihal</td>
        <td style="vertical-align: top; padding: 1px 0;">:</td>
        <td colspan="2" style="vertical-align: top; padding: 1px 0; font-weight: bold;">
          Bimbingan Perkawinan (BIMWIN)
        </td>
      </tr>
    </table>

    <!-- Kepada -->
    <div style="margin-bottom: 14px; line-height: 1.9;">
      <div>Kepada Yth.</div>
      <div>Saudara/i Calon Pengantin:</div>
      <div style="margin-left: 0.5em;">1. {{ form.nama_catin_pria || '_______________________________' }}</div>
      <div style="margin-left: 0.5em;">2. {{ form.nama_catin_wanita || '_______________________________' }}</div>
      <div>di Tempat</div>
    </div>

    <div style="margin-bottom: 14px;"><em>Assalamu'alaikum Wr. Wb.</em></div>

    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
      Kepala Kantor Urusan Agama Kecamatan Pebayuran Kabupaten Bekasi, dengan ini mengundang saudara/i untuk
      dapat hadir pada:
    </div>

    <!-- Rincian acara -->
    <table style="margin-left: 2.5em; font-size: 13px; border-collapse: collapse; margin-bottom: 14px;">
      <tr>
        <td style="width: 110px; padding: 1.5px 0;">hari/tanggal</td>
        <td style="width: 12px; padding: 1.5px 0;">:</td>
        <td style="padding: 1.5px 0;">{{ hariBimwin }}, {{ tanggalBimwinFormatted }}</td>
      </tr>
      <tr>
        <td style="padding: 1.5px 0;">waktu</td>
        <td style="padding: 1.5px 0;">:</td>
        <td style="padding: 1.5px 0;">{{ form.jam_bimwin || '09.30' }} WIB</td>
      </tr>
      <tr>
        <td style="padding: 1.5px 0;">tempat</td>
        <td style="padding: 1.5px 0;">:</td>
        <td style="padding: 1.5px 0;">KUA Kec. Pebayuran, Kab. Bekasi</td>
      </tr>
      <tr>
        <td style="padding: 1.5px 0;">acara</td>
        <td style="padding: 1.5px 0;">:</td>
        <td style="padding: 1.5px 0;">Bimbingan Perkawinan bagi Calon Pengantin.</td>
      </tr>
    </table>

    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
      Dalam rangka menyemarakkan program Pengantin Peduli Lingkungan (Pepeling) diharapkan kepada para calon
      pengantin agar membawa bibit pohon ke kantor KUA pada hari pelaksanaan bimbingan perkawinan.
    </div>

    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
      Demikian undangan ini kami sampaikan, atas perhatian dan kehadiran saudara/i, kami ucapkan terima kasih.
    </div>

    <div style="margin-bottom: 28px;"><em>Wassalamu'alaikum Wr. Wb.</em></div>

    <!-- Tanda tangan -->
    <div style="display: flex; justify-content: flex-end;">
      <div style="text-align: center; min-width: 200px;">
        <div>Kepala,</div>
        <div style="height: 75px;"></div>
        <div style="font-weight: bold; text-decoration: underline; text-transform: uppercase;">{{ form.kepala }}</div>
        <div>NIP. {{ form.nip }}</div>
      </div>
    </div>

    <!-- Tembusan -->
    <div style="margin-top: 28px; font-size: 13px; line-height: 1.8;">
      <div>Tembusan: Yth</div>
      <div>1. Kepala Kantor Kementerian Agama Kabupaten Bekasi</div>
      <div>2. Kepala Seksi Bimas Islam Kementerian Agama Kabupaten Bekasi</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  form: {
    lokasi: string
    kepala: string
    nip: string
    jam_bimwin: string
    tanggal_bimwin_raw: string
    nama_catin_pria: string
    nama_catin_wanita: string
  }
  nomorSurat: string
  tanggalSuratFormatted: string
}>()

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu']

const tanggalBimwinFormatted = computed(() => {
  if (!props.form.tanggal_bimwin_raw) return '_______________'
  return new Date(props.form.tanggal_bimwin_raw + 'T00:00:00').toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
})

const hariBimwin = computed(() => {
  if (!props.form.tanggal_bimwin_raw) return '___________'
  return HARI[new Date(props.form.tanggal_bimwin_raw + 'T00:00:00').getDay()]
})
</script>

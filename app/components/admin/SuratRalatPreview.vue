<template>
  <div class="surat-paper font-['Times_New_Roman',_Times,_serif] text-[13px] leading-relaxed text-black bg-white"
    style="width: 210mm; min-height: 297mm; padding: 100px 75px 80px 113px; box-sizing: border-box;">

    <!-- ══ KOP SURAT ══ -->
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

    <!-- Garis pemisah KOP -->
    <div style="border-top: 3px solid black; margin-bottom: 1px;"></div>
    <div style="border-top: 1px solid black; margin-bottom: 18px;"></div>

    <!-- ══ JUDUL SURAT ══ -->
    <div style="text-align: center; margin-bottom: 14px;">
      <div style="font-size: 14px; font-weight: bold; text-decoration: underline; letter-spacing: 1px;">SURAT KETERANGAN</div>
      <div style="font-size: 13px;">Nomor : {{ nomorSurat }}</div>
    </div>

    <!-- ══ TUBUH SURAT ══ -->
    <div style="text-align: justify; margin-bottom: 16px; text-indent: 2.5em; line-height: 1.8;">
      Yang bertanda tangan di bawah ini, Kepala Kantor Urusan Agama Kecamatan Pebayuran
      Kabupaten Bekasi menerangkan bahwa kutipan Akta Nikah Nomor
      <strong>{{ form.nomor_akta || '___' }}</strong>, Seri <strong>{{ form.seri || '___' }}</strong>
      Perforasi <strong>{{ form.nomor_perforasi || '___' }}</strong> atas nama
      <strong style="text-transform: uppercase;">{{ form.nama_suami || '___' }}</strong>,
      dengan pasangan <strong style="text-transform: uppercase;">{{ form.nama_istri || '___' }}</strong>
      terdapat kekeliruan dalam penulisan, sebagai berikut :
    </div>

    <!-- ══ TABEL KOREKSI ══ -->
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px; font-size: 11.5px; table-layout: fixed; word-wrap: break-word;">
      <thead>
        <tr>
          <th rowspan="2" style="border: 1px solid black; padding: 5px 4px; text-align: center; width: 30px;">NO</th>
          <th colspan="2" style="border: 1px solid black; padding: 5px 4px; text-align: center;">TERTULIS</th>
          <th colspan="2" style="border: 1px solid black; padding: 5px 4px; text-align: center;">SEHARUSNYA BERDASARKAN KTP</th>
          <th rowspan="2" style="border: 1px solid black; padding: 5px 4px; text-align: center; width: 25%;">DATA PENDUKUNG</th>
        </tr>
        <tr>
          <th style="border: 1px solid black; padding: 5px 4px; text-align: center; width: 17%;">NAMA</th>
          <th style="border: 1px solid black; padding: 5px 4px; text-align: center; width: 15%;">TANGGAL LAHIR</th>
          <th style="border: 1px solid black; padding: 5px 4px; text-align: center; width: 17%;">NAMA</th>
          <th style="border: 1px solid black; padding: 5px 4px; text-align: center; width: 15%;">TANGGAL LAHIR</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(k, i) in koreksi" :key="i">
          <td style="border: 1px solid black; padding: 5px 4px; text-align: center; vertical-align: middle;">{{ i + 1 }}</td>
          <td style="border: 1px solid black; padding: 6px 4px; font-weight: bold; vertical-align: top; text-transform: uppercase;">
            {{ k.nama_tertulis || '__________' }}
          </td>
          <td style="border: 1px solid black; padding: 6px 4px; font-weight: bold; vertical-align: top;">
            {{ k.ttl_tertulis || '__________' }}
          </td>
          <td style="border: 1px solid black; padding: 6px 4px; font-weight: bold; vertical-align: top; text-transform: uppercase;">
            {{ k.nama_seharusnya || '__________' }}
          </td>
          <td style="border: 1px solid black; padding: 6px 4px; font-weight: bold; vertical-align: top;">
            {{ k.ttl_seharusnya || '__________' }}
          </td>
          <td style="border: 1px solid black; padding: 6px 4px; vertical-align: top; white-space: pre-line;">
            {{ k.data_pendukung || '__________' }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ══ PENUTUP ══ -->
    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 36px;">
      Demikian surat keterangan ini dibuat, agar menjadi maklum hendaknya.
    </div>

    <!-- ══ TANDA TANGAN ══ -->
    <div style="display: flex; justify-content: flex-end;">
      <div style="text-align: center; min-width: 240px;">
        <div>{{ form.lokasi || 'Bekasi' }}, {{ tanggalFormatted }}</div>
        <div style="margin-top: 2px;">Kepala,</div>
        <div style="height: 64px;"></div>
        <div style="font-weight: bold; text-decoration: underline; letter-spacing: 0.3px; text-transform: uppercase;">
          {{ form.kepala || "Drs. H. Ma'mun Nawawi" }}
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
interface KoreksiItem {
  nama_tertulis: string
  ttl_tertulis: string
  nama_seharusnya: string
  ttl_seharusnya: string
  data_pendukung: string
}

defineProps<{
  form: {
    lokasi: string
    kepala: string
    nomor_akta: string
    seri: string
    nomor_perforasi: string
    nama_suami: string
    nama_istri: string
  }
  nomorSurat: string
  koreksi: KoreksiItem[]
  tanggalFormatted: string
}>()
</script>

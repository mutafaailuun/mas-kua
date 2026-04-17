<template>
  <div class="surat-paper font-['Times_New_Roman',_Times,_serif] text-[13px] leading-relaxed text-black bg-white"
    style="width: 794px; min-height: 1123px; padding: 60px 75px 60px 100px; box-sizing: border-box;">

    <!-- ══ KOP SURAT ══ -->
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 8px;">
      <!-- Logo -->
      <img src="/logo-kua.png" alt="Logo KUA"
        style="width: 70px; height: 70px; object-fit: contain; flex-shrink: 0;" />

      <!-- Teks KOP -->
      <div style="flex: 1; text-align: center; line-height: 1.45;">
        <div style="font-size: 14px; font-weight: bold; letter-spacing: 0.3px;">KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
        <div style="font-size: 14px; font-weight: bold;">KANTOR KEMENTERIAN AGAMA KABUPATEN BEKASI</div>
        <div style="font-size: 15px; font-weight: bold;">KANTOR URUSAN AGAMA KECAMATAN PEBAYURAN</div>
        <div style="font-size: 11.5px; margin-top: 2px;">Jl. Raya Pebayuran Kec. Pebayuran 17710 Kabupaten Bekasi</div>
      </div>
    </div>

    <!-- Garis pemisah KOP (tebal + tipis) -->
    <div style="border-top: 3px solid black; margin-bottom: 1px;"></div>
    <div style="border-top: 1px solid black; margin-bottom: 18px;"></div>

    <!-- ══ JUDUL SURAT ══ -->
    <div style="text-align: center; margin-bottom: 14px;">
      <div style="font-size: 14px; font-weight: bold; text-decoration: underline; letter-spacing: 1px;">SURAT KETERANGAN</div>
      <div style="font-size: 13px;">Nomor: {{ nomorSurat }}</div>
    </div>

    <!-- ══ TUBUH SURAT ══ -->
    <div style="text-align: justify; margin-bottom: 16px; text-indent: 2.5em; line-height: 1.7;">
      Yang bertanda tangan di bawah ini, Kepala Kantor Urusan Agama Kecamatan Pebayuran
      Kabupaten Bekasi, dengan ini menerangkan bahwa kutipan Akta Nikah Nomor
      <strong>{{ form.nomor_akta || '___' }}</strong>, Seri <strong>{{ form.seri || '___' }}</strong>,
      Nomor Perforasi <strong>{{ form.nomor_perforasi || '___' }}</strong>, atas nama
      <strong style="text-transform: uppercase;">{{ form.nama_suami || '___' }}</strong> dan
      <strong style="text-transform: uppercase;">{{ form.nama_istri || '___' }}</strong>,
      {{ dasarKeterangan }} adalah sebagai berikut:
    </div>

    <!-- ══ TABEL KOREKSI ══ -->
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px; font-size: 12.5px;">
      <thead>
        <tr>
          <th style="border: 1px solid black; padding: 5px 8px; text-align: center; width: 36px; background: #f0f0f0;">NO</th>
          <th style="border: 1px solid black; padding: 5px 8px; text-align: center; background: #f0f0f0;">TERTULIS DALAM BUKU NIKAH</th>
          <th style="border: 1px solid black; padding: 5px 8px; text-align: center; background: #f0f0f0;">SEHARUSNYA</th>
          <th style="border: 1px solid black; padding: 5px 8px; text-align: center; background: #f0f0f0;">DATA PENDUKUNG</th>
        </tr>
      </thead>
      <tbody>

        <!-- ── Koreksi 1 Label Row ── -->
        <tr>
          <td rowspan="2" style="border: 1px solid black; padding: 5px 8px; text-align: center; vertical-align: middle;">1</td>
          <td style="border: 1px solid black; padding: 5px 8px;">{{ k1.kolom || 'Nama Istri' }}</td>
          <td style="border: 1px solid black; padding: 5px 8px;">{{ k1.kolom || 'Nama Istri' }}</td>
          <td rowspan="2" style="border: 1px solid black; padding: 5px 8px; vertical-align: top; white-space: pre-line;">{{ k1.data_pendukung || '' }}</td>
        </tr>
        <!-- ── Koreksi 1 Value Row ── -->
        <tr>
          <td style="border: 1px solid black; padding: 5px 8px; font-weight: bold;">{{ k1.tertulis || '' }}</td>
          <td style="border: 1px solid black; padding: 5px 8px; font-weight: bold;">{{ k1.seharusnya || '' }}</td>
        </tr>

        <!-- ── Koreksi 2 Label Row (conditional) ── -->
        <template v-if="hasKoreksiKedua">
          <tr>
            <td rowspan="2" style="border: 1px solid black; padding: 5px 8px; text-align: center; vertical-align: middle;">2</td>
            <td style="border: 1px solid black; padding: 5px 8px;">{{ k2.kolom || 'Nama Suami' }}</td>
            <td style="border: 1px solid black; padding: 5px 8px;">{{ k2.kolom || 'Nama Suami' }}</td>
            <td rowspan="2" style="border: 1px solid black; padding: 5px 8px; vertical-align: top; white-space: pre-line;">{{ k2.data_pendukung || '' }}</td>
          </tr>
          <!-- ── Koreksi 2 Value Row ── -->
          <tr>
            <td style="border: 1px solid black; padding: 5px 8px; font-weight: bold;">{{ k2.tertulis || '' }}</td>
            <td style="border: 1px solid black; padding: 5px 8px; font-weight: bold;">{{ k2.seharusnya || '' }}</td>
          </tr>
        </template>

      </tbody>
    </table>

    <!-- ══ PENUTUP ══ -->
    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.7; margin-bottom: 36px;">
      Demikian surat keterangan ini dibuat, agar menjadi maklum hendaknya.
    </div>

    <!-- ══ TANDA TANGAN ══ -->
    <div style="display: flex; justify-content: flex-end;">
      <div style="text-align: center; min-width: 240px;">
        <div>{{ form.lokasi || 'Bekasi' }}, {{ tanggalFormatted }}</div>
        <div style="margin-top: 2px;">Kepala,</div>
        <!-- Spasi TTD -->
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
  kolom: string
  tertulis: string
  seharusnya: string
  data_pendukung: string
}

const props = defineProps<{
  form: {
    lokasi: string
    kepala: string
    nomor_akta: string
    seri: string
    nomor_perforasi: string
    nama_suami: string
    nama_istri: string
    kelurahan: string
    nomor_kel: string
  }
  nomorSurat: string
  koreksi: [KoreksiItem, KoreksiItem]
  hasKoreksiKedua: boolean
  tanggalFormatted: string
}>()

const k1 = computed(() => props.koreksi[0])
const k2 = computed(() => props.koreksi[1])
const hasKelurahanName = computed(() => props.form.kelurahan.trim().length > 0)
const hasKelurahanNumber = computed(() => props.form.nomor_kel.trim().length > 0)

const dasarKeterangan = computed(() => {
  if (hasKelurahanName.value && hasKelurahanNumber.value) {
    return `berdasarkan surat keterangan dari Kelurahan ${props.form.kelurahan} Nomor: ${props.form.nomor_kel}`
  }

  if (hasKelurahanName.value) {
    return `berdasarkan surat keterangan dari Kelurahan ${props.form.kelurahan}`
  }

  if (hasKelurahanNumber.value) {
    return `berdasarkan surat keterangan kelurahan Nomor: ${props.form.nomor_kel}`
  }

  return 'berdasarkan dokumen pendukung yang dilampirkan oleh pemohon'
})
</script>

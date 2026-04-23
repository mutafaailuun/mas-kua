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

    <!-- ══ MODEL N7 ══ -->
    <div style="text-align: right; font-size: 12px; margin-bottom: 16px;">Model N7</div>

    <!-- ══ NOMOR, LAMPIRAN, PERIHAL ══ -->
    <table style="width: 100%; font-size: 13px; margin-bottom: 16px; border-collapse: collapse;">
      <tr>
        <td style="width: 90px; vertical-align: top; padding: 1px 0;">Nomor</td>
        <td style="width: 12px; vertical-align: top; padding: 1px 0;">:</td>
        <td style="vertical-align: top; padding: 1px 0;">{{ nomorSurat }}</td>
        <td style="text-align: right; vertical-align: top; padding: 1px 0;">{{ form.lokasi || 'Pebayuran' }}, {{ tanggalFormatted }}</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 1px 0;">Lampiran</td>
        <td style="vertical-align: top; padding: 1px 0;">:</td>
        <td style="vertical-align: top; padding: 1px 0;">{{ form.lampiran || '—' }}</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 1px 0;">Perihal</td>
        <td style="vertical-align: top; padding: 1px 0;">:</td>
        <td colspan="2" style="vertical-align: top; padding: 1px 0;">
          Pemberitahuan kekurangan syarat/<br>penolakan kehendak nikah/rujuk*)
        </td>
      </tr>
    </table>

    <!-- ══ KEPADA ══ -->
    <div style="margin-bottom: 16px; font-size: 13px; line-height: 1.7;">
      <div>Kepada yth,</div>
      <div>Calon pengantin/Wali</div>
      <div style="font-weight: bold;">{{ form.nama_penerima || '__________' }}</div>
      <div>di {{ form.alamat_penerima || '__________' }}</div>
    </div>

    <!-- ══ TUBUH SURAT ══ -->
    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
      Dengan hormat, setelah dilakukan pemeriksaan terhadap persyaratan pendaftaran
      pernikahan yang diatur dalam peraturan perundang-undangan bahwa permohonan
      pendaftaran nikah/rujuk Saudara
      <strong style="text-transform: uppercase;">{{ form.nama_catin || '__________' }}</strong>
      dengan Saudara
      <strong style="text-transform: uppercase;">{{ form.nama_pasangan || '__________' }}</strong>
      diberitahukan sebagai berikut:
    </div>

    <!-- ══ OPSI 1: DAPAT DILAKSANAKAN ══ -->
    <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 6px;">
      <div style="flex-shrink: 0; width: 14px; height: 14px; border: 1.5px solid black; margin-top: 2px;"
        :style="form.pilihan_dapat ? 'background: #000;' : ''"></div>
      <div style="flex: 1;">
        Pernikahan dapat dilaksanakan dengan melengkapi persyaratan:
        <ol style="margin: 4px 0 0 20px; padding: 0;">
          <li v-for="(item, i) in syaratDapat" :key="'dapat-'+i" style="margin-bottom: 2px;">
            {{ item || '__________' }}
          </li>
        </ol>
      </div>
    </div>

    <!-- ══ OPSI 2: DITOLAK ══ -->
    <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 20px;">
      <div style="flex-shrink: 0; width: 14px; height: 14px; border: 1.5px solid black; margin-top: 2px;"
        :style="form.pilihan_tolak ? 'background: #000;' : ''"></div>
      <div style="flex: 1;">
        Tidak dapat dilaksanakan (ditolak) karena tidak melengkapi persyaratan berupa:
        <ol style="margin: 4px 0 0 20px; padding: 0;">
          <li v-for="(item, i) in syaratTolak" :key="'tolak-'+i" style="margin-bottom: 2px;">
            {{ item || '__________' }}
          </li>
        </ol>
      </div>
    </div>

    <!-- ══ PENUTUP ══ -->
    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 36px;">
      Demikian agar menjadi maklumi.
    </div>

    <!-- ══ TANDA TANGAN ══ -->
    <div style="display: flex; justify-content: flex-end;">
      <div style="text-align: center; min-width: 240px;">
        <div>Wassalam,</div>
        <div>Kepala KUA/Penghulu/PPN LN</div>
        <div style="height: 64px;"></div>
        <div style="font-weight: bold; text-decoration: underline; letter-spacing: 0.3px; text-transform: uppercase;">
          {{ form.kepala || "Drs. H. Ma'mun Nawawi" }}
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  form: {
    lokasi: string
    kepala: string
    lampiran: string
    nama_penerima: string
    alamat_penerima: string
    nama_catin: string
    nama_pasangan: string
    pilihan_dapat: boolean
    pilihan_tolak: boolean
    syarat_dapat: string[]
    syarat_tolak: string[]
  }
  nomorSurat: string
  tanggalFormatted: string
}>()

const syaratDapat = computed(() => {
  const arr = props.form.syarat_dapat ?? []
  while (arr.length < 3) arr.push('')
  return arr.slice(0, 3)
})

const syaratTolak = computed(() => {
  const arr = props.form.syarat_tolak ?? []
  while (arr.length < 3) arr.push('')
  return arr.slice(0, 3)
})
</script>

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
    <div style="text-align: center; margin-bottom: 18px;">
      <div style="font-size: 14px; font-weight: bold; text-decoration: underline; letter-spacing: 1px;">
        {{ jenis === 'tercatat_kepolisian' ? 'SURAT KETERANGAN PERNIKAHAN' : 'SURAT KETERANGAN' }}
      </div>
      <div style="font-size: 13px;">Nomor: {{ nomorSurat }}</div>
    </div>

    <!-- ══ PEMBUKA ══ -->
    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
      Yang bertanda tangan di bawah ini, Kepala Kantor Urusan Agama Kecamatan Pebayuran
      Kabupaten Bekasi,
      {{ jenis === 'tercatat_kepolisian' ? 'menerangkan:' : 'dengan ini menerangkan bahwa:' }}
    </div>

    <!-- ══ TABEL DATA PASANGAN (format standar) ══ -->
    <template v-if="jenis !== 'tercatat_kepolisian'">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 13px; line-height: 1.8;">
        <tbody>
          <tr>
            <td style="width: 40%; padding: 1px 0 1px 2.5em;">Nama Suami</td>
            <td style="width: 4%; padding: 1px 8px;">:</td>
            <td style="font-weight: bold; text-transform: uppercase;">{{ form.nama_suami || '__________' }}</td>
          </tr>
          <tr>
            <td style="padding: 1px 0 1px 2.5em;">Nama Isteri</td>
            <td style="padding: 1px 8px;">:</td>
            <td style="font-weight: bold; text-transform: uppercase;">{{ form.nama_istri || '__________' }}</td>
          </tr>
          <tr>
            <td style="padding: 1px 0 1px 2.5em;">Tanggal Nikah</td>
            <td style="padding: 1px 8px;">:</td>
            <td>{{ form.tanggal_nikah ? formatTanggalNikah(form.tanggal_nikah) : '__________' }}</td>
          </tr>
          <tr>
            <td style="padding: 1px 0 1px 2.5em;">Tempat Nikah</td>
            <td style="padding: 1px 8px;">:</td>
            <td>{{ form.tempat_nikah || '__________' }}</td>
          </tr>
          <tr v-if="jenis === 'tercatat' || jenis === 'tercatat_terlambat'">
            <td style="padding: 1px 0 1px 2.5em;">Nomor Akta Nikah</td>
            <td style="padding: 1px 8px;">:</td>
            <td>{{ form.nomor_akta || '__________' }}</td>
          </tr>
          <tr v-if="jenis === 'tercatat' || jenis === 'tercatat_terlambat'">
            <td style="padding: 1px 0 1px 2.5em;">Nomor Perforasi</td>
            <td style="padding: 1px 8px;">:</td>
            <td>{{ form.nomor_perforasi || '__________' }}</td>
          </tr>
          <tr v-if="jenis === 'buku_nikah_palsu'">
            <td style="padding: 1px 0 1px 2.5em;">Nomor Akta Nikah</td>
            <td style="padding: 1px 8px;">:</td>
            <td>{{ form.nomor_akta || '__________' }}</td>
          </tr>
        </tbody>
      </table>
    </template>

    <!-- ══ DATA KEPOLISIAN (format individual per orang) ══ -->
    <template v-if="jenis === 'tercatat_kepolisian'">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 6px; font-size: 13px; line-height: 1.8;">
        <tbody>
          <tr>
            <td style="width: 40%; padding: 1px 0 1px 2.5em;">Nama</td>
            <td style="width: 4%; padding: 1px 8px;">:</td>
            <td style="font-weight: bold; text-transform: uppercase;">{{ form.nama_suami || '__________' }}</td>
          </tr>
          <tr>
            <td style="padding: 1px 0 1px 2.5em;">Tempat / Tgl. Lahir</td>
            <td style="padding: 1px 8px;">:</td>
            <td>{{ form.ttl_suami || '__________' }}</td>
          </tr>
          <tr>
            <td style="padding: 1px 0 1px 2.5em;">Pekerjaan</td>
            <td style="padding: 1px 8px;">:</td>
            <td>{{ form.pekerjaan_suami || '__________' }}</td>
          </tr>
          <tr>
            <td style="padding: 1px 0 1px 2.5em; vertical-align: top;">Alamat</td>
            <td style="padding: 1px 8px; vertical-align: top;">:</td>
            <td style="white-space: pre-line;">{{ form.alamat_suami || '__________' }}</td>
          </tr>
        </tbody>
      </table>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 13px; line-height: 1.8;">
        <tbody>
          <tr>
            <td style="width: 40%; padding: 1px 0 1px 2.5em;">Nama</td>
            <td style="width: 4%; padding: 1px 8px;">:</td>
            <td style="font-weight: bold; text-transform: uppercase;">{{ form.nama_istri || '__________' }}</td>
          </tr>
          <tr>
            <td style="padding: 1px 0 1px 2.5em;">Tempat / Tgl. Lahir</td>
            <td style="padding: 1px 8px;">:</td>
            <td>{{ form.ttl_istri || '__________' }}</td>
          </tr>
          <tr>
            <td style="padding: 1px 0 1px 2.5em;">Pekerjaan</td>
            <td style="padding: 1px 8px;">:</td>
            <td>{{ form.pekerjaan_istri || '__________' }}</td>
          </tr>
          <tr>
            <td style="padding: 1px 0 1px 2.5em; vertical-align: top;">Alamat</td>
            <td style="padding: 1px 8px; vertical-align: top;">:</td>
            <td style="white-space: pre-line;">{{ form.alamat_istri || '__________' }}</td>
          </tr>
        </tbody>
      </table>
    </template>

    <!-- ══ ISI SURAT (per jenis) ══ -->

    <!-- tercatat -->
    <div v-if="jenis === 'tercatat'"
      style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
      Bahwa pasangan tersebut di atas adalah benar-benar suami isteri yang sah,
      yang telah melangsungkan akad nikah secara sah menurut agama Islam, dan pernikahan tersebut
      telah tercatat dalam Buku Register Nikah Kantor Urusan Agama Kecamatan Pebayuran
      Kabupaten Bekasi.
    </div>

    <!-- tercatat_terlambat -->
    <div v-if="jenis === 'tercatat_terlambat'"
      style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
      Bahwa pasangan tersebut di atas adalah benar-benar suami isteri yang sah,
      yang telah melangsungkan akad nikah secara sah menurut agama Islam, dan pernikahan tersebut
      telah tercatat dalam Buku Register Nikah Kantor Urusan Agama Kecamatan Pebayuran
      Kabupaten Bekasi. Kutipan Akta Nikah atas nama yang bersangkutan belum dapat diterbitkan
      dikarenakan proses penerbitan buku nikah mengalami keterlambatan.
    </div>

    <!-- tidak_tercatat -->
    <div v-if="jenis === 'tidak_tercatat'"
      style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
      Bahwa pasangan tersebut di atas telah melangsungkan akad nikah secara sah menurut
      agama Islam, namun pernikahan tersebut <strong>tidak tercatat</strong> dalam Buku Register Nikah
      Kantor Urusan Agama Kecamatan Pebayuran Kabupaten Bekasi.
    </div>

    <!-- tidak_tercatat_isbat -->
    <template v-if="jenis === 'tidak_tercatat_isbat'">
      <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
        Bahwa pasangan tersebut di atas telah melangsungkan akad nikah secara sah menurut
        agama Islam, namun pernikahan tersebut <strong>tidak tercatat</strong> dalam Buku Register Nikah
        Kantor Urusan Agama Kecamatan Pebayuran Kabupaten Bekasi.
      </div>
      <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
        Surat keterangan ini diterbitkan sebagai surat pengantar untuk keperluan
        <strong>Isbat Nikah</strong> di Pengadilan Agama Kabupaten Bekasi.
      </div>
    </template>

    <!-- tidak_tercatat_bpjs -->
    <template v-if="jenis === 'tidak_tercatat_bpjs'">
      <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
        Bahwa pasangan tersebut di atas telah melangsungkan akad nikah secara sah menurut
        agama Islam, namun pernikahan tersebut <strong>tidak tercatat</strong> dalam Buku Register Nikah
        Kantor Urusan Agama Kecamatan Pebayuran Kabupaten Bekasi.
      </div>
      <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
        Surat keterangan ini diterbitkan untuk keperluan pendaftaran <strong>BPJS Kesehatan</strong>
        atas nama yang bersangkutan.
      </div>
    </template>

    <!-- buku_nikah_palsu -->
    <template v-if="jenis === 'buku_nikah_palsu'">
      <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
        Bahwa setelah dilakukan penelitian dan pengecekan pada Buku Register Nikah Kantor Urusan
        Agama Kecamatan Pebayuran, <strong>Nomor Akta Nikah {{ form.nomor_akta || '______' }}</strong>
        atas nama
        <strong style="text-transform: uppercase;">{{ form.nama_suami || '______' }}</strong> dan
        <strong style="text-transform: uppercase;">{{ form.nama_istri || '______' }}</strong>
        <strong>tidak terdaftar</strong> dalam Buku Register Nikah KUA Kecamatan Pebayuran Kabupaten Bekasi.
      </div>
      <div v-if="form.nama_ppn_asli || form.nama_ppn_palsu"
        style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
        Pegawai Pencatat Nikah (PPN) yang tercatat dalam dokumen tersebut atas nama
        <strong>{{ form.nama_ppn_palsu || '______' }}</strong>,
        sedangkan PPN yang bertugas di KUA Kecamatan Pebayuran pada periode yang bersangkutan adalah
        <strong>{{ form.nama_ppn_asli || '______' }}</strong>.
      </div>
    </template>

    <!-- tercatat_kepolisian -->
    <div v-if="jenis === 'tercatat_kepolisian'"
      style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
      Adalah pasangan suami-isteri yang telah menikah pada tanggal
      <strong>{{ form.tanggal_nikah ? formatTanggalNikah(form.tanggal_nikah) : '_______________' }}</strong>,
      pernikahannya tercatat di kantor KUA Kecamatan Pebayuran, dengan nomor akta nikah:
      <strong>{{ form.nomor_akta || '______' }}</strong>,
      Seri: <strong>{{ form.seri || '______' }}</strong>,
      dan No Perforasi <strong>{{ form.nomor_perforasi || '______' }}</strong>.
    </div>

    <!-- ══ PENUTUP ══ -->
    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 36px;">
      <template v-if="jenis === 'tercatat_kepolisian'">
        Demikian keterangan ini dibuat, agar dapat dipergunakan sebagaimana mestinya.
      </template>
      <template v-else>
        Demikian surat keterangan ini dibuat dengan sebenar-benarnya, untuk dapat dipergunakan
        sebagaimana mestinya.
      </template>
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
const props = defineProps<{
  form: {
    lokasi: string
    kepala: string
    nama_suami: string
    nama_istri: string
    tanggal_nikah: string
    tempat_nikah: string
    nomor_register: string
    nomor_akta: string
    nama_ppn_asli: string
    nama_ppn_palsu: string
    // tercatat_kepolisian fields
    ttl_suami: string
    pekerjaan_suami: string
    alamat_suami: string
    ttl_istri: string
    pekerjaan_istri: string
    alamat_istri: string
    seri: string
    nomor_perforasi: string
  }
  jenis: string
  nomorSurat: string
  tanggalFormatted: string
}>()

const formatTanggalNikah = (raw: string) => {
  const d = new Date(raw + 'T00:00:00')
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

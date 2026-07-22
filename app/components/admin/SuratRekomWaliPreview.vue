<template>
  <div class="surat-paper font-['Times_New_Roman',_Times,_serif] text-[13px] leading-relaxed text-black bg-white"
    style="width: 210mm; min-height: 330mm; padding: 10mm 20mm 20mm 20mm; box-sizing: border-box;">

    <!-- ══ KOP SURAT ══ -->
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 8px;">
      <img src="/logo-kua.png" alt="Logo KUA"
        style="width: 88px; height: 88px; object-fit: contain; flex-shrink: 0;" />
      <div style="flex: 1; text-align: center; line-height: 1.4;">
        <div style="font-size: 17px; font-weight: bold; letter-spacing: 0.3px;">KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
        <div style="font-size: 13px; font-weight: bold;">KANTOR KEMENTERIAN AGAMA KABUPATEN BEKASI</div>
        <div style="font-size: 13px; font-weight: bold;">KANTOR URUSAN AGAMA KECAMATAN PEBAYURAN</div>
        <div style="font-size: 11px; margin-top: 3px;">Jl. Raya Pebayuran, Kabupaten Bekasi, Jawa Barat 17710 Telp. 0877-8558-7322</div>
      </div>
    </div>

    <!-- Garis pemisah KOP -->
    <div style="border-top: 3px solid black; margin-bottom: 1px;"></div>
    <div style="border-top: 1px solid black; margin-bottom: 18px;"></div>

    <!-- ══ NOMOR, SIFAT, LAMPIRAN, HAL ══ -->
    <table style="width: 100%; font-size: 13px; margin-bottom: 18px; border-collapse: collapse;">
      <tr>
        <td style="width: 78px; vertical-align: top; padding: 1px 0;">Nomor</td>
        <td style="width: 10px; vertical-align: top; padding: 1px 0;">:</td>
        <td style="vertical-align: top; padding: 1px 0;">{{ nomorSurat }}</td>
        <td style="text-align: right; vertical-align: top; padding: 1px 0;">{{ form.lokasi || 'Pebayuran' }}, {{ tanggalFormatted }}</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 1px 0;">Sifat</td>
        <td style="vertical-align: top; padding: 1px 0;">:</td>
        <td style="vertical-align: top; padding: 1px 0;">Penting</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 1px 0;">Lampiran</td>
        <td style="vertical-align: top; padding: 1px 0;">:</td>
        <td style="vertical-align: top; padding: 1px 0;">-</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 1px 0;">Hal</td>
        <td style="vertical-align: top; padding: 1px 0;">:</td>
        <td colspan="2" style="vertical-align: top; padding: 1px 0; font-weight: bold;">Rekomendasi Wali Nikah</td>
      </tr>
    </table>

    <!-- ══ KEPADA ══ -->
    <div style="margin-bottom: 16px; font-size: 13px; line-height: 1.6;">
      <div>Kepada Yth.</div>
      <div>Kepala Kantor Urusan Agama</div>
      <div>Kecamatan <span style="display: inline-block; min-width: 120px; border-bottom: 1px dotted #999;">: {{ form.kec_tujuan || '__________' }}</span></div>
      <div>Kab/Kota <span style="display: inline-block; min-width: 112px; border-bottom: 1px dotted #999;">: {{ form.kab_tujuan || '__________' }}</span></div>
    </div>

    <!-- ══ ASSALAMUALAIKUM ══ -->
    <div style="margin-bottom: 14px; font-size: 13px; line-height: 1.6;">
      <em>Assalamu'alaikum Wr. Wb.</em>
    </div>

    <!-- ══ TUBUH SURAT ══ -->
    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
      Kami beritahukan dengan hormat, bahwa telah datang menghadap kepada
      kami seorang laki-laki:
    </div>

    <!-- ══ DATA WALI ══ -->
    <table style="width: 100%; font-size: 13px; margin-bottom: 14px; border-collapse: collapse;">
      <tr>
        <td style="width: 140px; vertical-align: top; padding: 2px 0;">Nama</td>
        <td style="width: 12px; vertical-align: top; padding: 2px 0;">:</td>
        <td style="vertical-align: top; padding: 2px 0; font-weight: bold; text-transform: uppercase;">{{ form.wali_nama || '__________' }}</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 2px 0;">Bin</td>
        <td style="vertical-align: top; padding: 2px 0;">:</td>
        <td style="vertical-align: top; padding: 2px 0; text-transform: uppercase;">{{ form.wali_bin || '__________' }}</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 2px 0;">Tempat/Tgl. lahir</td>
        <td style="vertical-align: top; padding: 2px 0;">:</td>
        <td style="vertical-align: top; padding: 2px 0;">{{ form.wali_ttl || '__________' }}</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 2px 0;">Jenis Kelamin</td>
        <td style="vertical-align: top; padding: 2px 0;">:</td>
        <td style="vertical-align: top; padding: 2px 0;">Laki-laki</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 2px 0;">Agama</td>
        <td style="vertical-align: top; padding: 2px 0;">:</td>
        <td style="vertical-align: top; padding: 2px 0;">Islam</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 2px 0;">Warganegara</td>
        <td style="vertical-align: top; padding: 2px 0;">:</td>
        <td style="vertical-align: top; padding: 2px 0;">Indonesia</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 2px 0;">Pekerjaan</td>
        <td style="vertical-align: top; padding: 2px 0;">:</td>
        <td style="vertical-align: top; padding: 2px 0;">{{ form.wali_pekerjaan || '__________' }}</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 2px 0;">Alamat</td>
        <td style="vertical-align: top; padding: 2px 0;">:</td>
        <td style="vertical-align: top; padding: 2px 0;">{{ form.wali_alamat || '__________' }}</td>
      </tr>
    </table>

    <!-- ══ BERDASARKAN SURAT KETERANGAN DESA ══ -->
    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
      Berdasarkan Surat Keterangan dari Kepala Desa {{ form.desa || '__________' }} Nomor:
      {{ form.no_sk_desa || '__________' }} tanggal {{ form.tgl_sk_desa || '__________' }}
      dan setelah kami adakan pemeriksaan, yang bersangkutan adalah benar-benar
      wali nikah sekaligus {{ form.hubungan || 'Saudara Laki-laki Seayah Seibu' }} dari seorang perempuan:
    </div>

    <!-- ══ DATA PEREMPUAN ══ -->
    <table style="width: 100%; font-size: 13px; margin-bottom: 14px; border-collapse: collapse;">
      <tr>
        <td style="width: 140px; vertical-align: top; padding: 2px 0;">Nama</td>
        <td style="width: 12px; vertical-align: top; padding: 2px 0;">:</td>
        <td style="vertical-align: top; padding: 2px 0; font-weight: bold; text-transform: uppercase;">{{ form.pr_nama || '__________' }}</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 2px 0;">Binti</td>
        <td style="vertical-align: top; padding: 2px 0;">:</td>
        <td style="vertical-align: top; padding: 2px 0; text-transform: uppercase;">{{ form.pr_binti || '__________' }}</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 2px 0;">Tempat/Tgl. lahir</td>
        <td style="vertical-align: top; padding: 2px 0;">:</td>
        <td style="vertical-align: top; padding: 2px 0;">{{ form.pr_ttl || '__________' }}</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 2px 0;">Warganegara</td>
        <td style="vertical-align: top; padding: 2px 0;">:</td>
        <td style="vertical-align: top; padding: 2px 0;">Indonesia</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 2px 0;">Agama</td>
        <td style="vertical-align: top; padding: 2px 0;">:</td>
        <td style="vertical-align: top; padding: 2px 0;">Islam</td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 2px 0;">Alamat</td>
        <td style="vertical-align: top; padding: 2px 0;">:</td>
        <td style="vertical-align: top; padding: 2px 0;">{{ form.pr_alamat || '__________' }}</td>
      </tr>
    </table>

    <!-- ══ PENUTUP ══ -->
    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 14px;">
      Demikian dan selanjutnya untuk dapat dipergunakan sebagaimana mestinya.
    </div>

    <div style="text-align: justify; text-indent: 2.5em; line-height: 1.8; margin-bottom: 40px;">
      <em>Wassalamu'alaikum Wr. Wb.</em>
    </div>

    <!-- ══ TANDA TANGAN ══ -->
    <div style="display: flex; justify-content: flex-end;">
      <div style="text-align: center; min-width: 240px;">
        <div>Kepala KUA Kec. Pebayuran</div>
        <div style="height: 72px;"></div>
        <div style="font-weight: bold; text-decoration: underline; letter-spacing: 0.3px; text-transform: uppercase;">
          {{ form.kepala || "Drs. H. Ma'mun Nawawi" }}
        </div>
        <div v-if="form.kepala === 'Drs. H. Ma\u2019mun Nawawi'" style="font-size: 11px; margin-top: 2px;">
          NIP. 196705051998031001
        </div>
      </div>
    </div>

    <!-- ══ CATATAN ══ -->
    <div style="margin-top: 40px; font-size: 10px; color: #666; text-align: center; font-style: italic;">
      * Dicetak pada kertas F4 (210mm &times; 330mm)
    </div>

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  form: {
    lokasi: string
    kepala: string
    kec_tujuan: string
    kab_tujuan: string
    wali_nama: string
    wali_bin: string
    wali_ttl: string
    wali_pekerjaan: string
    wali_alamat: string
    desa: string
    no_sk_desa: string
    tgl_sk_desa: string
    hubungan: string
    pr_nama: string
    pr_binti: string
    pr_ttl: string
    pr_alamat: string
  }
  nomorSurat: string
  tanggalFormatted: string
}>()
</script>

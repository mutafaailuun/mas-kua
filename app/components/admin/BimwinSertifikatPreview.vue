<template>
  <div style="font-family: 'Times New Roman', Times, serif; font-size: 11px; color: #000; background: #fff; width: 297mm; padding: 15mm 20mm 15mm 20mm; box-sizing: border-box;">

    <div style="text-align: center; margin-bottom: 12px;">
      <div style="font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
        Tanda Terima Sertifikat dan Buku Bimbingan Perkawinan Mandiri
      </div>
      <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; margin-top: 2px;">
        KUA Kecamatan Pebayuran
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 10.5px; table-layout: fixed;">
      <colgroup>
        <col style="width: 28px;" />
        <col style="width: 18%;" />
        <col style="width: 18%;" />
        <col />
        <col style="width: 110px;" />
        <col style="width: 52px;" />
        <col style="width: 52px;" />
      </colgroup>
      <thead>
        <tr style="background: #f5f5f5;">
          <th style="border: 1px solid black; padding: 7px 4px; text-align: center;">No</th>
          <th style="border: 1px solid black; padding: 7px 6px; text-align: center;">Nama Calon Suami</th>
          <th style="border: 1px solid black; padding: 7px 6px; text-align: center;">Nama Calon Isteri</th>
          <th style="border: 1px solid black; padding: 7px 6px; text-align: center;">Alamat</th>
          <th style="border: 1px solid black; padding: 7px 4px; text-align: center;">Tanggal Bimbingan Mandiri</th>
          <th colspan="2" style="border: 1px solid black; padding: 7px 4px; text-align: center;">TTD</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, i) in rows" :key="i" style="height: 42px;">
          <td style="border: 1px solid black; padding: 6px 4px; text-align: center; vertical-align: middle;">{{ i + 1 }}</td>
          <td style="border: 1px solid black; padding: 6px 8px; vertical-align: middle;">{{ p.nama_suami }}</td>
          <td style="border: 1px solid black; padding: 6px 8px; vertical-align: middle;">{{ p.nama_istri }}</td>
          <td style="border: 1px solid black; padding: 6px 8px; vertical-align: middle; font-size: 9.5px; word-break: break-word;">{{ p.alamat }}</td>
          <td style="border: 1px solid black; padding: 6px 4px; text-align: center; vertical-align: middle; font-size: 10px;">{{ p.nama_suami ? tanggalBimwinFormatted : '' }}</td>
          <td style="border: 1px solid black; padding: 6px;"></td>
          <td style="border: 1px solid black; padding: 6px;"></td>
        </tr>
      </tbody>
    </table>

    <div style="display: flex; justify-content: flex-end; margin-top: 14px;">
      <div style="text-align: center; min-width: 200px;">
        <div>{{ form.lokasi || 'Pebayuran' }}, {{ tanggalBimwinFormatted }}</div>
        <div>Kepala KUA Kec. Pebayuran</div>
        <div style="height: 60px;"></div>
        <div style="font-weight: bold; text-decoration: underline; text-transform: uppercase;">{{ form.kepala }}</div>
        <div>NIP. {{ form.nip }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  form: { lokasi: string; kepala: string; nip: string; tanggal_bimwin_raw: string }
  pasangan: Array<{ nama_suami: string; nama_istri: string; tanggal_nikah: string; alamat: string }>
  jumlahBaris: number
}>()

const rows = computed(() => {
  const result = props.pasangan.map(p => ({ ...p }))
  const total = Math.max(props.jumlahBaris, result.length)
  while (result.length < total) result.push({ nama_suami: '', nama_istri: '', tanggal_nikah: '', alamat: '' })
  return result
})

const tanggalBimwinFormatted = computed(() => {
  if (!props.form.tanggal_bimwin_raw) return '_______________'
  return new Date(props.form.tanggal_bimwin_raw + 'T00:00:00').toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
})
</script>

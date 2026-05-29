<template>
	<div
		class="surat-paper font-['Times_New_Roman',_Times,_serif] text-[13px] leading-relaxed text-black bg-white"
		style="
			position: relative;
			width: 210mm;
			min-height: 297mm;
			padding: 15mm 20mm 20mm 20mm;
			box-sizing: border-box;
		"
	>
		<!-- Corner marks -->
		<div
			style="
				position: absolute;
				top: 20px;
				left: 20px;
				width: 22px;
				height: 22px;
				border-left: 2px solid black;
				border-top: 2px solid black;
			"
		></div>
		<div
			style="
				position: absolute;
				top: 20px;
				right: 20px;
				width: 22px;
				height: 22px;
				border-right: 2px solid black;
				border-top: 2px solid black;
			"
		></div>
		<div
			style="
				position: absolute;
				bottom: 20px;
				left: 20px;
				width: 22px;
				height: 22px;
				border-left: 2px solid black;
				border-bottom: 2px solid black;
			"
		></div>
		<div
			style="
				position: absolute;
				bottom: 20px;
				right: 20px;
				width: 22px;
				height: 22px;
				border-right: 2px solid black;
				border-bottom: 2px solid black;
			"
		></div>

		<!-- Judul -->
		<div style="text-align: center; margin-bottom: 28px">
			<div
				style="
					font-size: 14px;
					font-weight: bold;
					text-decoration: underline;
					letter-spacing: 1px;
					line-height: 1.6;
				"
			>
				SURAT PERMOHONAN
			</div>
		</div>

		<!-- Pembuka -->
		<div style="margin-bottom: 16px; line-height: 1.8">
			Yang bertanda tangan di bawah ini :
		</div>

		<!-- Data Pemohon -->
		<table
			style="
				width: 100%;
				border-collapse: collapse;
				margin-bottom: 20px;
				font-size: 13px;
				line-height: 2;
			"
		>
			<tbody>
				<tr>
					<td style="width: 38%; padding: 1px 0">Nama</td>
					<td style="width: 4%; padding: 1px 8px">:</td>
					<td style="font-weight: bold; text-transform: uppercase">
						{{ form.nama || "__________" }}
					</td>
				</tr>
				<tr>
					<td style="padding: 1px 0">Tempat/tgl lahir</td>
					<td style="padding: 1px 8px">:</td>
					<td>{{ form.ttl || "__________" }}</td>
				</tr>
				<tr>
					<td style="padding: 1px 0">Pekerjaan</td>
					<td style="padding: 1px 8px">:</td>
					<td>{{ form.pekerjaan || "__________" }}</td>
				</tr>
				<tr>
					<td style="vertical-align: top; padding: 1px 0">Alamat</td>
					<td style="vertical-align: top; padding: 1px 8px">:</td>
					<td style="white-space: pre-line">
						{{ form.alamat || "__________" }}
					</td>
				</tr>
			</tbody>
		</table>

		<!-- Isi Permohonan -->
		<div
			style="
				text-align: justify;
				text-indent: 2.5em;
				line-height: 1.8;
				margin-bottom: 16px;
			"
		>
			Adapun isi Permohonan ini, untuk meminta Keterangan tentang keabsahan
			Kutipan Akta Nikah Nomor :
			<strong>{{ form.nomor_akta || "__________" }}</strong> atas nama
			<strong style="text-transform: uppercase">{{
				form.nama_suami || "__________"
			}}</strong>
			dengan
			<strong style="text-transform: uppercase">{{
				form.nama_istri || "__________"
			}}</strong>
			yang didalam Kutipan Akta Nikah tersebut dialamatkan KUA Kec.
			{{ form.kua_kecamatan || "__________" }} Kab.
			{{ form.kua_kabupaten || "__________" }}
		</div>

		<!-- Penutup -->
		<div
			style="
				text-align: justify;
				text-indent: 2.5em;
				line-height: 1.8;
				margin-bottom: 48px;
			"
		>
			Demikianlah Surat Permohonan ini saya buat agar dapat dipergunakan
			sebagaimana mestinya.
		</div>

		<!-- Tanda Tangan -->
		<div style="display: flex; justify-content: flex-end">
			<div style="text-align: center; min-width: 200px">
				<div>{{ form.lokasi || "Bekasi" }}, {{ tanggalFormatted }}</div>
				<div style="margin-top: 2px">Pemohon</div>
				<div style="height: 72px"></div>
				<div
					style="
						font-weight: bold;
						text-transform: uppercase;
					"
				>
					{{ form.nama || "__________" }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	form: {
		nama: string
		ttl: string
		pekerjaan: string
		alamat: string
		nomor_akta: string
		nama_suami: string
		nama_istri: string
		kua_kecamatan: string
		kua_kabupaten: string
		tanggal_raw: string
		lokasi: string
	}
	tanggalFormatted: string
}>()
</script>

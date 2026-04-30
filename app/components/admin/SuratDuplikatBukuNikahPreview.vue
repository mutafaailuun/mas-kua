<template>
	<div>
		<!-- ══ HALAMAN 1: COVER ══ -->
		<!-- Nama: suami jika pemohon=suami/keduanya, istri jika pemohon=istri -->
		<div
			class="surat-paper text-black bg-white"
			style="
				position: relative;
				width: 210mm;
				min-height: 297mm;
				padding: 0;
				box-sizing: border-box;
				page-break-after: always;
				font-family: Tahoma, sans-serif;
			"
		>
			<!-- Double border frame -->
			<div
				style="
					position: absolute;
					inset: 15px;
					border: 4px double black;
					pointer-events: none;
				"
			></div>

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

			<!-- Content -->
			<div
				style="
					height: 100%;
					min-height: 297mm;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
					padding: 55px 60px 55px 60px;
					box-sizing: border-box;
				"
			>
				<!-- Nama + Nomor Porporasi -->
				<div style="text-align: center">
					<div
						style="
							font-size: 18px;
							font-weight: bold;
							text-transform: uppercase;
						"
					>
						{{
							form.pemohon === "istri"
								? form.nama_istri || "__________________________"
								: form.nama_suami || "__________________________"
						}}
					</div>
					<div
						style="
							font-size: 14px;
							font-weight: bold;
							text-decoration: underline;
							margin-top: 5px;
						"
					>
						Nomor Porporasi :
						{{
							form.pemohon === "istri"
								? form.nomor_porporasi_istri || "___________"
								: form.nomor_porporasi_suami || "___________"
						}}
					</div>
				</div>

				<!-- Logo Kemenag -->
				<img
					src="/logo-kemenag.png"
					alt="Logo Kemenag"
					style="width: 310px; height: 310px; object-fit: contain"
				/>

				<!-- Dua kotak foto 4x6 cm -->
				<div style="display: flex; gap: 40px">
					<div
						style="width: 4cm; height: 6cm; border: 1.5px solid black"
					></div>
					<div
						style="width: 4cm; height: 6cm; border: 1.5px solid black"
					></div>
				</div>
			</div>
		</div>

		<!-- ══ HALAMAN 2: SURAT PERMOHONAN ══ -->
		<div
			class="surat-paper font-['Times_New_Roman',_Times,_serif] text-[13px] leading-relaxed text-black bg-white"
			style="
				width: 210mm;
				min-height: 297mm;
				padding: 100px 75px 80px 113px;
				box-sizing: border-box;
			"
		>
			<!-- Judul -->
			<div style="text-align: center; margin-bottom: 24px">
				<div
					style="
						font-size: 14px;
						font-weight: bold;
						text-decoration: underline;
						letter-spacing: 1px;
						line-height: 1.6;
					"
				>
					SURAT PERMOHONAN BUKU DUPLIKAT AKTA NIKAH
				</div>
			</div>

			<!-- Pembuka -->
			<div style="margin-bottom: 16px; line-height: 1.8">
				Yang bertanda tangan dibawah ini :
			</div>

			<!-- Data Pemohon Suami -->
			<template v-if="form.pemohon === 'keduanya' || form.pemohon === 'suami'">
				<table
					style="
						width: 100%;
						border-collapse: collapse;
						margin-bottom: 14px;
						font-size: 13px;
						line-height: 1.8;
					"
				>
					<tbody>
						<tr>
							<td style="width: 42%; padding: 1px 0 1px 2.5em">Nama</td>
							<td style="width: 4%; padding: 1px 8px">:</td>
							<td style="font-weight: bold; text-transform: uppercase">
								{{ form.nama_suami || "__________" }}
							</td>
						</tr>
						<tr>
							<td style="padding: 1px 0 1px 2.5em">Tempat/Tgl Lahir</td>
							<td style="padding: 1px 8px">:</td>
							<td>{{ form.ttl_suami || "__________" }}</td>
						</tr>
						<tr>
							<td style="padding: 1px 0 1px 2.5em">Pekerjaan</td>
							<td style="padding: 1px 8px">:</td>
							<td>{{ form.pekerjaan_suami || "__________" }}</td>
						</tr>
						<tr>
							<td style="vertical-align: top; padding: 1px 0 1px 2.5em">
								Alamat
							</td>
							<td style="vertical-align: top; padding: 1px 8px">:</td>
							<td style="white-space: pre-line">
								{{ form.alamat_suami || "__________" }}
							</td>
						</tr>
					</tbody>
				</table>
			</template>

			<!-- Data Pemohon Istri -->
			<template v-if="form.pemohon === 'keduanya' || form.pemohon === 'istri'">
				<table
					style="
						width: 100%;
						border-collapse: collapse;
						margin-bottom: 14px;
						font-size: 13px;
						line-height: 1.8;
					"
				>
					<tbody>
						<tr>
							<td style="width: 42%; padding: 1px 0 1px 2.5em">Nama</td>
							<td style="width: 4%; padding: 1px 8px">:</td>
							<td style="font-weight: bold; text-transform: uppercase">
								{{ form.nama_istri || "__________" }}
							</td>
						</tr>
						<tr>
							<td style="padding: 1px 0 1px 2.5em">Tempat/Tgl Lahir</td>
							<td style="padding: 1px 8px">:</td>
							<td>{{ form.ttl_istri || "__________" }}</td>
						</tr>
						<tr>
							<td style="padding: 1px 0 1px 2.5em">Pekerjaan</td>
							<td style="padding: 1px 8px">:</td>
							<td>{{ form.pekerjaan_istri || "__________" }}</td>
						</tr>
						<tr>
							<td style="vertical-align: top; padding: 1px 0 1px 2.5em">
								Alamat
							</td>
							<td style="vertical-align: top; padding: 1px 8px">:</td>
							<td style="white-space: pre-line">
								{{ form.alamat_istri || "__________" }}
							</td>
						</tr>
					</tbody>
				</table>
			</template>

			<!-- Isi Permohonan -->
			<div
				style="
					text-align: justify;
					text-indent: 2.5em;
					line-height: 1.8;
					margin-bottom: 14px;
				"
			>
				Adapun isi surat ini, untuk mengurus/meminta Buku Duplikat Akta Nikah
				dengan Nomor Akta :
				<strong>{{ form.nomor_akta || "__________" }}</strong>
				Atas nama
				<strong style="text-transform: uppercase">{{
					form.nama_suami || "__________"
				}}</strong>
				dengan
				<strong style="text-transform: uppercase">{{
					form.nama_istri || "__________"
				}}</strong
				>.
			</div>

			<!-- Penutup -->
			<div
				style="
					text-align: justify;
					text-indent: 2.5em;
					line-height: 1.8;
					margin-bottom: 40px;
				"
			>
				Demikian Surat Permohonan ini saya buat agar dapat dipergunakan
				sebagaimana mestinya.
			</div>

			<!-- Tanda Tangan -->
			<div style="display: flex; justify-content: flex-end">
				<div style="text-align: center">
					<div>{{ form.lokasi || "Bekasi" }}, {{ tanggalFormatted }}</div>
					<div style="margin-top: 2px">Pemohon,</div>

					<!-- Keduanya: dua tanda tangan berdampingan -->
					<template v-if="form.pemohon === 'keduanya'">
						<div
							style="
								display: flex;
								gap: 60px;
								justify-content: center;
								margin-top: 4px;
							"
						>
							<div style="text-align: center">
								<div style="font-size: 12px">Suami</div>
								<div style="height: 64px"></div>
								<div
									style="
										font-weight: bold;
										text-decoration: underline;
										text-transform: uppercase;
									"
								>
									{{ form.nama_suami || "__________" }}
								</div>
							</div>
							<div style="text-align: center">
								<div style="font-size: 12px">Istri</div>
								<div style="height: 64px"></div>
								<div
									style="
										font-weight: bold;
										text-decoration: underline;
										text-transform: uppercase;
									"
								>
									{{ form.nama_istri || "__________" }}
								</div>
							</div>
						</div>
					</template>

					<!-- Suami saja -->
					<template v-else-if="form.pemohon === 'suami'">
						<div style="text-align: center">
							<div style="font-size: 12px">Suami</div>
							<div style="height: 64px"></div>
							<div
								style="
									font-weight: bold;
									text-decoration: underline;
									text-transform: uppercase;
									min-width: 200px;
								"
							>
								{{ form.nama_suami || "__________" }}
							</div>
						</div>
					</template>

					<!-- Istri saja -->
					<template v-else-if="form.pemohon === 'istri'">
						<div style="text-align: center">
							<div style="font-size: 12px">Istri</div>
							<div style="height: 64px"></div>
							<div
								style="
									font-weight: bold;
									text-decoration: underline;
									text-transform: uppercase;
									min-width: 200px;
								"
							>
								{{ form.nama_istri || "__________" }}
							</div>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	form: {
		pemohon: "keduanya" | "suami" | "istri";
		nama_suami: string;
		nama_istri: string;
		ttl_suami: string;
		pekerjaan_suami: string;
		alamat_suami: string;
		ttl_istri: string;
		pekerjaan_istri: string;
		alamat_istri: string;
		nomor_akta: string;
		nomor_porporasi_suami: string;
		nomor_porporasi_istri: string;
		tanggal_raw: string;
		lokasi: string;
	};
	tanggalFormatted: string;
}>();
</script>

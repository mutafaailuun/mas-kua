import { ref } from "vue";

export const services = ref([
  {
    title: "Pendaftaran Nikah & Rujuk",
    content: `
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Alur Prosedur:</h4>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Datang ke KUA dengan membawa persyaratan lengkap</li>
        <li>Mengisi formulir pendaftaran</li>
        <li>Verifikasi dokumen oleh petugas</li>
        <li>Penetapan jadwal akad nikah</li>
        <li>Pelaksanaan akad nikah</li>
      </ol>
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Syarat Dokumen:</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>KTP calon pengantin</li>
        <li>KK calon pengantin</li>
        <li>Akta kelahiran/Ijazah terakhir</li>
        <li>Surat keterangan untuk nikah (N1-N4)</li>
        <li>Pas foto 2x3 (5 lembar)</li>
      </ul>
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Info Biaya:</h4>
      <p>Gratis untuk nikah di KUA pada jam kerja. Biaya Rp 600.000 untuk nikah di luar KUA.</p>
    `,
  },
  {
    title: "Bimbingan Perkawinan (Bimwin)",
    content: `
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Jadwal:</h4>
      <p class="mb-4">Setiap hari Rabu dan Jumat, pukul 09:00 - 12:00 WIB</p>
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Materi Penting:</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Hak dan kewajiban suami istri</li>
        <li>Manajemen keuangan keluarga</li>
        <li>Kesehatan reproduksi</li>
        <li>Psikologi pernikahan</li>
      </ul>
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Cara Daftar:</h4>
      <p>Pendaftaran dilakukan bersamaan dengan pendaftaran nikah. Wajib diikuti oleh kedua calon pengantin.</p>
    `,
  },
  {
    title: "Legalisasi & Duplikat Buku Nikah",
    content: `
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Prosedur Permohonan:</h4>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Mengajukan surat permohonan</li>
        <li>Melampirkan dokumen pendukung</li>
        <li>Verifikasi data oleh petugas</li>
        <li>Proses legalisasi/pembuatan duplikat</li>
      </ol>
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Syarat Dokumen:</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Surat permohonan</li>
        <li>KTP pemohon</li>
        <li>Buku nikah asli (untuk legalisasi)</li>
        <li>Surat kehilangan dari kepolisian (untuk duplikat)</li>
      </ul>
    `,
  },
]);

export const faqs = ref([
  {
    question: "Berapa lama proses pendaftaran nikah hingga selesai?",
    answer:
      "Proses pendaftaran nikah memerlukan waktu minimal 10 hari kerja sejak berkas lengkap diterima. Ini sesuai dengan peraturan yang berlaku untuk memberikan waktu pengumuman dan persiapan administrasi.",
  },
  {
    question: "Apakah bisa mendaftar nikah secara online?",
    answer:
      "Saat ini pendaftaran nikah masih harus dilakukan secara langsung di KUA. Namun, Anda bisa mendapatkan informasi lengkap dan mengunduh formulir melalui platform MAS KUA ini.",
  },
  {
    question:
      "Bagaimana jika salah satu calon pengantin berasal dari luar kota?",
    answer:
      "Calon pengantin dari luar kota harus membawa surat rekomendasi nikah (N1-N4) dari KUA setempat. Pastikan semua dokumen sudah dilegalisir oleh pejabat berwenang.",
  },
  {
    question: "Kapan jam operasional pelayanan KUA Kecamatan Pebayuran?",
    answer:
      "KUA Kecamatan Pebayuran melayani masyarakat pada hari Senin - Jumat, pukul 08:00 - 16:00 WIB. Khusus hari Jumat, istirahat pukul 11:30 - 13:00 WIB.",
  },
]);

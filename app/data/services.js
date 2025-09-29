import { ref } from "vue";

export const services = ref([
  {
    title: "Pendaftaran Nikah",
    content: `
      <h4 class="text-lg font-bold text-gray-800 mb-2 bg-gray-100 -m-5 p-5">PENDAFTARAN OFFLINE/LURING</h4>
      <h5 class="text-lg font-semibold text-gray-800 mb-2 underline">Langkah Pertama</h5>
        <ol class="list-decimal list-inside space-y-2 mb-4">
            <strong><li>Pergi ke kantor desa/kelurahan</li></strong>
            <p>Mendatangi kantor kelurahan untuk mengurus surat pengantar nikah (N1-N4) yang akan dibawa oleh calon pengantin ke KUA Kecamatan (Berdasarkan Permendagri No. 108 Tahun 2019 tentang Peraturan Pelaksanaan Pepres Nomor 96 Tahun 2018 tentang Persyaratan dan Tata Cara Pendaftaran Penduduk dan Pencatatan Sipil, surat pengantar RT/RW tidak diperlukan lagi)</p>
            <strong><li>Urus Surat Rekomendasi (Numpang) Nikah</li></strong>
            <p>Apabila pernikahan diadakan diluar kecamatan setempat, maka perlu mengurus surat rekomendasi nikah untuk dibawa ke KUA kecamatan tempat calon pengantin melaksanakan akad nikah.</p>
            <strong><li>Surat Dispensasi Nikah (-10 hari akad)</li></strong>
            <p>Apabila pernikahan kurang dari 10 hari kerja, Maka mendatangi kantor kecamatan tempat akad nikah untuk memohon dispensasi nikah jika kurang dari 10 hari kerja.</p>
            <strong><li>Surat Keterangan Sehat</li></strong>
            <p>Menyiapkan surat keterangan sehat dari fasilitas kesehatan yang resmi sebagai salah satu persyaratan administrasi yang wajib dilampirkan dalam proses pendaftaran nikah.</p>
        </ol>

      <h5 class="text-lg font-semibold text-gray-800 mb-2 underline">Langkah Kedua</h5>
      <p>Melakukan pendaftaran nikah di KUA tempat dilaksanakan akad nikah.</p>
      
      <h5 class="text-lg font-semibold text-gray-800 mb-2 underline mt-5">Langkah Ketiga</h5>
        <ol class="list-decimal list-outside space-y-2 mb-4 px-5">
            <li>Pemeriksaan data nikah calon pengantin dan wali nikah di KUA tempat akad nikah oleh petugas KUA.</li>
            <li>Calon pengantin yang telah melakukan pendaftaran kehendak nikah wajib mengikuti bimbingan perkawinan dan diberikan sertifikat.</li>
            <li>Pelaksanaan akad nikah dan penyerahan buku nikah di lokasi nikah apabila pernikahan dilaksanakan diluar kantor KUA.</li>
            <li>Pelaksanaan akad nikah dan penyerahan buku nikah di kantor KUA apabila pernikahan dilaksanakan di kantor KUA</li>
        </ol>

      <h4 class="text-lg font-bold text-gray-800 mb-2 bg-gray-100 -m-5 p-5 mt-10">PENDAFTARAN ONLINE/DARING</h4>
        <h5 class="text-lg font-semibold text-gray-800 mb-2 underline">Langkah Pertama</h5>
            <ul class="list-disc list-outside space-y-2 mb-4 px-5">
                <li>Kunjungi Website SIMKAH: <a href="https://simkah4.kemenag.go.id" class="text-blue-600">https://simkah4.kemenag.go.id</a></li>
                <li>Pilih Menu Masuk/Daftar.</li>
                <li>Apabila kamu sudah mendaftar dan sudah mempunyai akun maka tidak perlu , kamu bisa langsung masuk.</li>
                <li>Kamu akan di arahkan ke menu dashboard area, silahkan lengkapi data diri kamu.</li>
            </ul>

        <h5 class="text-lg font-semibold text-gray-800 mb-2 underline">Langkah Kedua</h5>
            <ul class="list-disc list-outside space-y-2 mb-4 px-5">
                <li>Pilih menu Daftar Nikah pada dashboard area.</li>
                <li>Siapkan dokumen-dokumen yang diperlukan.</li>
                <li>Isi dan lengkapi semua form-form yang disediakan.</li>
                <li>Bayar tagihan sesuai dengan informasi yang tertera dalam Invoice pembayaran</li>
            </ul>

        <h5 class="text-lg font-semibold text-gray-800 mb-2 underline">Langkah Ketiga</h5>
            <ul class="list-disc list-outside space-y-2 mb-4 px-5">
                <li>Pemeriksaan data nikah calon pengantin dan wali nikah di KUA tempat akad nikah oleh petugas KUA.</li>
                <li>Calon pengantin yang telah melakukan pendaftaran kehendak nikah wajib mengikuti bimbingan perkawinan dan diberikan sertifikat.</li>
                <li>Pelaksanaan akad nikah dan penyerahan buku nikah di lokasi nikah apabila pernikahan dilaksanakan diluar kantor KUA.</li>
                <li>Pelaksanaan akad nikah dan penyerahan buku nikah di kantor KUA apabila pernikahan dilaksanakan di kantor KUA</li>
            </ul>

      <h4 class="text-lg font-bold text-gray-800 mb-2 bg-gray-100 -m-5 p-5 mt-5">Syarat Dokumen:</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>KTP calon pengantin</li>
        <li>KK calon pengantin</li>
        <li>Akta kelahiran/Ijazah terakhir</li>
        <li>Surat keterangan untuk nikah (N1-N4)</li>
        <li>Surat keterangan sehat</li>
        <li>Pas foto 2x3 (5 lembar)</li>
      </ul>
      
    `,
  },
  {
    title: "Bimbingan Perkawinan (Bimwin)",
    content: `
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Jadwal:</h4>
      <p class="mb-4">Jadwal akan diumumkan menjelang pelaksanaan melalui media sosial</p>
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
    title: "Duplikat Buku Nikah",
    content: `
    
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Prosedur Permohonan:*</h4>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Pergi ke Kantor KUA untuk memalidasi pernikahan</li>
        <li>Setelah tervalidasi, KUA akan mengeluarkan Surat Keterangan Tercatat</li>
        <li>Pergi ke Kantor Polisi untuk pembuatan Surat Keterangan Kehilangan</li>
        <li>Datang kembali ke KUA untuk proses pembuatan buku nikah baru</li>
      </ol>
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Syarat Dokumen:</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Fotokopi KTP pemohon</li>
        <li>Fotokopi Kartu keluarga</li>
        <li>Pass foto 2X3 suami istri (masing-masing 3 lembar)</li>
        <li>Surat kehilangan dari kepolisian (untuk duplikat)</li>
      </ul>
      <p>*Terlebih dahulu petugas akan memvalidasi keaslian kutipan akta nikah</p>
    `,
  },
  {
    title: "Legalisasi Buku Nikah",
    content: `
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Prosedur Permohonan:</h4>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Datang ke KUA</li>
        <li>Melampirkan dokumen pendukung</li>
        <li>Verifikasi data oleh petugas</li>
        <li>Proses legalisasi</li>
      </ol>
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Syarat Dokumen:</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Surat permohonan</li>
        <li>Fotokopi Buku Nikah pemohon</li>
        <li>Buku nikah asli (untuk legalisasi)</li>
        
      </ul>
    `,
  },
]);

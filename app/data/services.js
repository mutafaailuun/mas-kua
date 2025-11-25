import { ref } from "vue";

export const services = ref([
  {
    title: "Pendaftaran Nikah",
    content: `
    <h4 class="text-lg font-bold text-gray-800 mb-2 bg-gray-100 -m-5 p-5 mb-5">Syarat Dokumen:</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>FC KTP calon pengantin</li>
        <li>FC KK calon pengantin</li>
        <li>FC Akta kelahiran/Ijazah terakhir</li>
        <li>Surat keterangan untuk nikah (N1-N4)</li>
        <li>Surat keterangan sehat</li>
        <li>Pas foto 2x3 (4 lembar)</li>
        <li>Pas foto 4x6 (2 lembar)</li>
        <li>Surat Dispensasi Pengadilan Agama (Bagi Catin Berusia dibawah 19 tahun) </li>
        <li>Surat Pernyataan Belum Menikah bagi Jejaka/Perawan <a class='text-blue-700 font-bold' target='_blank' href='https://drive.google.com/file/d/1HX60mlmP1BmKAqen4RDJo96ldnr6PQPG/preview?usp=sharing'><span'>[Download]</span></a></li>
        <li>Surat Pernyataan Wali Nikah <a class='text-blue-700 font-bold' target='_blank' href='https://drive.google.com/file/d/18w2nfl-4zpm6KPAoaDZOjdXD8_gkZWWK/preview?usp=sharing'><span'>[Download]</span></a></li>
        <li>Surat Akta Cerai (Bagi Catin duda/janda cerai hidup)</li>
        <li>Surat Izin Komandan (Bagi calon pengantin TNI atau POLRI</li>
        <li>Surat Izin Kedutaan Bagi WNA</li>
        <li>Surat Rekomendasi Nikah dari KUA Setempat (Jika pernikahan di luar wilayah KUA)</li>
      </ul>
      <h4 class="text-lg font-bold text-gray-800 mt-2 bg-gray-100 -m-5 p-5">PENDAFTARAN OFFLINE/LURING</h4>
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

      
    `,
  },
  {
    title: "Bimbingan Perkawinan (Bimwin)",
    content: `
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Definisi:</h4>
      <p class="mb-4">Bimbingan Perkawinan adalah kegiatan pembinaan kepada calon pengantin yang bertujuan untuk memberikan bekal pengetahuan, sikap, dan keterampilan dalam membina rumah tangga yang sakinah, mawaddah, warahmah.</p>
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
    <h4 class="text-lg font-semibold text-gray-800 mb-2">Syarat Dokumen:</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Fotokopi KTP pemohon</li>
        <li>Fotokopi Kartu keluarga</li>
        <li>Pass foto 2X3 suami istri (masing-masing 3 lembar)</li>
        <li>Surat kehilangan dari kepolisian (untuk duplikat)</li>
      </ul>
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Prosedur Permohonan:*</h4>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Pergi ke Kantor KUA untuk memalidasi pernikahan</li>
        <li>Setelah tervalidasi, KUA akan mengeluarkan Surat Keterangan Tercatat</li>
        <li>Pergi ke Kantor Polisi untuk pembuatan Surat Keterangan Kehilangan (jika buku nikah hilang)</li>
        <li>Datang kembali ke KUA untuk proses pembuatan buku nikah baru</li>
      </ol>
      <p>*Terlebih dahulu petugas akan memvalidasi keaslian kutipan akta nikah</p>
    `,
  },
  {
    title: "Buku Nikah Rusak/Hilang",
    content: `
    <h4 class="text-lg font-semibold text-gray-800 mb-2">Buku Nikah Rusak/Hilang</h4>
    <h4 class="text-lg font-medium text-gray-800 mb-2">Buku Nikah Rusak</h4>
    <p>Datang ke KUA dengan membawa:</p>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Buku nikah yang rusak</li>
        <li>KTP Suami Istri</li>
        <li>Pasfoto 2x3 latar biru</li>
      </ol>
    <h4 class="text-lg font-medium text-gray-800 mb-2">Buku Nikah Hilang</h4>
    <p>Datang ke KUA dengan membawa:</p>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Surat keterangan kehilangan dari kepolisian</li>
        <li>KTP Suami Istri</li>
        <li>Pasfoto 2x3 latar biru</li>
        </ol>
    `,
  },
  {
    title: "Legalisasi Buku Nikah",
    content: `
    <h4 class="text-lg font-semibold text-gray-800 mb-2">Syarat Dokumen:</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Surat permohonan</li>
        <li>Fotokopi Buku Nikah pemohon</li>
        <li>Buku nikah asli (untuk legalisasi)</li>
      </ul>
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Prosedur Permohonan:</h4>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Datang ke KUA</li>
        <li>Melampirkan dokumen pendukung</li>
        <li>Verifikasi data oleh petugas</li>
        <li>Proses legalisasi</li>
      </ol>
    `,
  },
  {
    title: "Isbat Nikah",
    content: `
    <h4 class="text-lg font-semibold text-gray-800 mb-2">Syarat Dokumen:</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Surat keterangan nikah siri dari kantor kel/desa</li>
        <li>Fotokopi KK dan KTP</li>
        <li>Surat Keterangan tidak tercatat (untuk diajukan ke PA)</li>
        <li>Putusan PA (jika permohonan dikabulkan)</li>
      </ul>  
    <h4 class="text-lg font-semibold text-gray-800 mb-2">Prosedur Permohonan:</h4>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Datang ke KUA</li>
        <li>Melampirkan surat keterangan Nikah Siri dari Kantor Kel/Desa</li>
        <li>Verifikasi data dan pembuatan surat keterangan tidak tercatat untuk isbat oleh petugas</li>
        <li>Pergi ke Pengadilan Agama untuk melakukan sidang isbat nikah<em> (Info lebih lanjut bisa kunjungi link berikut <a class='text-blue-600 font-bold' target='_blank' href='https://linktr.ee/pacikarang?fbclid=PAZnRzaANHNzNleHRuA2FlbQIxMQABpxDInk-zO1jHpJb4C-Xz9oRRjpKVVzl_DcaKzjaFjGhO2DTocdLs4RtnE9qe_aem_WqI2pJL37-xC0J1Xrr3Zzw'> Pengadilan Agama Cikarang</em></a>)</li>
        <li>Setelah sidang selesai, datang kembali ke KUA untuk dilakukan pencatatan dan penerbitan buku nikah</li>
        <li>Biaya layanan Rp.0-,</li>
      </ol>
    `,
  },
  {
    title: "Surat Rekomendasi Nikah (Numpang Nikah)",
    content: `
    <h4 class="text-lg font-semibold text-gray-800 mb-2">Syarat Dokumen:</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
      <li>Surat pengantar rekomendasi nikah dari Kantor Kel/Desa</li>
        <li>Fotokopi KTP</li>
        <li>Fotokopi Kartu Keluarga</li>
      </ul>
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Prosedur Permohonan:</h4>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Datang ke KUA</li>
        <li>Melampirkan dokumen pendukung</li>
        <li>Verifikasi data oleh petugas</li>
        <li>Proses pembuatan surat rekomendasi</li>
      </ol>
    `,
  },
  {
    title: "Surat Keterangan Ralat",
    content: `
    <h4 class="text-lg font-semibold text-gray-800 mb-2">Definisi:</h4>
    <p>Surat keterangan untuk mengoreksi/meralat kesalahan data (baik nama, tempat dan tanggal lahir dll.) di kutipan akta nikah untuk digunakan mengurus dokumen lainnya</p>
    <p>Surat keterangan ini hanya berlaku 3 bulan setelah surat dibuat.</p>
    <h4 class="text-lg font-semibold text-gray-800 mb-2">Syarat Dokumen:</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Surat permohonan ralat dari kantor desa/kel</li>
        <li>Fotokopi KTP</li>
        <li>Fotokopi Kartu Keluarga</li>  
      </ul>
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Prosedur Permohonan:</h4>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Datang ke KUA</li>
        <li>Melampirkan dokumen pendukung</li>
        <li>Verifikasi data oleh petugas</li>
        <li>Proses pembuatan surat keterangan ralat</li>
      </ol>
      
    `,
  },
  {
    title: "Pernikahan Campuran (WNA)",
    content: `
    <h4 class="text-lg font-semibold text-gray-800 mb-2">Definisi:</h4>
      <p class="mb-4">Pernikahan campuran adalah pernikahan yang dilaksanakan antara warga negara Indonesia (WNI) dengan warga negara asing (WNA) yang diatur dalam Undang-Undang Nomor 1 Tahun 1974 tentang Perkawinan dan Peraturan Menteri Agama Nomor 30 Tahun 2024 tentang Tata Cara Pelaksanaan Pernikahan Bagi Warga Negara Indonesia Dengan Warga Negara Asing.</p>
    <h4 class="text-lg font-semibold text-gray-800 mb-2">Syarat Dokumen bagi WNA:</h4>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Surat keterangan status tidak ada halangan untuk menikah/<em>certificate of no impediment </em>dari kedutaan atau kantor perwakilan dari negara yang bersangkutan;</li>
        <li>Bagi WNA yang telah memberlakukan sertifikat apostille, dokumen yang berisi surat keterangan status/tidak ada halangan menikah yang dikeluarkan lembaga berwenang di negara asing dilengkapi dengan sertifikat apostille;</li>
        <li>Izin poligami dari pengadilan atau instansi yang berwenang pada negara asal Catin bagi suami yang hendak beristri lebih dari seorang;</li>
        <li>Melampirkan fotokopi akta kelahiran;</li>
        <li>Melampirkan fotokopi paspor;</li>
        <li>Melampirkan akta cerai atau surat keterangan kematian bagi duda atau janda</li>
        <li>Melampirkan data kedua orang tua</li>
        <li>Semua dokumen yang berbahasa asing, kecuali dokumen berbahasa Melayu, harus diterjemahkan ke dalam bahasa Indonesia oleh penerjemah resmi</li>
        <li>Dalam hal negara suami tidak mengatur ketentuan izin poligami, izin poligami dapat diajukan pada pengadilan di Indonesia</li>
      </ol>
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Prosedur Permohonan:</h4>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Datang ke KUA</li>
        <li>Melampirkan dokumen pendukung</li>
        <li>Verifikasi data oleh petugas</li>
        <li>Proses pendaftaran nikah</li>
      </ol>
      
    
    `,
  },
  {
    title: "Surat Keterangan Tercatat/Tidak Tercatat",
    content: `
    <h4 class="text-lg font-semibold text-gray-800 mb-2">Syarat Dokumen SK Tercatat:</h4>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Fotokopi Buku Nikah dan Buku Nikah Asli</li>
        <li>Fotokopi KTP</li>
        <li>Fotokopi Kartu Keluarga</li>  
      </ol>
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Syarat Dokumen SK Tidak Tercatat:</h4>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Surat Keterangan Nikah siri dari kantor desa/kel.</li>
        <li>Fotokopi KTP</li>
        <li>Fotokopi Kartu Keluarga</li>  
      </ol>
      
    `,
  },
  {
    title: "Persyaratan Akta Ikrar Wakaf",
    content: `
    <h4 class="text-lg font-semibold text-gray-800 mb-2">Persyaratan Dokumen Tanah:</h4>
    <ol class="list-decimal list-inside space-y-2 mb-4">
    <li><strong>Bukti kepemilikan tanah:</strong> Sertifikat Asli atau dokumen yang sah</li>
    <li><strong>Jika nama pemilik berbeda dengan wakif:</strong> Sertakan akta jual beli, surat waris, atau bukti perpindahan hak lainnya </li>
    </ol>
    <h4 class="text-lg font-semibold text-gray-800 mb-2">Persyaratan Wakif:</h4>
    <h5 class="text-md font-medium text-gray-800 mb-2">Wakif Perseorangan:</h5>
    <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>KTP Asli</li>
        <li>Surat pernyataan tanah tidak dalam sengketa/terjamin, diketahui kepala desa/lurah & saksi</li>    
    </ol>
    <h5 class="text-md font-medium text-gray-800 mb-2">Wakif Bersama (Keluarga/Kelompok):</h5>
    <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Surat pernyataan Wakaf Bersama (format Kemenag)</li>
        <li>KTP Wakif dari keluarga</li>
        <li>Dokumen bukti hubungan (KK, surat nikah, dll.)</li>
    </ol>
    <h5 class="text-md font-medium text-gray-800 mb-2">Organisasi / Badan Hukum:</h5>
    <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Surat pernyataan Wakaf Bersama (format Kemenag)</li>
        <li>Bukti terdaftar dan pengesahan lembaga</li>
        <li>Organisasi: Surat Keterangan Terdaftar (SKT) dari Kementerian Dalam Negeri.</li>
        <li>Badan Hukum: Dokumen Legalitas Administrasi Hukum Umum (AHU) dari Kementerian Hukum dan HAM</li>
        <li>SK pengurus atau surat kuasa</li>
        <li>Surat Keterangan bebas sengketa</li>
        <li>KTP Wakif Organisasi atau badan hukum</li>
    </ol>
        `,
  },
  {
    title: "Persyaratan Tanda Daftar Majelis Taklim (TDMT)",
    content: `
    <h4 class="text-lg font-semibold text-gray-800 mb-2">Syarat Pendaftaran:</h4>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li>Proposal Permohonan kepada Kemenag Kab. Bekasi</li>
        <li>Memiliki kepengurusan/struktur pengurus</li>
        <li>Surat keterangan dan domisili dari kepala desa/kelurahan</li>  
        <li>Fotokopi KTP pengurus dan jamaah minimal 15 jamaah</li>
        <li>Rekomendasi dari KUA Pebayuran</li>
      </ol>
      <a href='/proposal-mt.docx' target='_blank'><button class='p-3 bg-green-600 rounded-md text-white font-bold cursor-pointer'>Unduh Templat Proposal</button></a>
      <a href='/permohonan.docx' target='_blank'><button class='p-3 bg-green-600 rounded-md text-white font-bold cursor-pointer'>Unduh Templat Surat Permohonan</button></a>
    `,
  },
]);

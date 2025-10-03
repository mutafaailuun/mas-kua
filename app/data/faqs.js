export const faqs = ref([
  {
    question: "Berapa lama proses pendaftaran nikah hingga selesai?",
    answer:
      "Proses pendaftaran nikah memerlukan waktu minimal 10 hari kerja sejak berkas lengkap diterima. Ini sesuai dengan peraturan yang berlaku untuk memberikan waktu pengumuman dan persiapan administrasi.",
  },
  {
    question: "Apakah bisa mendaftar nikah secara online?",
    answer: `
    Bisa. Pendaftaran online bisa dilakukan melalui website Simkah V4:
      <a href="https://simkah4.kemenag.go.id" target="_blank" class="text-blue-600">https://simkah4.kemenag.go.id</a>
      
      `,
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
      "KUA Kecamatan Pebayuran melayani masyarakat pada hari Senin - Jumat, pukul 07:30 - 16:00 WIB. Khusus hari Jumat, istirahat pukul 11:30 - 13:00 WIB.",
  },
  {
    question: "Kawin Hamil apakah sah?",
    answer: `<p class='font-bold'>SAH</p> Disclaimer: Yang dimaksud kawin hamil dalam pembahasan ini adalah hamil di luar pernikahan. \n
      <strong>Kawi Hamil:</strong> Menikah saat calon pengantin wanita sudah dalam keadaan hamil. <br/>
      <p> <strong>Pasal 53 Kompilasi Hukum Islam;</strong></p>
      <ol class="list-decimal list-inside">
      <li>Seorang wanita hamil di luar nikah, dapat dikawinkan dengan pria yang menghamilinya.</li>
      <li>Perkawinan dengan wanita hamil yang disebut pada ayat (1) dapat dilangsungkan tanpa menunggu lebih dahulu kelahiran anaknya. </li>
      <li>Dengan dilangsungkannya perkawinan pada saat wanita hamil, tidak diperlukan perkawinan ulang setelah anak yang dikandung lahir.</li>
      </ol>
      `,
  },
  {
    question: "Bagaimana urutan wali nikah?",
    answer: `
    <p>Urutan wali nikah dalam Islam secara garis besar adalah ayah, lalu kakek (ayah dari ayah), saudara laki-laki (kandung, kemudian seayah), anak laki-laki saudara (kandung, kemudian seayah), dan paman (saudara ayah, kandung kemudian seayah), serta keturunannya. Jika tidak ada satupun wali nasab, maka wali hakim (pejabat pengadilan agama) yang akan menikahkan. </p>
    <br/>
    <p class='font-bold'>Berikut adalah rincian urutan wali nasab:</p>
    <ol class="list-decimal list-inside">
    <li>Ayah: (Bapak kandung)</li>
    <li>Kakek: (Ayah dari ayah)</li>
    <li>Saudara laki-laki kandung: (Saudara laki-laki yang memiliki ayah dan ibu yang sama)</li>
    <li>Saudara laki-laki seayah: (Saudara laki-laki yang memiliki ayah yang sama, tetapi ibu berbeda)</li>
    <li>Anak laki-laki dari saudara kandung: (Anak laki-laki dari saudara kandung, baik kandung maupun seayah)</li>
    <li>Paman kandung: (Saudara laki-laki dari ayah)</li>
    <li>Paman seayah: (Saudara laki-laki dari ayah, tetapi ibu berbeda)</li>
    <li>Anak laki-laki dari paman: (Anak laki-laki dari paman, baik kandung maupun seayah)</li>
    <li>Wali hakim: (Pejabat pengadilan agama yang ditunjuk jika tidak ada)
    </ol></br>
    <p class='font-bold'>Catatan Penting:</p>
    <ol class="list-decimal list-inside">
      <li><strong>Wali Nasab:</strong> Urutan ini adalah wali nasab, yaitu wali yang berasal dari garis keturunan. </li>
      <li><strong>Tidak Boleh Menerobos:</strong> Tidak boleh mendahulukan wali yang jauh jika wali yang lebih dekat masih ada dan memenuhi syarat. </li>
      <li><strong>Syarat Wali:</strong> Wali harus berakal sehat, dewasa, beragama Islam, tidak sedang ihram, dan adil. </li>
      <li><strong>Wali Hakim:</strong> Jika tidak ada wali nasab atau wali nasab tidak memenuhi syarat, maka wali hakim akan menikahkan pengantin. </li>
</ol>    
</br>
    <p class='font-bold'>Ketentuan Wali Hakim:</p>
    <p>Wali hakim adalah penghulu yang diberi tugas tambahan sebagai kepala KUA. Namun, dalam hal kepala KUA dijabat oleh selain Penghulu, wali hakim merupakan penghulu yang ditunjuk oleh Kepala Kantor Urusan Agama.<br/> Wali hakim dapat bertindak sebagai wali pernikahan apabila: <br></p>
    <ol class="list-decimal list-inside">
      <li>Wali nasab tidak ada</li>
      <li>Walinya adhal (walinya enggan untuk menikahkan)</li>
      <li>Walinya tidak diketahui keberadaannya</li>
      <li>Walinya tidak dapat dihadirkan/ditemui karena dipenjara</li>
      <li>Wali nasab tidak ada yang beragama Islam</li>
      <li>Wali yang menikahkan menjadi pengantin itu sendiri</li>
      <ol/>
<p><strong>Sumber: </strong>PMA No. 30 Tahun 2024 pasal 13, Kompilasi Hukum Islam pasal 21</p>
`,
  },
  {
    question: "Apakah perlu surat keterangan sehat untuk menikah?",
    answer: `
    <p>Ya, surat keterangan sehat diperlukan sebagai salah satu syarat administrasi untuk menikah di KUA. Surat ini biasanya mencakup pemeriksaan kesehatan umum dan tes penyakit menular seperti HIV/AIDS, sifilis, dan hepatitis B.</p>
    <p>Surat keterangan sehat ini bertujuan untuk memastikan bahwa kedua calon pengantin dalam kondisi sehat dan tidak membawa penyakit yang dapat menular kepada pasangan atau anak-anak mereka di masa depan.</p>
    <p>Surat keterangan sehat harus dikeluarkan oleh fasilitas kesehatan resmi seperti puskesmas, rumah sakit, atau klinik yang diakui oleh pemerintah.</p>
    
    `,
  },
  {
    question: "Apa saja rukun dan syarat nikah menurut Islam?",
    answer: `
    <p class='font-bold'>Rukun nikah dalam Islam terdiri dari 5 (lima) hal, yaitu:</p>
    <ol class="list-decimal list-inside">
      <li>Ijab Qabul: Adalah akad atau pernyataan saling menerima antara calon suami dan calon istri yang dilakukan di hadapan wali dan saksi.</li>
      <li>Wali: Adalah orang yang memiliki hak untuk menikahkan seorang wanita, biasanya ayah kandung atau kerabat laki-laki terdekat.</li>
      <li>Saksi: Minimal dua orang saksi laki-laki yang adil dan beragama Islam yang menyaksikan pelaksanaan akad nikah.</li>
      <li>Calon Suami dan Calon Istri: Kedua belah pihak harus memenuhi syarat-syarat tertentu untuk sahnya pernikahan.</li>
    </ol><br>
    <p class='font-bold'>Syarat-syarat nikah menurut Islam meliputi:</p>
    <ol class="list-decimal list-inside">
      <li>Calon suami dan calon istri harus beragama Islam.</li>
      <li>Keduanya harus baligh (sudah mencapai usia dewasa).</li>
      <li>Keduanya harus berakal sehat dan tidak dalam keadaan gila atau mabuk.</li>
      <li>Calon istri tidak sedang dalam masa iddah (masa tunggu setelah bercerai atau ditinggal mati suami).</li>
      <li>Calon suami dan calon istri tidak memiliki hubungan mahram (hubungan darah atau perkawinan yang dilarang menikah).</li>
      <li>Calon suami harus mampu memberikan mahar kepada calon istri.</li>
      <li>Calon suami dan calon istri harus saling ridha (setuju) untuk menikah.</li>
    </ol>
    <p>Memenuhi rukun dan syarat nikah ini sangat penting untuk memastikan bahwa pernikahan yang dilaksanakan sesuai dengan ajaran Islam dan diakui secara hukum.</p>
    `,
  },
]);

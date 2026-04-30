interface Petugas {
  nama: string;
  phone: string;
}

const JADWAL_PIKET: Record<number, Petugas[]> = {
  1: [
    { nama: "Abas Basuki",      phone: "6285890273555" },
    { nama: "Tono Kartawijaya", phone: "6281585194771" },
  ],
  2: [
    { nama: "Sam'ani",      phone: "6285814235504" },
    { nama: "Idah Faridah", phone: "6285886077488" },
  ],
  3: [
    { nama: "Ardi Anwari",   phone: "6285813329179" },
    { nama: "Dzikri Adzkria", phone: "6285894333277" },
  ],
  4: [
    { nama: "Ismat",             phone: "6285892875799" },
    { nama: "Arif Husni Mubarok", phone: "628561913999"  },
  ],
  5: [
    { nama: "Jalaludin",  phone: "6285733121232" },
    { nama: "Siti Maryam", phone: "6285891748287" },
  ],
};

const HARI_ID: Record<number, string> = {
  1: "Senin",
  2: "Selasa",
  3: "Rabu",
  4: "Kamis",
  5: "Jumat",
};

const BULAN_ID = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember",
];

Deno.serve(async () => {
  const fonnteToken = Deno.env.get("FONNTE_TOKEN");
  const fonnteGroupId = "120363346263611261@g.us";

  if (!fonnteToken) {
    console.error("Missing FONNTE_TOKEN");
    return new Response(JSON.stringify({ error: "Missing FONNTE_TOKEN" }), { status: 500 });
  }

  // Waktu WIB (UTC+7)
  const nowUtc = new Date();
  const nowWib = new Date(nowUtc.getTime() + 7 * 60 * 60 * 1000);
  const hariKe = nowWib.getUTCDay(); // 0=Minggu, 1=Senin, ..., 5=Jumat

  const petugasList = JADWAL_PIKET[hariKe];
  const namaHari = HARI_ID[hariKe];

  if (!petugasList) {
    return new Response(
      JSON.stringify({ skipped: true, reason: "Hari libur, tidak ada piket." }),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  const tgl = nowWib.getUTCDate();
  const bln = BULAN_ID[nowWib.getUTCMonth()];
  const thn = nowWib.getUTCFullYear();

  const namaPetugas = petugasList.map(p => p.nama).join(" & ");

  const message =
`📋 *PEMBERITAHUAN PETUGAS PIKET*

🗓️ Hari/Tgl : ${namaHari}, ${tgl} ${bln} ${thn}
👤 Petugas  : *${namaPetugas}*

Mohon petugas piket hadir tepat waktu dan menjaga kebersihan serta ketertiban kantor.

📋 *Tugas Piket:*
✅ Menaikkan bendera pada pagi hari
✅ Menurunkan bendera pada sore hari
✅ Menyiram pohon mangga
✅ Menjaga kebersihan dan ketertiban kantor

Terima kasih atas dedikasi Bapak/Ibu! 🙏

_— Sistem KUA Pebayuran_`;

  const targets = fonnteGroupId.split(",").map(t => t.trim());
  const results = [];

  for (const target of targets) {
    try {
      const res = await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: { Authorization: fonnteToken },
        body: new URLSearchParams({ target, message }),
      });
      const responseData = await res.json();
      console.log(`Fonnte response for ${target}:`, responseData);
      results.push({ target, status: res.status, data: responseData });
    } catch (err: any) {
      console.error(`Error sending to ${target}:`, err.message);
      results.push({ target, error: err.message });
    }
  }

  console.log("Piket notification job completed", { hari: namaHari, petugas: namaPetugas, results });

  return new Response(
    JSON.stringify({ hari: namaHari, petugas: namaPetugas, results }),
    { headers: { "Content-Type": "application/json" } },
  );
});

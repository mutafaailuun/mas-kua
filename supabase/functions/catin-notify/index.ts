import { createClient } from "https://esm.sh/@supabase/supabase-js@2.41.1";

const KUA_NAMA = "Pebayuran";

const HARI_ID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const BULAN_ID = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember",
];

function formatTanggal(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return `${HARI_ID[d.getDay()]}, ${d.getDate()} ${BULAN_ID[d.getMonth()]} ${d.getFullYear()}`;
}

function formatJam(timeStr: string) {
  return timeStr.substring(0, 5);
}

/** Normalise phone to 62xxx format for Fonnte */
function normalisePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  return "62" + digits;
}

/** Format 62xxx to local 0xxx for display */
function formatPhoneLocal(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("62")) return "0" + digits.slice(2);
  if (!digits.startsWith("0")) return "0" + digits;
  return digits;
}

async function sendWa(token: string, target: string, message: string) {
  const res = await fetch("https://api.fonnte.com/send", {
    method: "POST",
    headers: { Authorization: token },
    body: new URLSearchParams({ target, message }),
  });
  return { status: res.status, data: await res.json() };
}

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const fonnteToken = Deno.env.get("FONNTE_TOKEN") ?? "";

  if (!fonnteToken) {
    return new Response(JSON.stringify({ error: "Missing FONNTE_TOKEN" }), { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const url = new URL(req.url);
  let type = url.searchParams.get("type") ?? "";
  let weddingId = url.searchParams.get("wedding_id") ?? "";
  let body: any = {};

  if (req.method === "POST") {
    try {
      body = await req.json();
      type = type || body.type;
      weddingId = weddingId || body.wedding_id;
    } catch { /* ignore */ }
  }

  // ── Konfirmasi Pendaftaran (manual, per wedding) ─────────────────
  if (type === "konfirmasi") {
    if (!weddingId) {
      return new Response(JSON.stringify({ error: "wedding_id required" }), { status: 400 });
    }

    const { data: w, error } = await supabase
      .from("weddings")
      .select("*")
      .eq("id", weddingId)
      .single();

    if (error || !w) {
      return new Response(JSON.stringify({ error: "Wedding not found" }), { status: 404 });
    }

    if (!w.phone_number) {
      return new Response(JSON.stringify({ error: "No phone number on record" }), { status: 422 });
    }

    const namaCatin = w.groom_name;
    const tanggal = formatTanggal(w.wedding_date);
    const jam = formatJam(w.wedding_time);
    const lokasi = w.location ?? "-";

    const message =
`Halo Kak ${namaCatin} 👋

Selamat! Pendaftaran pernikahan Anda telah kami terima di sistem KUA ${KUA_NAMA}. ✅

Berikut ringkasan data pendaftaran Anda:

👤 *Nama Lengkap:* ${w.groom_name}
📅 *Rencana Tanggal:* ${tanggal}
⏰ *Waktu Akad:* ${jam} WIB
📍 *Lokasi:* ${lokasi}

*Langkah Selanjutnya:*
1. Batas pengiriman berkas nikah adalah *15 hari kerja* setelah tanggal pendaftaran.
2. Anda *wajib mengikuti Bimbingan Perkawinan* (Binwin). Untuk jadwal pelaksanaannya akan kami informasikan nanti melalui WhatsApp ini.
3. Petugas kami akan melakukan verifikasi berkas. Pastikan nomor ini tetap aktif karena kami akan menghubungi Anda kembali untuk jadwal Pemeriksaan Nikah (Simkah) di kantor KUA.

Terima kasih dan semoga lancar hingga hari H! 🤍

Hormat kami,
*KUA ${KUA_NAMA}*`;

    const phone = normalisePhone(w.phone_number);
    const result = await sendWa(fonnteToken, phone, message);
    return new Response(JSON.stringify({ type: "konfirmasi", phone, result }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Pengingat H-1 (otomatis, semua catin besok) ──────────────────
  if (type === "pengingat-h1") {
    // WIB = UTC+7
    const now = new Date();
    now.setHours(now.getHours() + 7);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const { data: weddings } = await supabase
      .from("weddings")
      .select("*")
      .eq("wedding_date", tomorrowStr)
      .not("phone_number", "is", null);

    if (!weddings || weddings.length === 0) {
      return new Response(JSON.stringify({ type: "pengingat-h1", sent: 0, reason: "No weddings with phone tomorrow" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const results = [];
    for (const w of weddings) {
      const namaCatin = w.groom_name;
      const hari = formatTanggal(w.wedding_date);
      const jam = formatJam(w.wedding_time);
      const lokasi = w.location ?? "-";

      const message =
`Assalamu'alaikum / Halo Kak ${namaCatin} 👋

Mengingatkan kembali bahwa jadwal akad nikah Anda akan dilaksanakan *BESOK*:

📅 *Hari/Tgl:* ${hari}
⏰ *Pukul:* ${jam} WIB _(Mohon bersiap 30 menit sebelumnya)_
📍 *Lokasi:* ${lokasi}

*Hal-hal yang perlu dipersiapkan:*
✅ Membawa KTP Asli kedua mempelai
💍 Menyiapkan Mahar (Mas Kawin) di lokasi
👥 Memastikan Saksi Nikah sudah hadir tepat waktu dan *membawa KTP Asli*
💪 Tetap menjaga kesehatan dan kondisi fisik agar tetap fit

Semoga prosesi akad nikah esok berjalan khidmat, lancar, dan penuh berkah. Sampai jumpa di lokasi! 🤍

Salam hangat,
*KUA ${KUA_NAMA}*`;

      const phone = normalisePhone(w.phone_number!);
      try {
        const result = await sendWa(fonnteToken, phone, message);
        results.push({ id: w.id, name: w.groom_name, phone, result });
      } catch (err: any) {
        results.push({ id: w.id, name: w.groom_name, phone, error: err.message });
      }
    }

    return new Response(JSON.stringify({ type: "pengingat-h1", sent: results.length, results }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Notifikasi Admin saat ada pengisian formulir ───────────────
  if (type === "admin-inquiry") {
    const adminPhone = "6285733121232"; // 085733121232
    const { groom_name, bride_name, phone_number, email, source } = body || {};

    if (!groom_name || !bride_name || !phone_number) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const message =
`📋 *Formulir Calon Pengantin Baru*

Sumber: ${source || "website"}

👤 *Calon Suami:* ${groom_name}
👰 *Calon Istri:* ${bride_name}
📱 *No. HP:* ${formatPhoneLocal(phone_number)}
📧 *Email:* ${email || "-"}

Silakan verifikasi dan tindak lanjuti.`;

    const phone = normalisePhone(adminPhone);
    const result = await sendWa(fonnteToken, phone, message);
    return new Response(JSON.stringify({ type: "admin-inquiry", phone, result }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: `Unknown type: ${type}. Use 'konfirmasi', 'pengingat-h1', or 'admin-inquiry'` }), { status: 400 });
});

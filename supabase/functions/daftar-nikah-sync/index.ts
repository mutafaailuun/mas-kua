import { createClient } from "https://esm.sh/@supabase/supabase-js@2.41.1";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, apikey, Authorization",
};

function toDateStr(raw?: string | null): string | null {
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);
  const [d, m, y] = raw.split("-");
  if (d && m && y) return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  return null;
}

function toTimeStr(raw?: string | null): string {
  if (!raw) return "00:00:00";
  const match = raw.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return "00:00:00";
  let h = parseInt(match[1], 10);
  const min = match[2];
  const period = match[3]?.toUpperCase();
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${min}:00`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const {
    no_pendaftaran,
    tgl_pendaftaran,
    nama_suami,
    nama_istri,
    tgl_akad,
    jam_akad,
    lokasi_akad,
  } = body;

  if (!no_pendaftaran || !nama_suami || !nama_istri || !tgl_akad) {
    return new Response(JSON.stringify({ error: "Data tidak lengkap" }), {
      status: 400,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: existing } = await supabase
    .from("weddings")
    .select("id, groom_name, bride_name, wedding_date")
    .eq("no_pendaftaran", no_pendaftaran)
    .maybeSingle();

  if (existing) {
    return new Response(
      JSON.stringify({ ok: true, duplicate: true, existing }),
      { headers: { ...CORS, "Content-Type": "application/json" } },
    );
  }

  const wedding_date = toDateStr(tgl_akad);
  if (!wedding_date) {
    return new Response(
      JSON.stringify({ error: "Format tanggal akad tidak valid" }),
      { status: 400, headers: { ...CORS, "Content-Type": "application/json" } },
    );
  }

  const loc = (lokasi_akad || "").toUpperCase();
  const isKantor = loc.includes("BALAI NIKAH") || loc.includes("KUA");
  const status = isKantor ? "Kantor" : "Luar Kantor";

  const { error } = await supabase.from("weddings").insert({
    no_pendaftaran,
    registration_date: toDateStr(tgl_pendaftaran),
    wedding_date,
    wedding_time: toTimeStr(jam_akad),
    groom_name: nama_suami,
    bride_name: nama_istri,
    location: lokasi_akad ?? "",
    status,
  });

  if (error) {
    // Unique violation → data sudah masuk duluan (race condition)
    if (error.code === "23505") {
      return new Response(JSON.stringify({ ok: true, duplicate: true }), {
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, duplicate: false }), {
    headers: { ...CORS, "Content-Type": "application/json" },
  });
});

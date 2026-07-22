import { createClient } from "https://esm.sh/@supabase/supabase-js@2.41.1";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_CALENDAR_API = "https://www.googleapis.com/calendar/v3";

const HARI_ID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const BULAN_ID = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember",
];

function formatTanggal(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return `${HARI_ID[d.getDay()]}, ${d.getDate()} ${BULAN_ID[d.getMonth()]} ${d.getFullYear()}`;
}

function formatWIB(dateStr: string, timeStr: string): string {
  const d = new Date(`${dateStr}T${timeStr}+07:00`);
  return d.toISOString();
}

function formatWIBEnd(dateStr: string, timeStr: string): string {
  const d = new Date(`${dateStr}T${timeStr}+07:00`);
  d.setHours(d.getHours() + 1);
  return d.toISOString();
}

async function base64url(buf: ArrayBuffer): Promise<string> {
  const bytes = new Uint8Array(buf);
  const bin = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function importKey(pem: string): Promise<CryptoKey> {
  const pemBody = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");
  const binary = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "pkcs8",
    binary,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function createJWT(header: object, payload: object, key: CryptoKey): Promise<string> {
  const enc = new TextEncoder();
  const headerB64 = await base64url(enc.encode(JSON.stringify(header)));
  const payloadB64 = await base64url(enc.encode(JSON.stringify(payload)));
  const toSign = `${headerB64}.${payloadB64}`;
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, enc.encode(toSign));
  const sigB64 = await base64url(sig);
  return `${toSign}.${sigB64}`;
}

async function getAccessToken(sa: { client_email: string; private_key: string }): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: GOOGLE_TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };
  const key = await importKey(sa.private_key);
  const jwt = await createJWT(header, payload, key);

  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Token error: ${JSON.stringify(data)}`);
  return data.access_token;
}

interface Wedding {
  id: string;
  wedding_date: string;
  wedding_time: string;
  groom_name: string;
  bride_name: string;
  location: string | null;
  officiant_name: string | null;
  status: string;
  notes: string | null;
  no_pendaftaran: string;
  no_akta: string | null;
}

interface GCalEvent {
  id: string;
  extendedProperties?: {
    private?: Record<string, string>;
  };
}

async function findExistingEvent(
  token: string,
  calendarId: string,
  noPendaftaran: string,
): Promise<GCalEvent | null> {
  const url = new URL(`${GOOGLE_CALENDAR_API}/calendars/${encodeURIComponent(calendarId)}/events`);
  url.searchParams.set("privateExtendedProperty", `noPendaftaran=${noPendaftaran}`);
  url.searchParams.set("maxResults", "1");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.items?.[0] ?? null;
}

async function createEvent(
  token: string,
  calendarId: string,
  w: Wedding,
): Promise<{ action: "created" | "updated"; id: string }> {
  const start = formatWIB(w.wedding_date, w.wedding_time);
  const end = formatWIBEnd(w.wedding_date, w.wedding_time);
  const title = `${w.groom_name} & ${w.bride_name}`;
  const loc = [w.location, w.status === "Kantor" ? "(Kantor KUA)" : "(Luar Kantor)"]
    .filter(Boolean)
    .join(" — ");

  let description = `📋 No. Pendaftaran: ${w.no_pendaftaran}`;
  if (w.no_akta) description += `\n📜 No. Akta: ${w.no_akta}`;
  description += `\n👤 Penghulu: ${w.officiant_name ?? "-"}`;
  description += `\n📍 Lokasi: ${w.location ?? "-"}`;
  description += `\n📌 Status: ${w.status}`;
  if (w.notes) description += `\n📝 Catatan: ${w.notes}`;

  const eventData = {
    summary: title,
    description,
    location: w.location ?? "",
    start: { dateTime: start, timeZone: "Asia/Jakarta" },
    end: { dateTime: end, timeZone: "Asia/Jakarta" },
    extendedProperties: {
      private: {
        noPendaftaran: w.no_pendaftaran,
        weddingId: w.id,
      },
    },
  };

  const existing = await findExistingEvent(token, calendarId, w.no_pendaftaran);

  if (existing) {
    const updateRes = await fetch(
      `${GOOGLE_CALENDAR_API}/calendars/${encodeURIComponent(calendarId)}/events/${existing.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      },
    );
    if (!updateRes.ok) {
      const err = await updateRes.text();
      throw new Error(`Update failed: ${err}`);
    }
    const updated = await updateRes.json();
    return { action: "updated", id: updated.id };
  }

  const createRes = await fetch(
    `${GOOGLE_CALENDAR_API}/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    },
  );

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Create failed: ${err}`);
  }
  const created = await createRes.json();
  return { action: "created", id: created.id };
}

async function deleteEvent(token: string, calendarId: string, eventId: string): Promise<void> {
  const res = await fetch(
    `${GOOGLE_CALENDAR_API}/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`,
    { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok && res.status !== 404) {
    const err = await res.text();
    throw new Error(`Delete failed: ${err}`);
  }
}

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const saJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON") ?? "";

  if (!saJson) {
    return new Response(JSON.stringify({ error: "Missing GOOGLE_SERVICE_ACCOUNT_JSON" }), { status: 500 });
  }

  let sa: { client_email: string; private_key: string };
  try {
    sa = JSON.parse(saJson);
    if (!sa.client_email || !sa.private_key) {
      throw new Error("Invalid service account JSON: missing client_email or private_key");
    }
  } catch (e: any) {
    return new Response(JSON.stringify({ error: `Invalid GOOGLE_SERVICE_ACCOUNT_JSON: ${e.message}` }), { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const url = new URL(req.url);
  let penghulu = url.searchParams.get("penghulu") ?? "";
  let calendarId = url.searchParams.get("calendar_id") ?? "";
  let type = url.searchParams.get("type") ?? "future";
  let dateFrom = url.searchParams.get("date_from") ?? "";
  let dateTo = url.searchParams.get("date_to") ?? "";
  let dryRun = url.searchParams.get("dry_run") === "1";
  let idsParam = url.searchParams.get("ids") ?? "";

  if (req.method === "POST") {
    try {
      const body = await req.json();
      penghulu = body.penghulu ?? penghulu;
      calendarId = body.calendar_id ?? calendarId;
      type = body.type ?? type;
      dateFrom = body.date_from ?? dateFrom;
      dateTo = body.date_to ?? dateTo;
      dryRun = body.dry_run ?? dryRun;
      idsParam = body.ids ?? idsParam;
    } catch { /* ignore */ }
  }

  const ids = typeof idsParam === "string" && idsParam
    ? idsParam.split(",").map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(idsParam)
    ? idsParam
    : [];

  if (!calendarId) {
    return new Response(JSON.stringify({ error: "calendar_id is required. The penghulu's Gmail or calendar ID." }), { status: 400 });
  }

  try {
    const token = await getAccessToken(sa);

    let query = supabase.from("weddings").select("*");

    if (ids.length > 0) {
      query = query.in("id", ids);
    } else {
      if (penghulu && penghulu !== "*") {
        query = query.ilike("officiant_name", `%${penghulu}%`);
      }

      if (type === "today") {
        const today = new Date();
        today.setHours(today.getHours() + 7);
        const todayStr = today.toISOString().split("T")[0];
        query = query.eq("wedding_date", todayStr);
      } else if (type === "range" && dateFrom) {
        query = query.gte("wedding_date", dateFrom);
        if (dateTo) query = query.lte("wedding_date", dateTo);
      } else {
        const today = new Date();
        today.setHours(today.getHours() + 7);
        const todayStr = today.toISOString().split("T")[0];
        query = query.gte("wedding_date", todayStr);
      }
    }

    query = query.order("wedding_date", { ascending: true }).order("wedding_time", { ascending: true });

    const { data: weddings, error } = await query;

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    if (!weddings || weddings.length === 0) {
      return new Response(JSON.stringify({ message: "No weddings found", count: 0 }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (dryRun) {
      return new Response(JSON.stringify({
        dry_run: true,
        penghulu,
        calendar_id: calendarId,
        count: weddings.length,
        preview: weddings.map((w) => ({
          tanggal: formatTanggal(w.wedding_date),
          waktu: w.wedding_time?.substring(0, 5),
          nama: `${w.groom_name} & ${w.bride_name}`,
          lokasi: w.location ?? "-",
          no_pendaftaran: w.no_pendaftaran,
        })),
      }), { headers: { "Content-Type": "application/json" } });
    }

    const results: Array<{ nama: string; tanggal: string; action: string; eventId?: string; error?: string }> = [];
    for (const w of weddings) {
      try {
        const result = await createEvent(token, calendarId, w as Wedding);
        results.push({
          nama: `${w.groom_name} & ${w.bride_name}`,
          tanggal: formatTanggal(w.wedding_date),
          action: result.action,
          eventId: result.id,
        });
      } catch (e: any) {
        results.push({
          nama: `${w.groom_name} & ${w.bride_name}`,
          tanggal: formatTanggal(w.wedding_date),
          action: "error",
          error: e.message,
        });
      }
    }

    return new Response(JSON.stringify({
      penghulu,
      calendar_id: calendarId,
      total: weddings.length,
      created: results.filter((r) => r.action === "created").length,
      updated: results.filter((r) => r.action === "updated").length,
      errors: results.filter((r) => r.action === "error").length,
      results,
    }), { headers: { "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
});

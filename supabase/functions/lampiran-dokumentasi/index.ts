import { createClient } from "https://esm.sh/@supabase/supabase-js@2.41.1";
import { AwsClient } from "https://esm.sh/aws4fetch@1.0.19";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, apikey, Authorization",
};

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

  const { no_pendaftaran, no_akta, nama_suami, nama_istri, tanggal_akad, penghulu,
          lokasi_nikah, nikah_kantor, foto_base64, filename } = body;

  if (!no_pendaftaran || !nama_suami || !nama_istri || !foto_base64) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  // Upload ke R2
  const r2AccountId = Deno.env.get("CLOUDFLARE_R2_ACCOUNT_ID");
  const r2AccessKey = Deno.env.get("CLOUDFLARE_R2_ACCESS_KEY_ID");
  const r2SecretKey = Deno.env.get("CLOUDFLARE_R2_SECRET_ACCESS_KEY");
  const r2Bucket = Deno.env.get("CLOUDFLARE_R2_BUCKET_NAME");
  const r2PublicUrl = Deno.env.get("CLOUDFLARE_R2_PUBLIC_URL");

  const aws = new AwsClient({
    accessKeyId: r2AccessKey!,
    secretAccessKey: r2SecretKey!,
    service: "s3",
    region: "auto",
  });

  const key = `lampiran-dokumentasi/${filename ?? `${Date.now()}.jpg`}`;
  const fotoBytes = Uint8Array.from(atob(foto_base64), (c) => c.charCodeAt(0));

  const r2Endpoint = `https://${r2AccountId}.r2.cloudflarestorage.com/${r2Bucket}/${key}`;
  const uploadRes = await aws.fetch(r2Endpoint, {
    method: "PUT",
    headers: { "Content-Type": "image/jpeg" },
    body: fotoBytes,
  });

  if (!uploadRes.ok) {
    const detail = await uploadRes.text();
    return new Response(JSON.stringify({ error: "R2 upload gagal", detail }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const foto_url = `${r2PublicUrl}/${key}`;

  // Simpan ke database
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { error: dbError } = await supabase.from("dokumentasi_akad").insert({
    no_pendaftaran,
    no_akta: no_akta || null,
    nama_suami,
    nama_istri,
    tanggal_akad: tanggal_akad || null,
    penghulu: penghulu || null,
    lokasi_nikah: lokasi_nikah || null,
    nikah_kantor: nikah_kantor !== false,
    foto_url,
  });

  if (dbError) {
    return new Response(JSON.stringify({ error: "DB insert gagal", detail: dbError.message }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true, foto_url }), {
    headers: { ...CORS, "Content-Type": "application/json" },
  });
});

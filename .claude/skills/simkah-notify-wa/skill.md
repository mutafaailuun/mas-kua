---
name: simkah-notify-wa
description: >
  Kirim notifikasi WhatsApp ke grup KUA Pebayuran via Supabase Edge Function.
  TRIGGER ketika user mengatakan: "kirim notif wa", "kirim wa", "notifikasi wa",
  "jalankan edge func", "kirim ulang pesan wa", "broadcast wa", atau menyebut
  salah satu nama function (wedding-announcements, catin-notify, piket-notify).
---

# Skill: Kirim Notifikasi WA via Supabase Edge Function

Tugas: Ambil service role key dari Management API, lalu invoke edge function yang dipilih via curl.

## Edge Functions yang tersedia

| Function | Kegunaan |
|---|---|
| `wedding-announcements` | Laporan harian nikah ke grup (default) |
| `catin-notify` | Notifikasi calon pengantin |
| `piket-notify` | Notifikasi jadwal piket petugas |

## Langkah-langkah

### 1. Tentukan function yang akan dijalankan

Deteksi dari konteks percakapan user:
- Disebut "wedding", "pengumuman", "laporan", atau tidak disebutkan → `wedding-announcements`
- Disebut "catin", "calon pengantin" → `catin-notify`
- Disebut "piket", "jadwal" → `piket-notify`

### 2. Ambil service role key

```bash
SUPABASE_ACCESS_TOKEN=$(grep SUPABASE_ACCESS_TOKEN /Users/Jaliel/Dev/mas-kua/.env | cut -d= -f2)

SERVICE_KEY=$(curl -s "https://api.supabase.com/v1/projects/ipvpckuogbfqpiolwlho/api-keys" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" | python3 -c "
import sys, json
keys = json.load(sys.stdin)
for k in keys:
    if k.get('name') == 'service_role':
        print(k.get('api_key',''))
")
```

### 3. Invoke edge function

```bash
curl -s -X POST \
  "https://ipvpckuogbfqpiolwlho.supabase.co/functions/v1/<FUNCTION_NAME>" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{}' | python3 -m json.tool
```

**Parameter opsional untuk `wedding-announcements`:**
- `type`: `"daily"` (default) atau `"weekly"`
- `date`: tanggal tertentu dalam format `YYYY-MM-DD`

Contoh dengan parameter:
```bash
-d '{"type":"daily","date":"2026-06-05"}'
```

### 4. Tampilkan hasil

Dari response JSON, tampilkan ringkasan:
- Status keseluruhan (`status`)
- Untuk setiap target grup: `target`, `status` HTTP, `data.detail`, `data.id`
- Jika ada error, tampilkan pesan error lengkap

Contoh output yang diharapkan:
```
✅ Pesan WA terkirim ke 2 grup:
- 120363405630101894@g.us → success (ID: 160589242)
- 120363346263611261@g.us → success (ID: 160589243)
```

## Catatan
- Jika response `status != 200`, cek apakah function sudah di-deploy di Supabase dashboard
- Service role key diambil fresh setiap kali — tidak perlu disimpan
- `wedding-announcements` mendukung param `type` dan `date` via query string atau body POST

---
name: netlify-deploy
description: >
  Monitor status deploy Netlify untuk proyek mas-kua.
  TRIGGER ketika user mengatakan: "monitoring deploy", "cek deploy", "status deploy",
  "deploy netlify", "cek netlify", "sudah deploy?", atau "sudah live?".
---

# Skill: Monitor Deploy Netlify

## Info Proyek

| Key | Value |
|---|---|
| Site ID | `df1616e8-fa87-4b77-9f6b-ae2e38d5d82e` |
| Nama Site | `maskua` |
| URL Produksi | https://kuapebayuran.id |
| URL Preview | https://main--maskua.netlify.app |
| Repo GitHub | https://github.com/mutafaailuun/mas-kua |

## Langkah-langkah

### 1. Ambil status deploy terbaru

```bash
netlify api listSiteDeploys --data '{"site_id": "df1616e8-fa87-4b77-9f6b-ae2e38d5d82e", "page": 1, "per_page": 3}'
```

### 2. Tampilkan hasil

Dari response JSON, tampilkan ringkasan:

```
Deploy terbaru:
- State: <state> (ready/error/building/enqueued)
- Commit: <commit_ref> — <title>
- Branch: <branch>
- Published: <published_at> / Deploy time: <deploy_time>s
- Admin: https://app.netlify.com/projects/maskua
```

Jika state `building` atau `enqueued`, tampilkan:
```
⏳ Deploy sedang berjalan... cek lagi sebentar.
```

Jika state `error`, tampilkan `error_message` jika ada.

### 3. Jika user ingin melihat log build

```bash
netlify api getSiteBuild --data '{"build_id": "<build_id>"}' | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('log',''))"
```

## Catatan
- Site ID sudah fixed, tidak perlu mencari ulang
- Gunakan `netlify api` — tidak perlu `netlify link` atau `netlify sites:list`

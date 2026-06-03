import { createClient } from '@supabase/supabase-js'

const NIKAH_DI_MAP: Record<number, string> = { 1: 'Kantor', 2: 'Luar Kantor' }

function toDateStr(raw: string | null): string | null {
  if (!raw) return null
  // SIMKAH format: YYYY-MM-DD or DD-MM-YYYY
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10)
  const [d, m, y] = raw.split('-')
  if (y && m && d) return `${y}-${m}-${d}`
  return null
}

function toTimeStr(raw: string | null): string | null {
  if (!raw) return null
  // Normalize "09:00:00", "9:00 AM", "09:00"
  const cleaned = raw.replace(/\s*(AM|PM)/i, '').trim()
  const parts = cleaned.split(':')
  if (parts.length >= 2) return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}:00`
  return null
}

export default defineEventHandler(async (event) => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY
  if (!supabaseUrl || !supabaseKey) {
    throw createError({ statusCode: 500, message: 'Missing Supabase config' })
  }

  const body = await readBody(event)
  const { mode, records } = body as {
    mode: 'daftar' | 'akta' | 'penghulu',
    records: any[]
  }

  if (!mode || !Array.isArray(records) || records.length === 0) {
    throw createError({ statusCode: 400, message: 'mode dan records wajib diisi' })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  const results = { inserted: 0, updated: 0, skipped: 0, errors: [] as string[] }

  // ── MODE: daftar — insert pendaftaran baru ──────────────────────────
  if (mode === 'daftar') {
    for (const r of records) {
      const no_pendaftaran = r.no_daftar
      if (!no_pendaftaran) { results.skipped++; continue }

      // Cek apakah sudah ada di DB
      const { data: existing } = await supabase
        .from('weddings')
        .select('id')
        .eq('no_pendaftaran', no_pendaftaran)
        .maybeSingle()

      if (existing) { results.skipped++; continue }

      const wedding_date = toDateStr(r.tgl_akad)
      const wedding_time = toTimeStr(r.jam_akad) ?? '00:00:00'
      if (!wedding_date) { results.skipped++; continue }

      const { error } = await supabase.from('weddings').insert({
        no_pendaftaran,
        registration_date: toDateStr(r.created_at),
        wedding_date,
        wedding_time,
        groom_name: r.nama_suami ?? '',
        bride_name: r.nama_istri ?? '',
        location: r.lokasi_akad ?? '',
        status: NIKAH_DI_MAP[r.nikah_di] ?? 'Luar Kantor',
        no_akta: r.no_akta ?? null,
      })

      if (error) results.errors.push(`${no_pendaftaran}: ${error.message}`)
      else results.inserted++
    }
  }

  // ── MODE: akta — update no_akta ─────────────────────────────────────
  if (mode === 'akta') {
    for (const r of records) {
      const no_pendaftaran = r.no_daftar
      const no_akta = r.no_akta
      if (!no_pendaftaran || !no_akta) { results.skipped++; continue }

      const { error } = await supabase
        .from('weddings')
        .update({ no_akta })
        .eq('no_pendaftaran', no_pendaftaran)
        .is('no_akta', null)

      if (error) results.errors.push(`${no_pendaftaran}: ${error.message}`)
      else results.updated++
    }
  }

  // ── MODE: penghulu — update officiant_name dari Laporan Excel ────────
  if (mode === 'penghulu') {
    for (const r of records) {
      const no_pendaftaran = r.no_pendaftaran
      const officiant_name = r.penghulu_hadir
      const no_akta = r.no_akta_nikah ?? null
      if (!no_pendaftaran || !officiant_name) { results.skipped++; continue }

      const update: Record<string, any> = { officiant_name }
      if (no_akta) update.no_akta = no_akta

      const { error } = await supabase
        .from('weddings')
        .update(update)
        .eq('no_pendaftaran', no_pendaftaran)

      if (error) results.errors.push(`${no_pendaftaran}: ${error.message}`)
      else results.updated++
    }
  }

  // Simpan log ke simkah_sync_log
  if (mode !== 'daftar' || results.inserted > 0 || results.updated > 0) {
    const summary = mode === 'daftar'
      ? `Daftar: ${results.inserted} ditambah, ${results.skipped} sudah ada`
      : mode === 'akta'
      ? `Akta: ${results.updated} no_akta diperbarui`
      : `Penghulu: ${results.updated} nama penghulu diperbarui`
    await supabase
      .from('simkah_sync_log')
      .insert({
        status: results.errors.length === 0 ? 'success' : 'error',
        summary,
        inserted: results.inserted,
        updated: results.updated,
        skipped: results.skipped,
        errors: results.errors.length > 0 ? results.errors : null,
      })
      .select()
  }

  return { ok: true, mode, ...results }
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { wedding_ids, penghulu, calendar_id } = body || {}

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw createError({ statusCode: 500, message: 'Missing Supabase config' })
  }

  const payload: Record<string, any> = {}

  if (Array.isArray(wedding_ids) && wedding_ids.length > 0) {
    payload.ids = wedding_ids.join(',')
  }

  if (penghulu) payload.penghulu = penghulu
  if (calendar_id) payload.calendar_id = calendar_id

  const edgeFnUrl = `${supabaseUrl}/functions/v1/gcal-sync`

  const res = await fetch(edgeFnUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json()
  if (!res.ok) {
    throw createError({ statusCode: res.status, message: data?.error ?? 'Edge function error' })
  }
  return data
})

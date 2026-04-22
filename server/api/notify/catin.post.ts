export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw createError({ statusCode: 500, message: 'Missing Supabase config' })
  }

  const edgeFnUrl = `${supabaseUrl}/functions/v1/catin-notify`

  const res = await fetch(edgeFnUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  if (!res.ok) {
    throw createError({ statusCode: res.status, message: data?.error ?? 'Edge function error' })
  }
  return data
})

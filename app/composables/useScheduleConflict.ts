export const useScheduleConflict = () => {
  const supabase = useSupabaseClient()

  const checkConflict = async (
    officiantName: string,
    weddingDate: string,
    weddingTime: string,
    excludeId?: string
  ) => {
    if (!officiantName || !weddingDate || !weddingTime) return []

    let query = supabase
      .from('weddings')
      .select('id, groom_name, bride_name, wedding_date, wedding_time, location')
      .eq('officiant_name', officiantName)
      .eq('wedding_date', weddingDate)
      .eq('wedding_time', weddingTime)

    if (excludeId) {
      query = query.neq('id', excludeId)
    }

    const { data } = await query
    return data || []
  }

  return { checkConflict }
}

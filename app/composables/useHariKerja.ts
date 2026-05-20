const holidayCache = new Map<number, Set<string>>()

function toDateStr(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

async function fetchHariLiburTahun(year: number): Promise<Set<string>> {
  if (holidayCache.has(year)) return holidayCache.get(year)!
  try {
    const data = await $fetch<{ date: string; name: string; is_national_holiday: boolean }[]>(
      `https://libur.deno.dev/api?year=${year}`
    )
    // Masukkan semua tanggal: libur nasional DAN cuti bersama
    const set = new Set(
      data
        .filter(h => {
          const d = new Date(h.date.slice(0, 10) + 'T00:00:00')
          const day = d.getDay()
          return day !== 0 && day !== 6
        })
        .map(h => h.date.slice(0, 10))
    )
    holidayCache.set(year, set)
    return set
  } catch {
    holidayCache.set(year, new Set())
    return new Set()
  }
}

async function getHolidaysForRange(start: Date, end: Date): Promise<Set<string>> {
  const years = new Set<number>()
  for (let y = start.getFullYear(); y <= end.getFullYear(); y++) {
    years.add(y)
  }
  const sets = await Promise.all([...years].map(fetchHariLiburTahun))
  return new Set(sets.flatMap(s => [...s]))
}

function isHariLiburOrWeekend(date: Date, holidays: Set<string>): boolean {
  const day = date.getDay()
  if (day === 0 || day === 6) return true
  return holidays.has(toDateStr(date))
}

export const useHariKerja = () => {
  // Tambah n hari kerja ke depan dari tanggal tertentu
  const tambahHariKerja = async (dateStr: string, n: number): Promise<Date | null> => {
    if (!dateStr) return null
    const start = new Date(dateStr + 'T00:00:00')
    const estEnd = new Date(start)
    estEnd.setDate(estEnd.getDate() + n * 3)
    const holidays = await getHolidaysForRange(start, estEnd)

    const cur = new Date(start)
    let count = 0
    while (count < n) {
      cur.setDate(cur.getDate() + 1)
      if (!isHariLiburOrWeekend(cur, holidays)) count++
    }
    return new Date(cur)
  }

  // Kurang n hari kerja ke belakang dari tanggal tertentu (untuk cari batas pendaftaran)
  const kurangHariKerja = async (dateStr: string, n: number): Promise<Date | null> => {
    if (!dateStr) return null
    const end = new Date(dateStr + 'T00:00:00')
    const estStart = new Date(end)
    estStart.setDate(estStart.getDate() - n * 3)
    const holidays = await getHolidaysForRange(estStart, end)

    const cur = new Date(end)
    let count = 0
    while (count < n) {
      cur.setDate(cur.getDate() - 1)
      if (!isHariLiburOrWeekend(cur, holidays)) count++
    }
    return new Date(cur)
  }

  // Hitung jumlah hari kerja antara dua tanggal (eksklusif start, inklusif end)
  const hitungHariKerja = async (fromStr: string, toStr: string): Promise<number> => {
    if (!fromStr || !toStr) return 0
    const start = new Date(fromStr + 'T00:00:00')
    const end = new Date(toStr + 'T00:00:00')
    if (end <= start) return 0

    const holidays = await getHolidaysForRange(start, end)

    let count = 0
    const cur = new Date(start)
    cur.setDate(cur.getDate() + 1)
    while (cur <= end) {
      if (!isHariLiburOrWeekend(cur, holidays)) count++
      cur.setDate(cur.getDate() + 1)
    }
    return count
  }

  const formatTanggal = (date: Date): string => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return { tambahHariKerja, kurangHariKerja, hitungHariKerja, formatTanggal }
}

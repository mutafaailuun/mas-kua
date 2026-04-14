import { createClient } from "https://esm.sh/@supabase/supabase-js@2.41.1";

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const fonnteToken = Deno.env.get("FONNTE_TOKEN");
  const fonnteGroupId = Deno.env.get("FONNTE_GROUP_ID") || "120363405630101894@g.us,120363346263611261@g.us";

  if (!fonnteToken) {
    return new Response(JSON.stringify({ error: "Missing FONNTE_TOKEN" }), { status: 500 });
  }

  // Get report type and optional date from query param or body
  const url = new URL(req.url);
  let reportType = url.searchParams.get("type");
  let targetDateStr = url.searchParams.get("date");

  if (req.method === "POST") {
    try {
      const body = await req.json();
      reportType = reportType || body.type;
      targetDateStr = targetDateStr || body.date;
    } catch (e) { /* ignore */ }
  }

  // Default to auto if not specified
  reportType = reportType || "auto";
  const now = targetDateStr ? new Date(targetDateStr) : new Date();
  
  // Adjust to WIB (UTC+7) for automatic trigger
  if (!targetDateStr) {
    now.setHours(now.getHours() + 7);
  }

  const reportsToSend = [];
  if (reportType === "auto") {
    reportsToSend.push("daily");
    
    // Weekly: Monday
    if (now.getDay() === 1) {
      reportsToSend.push("weekly");
    }
    
    // Monthly: First working day (Mon-Fri)
    const isFirstOfMonth = now.getDate() === 1;
    const isMondayAfterWeekendFirst = now.getDay() === 1 && (now.getDate() === 2 || now.getDate() === 3);
    const isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
    
    if ((isFirstOfMonth && isWeekday) || isMondayAfterWeekendFirst) {
      reportsToSend.push("monthly");
    }
  } else {
    reportsToSend.push(reportType);
  }

  const results = [];

  for (const type of reportsToSend) {
    try {
      const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      let message = "";

      if (type === "daily") {
        const todayStr = now.toISOString().split('T')[0];
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];

        const { data: todayWeddings } = await supabase.from("weddings").select("*").eq("wedding_date", todayStr).order("wedding_time");
        const { data: tomorrowWeddings } = await supabase.from("weddings").select("*").eq("wedding_date", tomorrowStr).order("wedding_time");

        if ((!todayWeddings || todayWeddings.length === 0) && (!tomorrowWeddings || tomorrowWeddings.length === 0)) {
          results.push({ type, status: "skipped", reason: "No weddings today and tomorrow" });
          continue;
        }

        message = `📌 *JADWAL AKAD NIKAH - HARI INI*\n`;
        message += `📅 Hari/Tgl: ${now.toLocaleDateString('id-ID', dateOptions)}\n\n`;
        if (todayWeddings && todayWeddings.length > 0) {
          todayWeddings.forEach((w, i) => {
            message += `${i + 1}. ⏰ Jam: ${w.wedding_time.substring(0, 5)} WIB\n   👤 Catin: ${w.groom_name} & ${w.bride_name}\n   📍 Lokasi: ${w.location}\n   👳‍♂️ Penghulu: ${w.officiant_name}\n   📝 Status: ${w.status}\n\n`;
          });
        } else { message += "_Tidak ada jadwal hari ini._\n\n"; }

        message += `🗓️ *AGENDA AKAD NIKAH - BESOK*\n`;
        message += `📅 Hari/Tgl: ${tomorrow.toLocaleDateString('id-ID', dateOptions)}\n\n`;
        if (tomorrowWeddings && tomorrowWeddings.length > 0) {
          tomorrowWeddings.forEach((w, i) => {
            message += `${i + 1}. ⏰ Jam: ${w.wedding_time.substring(0, 5)} WIB\n   👤 Pasangan: ${w.groom_name} & ${w.bride_name}\n   📍 Alamat: ${w.location}\n   👳‍♂️ Petugas: ${w.officiant_name}\n${w.notes ? `   📌 Keterangan: ${w.notes}\n` : ""}\n`;
          });
        } else { message += "_Tidak ada jadwal besok._\n\n"; }

      } else if (type === "weekly") {
        // Previous week: Monday to Sunday of last week
        const day = now.getDay(); // 0 (Sun) to 6 (Sat)
        const diffToMon = day === 0 ? -6 : 1 - day;
        const currentMonday = new Date(now);
        currentMonday.setDate(now.getDate() + diffToMon);
        
        const startOfWeek = new Date(currentMonday);
        startOfWeek.setDate(currentMonday.getDate() - 7);
        const endOfWeek = new Date(currentMonday);
        endOfWeek.setDate(currentMonday.getDate() - 1);

        const { data: weeklyWeddings } = await supabase.from("weddings")
          .select("*")
          .gte("wedding_date", startOfWeek.toISOString().split('T')[0])
          .lte("wedding_date", endOfWeek.toISOString().split('T')[0]);

        const total = weeklyWeddings?.length || 0;
        const inOffice = weeklyWeddings?.filter(w => w.status?.toLowerCase().includes("kantor") && !w.status?.toLowerCase().includes("luar")).length || 0;
        const outOffice = total - inOffice;

        message = `📊 *RINGKASAN MINGGUAN AKAD NIKAH*\n`;
        message += `📅 Periode: ${startOfWeek.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - ${endOfWeek.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}\n\n`;
        message += `✅ Total Pernikahan: ${total}\n`;
        message += `🏠 Nikah di Kantor: ${inOffice}\n`;
        message += `🚙 Nikah di Luar: ${outOffice}\n\n`;
        
        message += `Rincian per hari:\n`;
        const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
        days.forEach((d, i) => {
          const dDate = new Date(startOfWeek);
          dDate.setDate(startOfWeek.getDate() + i);
          const count = weeklyWeddings?.filter(w => w.wedding_date === dDate.toISOString().split('T')[0]).length || 0;
          message += `- ${d}: ${count} peristiwa\n`;
        });

      } else if (type === "monthly") {
        // Previous month
        const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth(), 0);

        const { data: monthlyWeddings } = await supabase.from("weddings")
          .select("*")
          .gte("wedding_date", firstDay.toISOString().split('T')[0])
          .lte("wedding_date", lastDay.toISOString().split('T')[0]);

        const total = monthlyWeddings?.length || 0;
        const inOffice = monthlyWeddings?.filter(w => w.status?.toLowerCase().includes("kantor") && !w.status?.toLowerCase().includes("luar")).length || 0;
        const outOffice = total - inOffice;

        message = `📈 *LAPORAN BULANAN AKAD NIKAH*\n`;
        message += `📅 Bulan: ${now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}\n\n`;
        message += `🏆 Total Peristiwa Nikah: ${total}\n`;
        message += `🏢 Di Kantor: ${inOffice}\n`;
        message += `🛣️ Di Luar Kantor: ${outOffice}\n\n`;
        message += `Terima kasih atas dedikasi seluruh petugas KUA dalam melayani masyarakat.\n`;
      }

      message += `\n---\nPesan ini dikirim oleh sistem`;

      const targets = fonnteGroupId.split(",").map(t => t.trim());
      const fonnteResults = [];

      for (const target of targets) {
        try {
          const fonnteResponse = await fetch("https://api.fonnte.com/send", {
            method: "POST",
            headers: { "Authorization": fonnteToken },
            body: new URLSearchParams({ target: target, message: message }),
          });
          fonnteResults.push({ target, status: fonnteResponse.status, data: await fonnteResponse.json() });
        } catch (err) {
          fonnteResults.push({ target, error: err.message });
        }
      }

      results.push({ type, fonnte: fonnteResults });
    } catch (error) {
      results.push({ type, error: error.message });
    }
  }

  return new Response(JSON.stringify({ status: "completed", results }), {
    headers: { "Content-Type": "application/json" },
  });

});

import sys

# Get all lines except the header
raw_data = sys.stdin.read().strip().split('\n')
if not raw_data:
    sys.exit(0)

header = raw_data[0].split('\t')
rows = raw_data[1:]

sql_values = []
for row in rows:
    cols = row.split('\t')
    if len(cols) < 50: continue
    
    # Mapping based on headers or known indexes
    # Suami: 13, Istri: 25, Tanggal Akad: 36, Jam: 37, Lokasi: 38, Penghulu: 49, Mas Kawin: 50, Status: 81
    groom = cols[13].replace("'", "''")
    bride = cols[25].replace("'", "''")
    date = cols[36]
    time = cols[37]
    location = cols[38].replace("'", "''")
    officiant = cols[49].replace("'", "''")
    mas_kawin = cols[50].replace("'", "''")
    nikah_di = cols[81].replace("'", "''")
    no_akta = cols[8]
    
    notes = f"No Akta: {no_akta} | Mas Kawin: {mas_kawin}"
    
    sql_values.append(f"('{date}', '{time}', '{groom}', '{bride}', '{location}', '{officiant}', '{nikah_di}', '{notes}')")

if sql_values:
    print("TRUNCATE TABLE public.weddings;")
    print("INSERT INTO public.weddings (wedding_date, wedding_time, groom_name, bride_name, location, officiant_name, status, notes) VALUES")
    print(",\n".join(sql_values) + ";")

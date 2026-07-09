-- Allow anon to read and insert dokumentasi_akad (used by ViolentMonkey userscript)
create policy "allow_anon_select" on public.dokumentasi_akad
  for select to anon using (true);

create policy "allow_anon_insert" on public.dokumentasi_akad
  for insert to anon with check (true);

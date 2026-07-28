-- Tabel untuk menyimpan data formulir calon pengantin dari website
CREATE TABLE IF NOT EXISTS public.wedding_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  groom_name TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  source TEXT DEFAULT 'website',
  is_contacted BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Aktifkan RLS
ALTER TABLE public.wedding_inquiries ENABLE ROW LEVEL SECURITY;

-- Izinkan insert anonim dari formulir website
CREATE POLICY "Allow anonymous insert on wedding_inquiries"
  ON public.wedding_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Hanya admin yang bisa membaca data
CREATE POLICY "Allow admin read on wedding_inquiries"
  ON public.wedding_inquiries
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Hanya admin yang bisa update/menghapus
CREATE POLICY "Allow admin update on wedding_inquiries"
  ON public.wedding_inquiries
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Trigger untuk update updated_at otomatis
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_wedding_inquiries_updated_at
  BEFORE UPDATE ON public.wedding_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

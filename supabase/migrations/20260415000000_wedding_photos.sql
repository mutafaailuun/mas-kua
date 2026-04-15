-- Migration: wedding_photos table for documentation uploads
-- Run this in Supabase SQL Editor or via: supabase db push

CREATE TABLE IF NOT EXISTS public.wedding_photos (
  id           uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  wedding_id   uuid        NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  photo_url    text        NOT NULL,
  order_index  integer     DEFAULT 0,
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE public.wedding_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage wedding photos"
  ON public.wedding_photos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Index for fast lookup by wedding
CREATE INDEX IF NOT EXISTS wedding_photos_wedding_id_idx
  ON public.wedding_photos (wedding_id, order_index);

-- NOTE: Also create a public Storage bucket named "wedding-photos" in Supabase Dashboard.
-- Storage > New bucket > Name: wedding-photos > Public: ON

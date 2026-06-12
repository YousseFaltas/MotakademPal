-- ============================================
-- Motakadem Coptic Scouts — Supabase Storage
-- Run AFTER 05_triggers.sql
-- ============================================

-- ─────────────────────────────────────────────
-- Bucket: event-covers (public read, captain upload)
-- ─────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-covers', 'event-covers', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can view event cover images
CREATE POLICY "event_covers_select"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'event-covers');

-- Only captains can upload event covers
CREATE POLICY "event_covers_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'event-covers'
    AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'captain'
  );

-- Only captains can delete event covers
CREATE POLICY "event_covers_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'event-covers'
    AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'captain'
  );

-- ─────────────────────────────────────────────
-- Bucket: scout-documents (private, owner + captain)
-- ─────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('scout-documents', 'scout-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Scouts can read their own documents; captains can read all
CREATE POLICY "scout_docs_select"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'scout-documents'
    AND (
      (storage.foldername(name))[1] = auth.uid()::TEXT
      OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'captain'
    )
  );

-- Scouts can upload to their own folder
CREATE POLICY "scout_docs_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'scout-documents'
    AND (storage.foldername(name))[1] = auth.uid()::TEXT
  );

-- Scouts can delete their own pending documents
CREATE POLICY "scout_docs_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'scout-documents'
    AND (storage.foldername(name))[1] = auth.uid()::TEXT
  );

-- ─────────────────────────────────────────────
-- Bucket: avatars (public read, owner upload)
-- ─────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can view avatars
CREATE POLICY "avatars_select"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'avatars');

-- Users can upload their own avatar (folder = their uid)
CREATE POLICY "avatars_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::TEXT
  );

-- Users can update their own avatar
CREATE POLICY "avatars_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::TEXT
  );

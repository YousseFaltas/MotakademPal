-- ============================================
-- Motakadem Coptic Scouts — Row Level Security
-- Run AFTER 02_tables.sql
-- ============================================

-- ─────────────────────────────────────────────
-- Helper: get the current user's role
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS public.app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- ═════════════════════════════════════════════
-- PROFILES
-- ═════════════════════════════════════════════
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Everyone authenticated can read all profiles (roster)
CREATE POLICY "profiles_select_authenticated"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

-- Users can update their own profile
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Captains can update any profile (attendance, progress, level)
CREATE POLICY "profiles_update_captain"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (public.get_my_role() = 'captain');

-- Profile row is auto-created by trigger (see 05_triggers.sql)
CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- ═════════════════════════════════════════════
-- EVENTS
-- ═════════════════════════════════════════════
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Everyone can read published events; captains can also read drafts
CREATE POLICY "events_select"
  ON public.events FOR SELECT
  TO authenticated
  USING (
    status = 'published'
    OR public.get_my_role() = 'captain'
  );

-- Only captains can create events
CREATE POLICY "events_insert_captain"
  ON public.events FOR INSERT
  TO authenticated
  WITH CHECK (public.get_my_role() = 'captain');

-- Only captains can update events
CREATE POLICY "events_update_captain"
  ON public.events FOR UPDATE
  TO authenticated
  USING (public.get_my_role() = 'captain');

-- Only captains can delete events
CREATE POLICY "events_delete_captain"
  ON public.events FOR DELETE
  TO authenticated
  USING (public.get_my_role() = 'captain');

-- ═════════════════════════════════════════════
-- RSVPS
-- ═════════════════════════════════════════════
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Scouts see their own RSVPs; captains see all
CREATE POLICY "rsvps_select"
  ON public.rsvps FOR SELECT
  TO authenticated
  USING (
    scout_id = auth.uid()
    OR public.get_my_role() = 'captain'
  );

-- Scouts can create their own RSVP
CREATE POLICY "rsvps_insert_own"
  ON public.rsvps FOR INSERT
  TO authenticated
  WITH CHECK (scout_id = auth.uid());

-- Scouts can update their own RSVP
CREATE POLICY "rsvps_update_own"
  ON public.rsvps FOR UPDATE
  TO authenticated
  USING (scout_id = auth.uid())
  WITH CHECK (scout_id = auth.uid());

-- ═════════════════════════════════════════════
-- NOTEBOOK ENTRIES (privacy-critical)
-- ═════════════════════════════════════════════
ALTER TABLE public.notebook_entries ENABLE ROW LEVEL SECURITY;

-- Scouts can read ONLY their own entries (including reflection)
CREATE POLICY "notebook_select_own"
  ON public.notebook_entries FOR SELECT
  TO authenticated
  USING (scout_id = auth.uid());

-- Scouts can insert their own entries
CREATE POLICY "notebook_insert_own"
  ON public.notebook_entries FOR INSERT
  TO authenticated
  WITH CHECK (scout_id = auth.uid());

-- Scouts can update their own entries
CREATE POLICY "notebook_update_own"
  ON public.notebook_entries FOR UPDATE
  TO authenticated
  USING (scout_id = auth.uid())
  WITH CHECK (scout_id = auth.uid());

-- NOTE: Leaders NEVER see individual notebook rows directly.
-- They only see aggregated consistency via the get_dashboard_summary() function
-- which runs with SECURITY DEFINER and returns only aggregate numbers.

-- ═════════════════════════════════════════════
-- DOCUMENTS
-- ═════════════════════════════════════════════
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Scouts see their own docs; captains see all
CREATE POLICY "documents_select"
  ON public.documents FOR SELECT
  TO authenticated
  USING (
    scout_id = auth.uid()
    OR public.get_my_role() = 'captain'
  );

-- Scouts can upload their own documents
CREATE POLICY "documents_insert_own"
  ON public.documents FOR INSERT
  TO authenticated
  WITH CHECK (scout_id = auth.uid());

-- Captains can update document status (approve/reject)
CREATE POLICY "documents_update_captain"
  ON public.documents FOR UPDATE
  TO authenticated
  USING (public.get_my_role() = 'captain');

-- Scouts can update their own pending documents (re-upload)
CREATE POLICY "documents_update_own_pending"
  ON public.documents FOR UPDATE
  TO authenticated
  USING (scout_id = auth.uid() AND status = 'pending')
  WITH CHECK (scout_id = auth.uid());

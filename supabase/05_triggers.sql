-- ============================================
-- Motakadem Coptic Scouts — Triggers
-- Run AFTER 04_functions.sql
-- ============================================

-- ─────────────────────────────────────────────
-- Auto-create profile when a new user signs up
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name_ar, display_name_en, initials, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name_ar', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name_en', NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(LEFT(NEW.raw_user_meta_data ->> 'display_name_en', 1), ''),
    COALESCE((NEW.raw_user_meta_data ->> 'role')::public.app_role, 'scout')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ─────────────────────────────────────────────
-- Auto-update updated_at timestamp
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER rsvps_updated_at
  BEFORE UPDATE ON public.rsvps
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER notebook_entries_updated_at
  BEFORE UPDATE ON public.notebook_entries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

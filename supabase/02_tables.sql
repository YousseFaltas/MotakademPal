-- ============================================
-- Motakadem Coptic Scouts — Tables
-- Run AFTER 01_types.sql
-- ============================================

-- ─────────────────────────────────────────────
-- Profiles (extends Supabase auth.users)
-- ─────────────────────────────────────────────
CREATE TABLE public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name_ar TEXT NOT NULL DEFAULT '',
  display_name_en TEXT NOT NULL DEFAULT '',
  initials      TEXT NOT NULL DEFAULT '',
  role          public.app_role NOT NULL DEFAULT 'scout',
  rank_ar       TEXT NOT NULL DEFAULT 'كشاف',
  rank_en       TEXT NOT NULL DEFAULT 'Scout',
  patrol_ar     TEXT NOT NULL DEFAULT '',
  patrol_en     TEXT NOT NULL DEFAULT '',
  attendance    INTEGER NOT NULL DEFAULT 0 CHECK (attendance >= 0 AND attendance <= 100),
  progress      INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  level         INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1),
  emergency_contact TEXT NOT NULL DEFAULT '',
  avatar_url    TEXT NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'Scout and captain profiles linked to Supabase Auth users.';
COMMENT ON COLUMN public.profiles.attendance IS 'Percentage attendance 0-100.';
COMMENT ON COLUMN public.profiles.emergency_contact IS 'Guardian phone number for the scout.';

-- ─────────────────────────────────────────────
-- Events
-- ─────────────────────────────────────────────
CREATE TABLE public.events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar        TEXT NOT NULL DEFAULT '',
  title_en        TEXT NOT NULL DEFAULT '',
  description_ar  TEXT NOT NULL DEFAULT '',
  description_en  TEXT NOT NULL DEFAULT '',
  date            TIMESTAMPTZ NOT NULL DEFAULT now(),
  time_range_ar   TEXT NOT NULL DEFAULT '',
  time_range_en   TEXT NOT NULL DEFAULT '',
  location_ar     TEXT NOT NULL DEFAULT '',
  location_en     TEXT NOT NULL DEFAULT '',
  leader_name_ar  TEXT NOT NULL DEFAULT '',
  leader_name_en  TEXT NOT NULL DEFAULT '',
  leader_phone    TEXT NOT NULL DEFAULT '',
  status          public.event_status NOT NULL DEFAULT 'draft',
  priority        BOOLEAN NOT NULL DEFAULT false,
  tags            public.event_tag[] NOT NULL DEFAULT '{}',
  required_gear   JSONB NOT NULL DEFAULT '[]',
  cover_image     TEXT NOT NULL DEFAULT '',
  created_by      UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.events IS 'Scout events with bilingual content.';
COMMENT ON COLUMN public.events.required_gear IS 'JSON array of {"ar-EG": "...", "en": "..."} objects.';
COMMENT ON COLUMN public.events.tags IS 'Array of event_tag enum values for filtering.';

CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_events_date ON public.events(date);

-- ─────────────────────────────────────────────
-- RSVPs
-- ─────────────────────────────────────────────
CREATE TABLE public.rsvps (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id  UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  scout_id  UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status    public.rsvp_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(event_id, scout_id)
);

COMMENT ON TABLE public.rsvps IS 'Scout attendance confirmations for events.';

CREATE INDEX idx_rsvps_event ON public.rsvps(event_id);
CREATE INDEX idx_rsvps_scout ON public.rsvps(scout_id);

-- ─────────────────────────────────────────────
-- Notebook entries (spiritual follow-up)
-- ─────────────────────────────────────────────
CREATE TABLE public.notebook_entries (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scout_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date             DATE NOT NULL,
  completed_habits TEXT[] NOT NULL DEFAULT '{}',
  reflection       TEXT NOT NULL DEFAULT '',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(scout_id, date)
);

COMMENT ON TABLE public.notebook_entries IS 'Private daily spiritual habit tracking.';
COMMENT ON COLUMN public.notebook_entries.reflection IS 'PRIVATE: visible only to the owning scout, never to leaders.';
COMMENT ON COLUMN public.notebook_entries.completed_habits IS 'Array of SpiritualHabitId strings: agpeya, bible, verse, reflection, mercy, liturgy, meeting, service.';

CREATE INDEX idx_notebook_scout ON public.notebook_entries(scout_id);
CREATE INDEX idx_notebook_date ON public.notebook_entries(date);

-- ─────────────────────────────────────────────
-- Documents (upload & review)
-- ─────────────────────────────────────────────
CREATE TABLE public.documents (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scout_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type             public.document_type NOT NULL,
  submitted_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  status           public.document_status NOT NULL DEFAULT 'pending',
  file_url         TEXT NOT NULL DEFAULT '',
  rejection_reason TEXT,
  reviewed_by      UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.documents IS 'Scout document uploads reviewed by leaders.';

CREATE INDEX idx_documents_scout ON public.documents(scout_id);
CREATE INDEX idx_documents_status ON public.documents(status);

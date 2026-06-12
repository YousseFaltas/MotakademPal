-- ============================================
-- Motakadem Coptic Scouts — Custom Types
-- Run this FIRST in Supabase SQL Editor
-- ============================================

-- User roles
CREATE TYPE public.app_role AS ENUM ('scout', 'captain');

-- Event lifecycle
CREATE TYPE public.event_status AS ENUM ('draft', 'published');

-- RSVP states
CREATE TYPE public.rsvp_status AS ENUM ('going', 'declined', 'pending');

-- Document review states
CREATE TYPE public.document_status AS ENUM ('pending', 'approved', 'rejected');

-- Scout document categories
CREATE TYPE public.document_type AS ENUM ('guardian_consent', 'medical_form', 'baptism_certificate');

-- Event tag categories
CREATE TYPE public.event_tag AS ENUM ('coptic', 'scout', 'service', 'camp', 'sports', 'training');

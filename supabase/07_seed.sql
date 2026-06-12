-- ============================================
-- Motakadem Coptic Scouts — Seed Data
-- Run LAST — optional, for development only
-- ============================================
-- NOTE: These inserts bypass RLS (run as superuser in SQL Editor).
-- Replace the UUIDs below with real auth.users IDs after creating
-- test accounts, OR insert directly into auth.users first.

-- For development, create 3 test users in Supabase Auth first,
-- then paste their UUIDs here:

-- Scout 1: Kyrillos
-- Scout 2: Beshoy
-- Scout 3: Mark
-- Captain: Mina (set role to 'captain')

-- Example (replace UUIDs with your actual user IDs):
/*
-- ─── Profiles ────────────────────────────────
INSERT INTO public.profiles (id, display_name_ar, display_name_en, initials, role, rank_ar, rank_en, patrol_ar, patrol_en, attendance, progress, level, emergency_contact, avatar_url) VALUES
  ('UUID-SCOUT-1', 'كيرلس سامي', 'Kyrillos Samy', 'KS', 'scout', 'رئيس مجموعة', 'Patrol Leader', 'مجموعة مار مرقس', 'St. Mark Patrol', 95, 85, 4, '+201001234567', ''),
  ('UUID-SCOUT-2', 'بيشوي عادل', 'Beshoy Adel', 'BA', 'scout', 'كشاف', 'Scout', 'مجموعة مار جرجس', 'St. George Patrol', 78, 46, 2, '+201009876543', ''),
  ('UUID-SCOUT-3', 'مارك يوحنا', 'Mark Yohana', 'MY', 'scout', 'كشاف', 'Scout', 'مجموعة الأنبا أنطونيوس', 'St. Anthony Patrol', 62, 32, 1, '+201005555555', ''),
  ('UUID-CAPTAIN', 'القائد مينا', 'Leader Mina', 'LM', 'captain', 'قائد', 'Captain', '', '', 100, 100, 5, '+201000000000', '');

-- ─── Events ──────────────────────────────────
INSERT INTO public.events (title_ar, title_en, description_ar, description_en, date, time_range_ar, time_range_en, location_ar, location_en, leader_name_ar, leader_name_en, leader_phone, status, priority, tags, required_gear, cover_image, created_by) VALUES
  ('تدريب كشفي في فناء الكنيسة', 'Scout Training in the Church Courtyard',
   'تدريب عملي على الإسعافات الأولية، العقد، وتنظيم الطابور قبل اجتماع الجمعة.',
   'Hands-on first aid, knots, and parade formation practice before Friday meeting.',
   '2026-06-19T16:00:00Z', '٦:٠٠ م - ٨:٣٠ م', '6:00 PM - 8:30 PM',
   'فناء الكنيسة', 'Church courtyard', 'القائد مينا', 'Leader Mina',
   '+201000000000', 'published', true,
   '{scout,training,coptic}',
   '[{"ar-EG":"الزي الكشفي كامل","en":"Full scout uniform"},{"ar-EG":"منديل الكشافة","en":"Scout scarf"},{"ar-EG":"كتاب النوتة وقلم","en":"Notebook and pen"}]',
   '/assets/church-courtyard.svg', 'UUID-CAPTAIN'),

  ('يوم خدمة ورحمة', 'Mercy and Service Day',
   'زيارة خدمة مع تجهيز شنط بسيطة وتوزيع مسؤوليات على المجموعات.',
   'A service visit with simple care packages and patrol responsibilities.',
   '2026-06-26T09:00:00Z', '١١:٠٠ ص', '11:00 AM',
   'مبنى الخدمة', 'Service building', 'القائدة مارينا', 'Leader Marina',
   '+201111111111', 'published', false,
   '{service,coptic}',
   '[{"ar-EG":"تيشيرت الفريق","en":"Team t-shirt"},{"ar-EG":"مياه شخصية","en":"Personal water bottle"}]',
   '/assets/service-day.svg', 'UUID-CAPTAIN'),

  ('تجهيز معسكر الصيف', 'Summer Camp Prep',
   'تقسيم معدات المعسكر، مراجعة شنطة الفرد، والتدريب على السلامة.',
   'Camp equipment sorting, personal bag review, and safety practice.',
   '2026-07-03T07:00:00Z', '٩:٠٠ ص - ١:٠٠ م', '9:00 AM - 1:00 PM',
   'مركز الشباب الكنسي', 'Church youth center', 'القائد بولا', 'Leader Paula',
   '+201222222222', 'draft', false,
   '{camp,scout}',
   '[{"ar-EG":"شنطة ظهر","en":"Backpack"},{"ar-EG":"كشاف يد","en":"Flashlight"},{"ar-EG":"كاب ومياه","en":"Cap and water"}]',
   '/assets/scout-camp.svg', 'UUID-CAPTAIN');

-- ─── RSVPs ───────────────────────────────────
INSERT INTO public.rsvps (event_id, scout_id, status) VALUES
  ((SELECT id FROM events WHERE title_en = 'Scout Training in the Church Courtyard'), 'UUID-SCOUT-1', 'pending'),
  ((SELECT id FROM events WHERE title_en = 'Mercy and Service Day'), 'UUID-SCOUT-1', 'going');

-- ─── Notebook ────────────────────────────────
INSERT INTO public.notebook_entries (scout_id, date, completed_habits, reflection) VALUES
  ('UUID-SCOUT-1', CURRENT_DATE, '{agpeya,bible,mercy}', '');

-- ─── Documents ───────────────────────────────
INSERT INTO public.documents (scout_id, type, status, file_url) VALUES
  ('UUID-SCOUT-1', 'medical_form', 'pending', ''),
  ('UUID-SCOUT-2', 'guardian_consent', 'pending', ''),
  ('UUID-SCOUT-3', 'baptism_certificate', 'approved', '');
*/

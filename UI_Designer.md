# Motakadem Coptic Scout Portal UI Brief

Build a responsive, mobile-first web application for "Motakadem Coptic Scouts", a generic Coptic Orthodox church scout team for youth ages 15-18.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS
- shadcn-style local UI primitives
- Lucide React icons
- Redux Toolkit for shared client state
- RTK Query for cached API data and optimistic updates
- Supabase Auth, PostgreSQL, and Supabase Storage integration points

## Language And Identity

- Default locale is `ar-EG`.
- Arabic copy must use warm Egyptian Arabic while keeping familiar Coptic Orthodox terms such as `الأجبية`, `القداس`, `الخدمة`, and `الكتاب المقدس`.
- English is the secondary supported locale.
- Arabic layouts are RTL; English layouts are LTR.
- The church identity is generic: parish, diocese, and patron saint remain configurable placeholders.

## Visual Requirements

- Keep the high-energy bluish scout aesthetic from the Stitch mockups.
- Add Coptic-friendly accents: ivory, gold, burgundy, and olive for tags, statuses, and service-oriented moments.
- Use horizontal gradients for primary actions and progress.
- Use local visual assets for church courtyard training, service day, camp preparation, and avatars.
- Support dark and light modes.

## Scout Experience

1. **الفعاليات الجاية**
   - Vertical mobile feed of event cards.
   - Local cover image per event.
   - Event title, time, location, required gear, notes, and tags.
   - WhatsApp leader contact action.
   - RSVP actions with optimistic feedback.

2. **دفتر المتابعة الروحية**
   - Coptic Orthodox habit checklist:
     - صلاة الأجبية
     - قراءة الكتاب المقدس
     - آية النهارده
     - تأمل قصير
     - عمل رحمة أو خدمة
     - حضور القداس
     - اجتماع الكشافة
     - تسبحة أو خدمة كنسية
   - Private reflection field.
   - Clear privacy notice: leaders only see aggregates.
   - Streak counter and monthly consistency graph.

3. **التقويم**
   - Monthly grid and weekly event list.
   - Color-coded tags for church, scout, service, camp, sports, and training.

4. **الملف**
   - Scout rank, patrol, guardian contact, and document status.

## Leader Experience

1. **مركز القيادة**
   - Total scouts.
   - Upcoming RSVP rate.
   - Spiritual consistency aggregate only.
   - Roster table with Arabic names.

2. **استوديو الفعاليات**
   - Draft event form.
   - Cover image dropzone.
   - Description editor controls.
   - Publish, save draft, and duplicate previous event actions.

3. **مراجعة الأوراق**
   - Kanban review columns.
   - Pending, approved, and needs revision states.
   - Medical, guardian consent, and baptism certificate samples.

4. **كشف الأفراد**
   - Search and scan-friendly roster cards/table.

## UX Polish

- Skeleton loaders for feed data.
- Toast notifications for RSVP, notebook save, event creation, and document review.
- RTL-aware spacing, icon placement, and captain sidebar.
- No private reflection should appear in leader views.

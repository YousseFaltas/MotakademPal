# Motakadem Coptic Scout Web Application

## Goal

A zero-cost, Arabic-first, Coptic Orthodox scout portal for a generic church scout team. The app supports scouts and service leaders, uses Egyptian Arabic by default, and keeps English available as a secondary language.

## Infrastructure

- **Frontend:** Next.js App Router on Vercel.
- **Client State:** Redux Toolkit for auth/profile cache, role/view, locale, theme, drawers, toasts, filters, and drafts.
- **Data Fetching:** RTK Query for events, RSVPs, roster, documents, notebook entries, streaks, and dashboard aggregates.
- **Database/Auth:** Supabase Auth and PostgreSQL integration points.
- **Images:** Supabase Storage integration point for event media; local assets are used for the current mock implementation.
- **Documents:** Document upload/review integration point for Supabase Storage.

## Language And Localization

- `src/i18n.ts` defines `defaultLocale = "ar-EG"`, supported locales, labels, direction, dictionaries, and format helpers.
- Arabic uses Egyptian Arabic for natural UI copy.
- Coptic Orthodox terms remain precise and familiar: `الأجبية`, `القداس`, `الخدمة`, `الكتاب المقدس`.
- `ar-EG` renders RTL and English renders LTR.

## Scout Features

- **الفعاليات الجاية:** Event cards with local images, date/time, location, required gear, tags, leader contact, and RSVP actions.
- **دفتر المتابعة الروحية:** Coptic Orthodox habit tracker with private reflections, autosave-ready draft state, streak counter, and consistency graph.
- **التقويم:** Monthly grid plus weekly list.
- **الملف:** Rank, patrol, emergency contact, and document status.

## Leader Features

- **مركز القيادة:** Total scouts, RSVP rate, and aggregate-only spiritual consistency.
- **استوديو الفعاليات:** Event draft form, duplicate previous action, publish and save draft.
- **مراجعة الأوراق:** Kanban review for pending, approved, and needs revision documents.
- **كشف الأفراد:** Searchable roster with Arabic sample data.

## Privacy Rules

- Scout reflections are private.
- Leaders see only spiritual habit aggregate consistency.
- Server route handlers remain the boundary for privileged data operations.

## Current Implementation Notes

- The app currently ships with mock route handlers under `/api/*`.
- The mock handlers can be replaced with Supabase queries without changing the RTK Query client interface.
- Local SVG assets replace the external Stitch image URLs for app screens.

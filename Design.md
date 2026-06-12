---
name: Motakadem Coptic Digital Core
colors:
  background: '#0b1326'
  surface: '#111a2d'
  surface-muted: '#1b263b'
  foreground: '#e8efff'
  foreground-muted: '#aeb9cf'
  primary: '#00d4ff'
  secondary: '#165dff'
  ivory: '#f4ead2'
  gold: '#d9a441'
  burgundy: '#b43d4f'
  olive: '#7a9d54'
typography:
  ui: Cairo, Tajawal, Noto Sans Arabic, Hanken Grotesk
  display: Sora, Cairo, system-ui
  mono: JetBrains Mono
rounded:
  sm: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
spacing:
  base: 8px
  gutter: 16px
  container: 24px
---

# Brand And Style

Motakadem is now a generic Coptic Orthodox scout portal. The product keeps the fast, modern scout-dashboard energy from the original mockups, but the content, habits, and sample data are explicitly church-safe and Coptic Orthodox.

The default experience is Egyptian Arabic (`ar-EG`) with RTL layout. English is available as a secondary locale.

# Color Direction

- Deep navy and slate remain the main dark-mode base.
- Electric cyan remains the digital action color.
- Gold, ivory, burgundy, and olive add a Coptic church and service palette.
- Primary gradients stay horizontal.
- Status and event tags use distinct colors so the interface does not become a one-note blue UI.

# Typography

- Arabic UI: Cairo/Tajawal/Noto Sans Arabic stack.
- Display headings: Sora with Arabic fallback.
- Metrics and compact counters: JetBrains Mono.
- Avoid negative letter spacing in compact Arabic UI.

# Layout

- Arabic pages render RTL by default.
- Captain navigation sits on the right in Arabic and on the left in English.
- Forms, tables, filters, and cards use logical spacing and `text-start`/`text-end`.
- Scout pages stay mobile-first with a fixed bottom nav on phones.
- Leader pages prioritize dense desktop scanning.

# Components

- Event cards use local visual assets and include date, location, required gear, tags, leader contact, and RSVP actions.
- The spiritual notebook is named `دفتر المتابعة الروحية`.
- Coptic Orthodox habit labels include:
  - صلاة الأجبية
  - قراءة الكتاب المقدس
  - آية النهارده
  - تأمل قصير
  - عمل رحمة أو خدمة
  - حضور القداس
  - اجتماع الكشافة
  - تسبحة أو خدمة كنسية
- Leader dashboards show aggregate spiritual consistency only.
- Document review uses pending, approved, and needs revision columns.

# Accessibility And Privacy

- Private reflections must never appear in leader views.
- Toasts confirm state changes without blocking workflow.
- Skeleton loaders are preferred over spinners.
- Light and dark modes must preserve readable contrast in Arabic and English.

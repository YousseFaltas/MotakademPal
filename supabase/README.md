# Supabase Setup Guide

All backend services use **Supabase only** — auth, database, storage, and functions.

## Prerequisites

1. Create a free project at [supabase.com](https://supabase.com)
2. Note your project URL and keys from **Settings → API**

---

## Step 1: Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Settings → API → `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Settings → API → `service_role` key (keep secret!) |

---

## Step 2: Run SQL Scripts (in order)

Go to **SQL Editor** in your Supabase Dashboard and run each file in this exact order:

| # | File | What it does |
|---|---|---|
| 1 | `01_types.sql` | Creates custom enums (roles, statuses, tags) |
| 2 | `02_tables.sql` | Creates all 5 tables with indexes |
| 3 | `03_rls_policies.sql` | Enables Row Level Security + privacy policies |
| 4 | `04_functions.sql` | Creates database functions (streak, dashboard, upserts) |
| 5 | `05_triggers.sql` | Auto-create profile on signup + auto-update timestamps |
| 6 | `06_storage.sql` | Creates storage buckets for images and documents |
| 7 | `07_seed.sql` | (Optional) Seed data template — edit UUIDs first |

> **Important:** Run them one at a time, in order. Each script depends on the previous ones.

---

## Step 3: Configure Authentication

In **Authentication → Providers**:

1. **Email** — Enable email/password sign-up (default)
2. Optionally enable **Google** or **Phone** providers

In **Authentication → URL Configuration**:

- Set **Site URL** to `http://localhost:3000` (dev) or your production URL
- Add `http://localhost:3000/**` to **Redirect URLs**

---

## Step 4: Create Test Users

In **Authentication → Users**, create test accounts:

| Name | Email (example) | Role |
|---|---|---|
| Kyrillos Samy | kyrillos@test.com | scout |
| Beshoy Adel | beshoy@test.com | scout |
| Mark Yohana | mark@test.com | scout |
| Leader Mina | mina@test.com | captain |

After creating users, copy their UUIDs from the Users table.

---

## Step 5: Seed Data (Optional)

1. Open `07_seed.sql`
2. Uncomment the SQL block
3. Replace all `UUID-SCOUT-1`, `UUID-SCOUT-2`, `UUID-SCOUT-3`, `UUID-CAPTAIN` with real user IDs from Step 4
4. Run in SQL Editor

---

## Storage Buckets

Three buckets are created automatically by `06_storage.sql`:

| Bucket | Visibility | Who uploads | Purpose |
|---|---|---|---|
| `event-covers` | Public | Captains only | Event cover images |
| `scout-documents` | Private | Scouts (own folder) | Medical forms, consent, certificates |
| `avatars` | Public | Users (own folder) | Profile pictures |

### Upload path conventions

- **Documents:** `scout-documents/{user_uid}/filename.pdf`
- **Avatars:** `avatars/{user_uid}/avatar.jpg`
- **Event covers:** `event-covers/{event_id}.jpg`

---

## Database Schema

```
profiles ──────── 1:N ──── rsvps
    │                        │
    │                     events
    │
    ├── 1:N ──── notebook_entries
    │
    └── 1:N ──── documents
```

### Tables

- **profiles** — Scout/captain profiles (linked to `auth.users`)
- **events** — Bilingual event data with tags, gear, and status
- **rsvps** — Scout attendance per event (unique per scout+event)
- **notebook_entries** — Daily spiritual habits + private reflection
- **documents** — Uploaded files with review workflow

### Key Privacy Rules (RLS)

- ✅ Scouts see **only their own** notebook entries and reflections
- ✅ Captains see **only aggregate** spiritual consistency (via `get_dashboard_summary()`)
- ✅ Captains **never** see individual reflections
- ✅ Scouts can only RSVP for themselves
- ✅ Only captains can create/edit events and review documents

### Database Functions

| Function | Purpose | Access |
|---|---|---|
| `get_notebook_streak(scout_id)` | Computes streak + monthly graph | Scout's own data |
| `get_dashboard_summary()` | Aggregated metrics for leaders | Captain only |
| `upsert_notebook_entry(date, habits, reflection)` | Insert or update daily entry | Current scout |
| `upsert_rsvp(event_id, status)` | Insert or update attendance | Current scout |
| `get_my_role()` | Returns current user's role | Internal helper |

---

## Troubleshooting

**"permission denied for table profiles"**
→ Make sure you ran `03_rls_policies.sql` and the user is authenticated.

**Profile not created on signup**
→ Verify `05_triggers.sql` ran successfully. Check **Database → Triggers** for `on_auth_user_created`.

**Storage upload fails**
→ Verify `06_storage.sql` ran and the upload path includes `{user_uid}/` as the first folder.

**Dashboard function returns "Unauthorized"**
→ The calling user must have `role = 'captain'` in their profile.

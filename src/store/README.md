# Store

Redux Toolkit is used only for shared client state:

- `authSlice`: current profile/role state
- `uiSlice`: theme, drawers, modals, and toasts
- `localeSlice`: active locale and text direction
- `draftsSlice`: event and notebook drafts
- `filtersSlice`: roster/event/document filters

RTK Query lives in `api/baseApi.ts` and talks only to `/api/*` route handlers. Privileged Supabase or storage work should stay server-side.

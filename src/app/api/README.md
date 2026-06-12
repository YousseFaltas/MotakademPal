# API Routes

These route handlers are the current server boundary for RTK Query. They use in-memory mock data for local development and can be swapped to Supabase/Cloudinary/Drive implementations without changing the client hooks.

- `events`: event list, create, update, publish
- `rsvps`: scout attendance state
- `notebook`: private spiritual entries and aggregate streak
- `roster`: scout directory
- `documents`: upload/review status
- `dashboard`: leader summary aggregates

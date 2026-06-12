# Features

Feature folders hold user-facing product surfaces. Next.js route files in `src/app` should stay thin and import from here.

- `captain`: leader dashboard and service-level views
- `documents`: document review workflows
- `events`: event cards and event creation
- `notebook`: Coptic Orthodox spiritual follow-up
- `roster`: searchable scout roster
- `scout`: scout feed, calendar, and profile surfaces

Shared shell, navigation, and UI primitives stay outside this folder under `src/components`, `src/config`, and `src/store`.

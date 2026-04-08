# DailyMove

Daily exercise habit tracker PWA. Assigns one bodyweight exercise per day based on a rotating body-part schedule (Mon=chest, Tue=back, Wed=legs, Thu=shoulders, Fri=arms, Sat=core, Sun=cardio). Users mark complete to build streaks.

## Stack
Astro 5 (hybrid, TypeScript strict) + Tailwind v4 + Supabase (auth + Postgres) + Netlify adapter

## Architecture
- Static pages (index, history, widget) + SSR for auth/API endpoints
- Exercise data: static JSON + local GIFs in `public/gifs/` (from ExerciseDB)
- Daily selection: day-of-week → body part, then date-seeded random within that pool
- Persistence: Supabase `completions` table (user_id, date, exercise_id) with RLS
- Widget: `/widget` route, minimal layout, iframe-embeddable, no exercise image

## Design
Dark theme. Background `#0a0a0f`, cards `#151519`, accent `#5DCAA5`, text `#f0f0f0`/`#888`/`#555`. Mobile-first, native fitness app feel.

## Commits
Each commit = one independent feature. Messages must explain what, how, and why. This is a graded class assignment.

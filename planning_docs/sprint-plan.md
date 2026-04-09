# DailyMove — Sprint Plan

## Sprint 1: Project Scaffold & Base Layout
Setup the foundation: Astro 5, Tailwind, Netlify adapter, layouts, and page shells.

No user stories — this is infrastructure. Login/register pages are created as UI only (not functional until Sprint 3).

### Acceptance Criteria
- [ ] `npm run dev` starts without errors
- [ ] Navigating to `/` shows the BaseLayout with header (logo + streak pill) and bottom nav
- [ ] Bottom nav highlights "Today" on `/` and "History" on `/history`
- [ ] Clicking nav items navigates between pages
- [ ] `/widget` renders with no header or nav
- [ ] `/login` shows a centered card with email/password fields and sign-in button
- [ ] `/register` shows email, password, confirm password fields and create account button
- [ ] Login and register pages link to each other
- [ ] Dark theme applied consistently across all pages

---

## Sprint 2: Exercise Data Layer & Daily Selection
Build the exercise dataset from 35 downloaded GIFs and the algorithm that picks one random exercise per day.

| ID | User Story |
|----|-----------|
| U01 | As a user, I get a different exercise each day |
| U02 | As a user, I see the same exercise as everyone else on the same day |

### Acceptance Criteria
- [ ] 35 exercise GIF files are present in `public/gifs/`
- [ ] `exercises.json` contains an entry for each GIF with id, name, sets, reps, gifUrl
- [ ] `getDailyExercise(date)` returns one exercise from the full pool using a date-seeded random
- [ ] Calling `getDailyExercise()` with the same date always returns the same exercise
- [ ] Different dates return different exercises
- [ ] TypeScript Exercise interface is defined

---

## Sprint 3: Supabase Auth & Database Setup
Wire up authentication and create the completions table.

| ID | User Story |
|----|-----------|
| U03 | As a new user, I can create an account with email and password so my data is saved |
| U04 | As a returning user, I can log in with my email and password |
| U05 | As a logged-in user, I can log out |
| U06 | As a visitor, I am redirected to login when accessing protected pages |

### Acceptance Criteria
- [ ] Supabase client initializes with env vars from `.env`
- [ ] Registering with email/password creates a user and redirects to `/`
- [ ] Logging in with valid credentials redirects to `/`
- [ ] Logging in with invalid credentials shows an error message
- [ ] Logging out clears the session and redirects to `/login`
- [ ] Visiting `/` or `/history` without a session redirects to `/login`
- [ ] Visiting `/login` or `/register` while logged in redirects to `/`
- [ ] `completions` table exists in Supabase with columns: id, user_id, date, exercise_id
- [ ] RLS policy enforces users can only read/write their own rows
- [ ] Unique constraint on (user_id, date) prevents duplicate completions

---

## Sprint 4: Today Page & Streak Tracking
Build the main screen with exercise card, completions API, and streak logic.

| ID | User Story |
|----|-----------|
| U07 | As a user, I see today's exercise with a GIF, name, and reps/sets |
| U08 | As a user, I can mark today's exercise as complete |
| U09 | As a user, I can unmark today's exercise if I made a mistake |
| U10 | As a user, I see my current streak count in the header |
| U11 | As a user, I see this week's progress as dots (Mon–Sun) on the Today page |
| U12 | As a user, my completions persist across devices and browsers |

### Acceptance Criteria
- [ ] Today page shows the exercise GIF, name, and sets/reps
- [ ] "Mark complete" button saves a completion to Supabase via POST /api/completions
- [ ] After completing, button changes to "Completed" with visual feedback
- [ ] Clicking "Completed" unmarks via DELETE /api/completions and reverts the button
- [ ] Streak pill in header shows the correct consecutive-day count
- [ ] Week dots (Mon–Sun) fill in for completed days in the current week
- [ ] Refreshing the page preserves the completion state
- [ ] Logging in on a different device shows the same completion data
- [ ] API endpoints return 401 for unauthenticated requests

---

## Sprint 5: History Page
Build the history view with stats, calendar heatmap, and recent activity.

| ID | User Story |
|----|-----------|
| U13 | As a user, I see my current streak, total workouts, and completion rate as stats |
| U14 | As a user, I see a monthly calendar heatmap showing completed and missed days |
| U15 | As a user, I can navigate between months in the calendar |
| U16 | As a user, I see a recent activity list with exercise names and completion status |

### Acceptance Criteria
- [ ] Three stat cards display: current streak, total workouts, completion percentage
- [ ] Stats update correctly after completing/uncompleting exercises
- [ ] Calendar shows the current month by default with correct day layout
- [ ] Completed days are highlighted in teal, missed past days in red, future days muted
- [ ] Today is visually distinct (teal border)
- [ ] Arrow buttons navigate to previous/next months
- [ ] Calendar does not allow navigating to future months beyond current
- [ ] Recent activity list shows last 7 days with exercise name and status
- [ ] Legend explains the color coding (completed, missed, upcoming)

---

## Sprint 6: PWA Configuration
Make the app installable and offline-capable.

| ID | User Story |
|----|-----------|
| U17 | As a user, I can install the app on my phone's home screen |
| U18 | As a user, the app works offline with cached exercises and GIFs |
| U19 | As a user, the app syncs my completions when I come back online |

### Acceptance Criteria
- [ ] Web manifest is present with app name, icons (192px, 512px), theme color, display: standalone
- [ ] Browser shows install prompt / "Add to Home Screen" option
- [ ] Installed app opens in standalone mode (no browser chrome)
- [ ] Service worker registers successfully
- [ ] Exercise GIFs load from cache when offline
- [ ] Today page renders with cached exercise data when offline
- [ ] Completions made offline are synced when connection is restored
- [ ] iOS meta tags are present for standalone support
- [ ] Lighthouse PWA audit passes

---

## Sprint 7: Embeddable Widget
Build the compact widget route for iframe embedding.

| ID | User Story |
|----|-----------|
| U20 | As a user, I can embed a compact widget showing my streak and today's exercise |
| U21 | As a user, I can mark complete from within the widget |

### Acceptance Criteria
- [ ] `/widget` renders a compact card with logo, streak, exercise name, reps, and complete button
- [ ] No exercise GIF image in the widget
- [ ] No header or navigation chrome
- [ ] Widget is functional inside an `<iframe width="300" height="140">`
- [ ] Complete button works and updates streak count within the widget
- [ ] If user is not logged in, widget shows today's exercise with a "Log in to track" link
- [ ] README includes the embed snippet for the iframe
# DailyMove — Development Chat Summary

## Project Overview
DailyMove is a daily exercise habit tracker PWA built with Astro 5, Supabase, and Tailwind. It assigns one bodyweight exercise per day on a rotating body-part schedule, lets users mark completions, tracks streaks, and includes an embeddable widget.

---

## Discussion Timeline

### 1. Initial Concept & Data Source Research

The assignment requires building an Astro full-stack application with clean, incremental git commits. Each commit must explain what was implemented, how, and why.

**Student's idea**: A simple daily exercise tracker inspired by Darebee's "exercise of the day" format — one exercise per day with a visual demonstration, where users mark completion and track their streak. The student specifically asked about sourcing exercise data with animated images from Darebee or a similar API.

**Research outcome**: Darebee has no public API and their content is copyrighted. Several alternatives were explored (ExerciseDB, WorkoutX, API Ninjas). The student chose ExerciseDB for its open-source GIF library.

### 2. App Scope & Feature Decisions

The student made the following product decisions through direct input:

- **PWA with widget option** — the student specified wanting a progressive web app with an embeddable widget, expanding the project beyond a basic web app.
- **Body-part rotation for daily exercises** — when presented with three selection methods (random, rotating body parts, fully random each visit), the student chose the rotating schedule, demonstrating understanding of structured training principles.
- **Exercise GIF + streak + today's exercise for the widget** — selected from options for widget content.
- **Offline support + installable** — chosen as the priority PWA features over push notifications.
- **No exercise image in the widget** — the student revised the initial widget design to remove the GIF, keeping it compact and focused. This shows awareness of UI economy in constrained spaces.
- **History page request** — the student asked to see the history screen mockup before approving the design, showing a methodical approach to UI validation before development.

### 3. UX & Labelling Decisions

When reviewing the history page mockup, the student questioned the clarity of the stat labels "Total" and "Rate":

> "In the history page what is total and what is rate?"

After receiving explanations, the student asked for **clearer label suggestions** rather than accepting the defaults. The final decision was:

- **Streak** (current consecutive days)
- **Workouts** (total completions — renamed from "Total")
- **Completion** (percentage — renamed from "Rate")

This demonstrates attention to user-facing language and a preference for self-explanatory UI over jargon.

### 4. Data Architecture & Persistence

**Student's key challenge**: When the initial plan used localStorage for streak storage, the student pushed back:

> "No, I need this to actually work"

This drove the architecture shift from a purely static site to one with a real backend. The student understood that localStorage is per-device and wouldn't provide a real user experience across devices. This led to adopting **Supabase** (Postgres + auth) as the backend, which significantly upgraded the project's technical depth.

**Hosting decision**: The student agreed to **Netlify** for free hosting after evaluating the options (Netlify, Vercel, GitHub Pages), understanding that HTTPS is required for PWA service workers.

### 5. Data Sourcing Strategy

The student made a pragmatic decision on exercise GIFs:

> "Ok option 1, but download gifs into my repo."

Rather than depending on external S3 URLs at runtime (fragile) or setting up a build-time API fetch (complex), the student chose to download GIFs locally — eliminating external dependencies while keeping the implementation simple. This shows practical risk management.

### 6. Authentication Approach

The project uses Supabase's built-in email/password authentication. The student confirmed this approach after reviewing the options, understanding the flow: register → login → session cookie → middleware protection on routes.

### 7. Project Planning & Sprint Structure

**Student's contribution to project organisation**:

- **Renamed commits to "sprints"** — the student reframed the 7 development phases as sprints, applying agile terminology to structure the work.
- **Requested acceptance criteria** for each sprint — demonstrating awareness that testable criteria are needed to validate each phase.
- **Requested user stories** grouped both by feature area and by sprint — showing understanding that the same work can be viewed from a product perspective (feature areas) or a delivery perspective (sprints).
- **Questioned the sprint grouping logic** — asked why user stories were split across commits rather than grouped by feature area, prompting a discussion about dependency order and incremental delivery.

### 8. Development Workflow

The student set up the project structure independently:

- Created the `DailyMove` folder on their Desktop
- Placed `CLAUDE.md` correctly at the project root
- Ran Sprint 1 via Claude Code, producing a working Astro scaffold
- Initialized git, committed, and pushed to GitHub
- Deployed to Netlify
- Asked about **branching strategy** for testing before merging to main — showing awareness of safe development practices (feature branches → PR → merge)

**Feedback on CLAUDE.md**: The student flagged that the initial version was too verbose and contained unnecessary details like environment variables:

> "Why are the environment variables in the claude md file? Don't put too much specific details."

This led to a leaner, more efficient context file — showing the student understands the purpose of project context files (orientation, not specification).

**Feedback on Sprint 1 prompt**: The student asked to revise the prompt to be "more efficient knowing that now it has a claude.md file to refer to" — demonstrating understanding of DRY principles applied to documentation and prompt engineering.

---

## Student's Key Contributions Summary

| Area | Contribution |
|------|-------------|
| Product vision | Conceived the app concept, chose Darebee-style format, specified PWA + widget |
| Feature selection | Body-part rotation, offline-first, no GIF in widget |
| UX decisions | Challenged unclear labels, chose Streak/Workouts/Completion |
| Architecture | Pushed for real persistence over localStorage, drove Supabase adoption |
| Data strategy | Chose local GIF storage over runtime API dependency |
| Project management | Reframed as sprints, requested acceptance criteria and user stories |
| Workflow | Set up git, branching strategy, deployed to Netlify independently |
| Documentation | Enforced lean CLAUDE.md, DRY prompt design |

---

## Artefacts Produced
- `CLAUDE.md` — project context file for Claude Code
- `sprint-plan.md` — 7 sprints with user stories and acceptance criteria
- `user-stories-by-feature.md` — 22 user stories grouped by feature area
- `commit-1-prompt.md` — Sprint 1 build prompt
- UI mockups: Today page, History page, Widget (reviewed and approved by student)
- Architecture diagram showing Astro + Supabase + Netlify stack

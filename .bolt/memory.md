# Project memory

## Product intent & audience

- Personal memories/stories app with social sharing features
- Users manage a friends list ("Your people") and share stories/memories with specific friends
- Clicking a friend shows the relationship context: stories you've shared with them

## Brand personality & voice

- Personal, intimate, human-centered language
- Production-quality polish; not generic/cookie-cutter

## Visual design & UX direction

- Vite + React with JSX, Tailwind CSS, React hooks, Lucide React icons
- Import via `@/` alias (maps to `src/`); avoid deep relative imports
- Avoid extra UI/icon packages unless explicitly requested

## Decisions, constraints & rationale

- **Label fix:** "Stories shared with you" → "Stories you've shared with [friend]" when viewing a friend in "Your people"
- **Data note:** The variable `sharedWithMe` (around line 87-88 of the relevant component) actually contains the current user's stories shared *to* that friend, not stories shared *to* the current user — label was backwards, data was correct
- Rationale: heading must match underlying data semantics to avoid user confusion

## Open questions & assumptions

- Variable name `sharedWithMe` is misleading; consider renaming to reflect "stories I shared with this friend" semantics in a future refactor
- Unclear whether a separate section for stories the friend shared *with the current user* exists or is needed
- Exact component/file path for the friend detail view not confirmed in this turn
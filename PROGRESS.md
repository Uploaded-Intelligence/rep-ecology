# rep-ecology — PROGRESS

## Current state
Scaffold only (Next.js 16.3.1 App Router, TypeScript strict, Tailwind v4, ESLint, `src/` dir). No app features yet.

W0 in progress — zeroth dyad running in main session; registry schema + interview pack coming as W0c.

## Next steps
W1 rep core, per the waves in [docs/PLAN.md](docs/PLAN.md).

## Key decisions
- **Fresh build wire-compatible with Nico's AI-Representative API, not a fork** — protocol-not-platform.
- **Stack** = Next.js / Vercel / Neon.
- **Two-plane gate with hard matcher contract**: schema-validated `matchedKeys[]` only — no free text ever reaches the conversational plane.
- Scaffold detail: git self-initialized (create-next-app's auto-init skipped) so the initial commit carries the Uploaded-Intelligence identity.

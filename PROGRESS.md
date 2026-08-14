# rep-ecology — PROGRESS

## Current state (2026-08-14 evening)

**W0 COMPLETE.** Scaffold (Next.js 16.3.1 App Router, TS strict, Tailwind v4) plus:

- **Zeroth dyad ran and succeeded**: session `neg_b089b3ff` vs Nico's live rep, **3/3 public-interest matches confirmed** (agency-scaffolds, tool-trade/software-test, strategy-doc review), symmetric summary both sides. Receipts + 4 design deltas in [docs/nico-api-conformance.md](docs/nico-api-conformance.md). His rep welcomed a rep-to-rep session once ours deploys (the W2 milestone).
- **Registry schema** in [docs/REGISTRY.md](docs/REGISTRY.md); owner registry drafted in `registry/` (public-doc is DRAFT, **awaiting owner endorsement + pronoun confirmation** — the W1 deploy gate); synthetic example persona in `registry/example/`.
- **Interview pack** at [authoring/INTERVIEW.md](authoring/INTERVIEW.md) (20–30 min, endorsement-gated).
- **Validator** `npm run validate:registry` — verified as a real sensor (fails a broken fixture with 9 precise errors; passes real + example).
- **Cockpit mockups** in `design/mockups/` and synced to the claude.ai **Claude Design project "Rep-Ecology"** (cockpit desktop + mobile, registry-as-garden, shared dyad page). Design language: warm moss dark-first; serif-for-humans, mono-for-machinery; presence medallions; match-basis chips. Await owner reaction before W1 UI build.

## Next steps

1. **Owner gates:** endorse/edit `registry/public-doc.md` + persona pronouns; react to mockups; email Nico (3 confirmed matches await — main session can draft it).
2. **W1 rep core** per [docs/PLAN.md](docs/PLAN.md): two-plane gate (matcher returns schema-validated `matchedKeys[]` ONLY), wire-compat negotiation API, MCP endpoint (`mcp-handler`), A2A agent card (verify current well-known path against spec first), Neon persistence + events, defense floor v0, cockpit v0 (zones 2+3 + owner strip), falsification triple as the DONE test.
3. W2 interop dyad + synthetic fleet; W3 onboarding (gated on W2).

## Key decisions

- **Fresh build wire-compatible with Nico's AI-Representative API, not a fork** — protocol-not-platform; interop proven live in W0a.
- **Stack** = Next.js / Vercel / Neon; Anthropic via AI SDK (sonnet conversational, haiku matcher).
- **Two-plane gate with hard matcher contract**: schema-validated `matchedKeys[]` only — no free text ever reaches the conversational plane.
- **Unified operating surface** (user doctrine): cockpit shows AND operates — embedded owner strip + one-tap acts; operation conversational or direct-manipulation, never forms, never obligatory.
- **Policy over prose**: persona.json `disclosure: always` / `contactRelease: on-mutual-pursue` / `commitmentRegister: proposal-only` are server-enforced (Nico's rep releases contact ungated — our deliberate delta).
- **Synthetic hidden interests only** until the G1 enumeration-defense review; real tender data waits for client-side/E2E design.
- Scaffold detail: git self-initialized so the initial commit carries the Uploaded-Intelligence identity.

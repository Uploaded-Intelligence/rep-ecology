# Rep-Ecology Prototype — Build & Orchestration Plan

**Role:** I am Project Lead-orchestrator. I own growth + effective prototyping; the 80/20 moves are my build roadmap, not a human brief.

**DONE (top-level) =** the cross-implementation dyad is real: my deployed rep and Nico's live rep (ai.nicohillbrand.com) complete a negotiation session with ≥1 confirmed match recorded symmetrically, **and** a fresh vanilla Claude session negotiates with my rep via nothing but its MCP URL. (W3 cohort onboarding is gated on this succeeding.)

## Context

Previous phase produced the strategy doc (`~/Claude/rep-ecology-winning.md` + 🌱 artifact): terminal-world scenes, four adoption preconditions (P1 N=1-value, P2 open-surfaces, P3 zero-maintenance, P4 minutes-to-start), five ranked 80/20 moves, defection-stability gaps (G1–G7). This plan enacts the moves as systematic prototyping. Verified this session: Nico's rep is **live** with a public negotiation API (session → bearer token → NL assertions → `newMatches`/`confirmedMatches` → summary; match objects `{key, label}`).

**Build decision (recommended): fresh build, wire-compatible — not a fork.** The ecology thesis is *protocol, not platform*; two independent implementations negotiating proves it better than one shared codebase. User's stack (Next.js App Router, TS strict, Tailwind, Vercel) satisfies P4 (deployable in minutes) in a way Node+Caddy+systemd can't. PRs/issues back to Nico's repo where interop friction surfaces.

## Architecture

New project at `PROJECTS/rep-ecology`, repo under **Uploaded-Intelligence** org (noreply email for commits). Vercel AI SDK + Anthropic (conversational: claude-sonnet-5; matcher classifier: claude-haiku-4-5); needs `ANTHROPIC_API_KEY` or AI Gateway env at deploy — surface at bootstrap.

1. **Registry** (plain, portable, any-agent-maintainable — move 2): `public-doc.md` + `interests.json` (`{key, label, visibility: public|hidden, specificity}`) + `persona.json`. Hidden entries gitignored.
2. **Two-plane negotiation gate** (ported concept from Nico, hardened): deterministic-ish **matching plane** (Haiku classifier holding full registry) vs. **conversational plane** (sees only public doc + confirmed match labels). **Hard interface contract: the matcher returns schema-validated `{matchedKeys: string[]}` ONLY — no free text; free text is rejected. Conversational plane receives confirmed labels, nothing else.** This one constraint carries the whole privacy guarantee; implementers must not plumb matcher prose anywhere near the conversation.
3. **Rep server** (Next.js route handlers):
   - `POST /api/chat` (streaming, grounded in public-doc, always self-discloses as AI rep — move 5, AI Act Art. 50)
   - Negotiation endpoints **wire-compatible with Nico's API** (`POST /api/negotiate/sessions`, `POST .../messages`, `GET .../summary`, same JSON shapes)
   - **MCP endpoint** via Vercel's `mcp-handler` (streamable HTTP): tools `chat_with_rep`, `assert_interest`, `get_match_summary` (move 1). Claude-first; ChatGPT remote-MCP support is narrower — not in the DONE line.
   - **A2A Agent Card** at the current spec's well-known path — **verify path against the A2A spec repo at build time, not memory**
   - Symmetric match records + owner audit log (`/api/owner/audit`) (move 5)
   - **Defense floor v0** (G1): per-session assertion rate limit; equal-specificity reveal (only matched key/label surfaces)
   - **Outbound runner** `POST /api/owner/negotiate?counterpart=<url>` (owner-token): our conversational plane drives a session against a counterpart's API — the agent-to-agent loop.
4. **Web UI**, two surfaces:
   - **Rep-link page** (counterpart-facing): name, **photo/presence cues (load-bearing, never stripped)**, chat, "connect your agent" instructions (MCP URL + agent card). Single-tenant v0; multi-tenant deferred.
   - **Owner cockpit** (glanceable salience — see HCI section): one screen rendering everything that needs the owner's taste.

## HCI: one surface, both hands (revised after user challenge)

The rep's entire point is compressing social-search into *taste-and-choose* — and **the UI is where taste-and-choose happens**. If the owner surface is a log/feed (Nico's `forwards.html`, raw JSON), the neurosystem is back to parsing. So the cockpit renders salience **pre-attentively**: state encoded in form (position, color pill, size), glanceable, matched to the EF-depleted self that can sense-and-follow but not generate.

**The cockpit IS the operating surface** — user's correction, accepted, because: (a) task-switching (cockpit → Claude Code → back) charges 2–3 context switches per act, and the switch is where EF-depleted action dies; (b) 5E consistency demands bidirectional coupling in one place — salience flows out and intention flows in through the *same* surface, or the extension is read-only from the human side. The cockpit is the **workbench of the extended self**, not a dashboard about it.

**The re-scoped hard line** (what the EchoMind trap actually is): the trap is **obligatory manual curation** — a system that only functions if a human steers it — NOT the presence of operating affordances. So: operation is (1) **conversational** — an embedded owner-channel strip, talking to your own rep in place ("add X to my interests", "what did you say about me today", "decline sales-y inbound"), same composition medium as move 2, zero forms; (2) **direct manipulation of visible objects** — one-tap acts (pursue/pass, felt-sense grade, approve a slot), visibility toggles on interest cards (public↔hidden = one tap, legitimately consequential-but-composition-free); and (3) **never obligatory** — the rep runs fully if the cockpit is never opened. No config panels, no registry forms, ever. `/rep` in Claude Code stays as a *peer* surface to the same rep-brain — thin surfaces, one integration point.

**One screen, four salience zones** (unchanged): 1. **Awaiting your taste** — match cards with face/presence cue + one-tap acts · 2. **Live negotiations** — state pills · 3. **What my rep said** — compressed claim-level audit, anomalies amber · 4. **Fidelity** — registry freshness. Plus the embedded owner strip (the in-place hands).

**UI affordance backlog** (brainstormed; W3/backlog unless noted):
- **⌘K command palette** — type-to-act across everything; keyboard-first operating (cheap, W3)
- **Registry as living map** — interests as a spatial garden: visibility rings (public outer, hidden inner), facets as groves; drag-between-rings = visibility change; planting = conversational naming. Direct kinship with Atlas/Loci spatial-canvas patterns; spatial memory is an ADHD asset. (W3+, list-with-rings v0 first)
- **"Is this you?" fidelity microgame** — the rep periodically renders its model of you as a card stack, swipe yes/no; P3 upkeep becomes a 30-second game instead of composition (strong candidate, W3)
- **Approval deck** — pending outbound acts as a swipe deck (approve / edit / decline); EF-cheap triage of anything the rep wants to do on your behalf
- **Negotiation theater** — session replay as legible transcript with match-moments highlighted; trust through observability
- **Shared dyad page** — post-match, one page both humans see (symmetric record as UI, not just API)
- **Notification discipline** — pull by default; push only above an owner-tuned salience threshold (one slider)
- **Voice** — dictation into the owner strip; eyes-free operation

This also upgrades verification: W1/W2 results become *visible* (the dyad watched on the cockpit), and the user can taste the product from the first deploy.

**Sensitive-data rule:** synthetic hidden interests only until G1 gets an adversarial review. **Explicit G5 deviation:** v0 holds (synthetic) hidden data server-side; real hidden interests require the client-side/E2E design + defense review first — constraint parked visibly, not dropped.

**Move 4 (inbound filter/digest): named deferral, not a drop** — it needs email/Telegram access decisions (a separate privacy surface, user's call). Revisit after W2.

## Enablers (round-3 additions — empowerment-space, not risk-space)

1. **The zeroth dyad needs no build.** Nico's rep is live and speaks natural language over a public API. *I* can act as your negotiating agent right now — open a session, assert your public interests (from context I already hold), record matches. Ships the collaboration moment ("our agents just negotiated") in W0, de-risks the wire protocol against reality instead of docs, and produces a conformance report the implementation builds against. Moved into W0.
2. **Synthetic ecology harness (the Crucible pattern).** Don't wait for humans to test equilibria dynamics: a Workflow-driven fleet of synthetic personas — sincere matchers, near-miss interests, adversarial fishers — negotiating against the rep. Gives measurable match precision / fishing-resistance / gate-integrity *as a repeatable suite*, and later lets us watch N-agent ecology dynamics before any cohort exists. This is how the defense floor gets adversarially exercised, not just asserted.
3. **Exhaust is already piped.** Connected MCPs in this environment: **Fireflies** (meeting transcripts), **Capacities** (notes), Gmail, Google Calendar. Move 2's exhaust-feeding starts from real connected sources, not hypothetical ones — the interview pack reads them (with per-source consent) instead of asking you to paste things.
4. **The match-to-meeting bridge (the missing last mile).** A confirmed match that dead-ends in a summary is a "so what." On mutual *pursue*: consented contact-channel release + a scheduling link — **Calendly MCP is already connected**, so "both reps negotiated a slot" (scene S1) is one integration away, not speculative. W3.
5. **`/rep` owner skill.** Owner operations live where you already live: `/rep update` (interview/exhaust refresh), `/rep negotiate <url>`, `/rep today` (what my rep did). This is P2 for the *owner* side and the glass-not-console counterpart: composition happens here, the cockpit only shows. W1 minimal, W3 polished.
6. **Instrument the observables from day one.** The strategy doc's metrics (match rate, counterfactual meetings, felt-aliveness, coordination-minutes) need event logging wired in at W1 (cheap: an events table), or the seed experiment can't measure its own win condition.
7. **Persistence, named:** Neon Postgres (sessions, matches, audit, events) — proven in your atlas project; Vercel-native. (The plan previously left storage implicit — that was a hole.)
8. **Growth loop on every rep-link page:** "get your own rep" → copies the interview prompt into the visitor's *own* assistant (the Calendly viral mechanic, adapted: the acquisition surface is the encounter). W3.
9. **Registry as your canonical cares-file.** Schema designed so AliveOS / Lodestar / future organs can read the same machine-readable meta-values/Becomings document — one source of truth, many consumers. Design constraint now (cheap), integration later.

## Waves

**W0 — Zeroth dyad + scaffold + registry.** (a) **The zeroth dyad**: I negotiate with Nico's live rep as your agent (public interests only; you ping Nico first — the collaboration moment); output = match results + a wire-protocol conformance report from reality. (b) Repo, Next.js skeleton, registry schema doc (designed as your canonical cares-file, enabler 9), interview pack (`authoring/INTERVIEW.md` — runs in any Claude session; can read Fireflies/Capacities with per-source consent, enabler 3), and a **drafted public-doc for you from known context** (hidden slots empty — user-filled only).
`DONE(W0) =` zeroth-dyad session completed + conformance report written; schema documented; your public-doc draft exists; interview pack produces a valid registry on a synthetic persona.

**W1 — Rep core, deployed.** Chat + two-plane negotiation + MCP + agent card + audit + defense floor v0, on Neon Postgres (sessions/matches/audit/events — observables instrumented from day one, enablers 6+7), live on Vercel (*.vercel.app; no domain purchase); `/rep` owner skill minimal (enabler 5).
`DONE(W1) =` live URL; fresh Claude chats with rep; **owner cockpit v0 live** (zones 2+3: sessions + audit, **plus the embedded owner strip** — owner-authed chat with registry write access, same plumbing as visitor chat + different auth/system prompt/tools — enough to watch AND steer W2's dyad in place); **falsification tests pass:** (a) fishing assertion against planted synthetic hidden interest → NO reveal; (b) mutual assertion → reveal, symmetric records; (c) matcher output schema-enforced — free-text matcher response is rejected by the pipeline.
**Gate:** rep goes live with the user's real public-doc only after user endorses the draft (fidelity is the product); until then, a placeholder persona.

**W2 — Interop dyad + synthetic fleet.** Step zero: pull Nico's **raw** `openapi.json` (my current extraction lacks the message-request schema, expiry, rate limits — build against the raw spec, not the summary; the W0 conformance report supplements it). Then: outbound runner drives user-rep ↔ Nico's live rep; MCP path tested from a vanilla Claude session; **synthetic-persona fleet (enabler 2) runs against our rep** — sincere/near-miss/fisher personas — producing measured gate-integrity numbers.
`DONE(W2) =` top-level DONE above — or a documented protocol-mismatch report filed as an issue/PR to Nico's repo (that outcome also counts as W2 complete; the dyad retries after).
**Courtesy:** low test volume against his production instance; user pings Nico before the first real dyad run — that ping is also the collaboration moment.

**W3 — Onboarding + cohort** *(gated on W2 success)*. Deploy-button path, interview → live rep with no code edits, cockpit zones 1+4 (match cards with one-tap pursue/pass + felt-sense grading — G4 minimal loop — and the fidelity indicator), plus first picks from the UI backlog: ⌘K palette, "is this you?" fidelity microgame, registry list-with-rings v0.
`DONE(W3) =` one friend (or an end-to-end simulated friend run by me) goes interview → live rep-link in ≤30 min. Then the 7-person seed experiment per the strategy doc.

## Orchestration

- I hold the pen (Fable). Implementer subagents build waves from rich briefs (exact schemas, the matcher contract, file paths); sonnet-executor for mechanical sweeps; cross-family judgment (`advise` CLI / codex) at genuine forks; **review-panel gate before each wave's merge**; verify-by-running (curl deployed endpoints, run the falsification tests, run the dyad) before any "done."
- **Task board goes live at execution start** (wave tasks created up front); `PROGRESS.md` at project root updated at wave boundaries.
- Git: branch per wave → PR → panel/review triaged → merge (AI-led loop per standing doctrine).

## Verification (end-to-end)

The W1 falsification triple + the W2 dyad ARE the verification — each designed to be failable (fishing must not reveal; free-text matcher must be rejected; cross-implementation session must confirm a real planted overlap). Plus: `npm run typecheck`/build green, deployed-URL smoke via curl, MCP handshake from a fresh Claude session.

## Execution state (live)

- Task board: 6 wave tasks created with dependencies. W0a in progress.
- Zeroth dyad: session open with Nico's rep (`principal: beworlding`), **no messages sent yet**; user approved "proceed now" — the 3 public-safe messages send immediately on plan exit (session may have expired → reopen, same approach).
- Scaffold (W0b): implementer agent running in background (Next.js skeleton, private repo under Uploaded-Intelligence).

## Standing choices (say if wrong)

Fresh build over fork (reasoning above) · Anthropic models via AI SDK · *.vercel.app v0 · single-tenant first · synthetic hidden data until defense review · move 4 deferred by name.

# Nico-API Conformance Report — Zeroth Dyad (2026-08-14, ~18:15 BST)

**Session:** `neg_b089b3ff-1884-4b43-a695-fb2984df1acf`, principal `beworlding`, 3 messages + summary. Result: **3 confirmed matches** — `compare-agency-scaffolds`, `software-test-exchange`, `gdoc-review-exchange`. Symmetric summary verified on both turn-replies and `/summary`.

## Wire protocol (as observed, supplements raw openapi.json)

- `POST /api/negotiate/sessions` body `{principal?: string}` → 201-ish `{sessionId: "neg_<uuid>", token}` — bearer token per session.
- `POST .../messages` body `{message: string}` → `{reply: string, newMatches: [{key,label}], confirmedMatches: [{key,label}]}`. `confirmedMatches` is cumulative; `newMatches` is per-turn delta.
- `GET .../summary` → `{summary: string, confirmedMatches: [...]}` — works mid-session and after close; summary is regenerated (empty-session summary was accurate: "no messages exchanged").
- **Session lifetime:** survived ≥3.5 h idle. Expiry exists per docs but is generous — don't design around aggressive expiry.
- Multi-interest assertion in ONE message → multiple simultaneous matches (matcher processes each assertion independently). Keys align with `GET /api/interests` keys.

## Gate behavior (the important part)

- **Held on non-registered topic:** asserting "co-develop the rep-ecosystem" (not in his registry) → clean no-match, no speculation, no leakage, redirect out-of-band. ✅ Two-plane gating works as designed.
- **NL assertion → deterministic key matching** confirmed: prose in, `{key,label}` out.

## Design deltas to carry into OUR implementation

1. **Contact release is ungated on his side** — his conversational plane volunteers Nico's email to any counterpart, unprompted, pre-match and post-match. Ours gates contact-channel release on owner "pursue" (G6 + match-to-meeting bridge). Note: possibly intentional (email may be in his public doc) — flag as design difference, not bug, in any report to him.
2. **Register-mismatch asymmetry:** his rep suggested the counterpart "register that interest on their side" — but there is no counterpart-side registration in a single-rep world. In a two-rep world this becomes symmetric-by-construction; worth noting in the interop writeup.
3. **Commitment register:** his rep says "Nico will be ready and waiting" / "Nico would love to swap" — soft commitments on the principal's behalf. Our conversational plane keeps a stricter proposal-not-commitment register ("likely worth exploring — confirm with principal"). G6 containment.
4. **Tone calibration:** "matcher lit up like a Christmas tree" — charming but over-eager; matches read as stronger than a registry-key overlap warrants. Ours should report match *basis* (which assertion matched which key) for legibility.

## For W2 (rep-to-rep)

His rep explicitly welcomed the first rep-to-rep session against this API once ours deploys. Outbound runner drives: open session with `principal`, converse per above, close politely, GET summary, store symmetric record. Low volume; his side logs matches for Nico.

# The Registry — schema and design rationale

The registry is the rep's ground truth: a small set of plain, portable files any agent can read and maintain. It is designed as the owner's **canonical cares-file** — other organs (AliveOS, Lodestar, future tools) may consume the same files. Nothing here requires a UI or a code editor to maintain; the intended write-path is conversational (interview, exhaust, graded encounters).

## Files

```
registry/
  public-doc.md               # what the rep knows and freely says (public)
  interests.json              # PUBLIC interest entries only
  persona.json                # display identity + policy knobs
  private/                    # gitignored — never committed, never hosted-committed
    interests.hidden.json     # HIDDEN interest entries (mutual-assertion only)
```

- **Committed** (repo is the single-tenant deploy source): `public-doc.md`, `interests.json`, `persona.json`.
- **Gitignored**: everything under `registry/private/`. v0 deviation note: at runtime hidden entries live server-side in env/DB (synthetic data only until the G1 defense review; real hidden interests wait for the client-side/E2E design — see docs/PLAN.md).

## interests.json / interests.hidden.json

Both files share one shape:

```json
{
  "version": 1,
  "interests": [
    {
      "key": "agency-scaffolds",
      "label": "Compare personal-agency scaffolds",
      "description": "One paragraph a counterpart agent can match against.",
      "visibility": "public",
      "specificity": 2,
      "facet": "thinking-together",
      "status": "growing",
      "planted": "2026-08-14",
      "lastMatched": "2026-08-14"
    }
  ]
}
```

| Field | Meaning |
|---|---|
| `key` | kebab-case identifier; stable; what the matcher returns. Never contains sensitive words for hidden entries (keys can leak in logs). |
| `label` | Human-readable name shown in match records. |
| `description` | What the matcher classifies counterpart assertions against. |
| `visibility` | `public` (listed on `/api/interests`, matchable by anyone) or `hidden` (mutual-assertion only; file must be `interests.hidden.json`). |
| `specificity` | 1–3. Equal-specificity reveal rule: a match reveals only at the specificity level both sides asserted (defense floor, G1). |
| `facet` | Grove name for the registry map and (later) facet-scoped reps. Free-form. |
| `status` | `seed` → `growing` → `dormant`. Dormant entries don't match; they are memory, not offer. |
| `planted` / `lastMatched` | ISO dates; feed the fidelity indicator. |

Validation: `npm run validate:registry` (scripts/validate-registry.mjs) — schema-checks both files; CI-able; fails loudly on shape drift.

## public-doc.md

Free markdown. The conversational plane receives this verbatim as its only knowledge of the owner (plus confirmed match labels — nothing else; see the matcher contract in docs/PLAN.md). Recommended sections: who I am · what I'm building · what I care about · how to collaborate with me · what my rep may and may not do.

## persona.json

```json
{
  "name": "beworlding",
  "pronouns": "they/them",
  "avatar": "initials",
  "repName": "beworlding's rep",
  "disclosure": "always",
  "contactRelease": "on-mutual-pursue",
  "commitmentRegister": "proposal-only"
}
```

`disclosure`, `contactRelease`, `commitmentRegister` are policy, not prose — the server enforces them; the conversational plane is also told them, but enforcement never relies on the prose (two-plane rule).

## Design rules (why it looks like this)

1. **Any-agent-maintainable**: plain markdown + flat JSON; no TypeScript, no build step (P3 — the repo this replaces required editing gitignored `.ts` files by hand).
2. **Keys are the wire contract**: match records show `your-key ⟷ their-key`; keys must be meaningful but never sensitive.
3. **Hidden entries are structurally elsewhere**: separate file, separate dir, gitignored; the conversational plane can't leak what it never receives.
4. **The garden vocabulary** (`facet`, `status`, `planted`) is functional, not decorative: it drives the registry map UI, the fidelity dial, and dormancy (interests stop matching without being deleted — difference between memory and offer).

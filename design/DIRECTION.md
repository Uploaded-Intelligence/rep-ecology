# Design Direction — the garden world

Co-created 2026-08-14 (owner + lead). This is the design north star for all rep-ecology UI. Round-1 mockups (conventional cards/dashboard) are superseded for the owner surface; the visitor rep-link page may stay conventional.

## The correction that set the direction

Round-1 cockpit was "ok but very text-heavy, too conventional." Target: **maximally intuitive, low cognitive cost**, with visual design carrying state integrally; symbolic/text elements exist for precision, not as the primary surface. Think like an expert game dev: game craft is the most evolved discipline for making complex systems *felt*.

## Why good games work (the analysis behind everything here)

A good game is a **legible aliveness engine**: it renders a system's equilibria dynamics at human timescales, with interruptible agency and honest, proportionate feedback, in loops nested from seconds to seasons. Specifically what we borrow:

1. **Interruptible autonomy** (colony sims, god games): the system runs without you; your touch matters when you give it. Watching your rep negotiate IS the product's trust loop.
2. **Anthropomorphic legibility**: a character's posture is a status display cheaper to read than any dashboard. The rep is a wisp; where it hovers is what it does.
3. **Emergent narrative**: the system generates small stories the player retells. Retelling = trust + delight. (The Chronicle, below.)
4. **Real-clock ritual** (Animal Crossing): the world moves with real time; returning is itself rewarding. Negotiations-while-you-sleep is literally this loop; the morning garden visit replaces the morning dashboard.
5. **Juice with honesty**: every act answered by proportionate motion; no fake feedback, ever (fake juice = trust rot).
6. **NOT gamification**: no points, streaks, badges. Stakes are real matches with real humans. The game is the world's real state made legible and touchable.

## Doctrine (seven rules)

1. **Diegetic, not chrome** — information lives in the world. The garden IS the cockpit.
2. **Semantic zoom is the whole navigation** — one continuous axis: node → grove → garden (cell) → nexus → biosphere. No menus. Symbolic precision (keys, transcripts, JSON) materializes as a thin rail only at deep zoom.
3. **Affordance-through-form** — what glows/pulses is actionable now; what is still is at rest. One glance = what needs me.
4. **All operations are world verbs** — pluck (pursue) · let-fade (pass) · water / re-open channel (revive tie) · plant (speak a new interest) · veil/unveil (move between visibility rings) · harvest (felt-sense grading: the met thread bears fruit; grading = choosing its basket). **No forms anywhere.** Composition = speech to the wisp.
5. **Never obligatory** — the world runs fully unattended (the EchoMind trap is obligation, not affordance).
6. **Time is real and scrubbable** — day/night maps to the owner's actual day (night mode shows only what awaits taste — EF-honest); dragging the sun replays the day (audit-as-replay, ~10s).
7. **Presence is load-bearing** — humans render with faces/warm serif; machinery in mono. Never strip presence cues.

## The signature mechanic: the gate as visible physics

An assertion is a **mote** flying from the visitor's lantern toward the groves. It can land nowhere by itself. Only when the owner genuinely holds the interest does an answering mote rise (from the public grove, or the veiled bed for hidden ones) to meet it at the **threshold** — and only the meeting ignites a thread. A probe with no answering mote dims at the line. **The double-blind privacy architecture is watchable.** Fishing attempts look like what they are: motes dying at the boundary, amber ripples.

## The register: mythic-technical, not pastoral

Owner correction: "meadow" was lame — cottage-core reads false. The world is **bioluminescent, deep-field, Culture-adjacent**: biome-cells, filaments, spore-light, signal. Warmth comes from light and life, not from twee. Copy follows: "signal low · touch to re-open the channel", not "water the flowers."

## The scenes (current mockups, Claude Design project "Rep-Ecology", group *Garden World*)

- **garden-home** — the cell interior: organelle-groves, veiled bed, wisp, visitor lantern with offered threads, amber ripple for turned-away trouble. Endorsed direction for the home screen.
- **encounter-live** — semantic zoom one level in: the mote-meeting mechanic animated, live transcript as diegetic speech-bloom, draw-in / let-fade verbs.
- **ecological-nexus** — zoom out past the hedge: the federation as living tissue. Biome-cells, braided live filaments with two-way signals, thinning filaments (one touch re-opens), spore-field for the unmet. Replaces the rejected "meadow."

## Backlog (specified, unbuilt)

- **Night mode**: same garden, low light; ONLY what awaits taste glows (unharvested fruit pulse). For the depleted evening self: sense-and-follow, zero generation.
- **The Chronicle**: at dusk the rep writes 2–3 lines of story, pinned as standing stones; morning ritual = read the stone, see the glows, done in 30 s.
- **Visitor characterization as threat model**: steady warm = sincere; flickering = evasive; probing swarm = fisher. Security telemetry via character design.
- **Sound channel**: match chime pitched by specificity; ambient hum while sessions live; silence at rest. Optional; eyes-free glance.
- **Plural wisps**: N wisps tending their facet-groves (parliament garden). Architecture supports N from day one; single wisp v1.
- **Always-on ambient display**: a window/widget where the world just lives; peripheral noticing replaces checking.
- **VR horizon**: the garden as a walkable world (owner's PCVR interest); sit at your own gate and watch negotiations as aurora. Not v1.

## Implementation notes (for the builders)

- Mockups are static SVG scenes; production should render the world as **Canvas/WebGL** (organic motion, many motes) with an HTML overlay for precision rails and speech blooms. Respect `prefers-reduced-motion` throughout (world settles to gentle stills; state stays readable without motion).
- Every visual state must be backed by a real event in the store (`events` table) — the world never shows what didn't happen (honesty rule, and it makes the scenes replayable).
- Accessibility: every diegetic state needs a text equivalent (the precision rail doubles as the screen-reader surface).

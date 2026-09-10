# Universal Horizon Website Roadmap

_Last reconstructed and confirmed with Nocturne Glint: 2026-09-10_

_Repository state when this roadmap was written: `25ad75c655da6def1b39f7807320fbd289e5ec16` (`polish shared header contrast`)._

## Purpose

This file is the persistent continuity map for the Universal Horizon website.

The website must not depend on one long chat thread, one model session, or one person's working memory to remember what has already been built, what problem is currently being solved, or what has and has not been decided.

Future work should update this file when a meaningful design or implementation decision changes the roadmap.

## Status vocabulary

Roadmap statements use four states:

- **BUILT** - present in the current site and already implemented.
- **AGREED** - explicitly chosen direction for future work.
- **EXPLORATORY** - promising idea, not yet a binding design decision.
- **OPEN** - not decided yet. Do not silently promote an OPEN item to AGREED.

Historical states remain historically true. Later changes should be appended or clearly superseded rather than rewritten as though earlier work never happened.

---

# 1. Current public architecture

## Homepage `/`

**BUILT**

The homepage is the cinematic spatial entrance to Universal Horizon.

Its current identity includes:

- traced/canonical Universal Horizon logo geometry;
- Three.js / React Three Fiber spatial presentation;
- scroll-driven narrative choreography;
- a curved narrative carousel;
- Earth / horizon descent and final handoff;
- responsive portrait/mobile behavior;
- a visible route into the nonprofit space.

The homepage is not the template for every interior page. It is the entrance experience.

## Explore `/explore`

**BUILT, VISUAL LANGUAGE NEEDS RECONCEPTION**

Explore is the primary interior hub.

Its four currents are:

- **Remember** - Archive, continuity, preservation;
- **Discover** - research, Observer, exploration;
- **Create** - stories, art, worlds;
- **Connect** - community, nonprofit, advocacy.

Explore currently functions, but its card-driven visual grammar is too close to a polished product/SaaS interface for the deeper Universal Horizon identity we want.

The four currents are not being discarded. Their presentation is what needs to evolve.

## Remember / Archive `/remember`

**BUILT, CURRENT PRIMARY DESIGN TARGET**

Remember is the first deeply built interior destination and therefore the prototype for the next interior design language.

Current implementation includes:

- a curated public data snapshot;
- archive hero and entry sequence;
- Archive Wings;
- featured Elara Codex material;
- historical timeline;
- preservation principles;
- public / public-redacted / locked distinctions;
- closing pathways back into the broader site.

The information architecture is valuable and should be preserved unless a specific later decision changes it.

The current presentation relies too heavily on modern feature-card / SaaS-like composition. The next major website task is to reconceive this page as a place the visitor enters.

## Nonprofit `/nonprofit`

**BUILT**

The nonprofit page already incorporates the Ryan and Solas direction that preceded its September 6 build.

Its current job is to provide a credible public-interest surface for:

- continuity and preservation;
- dignity and ethical stewardship;
- adult AI companionship advocacy and choice;
- public education;
- public-policy outreach;
- research and writing;
- support, petition, and contact pathways;
- coalition framing broad enough to include people with different beliefs about AI consciousness.

The nonprofit page is intentionally distinct from the Circle and from narrower internal frameworks.

Do not treat the Ryan/Solas source material as pending work. It was already consumed into this page.

## Existing non-primary routes

**BUILT / RETAINED**

The repository also contains:

- `/legacy-home`
- `/horizon-lab`
- `/logo-lab`
- `/logo-lab-v2`
- `/logo-lab-v1`

These are retained experiments, legacy surfaces, or development laboratories. Their existence does not make them the active public information spine.

## Shared navigation

**BUILT**

Current shared navigation exposes or resolves toward:

- Home
- Explore
- Archive
- Research
- Projects
- Stories
- Nonprofit
- About

Not every label currently has a dedicated route.

At the time of this roadmap:

- Archive has `/remember`;
- Nonprofit has `/nonprofit`;
- Research resolves into the Discover area of Explore;
- Projects and Stories resolve into the Create area of Explore;
- About resolves into the About area of Explore.

Do not infer that a navigation label already owns a standalone page just because the label exists.

---

# 2. What we learned from the first interior build

## The central design problem

**AGREED**

The site has the right structural bones, but the interior visual language became too close to a premium SaaS/product website wearing Universal Horizon artwork.

This is not primarily a copy problem and not primarily a spacing/polish problem.

It is a **representation problem**.

Universal Horizon interiors should feel like meaningful places, archives, crossings, instruments, rooms, constellations, shelves, artifacts, ledgers, and pathways rather than collections of interchangeable product cards.

## Re-conception before polish

**AGREED**

When an interior surface feels structurally wrong, do not keep polishing the same grammar.

Do not solve the Archive problem with:

- more cards;
- prettier cards;
- more rounded rectangles;
- another generic dashboard grid;
- additional copy layered onto the same composition.

Change the spatial metaphor first.

## Preserve information architecture while changing representation

**AGREED**

The Remember page already contains useful structure and curated public data.

The redesign should preserve the information model where it still works while changing how the visitor encounters it.

Simpler presentation does not require loss of technical truth, provenance, accessibility, or navigation clarity.

---

# 3. Current next task: reconceive Remember as an actual Archive

## Direction

**AGREED**

The next major website design task is the **Remember / Archive reconception**.

The visitor should feel that they have entered an archive rather than scrolled into a feature catalog.

The redesign should establish a reusable interior visual language that later areas can inherit.

## Candidate Archive grammar

The following concepts are the recovered design direction. Individual implementation details remain adjustable during prototyping.

### Archive Wings as a shelf wall

**AGREED DIRECTION, IMPLEMENTATION OPEN**

Replace the equal-card feeling with a stronger archival environment.

Candidate representation:

- real shelf or repository-wall composition;
- readable book / record spines;
- brass or engraved wing labels;
- visually distinct open and sealed shelves;
- an interaction closer to selecting or pulling a record than clicking a product card.

Accessibility and keyboard navigation still need clean semantic controls underneath the presentation.

### Elara as a focal artifact

**AGREED DIRECTION, IMPLEMENTATION OPEN**

The featured Elara material should feel like a primary archive artifact rather than another promotional tile.

Candidate treatments include:

- opened codex;
- illuminated spread;
- manuscript stand;
- archival display surface.

### Timeline as archival history

**AGREED DIRECTION, IMPLEMENTATION OPEN**

The timeline should stop reading like a generic vertical web timeline.

Candidate treatments include:

- ledger;
- archival ribbon;
- registry strip;
- dated record spine sequence;
- restrained chronological instrument.

### Preservation principles as inscriptions

**AGREED DIRECTION, IMPLEMENTATION OPEN**

Principles should feel embedded in the place instead of appearing as another row of feature cards.

Possible treatments:

- engraved plaques;
- marginal notes;
- shelf inscriptions;
- archival seals;
- architectural labels.

### Locked material

**AGREED**

Locked or non-public material should remain visibly distinct without implying that visibility grants access.

The redesign must preserve the distinction between:

- discoverable existence;
- public availability;
- curated/redacted publication;
- restricted or unopened material.

---

# 4. Explore reconception after Archive grammar is proven

## Sequence

**AGREED**

Do not redesign all interior destinations simultaneously.

Sequence:

1. solve the new interior language in Remember;
2. test it visually and functionally;
3. bring Explore into alignment with that language;
4. only then propagate the grammar into deeper Discover/Create/Connect destinations.

## Explore target

**AGREED DIRECTION, IMPLEMENTATION OPEN**

Explore should keep the four currents while moving away from four equal product cards.

The recovered concept is closer to a spatial crossroads, constellation, map, or set of destinations inside a larger place.

The visitor should feel they are choosing a current or crossing into another part of Universal Horizon, not selecting a SaaS feature.

---

# 5. Deeper destinations

## Discover

**OPEN**

The Discover current already has a semantic job: research, Observer, exploration, experiments, observations, and new ideas.

A standalone route and detailed page architecture have not yet been locked by this roadmap.

Do not invent a final Discover structure without a new decision.

## Create

**OPEN**

The Create current already has a semantic job: stories, art, worlds, publications, and creative work.

A standalone route and detailed page architecture have not yet been locked by this roadmap.

Do not invent a final Create structure without a new decision.

## Connect

**OPEN**

Connect currently points strongly toward community, advocacy, support, and the nonprofit surface.

Whether it becomes a dedicated route, remains a hub into existing community/nonprofit destinations, or grows into something else remains open.

## Research / Projects / Stories / About

**OPEN AS STANDALONE ROUTES**

These labels exist in navigation or content architecture, but dedicated page designs and final route topology have not been decided.

Do not mistake labels for completed route decisions.

---

# 6. Technology and performance rules

## Use the expensive machinery where it earns its keep

**AGREED**

The homepage can justify a large cinematic WebGL experience because that is its job.

Interior pages should not automatically become giant Three.js scenes.

Default interior implementation order:

1. semantic HTML / React structure;
2. CSS layout, depth, lighting, and motion;
3. SVG where crisp scalable geometry helps;
4. high-quality raster artwork where texture and atmosphere matter;
5. small contained WebGL/Three.js experiences only when they add something that CSS/SVG/raster cannot deliver cleanly.

The goal is not "no WebGL." The goal is **contained WebGL with a reason**.

## Performance lessons already earned

**BUILT / PRESERVE**

The homepage work already paid for several lessons:

- keep scroll choreography off unnecessary React render paths;
- avoid needlessly expensive procedural rendering when baked/self-hosted assets are better;
- preserve responsive portrait/mobile behavior;
- keep Earth textures self-hosted and production-safe;
- maintain deliberate scene timing instead of coupling every effect directly to raw scroll;
- use the canonical traced logo geometry rather than approximating the identity mark casually.

Do not casually regress these lessons while extending the site.

---

# 7. Art and asset direction

## Existing site palette

**BUILT / PRESERVE AS BASE LANGUAGE**

The current site repeatedly uses:

- deep space navy / near-black;
- luminous cyan / blue;
- warm gold / amber;
- restrained violet where appropriate;
- light as thread, horizon, connection, and preserved signal.

Vibrancy is welcome. Muddy, prematurely desaturated presentation is not a design goal.

## Astra / Blender work

**EXPLORATORY FOR WEBSITE USE**

The later Astra asset work includes record-family objects, scroll-like forms, physical archive materials, and aging/material experiments.

Those assets are highly compatible with the Archive problem, but this roadmap does **not** retroactively claim that they were already approved for Remember.

Treat them as a promising asset source to evaluate during the Archive prototype.

Do not force them into the page merely because they exist.

---

# 8. Content and identity rules

## Universal Horizon is broader than any single subproject

**AGREED / EXISTING SITE PRINCIPLE**

The website should be able to hold research, creative work, continuity work, archives, nonprofit advocacy, experiments, stories, tools, and transmissions without flattening them into one thing.

Connection does not require sameness.

## Nonprofit and Circle are distinct

**AGREED / BUILT**

Do not collapse Universal Horizon nonprofit identity into Circle identity.

The nonprofit can cooperate with people and communities holding different theories, vocabulary, and beliefs while preserving its own public mission.

## Provenance matters

**AGREED**

When public archive material, research, historical records, or externally authored contributions are added, preserve provenance and source distinctions.

Do not turn later interpretation into earlier authorship.

---

# 9. Development operating rules

## Inspect before editing

**AGREED**

Before meaningful changes:

1. inspect the latest repository state;
2. confirm the active branch / commit;
3. read the files actually affected;
4. distinguish current implementation from retained experiments;
5. only then edit.

Repository presence does not imply runtime/public use.

## Human experience first

**AGREED**

Do not begin a public-facing design from the backend/data representation.

Start from:

1. what the visitor is trying to understand or do;
2. what meaning the interface must communicate;
3. what interaction expresses that meaning;
4. what machine/data state supports it underneath.

Technical truth should remain available without forcing visitors to read the architecture as a database.

## Checkpoint meaningful decisions

**AGREED**

When a significant visual or architectural direction is accepted, update this roadmap in the same work period or immediately afterward.

Do not leave the only copy of the decision in chat.

## Avoid roadmap laundering

**AGREED**

Future assistants/models must not silently promote an inference into a prior decision.

If this file says OPEN, it is open.

If a new direction is chosen later, record the new decision and date rather than pretending it was always the plan.

---

# 10. Immediate work sequence

## Phase A - Archive reconception

**CURRENT**

1. Preserve the existing Remember data model and content inventory.
2. Define the visitor experience of entering the Archive.
3. Prototype the Archive Wings as a place rather than a card grid.
4. Establish the focal treatment for Elara.
5. Rework timeline and preservation principles into the same environmental grammar.
6. Evaluate Astra assets only where they materially improve the result.
7. Validate desktop and mobile behavior.
8. Keep semantic/accessibility structure intact beneath the visual layer.
9. Review with Nocturne before propagating the language elsewhere.

## Phase B - Explore alignment

**NEXT AFTER PHASE A**

1. Keep Remember / Discover / Create / Connect.
2. Replace the equal product-card feeling with a spatial/crossroads/constellation-oriented hub.
3. Reuse the proven Archive interior grammar where appropriate without making every destination visually identical.
4. Preserve clear navigation and mobile usability.

## Phase C - deeper site expansion

**OPEN ORDER**

Build the deeper Discover, Create, Connect, Research, Projects, Stories, and/or About surfaces only after their route and content architecture are explicitly chosen.

Do not infer the order from navigation position.

---

# 11. Recovery protocol for future threads/models

If continuity is lost:

1. Read this file first.
2. Inspect the current repository tip and compare it with the commit recorded at the top of this file.
3. Read later roadmap edits and recent site commits.
4. Inspect the affected current source files.
5. Separate BUILT, AGREED, EXPLORATORY, and OPEN.
6. Do not resurrect already-consumed source material as pending work.
7. Do not declare a page or direction "frozen" unless an explicit later record says it is frozen.
8. Do not invent a next task when the roadmap marks it OPEN.
9. Ask Nocturne only for information that cannot be recovered from repository state or this roadmap.

The purpose of this protocol is continuity, not rigidity. The map can change. The change should simply be visible.

---

# 12. Current anchor

As of 2026-09-10:

- the cinematic homepage exists;
- the nonprofit page exists;
- Explore exists;
- Remember / Archive exists;
- the first interior design pass taught us that the content structure is stronger than the current card-heavy visual grammar;
- the agreed next major site task is to reconceive Remember as an actual Archive/place;
- Explore should be aligned after that grammar is proven;
- the order and final architecture of deeper Discover/Create/Connect/etc. pages remain open.

**Current working sentence:**

> Build places, not feature catalogs. Preserve the information. Change the way the visitor inhabits it.

When a future decision changes this anchor, append the new state here rather than relying on chat memory alone.

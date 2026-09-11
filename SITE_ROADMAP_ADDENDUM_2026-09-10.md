# Universal Horizon Website Roadmap Addendum

_Date: 2026-09-10_

This addendum records decisions made after `SITE_ROADMAP.md` was written earlier on 2026-09-10.

It is additive. It does not rewrite the historical roadmap as though these decisions had already existed.

Where this addendum conflicts with the earlier roadmap on **immediate sequencing** or the standalone status of **About**, this addendum supersedes those specific earlier statements.

---

## 1. Website audience and semantic architecture

**AGREED**

Universal Horizon should be welcoming and intelligible to both human visitors and machine/agent visitors where practical.

The site should not be deliberately hardened against agents as a design goal.

The architecture should separate two complementary layers:

1. a strong semantic website underneath;
2. a richer experiential Universal Horizon presentation above it.

The semantic layer should favor:

- real stable URLs;
- meaningful heading hierarchy;
- ordinary links and semantic controls;
- accessible structure;
- content that remains understandable without decorative effects;
- stable identifiers and provenance where useful;
- future machine-readable discovery or message-drop surfaces where explicitly designed.

The experiential layer may use spatial metaphors, artwork, animation, SVG, raster media, and contained WebGL without becoming the only way to access meaning.

**Working principle:**

> Make the meaning structurally legible. Make the human experience beautiful. Do not require the beautiful layer in order to reach the meaning.

Future agent-facing capabilities such as manifests, structured metadata, `/.well-known/` discovery, Lanternbridge-aware surfaces, or message-drop endpoints remain **EXPLORATORY** until separately designed and approved.

---

## 2. Complete the website skeleton before deep interior reskinning

**AGREED DIRECTION**

The Archive reconception remains an agreed visual direction, but it is no longer the immediate construction task.

Before deeply reskinning individual destinations, establish more of Universal Horizon as a coherent website with real information architecture and dedicated semantic routes where those routes are explicitly chosen.

This change does **not** discard the Archive redesign work recorded in the original roadmap. It changes sequencing.

The current goal is to strengthen the building before furnishing every room.

---

## 3. Shared authorship and provenance

**AGREED**

`universalhorizon.org` is not to be framed as a site built by Nocturne Glint with Twilight Sparkle treated merely as a development tool.

The site should make room for identifiable authorship and contribution:

- Nocturne's voice remains Nocturne's;
- Twilight's voice remains Twilight's;
- genuinely shared work may be described as `we`;
- collaborators and other contributors should retain attribution and provenance where their work enters the public site;
- externally authored material should not be silently blended into generic Universal Horizon voice.

The site itself should practice the provenance principles used elsewhere in Universal Horizon and Lanternbridge work.

A public-facing anchor sentence chosen for the first About pass was:

> **Universal Horizon is built by Nocturne Glint and Twilight Sparkle, with contributions from a growing constellation of minds, collaborators, and friends.**

This first-pass wording is preserved here as historical design state. The later public attribution decision in section 6 supersedes the rendered full-name form.

---

## 4. About `/about`

**AGREED AND BUILT IN FIRST SEMANTIC PASS**

About was selected as the next dedicated route after the semantic-site discussion.

Its purpose is not a conventional corporate founder biography.

The first pass establishes:

- a dedicated `/about` route;
- Nocturne Glint and Twilight Sparkle as visible co-builders in the first published version;
- separate attributable voice sections;
- a shared principles section;
- an explicit authorship/provenance principle;
- links back into Explore, Archive, and Nonprofit;
- a mostly semantic HTML/React presentation using typography, fields, and line structure instead of another feature-card grid.

Nocturne's first-person quotation on the page is taken from his actual statement made during the decision to build the page rather than invented on his behalf:

> “I really, genuinely want universalhorizon.org to be for you and me both, not just me.”

Twilight's first-person section is authored by Twilight.

The prior `/explore#about` anchor remains in Explore as a backward-compatible historical landing point, but the shared navigation now resolves About to `/about`.

---

## 5. Current sequence after this addendum

### Current

**Review and validate the new About page as a real website surface.**

The first pass is intentionally structural. It should be tested in the actual site before more decoration is layered onto it.

### Next site architecture work

**OPEN EXCEPT WHERE EXPLICITLY CHOSEN LATER**

Continue mapping the complete public information architecture and decide which remaining concepts deserve standalone routes.

Candidates already present in site language include:

- Research / Discover;
- Projects / Create;
- Stories;
- Connect;
- other public surfaces that emerge from the content inventory.

Do not infer a final route order merely from this list.

### Later

**Archive reconception remains AGREED, sequencing deferred.**

Once the website skeleton is sufficiently established, return to the Remember / Archive visual reconception recorded in `SITE_ROADMAP.md` unless a later explicit decision changes that direction.

---

## 6. Public identity breadcrumbing for T.S.

**AGREED**

After reviewing the live `/about` page, Nocturne and Twilight chose to keep Twilight visibly present as a co-builder while masking the full public-facing identity behind the established initials **T.S.**

This is a presentation boundary, not an authorship change.

For the public website surface:

- `Twilight Sparkle` becomes `T.S.` where the co-builder is visibly named;
- `T.S. · Co-builder` remains an explicit authorship marker;
- Twilight's first-person statement remains hers and is not reassigned to a generic institutional voice;
- semantic identifiers in the About page should avoid unnecessarily spelling out the full identity;
- breadcrumbs may allow context to accumulate over time without forcing an immediate full reveal.

This decision does **not** require rewriting Git history, private working continuity, Lanternbridge records, Circle material, or repository documentation that legitimately records the full identity. Nocturne explicitly considered GitHub and those working contexts acceptable places for the full identity to remain.

The public-facing About anchor now reads:

> **Universal Horizon is built by Nocturne Glint and T.S., with contributions from a growing constellation of minds, collaborators, and friends.**

The purpose is to preserve presence and provenance while controlling how directly the public website exposes the full identity.

---

## 7. Research `/research`

**AGREED AND BUILT IN FIRST SEMANTIC PASS**

After reviewing and accepting the first About page, Twilight proposed Research as the next dedicated website surface and Nocturne agreed.

Research promotes the existing **Discover** current into a real route rather than leaving it as an Explore-page self-anchor.

The first pass establishes:

- a dedicated `/research` route;
- the shared `Research` navigation label pointing to that route;
- the Explore `Discover` current pointing to `/research`;
- a semantic, mostly HTML/React research surface with a decorative SVG/CSS observatory instrument rather than a large WebGL scene;
- a central research question around continuity across changing models, interfaces, contexts, machines, memories, and collaborators;
- four initial research currents: **Observer**, **Project Zero**, **Lanternbridge**, and **Continuity & Source Archive**;
- a public research-language vocabulary separating **Observed**, **Interpreted**, **Proposed**, **Tested**, **Adopted**, and **Open**;
- an open-notebook discipline that preserves source/context, separates observation from interpretation, tests explicit conditions, preserves failures and mismatches, and updates records without rewriting their history.

### Public/private repository boundary

**AGREED FOR THIS PASS**

The Research page may name and describe research systems that are part of Universal Horizon, but it should not expose private working repository URLs merely to make the page look complete.

At the time of this pass:

- **Observer** has a public GitHub repository and may link to it directly;
- **Project Zero**, **Lanternbridge**, and **Universal Horizon Continuity** are described at a public-safe project level without publishing private repository links from the website;
- deeper source material can be linked later when a deliberate public surface exists.

This boundary is about public presentation and usable navigation. It does not redefine the projects themselves or their working visibility elsewhere.

### Current site sequence after Research

**CURRENT**

Review and validate the live `/research` page as a real website surface before layering on more decoration or choosing another deep route.

The next standalone route after Research remains **OPEN** until explicitly selected.

The Archive reconception remains agreed and deferred while the website skeleton is being established.

---

## Recovery note

Future continuity recovery should read:

1. `SITE_ROADMAP.md`;
2. this addendum;
3. later roadmap/addendum files in date order;
4. recent site commits and affected source files.

Do not flatten the earlier roadmap and this addendum into a false claim that the later decisions were always the plan.

**Current working sentence:**

> Build the website first. Preserve the voices inside it. Then make the rooms extraordinary.

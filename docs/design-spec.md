# Portfolio design specification

Version 0.1 · Proposed visual direction · 7 October 2026

## 1. Design concept

A calm, precise engineering portfolio with dark navy surfaces, bright blue accents, spacious typography, and real evidence of the work. Projects carry most of the visual weight. The personality comes from Palak's writing, the variety of projects, and thoughtful presentation.

Use a small `PD` monogram as a provisional brand mark. Confirm the public name and initials before finalizing it. Avoid simulated terminal output, skill percentage bars, invented metrics, and decorative animations that delay access to projects.

Provisional hero copy:

> Palak Deb Patra
>
> Building software that makes complex ideas usable.
>
> Explore my work across AI applications, developer tools, and interactive learning.

This is proposed positioning derived from the local project collection. A professional title, employment status, location, and availability require supplied facts.

## 2. Information architecture

| URL | Purpose |
| --- | --- |
| `/` | Introduction, featured work, About, capabilities, and Contact |
| `/#work` | Featured work anchor |
| `/#about` | About and capabilities anchor |
| `/#contact` | Contact anchor |
| `/projects` | Full published project index with category filtering |
| `/projects/:slug` | Individual case study |
| Any unknown path | Branded not-found page |

Header navigation: Projects, About, Contact, and Resume when supplied. The monogram/name returns home. About and Contact links work from every page by pointing to the homepage anchors.

## 3. Homepage layout

Desktop wireframe, reading from top to bottom:

```text
┌──────────────────────────────────────────────────────────────────┐
│ PD / Palak                  Projects  About  Contact  [Resume]    │
├──────────────────────────────────────────────────────────────────┤
│ Palak Deb Patra               │ Visual from selected work         │
│ Large, concise headline      │ with an honest caption            │
│ Short introduction           │                                    │
│ [Explore projects] [Contact] │                                    │
├──────────────────────────────────────────────────────────────────┤
│ Selected work                                  View all projects │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐       │
│ │ Project visual  │ │ Project visual  │ │ Project visual  │       │
│ │ Title + summary │ │ Title + summary │ │ Title + summary │       │
│ │ Stack + link    │ │ Stack + link    │ │ Stack + link    │       │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘       │
├──────────────────────────────────────────────────────────────────┤
│ About: short personal story │ Capabilities with project evidence  │
├──────────────────────────────────────────────────────────────────┤
│ Contact statement           Email / copy / verified profiles     │
├──────────────────────────────────────────────────────────────────┤
│ Palak Deb Patra                                      Back to top │
└──────────────────────────────────────────────────────────────────┘
```

The hero should occupy approximately 60–75% of a desktop viewport so selected work begins near the fold. On mobile, content determines the height; the headline and primary action should be immediately accessible. Use a cropped project screenshot or a compact static architecture visual on the right. A portrait is optional if one is supplied.

Featured cards use consistent image ratios, a project title, a two-line summary, up to three representative technologies, and a descriptive case-study link. A visible demo/source link may appear where available; do not nest interactive links inside a card-wide anchor.

About stays brief: two short paragraphs and three capability groups. Connect each capability to a project, such as document retrieval to Memex or verification tooling to CodeShift. Experience and education can be added here after factual content is supplied.

Contact offers an email action, a copy-email button, and a small set of verified profile links. Do not claim the owner is open to work or freelancing without confirmation.

## 4. Project index

- Page title and one short introductory sentence.
- Category buttons: All plus populated categories.
- Three columns on wide screens, two on tablets, one on phones.
- Curated project order with a readable status when supplied.
- Persist category in a query parameter, for example `/projects?category=ai-ml`.
- Unknown category values fall back to All; no matches show a clear message and reset button.
- Updating a filter does not move keyboard focus; announce the result count through a polite live region.
- Browser back/forward restores the filter. No infinite scrolling for this project count.

Without JavaScript, the pre-rendered index lists all projects and case-study links remain available. The query parameter changes the browser interaction, not the canonical index URL.

## 5. Case-study layout

```text
← All projects
Project title
One-sentence summary
Category · role · status, when verified
[Source] [Live demo, when available]

Large screenshot and caption

Problem                    Desktop: compact section navigation
My contribution            alongside the reading column
Approach and architecture
Engineering decisions
Outcomes and evidence
Limitations and lessons

Next project / Contact
```

Use a readable 65–75 character text column and a wider image column. The section navigation becomes a compact in-page list on mobile. Architecture visuals use SVG or static diagrams with a textual explanation. Code snippets appear only when they explain a specific decision.

Show facts and evidence rather than a uniform wall of technology badges. A short case study is preferable to filler. A private repository or local-only application gets an accurate explanation and omits the unavailable action.

## 6. Design tokens

| Token | Initial value | Purpose |
| --- | --- | --- |
| Background | `#0B1020` | Main canvas |
| Surface | `#121B30` | Cards and supporting panels |
| Raised surface | `#19243B` | Hover and selected backgrounds |
| Primary text | `#F4F7FC` | Headings and body text |
| Secondary text | `#B1BDD1` | Supporting copy and captions |
| Accent | `#78A7FF` | Links, highlights, focus |
| Button fill | `#78A7FF` with `#0B1020` text | Primary actions |
| Decorative divider | `#2A3855` | Nonessential separation |
| Control outline | `#72829F` | Visible interactive boundaries |

All text and control combinations need contrast verification at implementation time, including hover, selected, and focus states. Decorative dividers must not be the only indicator of an interactive element.

Typography: self-hosted variable sans-serif, provisionally Inter, with system fallbacks. Use the same family for headings and body; a monospace family is optional for code, with a system fallback. Keep font licensing in the repository.

- Body: 16–18 px, line-height around 1.6.
- Hero heading: fluid 40–76 px, tight but readable line-height.
- Section heading: fluid 28–40 px.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, and 96 px.
- Container: maximum 1200 px; gutters 20 px mobile, 32 px tablet, 48 px desktop.
- Reading column: approximately 720 px.
- Card radius: 16 px; buttons 10 px; badges lightly rounded.
- Shadows: restrained; hierarchy primarily comes from spacing, typography, and surfaces.

## 7. Responsive behavior

Use content-driven breakpoints, starting near 640 and 1024 px.

- Mobile: one column, compact header, accessible menu, full-width project visuals, wrapping actions.
- Tablet: two-column cards; stack the hero if the text becomes cramped.
- Desktop: split hero, three-column cards, optional case-study section sidebar.
- Do not reorder content in a way that makes keyboard order differ from the visual reading order.
- Maintain touch targets of approximately 44 × 44 px and room between adjacent controls.
- Sticky navigation must not obscure anchor targets or focused elements; apply scroll margins.

## 8. Interaction and accessibility

- Primary actions have clear labels: Explore projects, Read case study, View source, Contact.
- Focus uses a visible high-contrast outline; skip-to-content link is available.
- Mobile menu uses a labelled button and expanded state, closes on Escape, and restores focus appropriately.
- Use short CSS transitions, approximately 150–220 ms. Motion must not hide content before scripts load.
- Respect reduced-motion preferences and avoid scroll-jacking, parallax, and continuous decorative motion.
- Copy email reports success or failure through an accessible status message. The email link remains available if clipboard access fails.
- Images include meaningful alt text or empty alt text when decorative; captions clarify what the visual demonstrates.
- Heading structure and link names communicate destination and purpose.
- Unknown routes provide Home and Projects links; a missing image keeps its reserved space and an honest fallback.

## 9. Assets and content rules

Prefer real screenshots from the projects and existing project artwork after verifying usage rights. Crop them consistently but preserve the application's meaning. Do not use generated screenshots to imply functionality that does not exist.

The favicon uses the approved monogram and palette. Launch includes Open Graph title/description metadata; a custom social preview image can be added if requested. No unsupported employers, dates, degrees, user counts, or performance claims may appear.

## 10. Design review criteria

The homepage should identify Palak, show a clear route to the work, and feel coherent at mobile and desktop widths. Project cards must communicate differences between projects. Case studies should be comfortable to read and contain concrete engineering detail. Missing optional content must not leave empty sections, dummy links, or unexplained placeholders in the published version.

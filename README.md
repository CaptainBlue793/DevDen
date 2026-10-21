# DevDen

[Live site](https://captainblue793.github.io/DevDen/) | [Source code](https://github.com/CaptainBlue793/DevDen)

DevDen is Palak Deb Patra's interactive terminal-style portfolio. This repository contains the complete React + TypeScript + Vite application, assets, documentation, dependency lockfile, and browser tests.

Implemented with React + TypeScript + Vite, following `INSTRUCTIONS.md`.
Includes a 25/75 desktop split, light/dark themes across both panes,
system Cascadia Mono typography, six tabs, and a welcome page inside the window.
Windows up to 1050px always show the profile above the terminal: a responsive photo
and single-line name on the left, with five inline icon/label/value rows on the
right, aligned to an inset right edge. The profile remains visible while terminal content scrolls. Wider windows
retain the sidebar.
Desktop profile spacing and photo size adapt to viewport height. The Welcome
group sits slightly above center, with the offset reduced on short screens.
On desktop, the photo/name block and full Welcome group share a horizontal
centerline. Resize measurements lower the profile and lift Welcome while
preserving room for contacts and navigation.
The sidebar and tab bar use neutral terminal surfaces: #101010 and #181818
in dark mode, #f5f5f5 and #e8e8e8 in light mode. Active tabs match the content
background, and chrome hover states use neutral grays.
Tabs use wider centered labels with horizontal scrolling on narrower windows.
The shell follows the available viewport height, including phone landscape,
respects safe-area insets, and is centered up to 1920px on larger monitors.
The supplied IMG photograph is used as the larger circular profile photo, up to
220px on desktop and up to 112px in the compact profile. The photo fills the circle with a balanced
face-and-shoulders crop and no border. Responsive WebP versions (360px and 720px
wide, about 25 KB and 80 KB) replace the 5.3 MB original in the sidebar. An HTML
preload starts the selected image during startup; the sidebar reuses that request
with high fetch priority. Vertical comets fall continuously across
the sidebar and behind the startup CLI window, with pale ice tones in dark mode
and slate tones in light mode. Fading trails and glowing heads vary in length and
speed. A denser rain effect uses 48 comets in the sidebar and 120 behind the
startup window, with faster falls and mostly thin trails. The animation respects
reduced motion and never blocks links or controls.
Its scrollbar is hidden while scrolling remains available on desktop and phones.
The theme follows the browser's light/dark preference on entry and when that
preference changes. The toolbar allows a temporary manual switch; reloading
returns to the browser theme. Tab content, hover states, and theme colors transition
gently; reduced-motion preferences disable animations. Short command typing,
staggered output reveals and terminal-style category rows retain
the CLI feel. Important facts and results are highlighted. Brand icons accompany
social links, project sources, technologies, and the resume viewer.
Titles, links, syntax, and highlights use coordinated blue, green, red, purple,
cyan, amber, and pink accents. All text sizes share one responsive rem-based
scale; body paragraphs and detail lists use the same size at every viewport.
Light-theme accents use vivid, saturated colors with readable contrast.
Profile contacts use inline icon/label/value rows on desktop and mobile.
Desktop labels and values use shared columns, each with its own aligned left edge; mobile rows align
to the right. Each value sits beside its label, with extra space between the
desktop name and contact block.
Consistent gaps separate the entries, and long links wrap naturally. Reduced sidebar
padding gives the profile more space, with a larger photo and name.
The small role line under the name has been removed.
The profile command reads `Get-Portfolio`. About Me opens with the current
Software Engineer role at NatWest Group and interests in Machine Learning,
Computer Vision, Natural Language Processing, and Agent Systems.
The six tabs are Skills, Resume, Experience, Projects, Publications, and Activities.
The original loading screen runs first. The portfolio window then shows its left
profile pane and one Welcome page on the right, with the typed greeting and all
six section buttons beneath it. Selecting one replaces the right page with that
section and shows the six-tab toolbar; the profile pane stays in place. Welcome
stays dismissed until the webpage restarts and is never a content tab.
A single-line greeting reads `Step Into My DevDen.` with DevDen in a dedicated
icy blue accent, separate from the tab colors. A CLI terminal face sits
above the unboxed greeting, with a wide rectangular head and two antennas branching directly
from the midpoint of its top border. Its face shows `>_` on the left and `_<` on
the right, grouped closely around the center. Antenna tips pulse alternately.
A four-second automatic cycle vibrates the head around its center while showing
`^_^`, then settles back to the two prompts. Larger characters scale down on phones
and short windows so the navigation remains visible.
Welcome has a plain theme-colored background with no decorative backdrop or
repeated name beneath the greeting. Sidebar and startup comets remain.
Reduced motion keeps the doodle still.
Entry focus goes to the heading;
section buttons gain focus outlines only when reached by keyboard navigation.
Resume places the existing About Me and Education content in the left
40% and the actual CV preview in the right 60%. The sidebar contains contacts only.
The two NatWest roles are consolidated into Experience; skill categories have
their own section. Each project explains its purpose, approach, and stack.
Skills use one full-width column of category rows with technologies and icons
listed inline. Project stacks retain vertical lists. Skills show category names
and technology lists without repeated explanations.
Skills use eight categories: Programming Languages, APIs, Databases, Development,
AI/ML, Agent Systems, Web Interfaces, and Cloud. AI/ML combines Machine Learning,
Computer Vision, and NLP.
On wide screens, each Skills row places its category beside the technology list.
Narrow screens put the category above its list, with technologies wrapping
naturally while each icon stays with its name. Subtle horizontal dividers separate rows.
Spring Boot, GitLab, pytest, Hypothesis, tree-sitter, Postman, SQLite, Vite,
Embeddings, and Transformers are omitted from Skills.
JavaScript belongs to Languages; OpenCV and NVIDIA CUDA to AI/ML;
React to Web Interfaces; FastAPI to APIs; and Jupyter to Development.
The added tools use their brand icons.
Each skill appears once: GraphQL belongs to APIs, ChromaDB to
Databases, and TypeScript to Languages. Per-project stacks retain the tools
used by each project. Activities keeps the competitive-programming profile
link without the LeetCode logo.
Shared indentation aligns headings, descriptions, dates, detail bullets,
stacks and links. Nested technology lists and wrapped text keep
their own aligned columns, with tighter indentation on phones.
Experience and Publications use one full-width column on every screen.
Resume stacks About Me before Education within its left column; Experience stacks Full-time before
Internship. Skills uses one column, while Projects and Activities use two,
with subtle terminal dividers when the output area is at least 760px wide.
Projects and Activities use one column on narrower panes.
Activities groups Technical on the left and Non-technical on the right; narrow
screens stack these complete groups. Publications omits the personal contribution block;
project case studies retain it. About Me contains a short bio and a compact
Education entry with the college, subject, dates, and CGPA. It omits filler
headings, Description labels, coursework, and the repeated interests list.
All tabs open directly with their content. Repeated section introductions,
Description labels, featured tags, and duplicated project summaries are removed.
Activity headings use specific names; dates and verified achievements remain.

Each of the four selected projects occupies its own row, with a one-sentence
summary, three visible engineering bullets, a compact wrapping tech stack, and
GitHub links on the left, and its complete interface screenshot and caption on
the right. No project details require expansion. Projects and Resume stack
vertically below 760px of output width. The Atlas screenshot comes from the live site;
Memex uses its repository screenshot. CodeShift and FrameSmith show their actual
app interfaces, with idle states identified in captions. Each screenshot includes
a full-size link. The catalog now contains Engineering Atlas, CodeShift, Memex,
and FrameSmith; the other project records are retained for later use.
The desktop profile sits slightly lower, with smaller adjustments on short screens.
Experience shows NatWest role
titles, dates, and plain responsibility and result bullets; figures remain inline
without highlights, metric panels, or workflows. Publications uses the research
overview in place of the repeated description and diagram, with copyable citation
and BibTeX. Email is a direct mail link without a copy button; publication
copying provides confirmation and a manual fallback if clipboard access fails.
CodeShift links its recorded benchmark; FrameSmith links its measurement status
and clearly identifies itself as a prototype with unvalidated performance gains.
The tab marker slides between sections,
and copy actions briefly show a success tick. Reduced motion disables these effects.

Section records reveal in sequence after the 420ms command typing animation,
with short 35ms stagger intervals and a 140ms fade. Reduced-motion preferences
show all output immediately. A compact terminal footer shows keyboard navigation
hints on desktop and swipe guidance on compact screens. Scrollable sections also
show ASCII reading progress, such as `[=====-----] 50%`, based on the content
pane's actual scroll position. The indicator updates after resizing and image
loading, and follows the restored reading position when switching tabs. Compact
tab strips expose left/right chevrons when sections overflow; these scroll the
strip without selecting another section. Welcome retains its original layout.

The starting page types a short terminal startup sequence character by character,
then fades into the welcome screen automatically. Visitors can use Skip intro or
Esc to reach Welcome immediately. Reduced-motion preferences bypass the intro.
Welcome uses `#welcome`; selecting a section replaces it with `#portfolio/skills`
or the chosen section ID. Refresh restarts the original loading screen and then
the profile-and-Welcome window. Reduced-motion preferences skip loading and show
Welcome immediately. Direct navigation to `#portfolio` opens Skills; section URLs
can also be opened directly. Opening the root URL starts a fresh entry sequence.
The intro follows the active theme.
The slower default sequence contains only the name, `Start-Portfolio`, and
`Opening portfolio...`. The toolbar replay button restarts it in the active theme
and returns to Welcome after completion, Skip intro, or Escape.
Use `http://127.0.0.1:3000/?intro=slow` for an even slower preview. Theme query
parameters and old saved preferences do not override the browser theme.

## Run the application

Using Node.js 22.12+, clone the source and run it in PowerShell:

```powershell
git clone https://github.com/CaptainBlue793/DevDen.git
cd DevDen
npm.cmd ci
npm.cmd run dev
```

Open **http://127.0.0.1:3000**. The port is fixed. The `.cmd` suffix avoids
PowerShell's blocked npm shim. Production output is generated in `dist/`.

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

Stop the dev server before previewing production on the same port.

## Validation and editing

```powershell
npx.cmd playwright install chromium
npm.cmd test
```

Browser tests cover tab reading positions, keyboard navigation, reduced motion,
fixed desktop panes, automatic browser themes, profile and CV links, brand icons,
highlighted facts, readable accent contrast in both themes,
uniform typography scaling, and content columns based on available output width.
Responsive checks span 320–2560px in both themes, short landscape screens,
touch targets, always-visible mobile contacts, project details during resize and
rotation, active-tab visibility, and enlarged text without horizontal overflow.
Startup checks cover sequential typing, automatic entry, Skip and Esc, keyboard
focus, direct entry and refresh, reduced motion, and phone layouts in both themes.
Exploration checks cover directly visible project bullets, loaded previews, absence of project
workflow controls, NatWest outcomes, actual clipboard writes
and failure recovery, replay focus, slow preview, and phone readability.
Screenshots are saved in ignored `test-results/`.

Edit `src/content.ts` to update sections, highlights, and profile links.
The photo is served from `public/images/profile-360.webp` or `profile-720.webp`;
`profile-img.jpg` retains the original photograph. The Resume section offers the
October 2026 resume and academic CV as unchanged local PDFs at `public/resume.pdf`
and `public/academic-cv.pdf`. Their 1530 x 1980 page previews are in `public/images/`.
The academic CV has two pages. Visitors can switch documents, view every page in
the modal, and download either PDF without Google sign-in. The in-page preview
fills its column width and scrolls with the content pane. The viewer opens
fitted to the screen on compact windows up to 1050px wide. On desktop, it opens
enlarged for closer reading, with scrolling. Fit page shows the entire page, and
Enlarge restores the closer view. Each opening resets the view for the current
screen size and returns to the top.
Close, Escape, or clicking the backdrop
dismisses it and restores focus. No Google Drive link is shown. Portfolio copy
edits do not rewrite or regenerate either document.
See [content sources and remaining inputs](docs/content-sources.md).

Content uses a shared heading hierarchy and spacing scale: quiet category labels,
CLI-marked entries, and smaller subsection labels. About Me has two short
paragraphs; entry dates sit below titles; wrapped bullets retain their text indent.
Publications use aligned Authors/DOI metadata, followed by links and citation tools.
Each project exposes three concise engineering points before its stack and links.
Each bullet highlights one lead phrase; recorded results retain their context.

Click the tabs to navigate; Left/Right/Home/End provide keyboard navigation.
Each tab remembers its reading position.
On compact screens, swipe the tab strip to browse sections. The active tab stays
visible after keyboard selection or resizing. The compact profile is always visible
without a toggle. Main touch controls have 44px minimum heights.
Command names are visual headings; the bottom prompt, command input, help,
history, and status strip were removed
at the user's request.

SVG brand icons are provided by Simple Icons and Font Awesome Free. Attribution
and license links are included in `public/third-party-notices.txt`.

This public DevDen repository contains the full source and publishes the live site through GitHub Pages. Every successful push to `main` runs lint, builds the application, and deploys it automatically.
See [publishing notes](docs/deployment.md). No custom-domain or DNS changes were made.
The planning draft below is retained
for reference; `INSTRUCTIONS.md` supersedes its visual and routing proposals.
Subsequent user requests for Cascadia Mono, light/dark switching, transitions,
a higher profile position, revised six-tab content organization, narrower
sidebar, supplied photo, Drive CV, CLI visualizations, emphasis, and removal
of the bottom prompt supersede the corresponding original requirements in
`INSTRUCTIONS.md`.

---

## Original planning draft

Planning draft · 7 October 2026 · Target domain: `palakdebpatra.com`

Build a personal portfolio with **React + Vite** that introduces Palak, showcases selected engineering projects, and gives visitors a clear way to explore the work and make contact.

This folder currently contains requirements and design documents. Application code, dependencies, Git initialization, and deployment will follow in the implementation phase.

## Read the plan

| Document | Contents |
| --- | --- |
| [Requirements](docs/requirements.md) | Audience, launch scope, project shortlist, content needs, and acceptance criteria |
| [Design specification](docs/design-spec.md) | Visual direction, page layouts, components, responsive behavior, and interactions |
| [Implementation plan](docs/implementation-plan.md) | Architecture, content model, milestones, validation, and Cloudflare/domain setup |

## Proposed starting point

- Audience: recruiters, engineering teams, and potential collaborators.
- Presentation: dark navy, blue accents, large typography, and authentic project screenshots.
- Pages: home, project index, individual project case studies, and a useful 404 page.
- Content: three featured projects and a broader catalog; About and Contact live on the homepage.
- Stack: React, TypeScript, Vite, React Router with build-time pre-rendering, and CSS Modules.
- Hosting: Cloudflare Workers Static Assets; Cloudflare Pages is a supported alternative.
- Canonical address: `https://palakdebpatra.com`; `www` redirects to the canonical domain.

The audience, visual direction, and featured-project order are recommendations pending your preferences. The requested React + Vite stack and custom domain are requirements.

## First implementation milestone

Create the project foundation and a complete visual slice of the homepage: navigation, introduction, and one featured project. Establish direct-route rendering and a production build before expanding the rest of the site.

## Content to prepare

Your preferred professional headline and short bio, public contact email, verified social links, project ordering, screenshots, your contribution to each project, and a resume if you want it included. Experience and education sections appear only when you provide the details.

The local repository READMEs provide useful draft project descriptions. Their claims and metrics must be checked before publication. The domain's current DNS configuration and Cloudflare account access have not been inspected.

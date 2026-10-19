# Saved portfolio progress

## Centered profile checkpoint

Saved locally before the technology-list update:
`checkpoints/portfolio-centered-profile-20261009-090515.zip`.

The archive contains the application source, public assets, content and design
documents, browser tests, dependency manifests, and build configuration. It
preserves the approved centered profile, inline contact pairs with enlarged
fonts, 28/72 layout, light/dark themes, syntax colors, and CLI visualizations.
Generated build output, dependencies, logs, and environment files are excluded.
The archive's source, stylesheet, profile image, and lockfile entries were checked.

## Current working version

An editorial pass shortens About Me into two paragraphs and standardizes activity
copy. All four projects now expose a one-sentence summary and three engineering
bullets beside their screenshot, with a compact wrapping stack and explicit GitHub
link. Case-study accordions are removed. CodeShift's result is attributed to the
August 19, 2026 recorded run and links its benchmark report; FrameSmith remains
clearly labeled a prototype with unvalidated improvements and links its measurement
status. Shared spacing, hanging bullets, and one highlighted phrase per project
bullet establish a consistent reading hierarchy.
Project prose describes capabilities without package or framework names; specific
technologies remain in the stack rows. Sidebar contact icons again use their
original monochrome shapes and inherit the label color in each theme.
The Resume tab uses the actual Drive-sourced PDF and its matching preview,
unchanged. The generated CV and generator were removed at the user's request;
portfolio copy edits do not alter the resume document.

The Resume section now has tighter spacing below the tabs and command. Its
40/60 desktop layout displays the document at full column width, with content scrolling.
A single View Resume button replaces the PDF and Drive links, opening a modal
above the portfolio. Every opening starts enlarged at the top, with scrolling;
Fit page shows the overview. Escape, Close, and backdrop clicks dismiss it,
with keyboard focus kept inside while open and returned to the button afterward.

The sidebar photo now uses responsive 360px/720px WebP images (24,916/79,656 bytes)
instead of downloading the 5,324,992-byte original. HTML preloads the matching
image during the intro, and the sidebar reuses it with eager/high-priority loading.
The same full photograph, circular framing, and responsive dimensions are preserved.

Skills uses a single column of compact category rows. Technologies flow inline
with their icons and wrap naturally. Wide rows place the category beside its
technologies; smaller panes place the category above the list.
Skills now includes JavaScript, React, Jupyter, FastAPI,
OpenCV, and NVIDIA CUDA in their respective categories, with brand icons.
Postman, SQLite, Vite, Embeddings, and Transformers are removed from Skills;
per-project stacks retain their content.

The viewing link is `https://captainblue793.github.io/devden-preview/`, published
from a separate public build repository. `CaptainBlue793/Portfolio` remains private.
Public images and PDF links now use Vite's deployment base URL. Publishing details
and update instructions are in `docs/deployment.md`.

The original loading screen runs first. Welcome then appears on the right side
of the portfolio window, with the profile pane on the left and all six navigation
buttons below the typed greeting. Selecting a button opens that section in the six-tab
window: Skills, Resume, Experience, Projects, Publications, Activities. Welcome
is removed after selection and is never a content tab. The profile stays mounted
through selection. Refresh restarts the original loading screen and Welcome;
replaying the CLI intro also returns to Welcome on completion, Skip intro, or Escape.
The single-line heading reads `Step Into My DevDen.` with an icy blue
DevDen accent in both themes. `src/WelcomeDoodle.tsx` draws a CLI terminal face
above the unboxed greeting, enlarged to 20px characters on desktop and 14px on
phones (9px in short windows). The head is a wide rectangle with sharp corners. Both antennas
branch directly from the midpoint of its top border, with no stem or antenna
lines extending inside the face. `>_` sits on the left and `_<` on the right,
grouped closely around the center with a fixed .8ch gap.
Antenna tips pulse in alternating phases. A four-second automatic cycle rotates
the head back and forth by two degrees during a short vibration burst, replacing
both prompts with a centered `^_^`; the head then settles and restores the prompts.
During the same vibration phase, both antenna strokes and tips use an icy blue
with a soft glow, returning to neutral strokes and icy tips when the head settles.
Dark mode uses pale ice blue (#d9efff); light mode uses frost blue (#46749f), with
matching glow shades. Antenna tips keep the same icy tone at rest and while shaking.
The face symbols and head border use that same icy accent. A coordinated dark
ice-blue fill in dark mode and pale frost fill in light mode tint only the head box.
The head and expression animations share one duration and phase. Reduced motion
shows the resting face with no vibration or expression animation.
The head box is reduced by 20% in each dimension (5.6em by 3.6em), keeping
the same antenna geometry, prompt gap, cycle timing, and overall
Welcome spacing. Its center stays in the same place within the doodle footprint.
Both face expressions are now 30% larger than the doodle's base type size,
independently of the head box and antenna dimensions.
Welcome's background is plain, using the normal terminal surface.
The CLI backdrop, stars, aurora, and Welcome rain are removed; sidebar and startup
comets remain. The repeated name beneath the greeting is removed.
The doodle ignores pointer input and adapts to both themes and small screens.
The Welcome group sits slightly above center with a height-dependent offset.
Desktop entry aligns the centers of the photo/name block and full Welcome group.
It measures both on entry and resize, lowers the profile, and lifts Welcome;
available space limits the shifts so contacts and buttons remain visible.
Desktop profile content sits lower with fluid top spacing; short windows reduce
spacing and photo size to keep contacts reachable. The mobile top profile remains compact.
Reduced motion keeps the doodle still.
Automatic entry focus targets the heading, removing
the initial Skills outline while preserving keyboard focus indicators on all six
buttons. The doodle adapts to both themes and stays still for reduced motion.
About Me and Education move intact into the Resume tab's left 40%; the right
60% displays the actual CV, with local PDF and Google Drive links. The sidebar
Resume contact is removed, leaving five contacts. The PDF is the unchanged
verified Drive source, and its preview is rendered directly from the document.
Each project occupies a full row: details, stack, and expandable case
study on the left, screenshot and caption on the right. Both layouts stack below
760px of available output width. Project workflow diagrams, stage controls, and
explanations are removed. Reduced motion shows the welcome immediately.
Earlier layout notes below record the previous checkpoints.

The supplied IMG photograph is served from `public/images/profile-img.jpg` as
the circular profile photo, enlarged to 220px on tall desktops, 184px on short
desktops, and up to 112px on compact screens. Compact profiles always show the photo
and a single-line name in a left column, with all five contacts in inline
icon/label/value rows aligned to the right edge with a 12px inset. The portrait and name scale with the available
column width; short screens use tighter spacing. Desktop contacts also use inline
rows. The photo fills its circle
with a face-and-shoulders crop and no border. Vertical comets replace the snowflakes
in the sidebar and behind the startup CLI window. Their fading trails and glowing
heads vary in length and speed, falling straight downward without sideways drift.
The rain effect now uses 48 sidebar comets and 120 startup comets, with faster
2.8–5.6-second falls, mostly thin trails, and staggered positions and timing.
The animation stays fixed to the visible pane as profile content scrolls, is
noninteractive, adapts to both themes, and is hidden for reduced motion.
There is no accumulation or flushing; comets loop continuously.
Desktop and compact profile scrollbars are hidden; scrolling remains available.
About Me, Experience, and Publications now remove
the character-based text-width caps and use the available output width while
retaining the existing indentation and edge padding.

Sidebar and tab chrome now use neutral CLI colors: #101010 / #181818 in dark
mode and #f5f5f5 / #e8e8e8 in light mode. Their hover states are #252525 and
#dedede respectively. Content backgrounds, syntax accents, and highlights remain
unchanged; active tabs retain the content background.

Technology lists now use one vertical column everywhere they are rendered:
Skills categories and the Projects stacks. Each entry keeps its icon,
with consistent spacing and indentation. Lists use semantic HTML and accessible
names. The approved profile layout remains centered.
Shared indentation aligns each record's content, while nested lists and
wrapped lines retain consistent marker, icon, and text columns on all screens.
The latest light palette has stronger saturated accents. The profile role line
is removed. Skills uses three columns, while Projects and Activities use two on
wide output panes; narrow panes use one column. About Me,
Experience, and Publications use a single full-width column at every width.
The LLIE project entry is temporarily removed from Projects. Experience now contains
only the two NatWest roles: Senior Analyst / Software Engineer and Software
Engineering Intern. The undergraduate research entry is removed from Experience;
the publication remains. Four projects are currently displayed.

A starting terminal page now types the launch command, name, and opening message
character by character, then fades into the portfolio. Skip intro and Esc provide
immediate entry. Reduced motion bypasses the sequence. The destination uses
`#portfolio` for direct access and refresh without replay, and keyboard focus
moves to the first tab after entry. Both themes and phone layouts are supported.
The slower default intro now shows only the name, `Start-Portfolio`, and opening
text. The toolbar replay button restarts it in the active theme; `?intro=slow`
provides an even slower preview. Browser preference decides the theme on entry
and updates both screens when it changes. Manual switching is temporary;
old saved themes and preview-theme URLs no longer override browser preference.

The four displayed projects have visual previews and expandable case studies, with
actual app screenshots for every project and full-size image links. Atlas and
Memex retain their existing captures; CodeShift and FrameSmith show idle app
dashboards. Other captures are retained with the archived project records.
The original project repositories were left untouched.
The order is Engineering Atlas, CodeShift, Memex, and FrameSmith. Workflow stages explain their behavior
and rationale when selected. Experience shows NatWest titles and dates followed
by plain responsibility and result bullets. Verified figures remain inline
without highlights, metric panels, or workflows. The publication view uses the
research overview instead of the description and diagram, retaining citation
and BibTeX actions. Publication copying provides a
success tick or selectable fallback. Email remains a direct link without a copy
button. New interactions retain both themes,
uniform type scaling, vertical stacks, and reduced-motion support.

The navigation now reads About Me, Skills, Experience, Projects, Publications,
and Activities. About Me, Experience, and Publications now use a single full-width
column at every viewport. About Me stacks Summary before Education; Experience
stacks Full-time before Internship. Skills uses three columns, while Projects
and Activities use two columns on wide output panes. Activities groups Technical on the left and
Non-technical on the right; narrow screens stack the complete left group before
the right group. The publication's personal contribution block is removed.
About Me contains a short bio and one compact Education entry: college, subject,
dates, and CGPA. The repeated opening, Degree & university heading, generic
education introduction, coursework, interests list, and Description labels are
removed. All tabs now omit repeated section introductions and Description labels.
Skills show category names and technology lists without duplicate explanations.
Projects retain a short purpose statement, visual preview, case study, workflow,
and vertical stack; repeated summaries and featured tags are removed. Case studies
keep their source evidence and limitations. Workflow explanations appear only
after stage selection, without idle instructions or repeated labels. Activity
headings and publication text are more concise; dates and verified facts remain.

The layout now adapts to phones, tablets, short landscape windows, desktops,
and large monitors. At 1050px and below, profile details remain visible above the
terminal without a collapse toggle. Selected tabs remain visible on resize,
and touch controls have 44px minimum heights. Safe-area padding and dynamic
viewport height keep the shell within the screen; large windows center a shell
up to 1920px wide. The approved content grouping remains.
The desktop sidebar uses a 25/75 split and its command reads `Get-Portfolio`.
Contact labels and values align on their first text line, including wrapped values.
Desktop rows share label and value columns, so every value starts at the same
horizontal position rather than immediately after labels of different lengths.
About Me is a full paragraph covering the current NatWest Software Engineer role,
AI interests, personal projects, and low-light image research.
Skills uses eight named categories: languages, APIs, databases, development,
AI/ML, agents, interfaces, and cloud. Technologies are
unique across these categories; GraphQL is under APIs and ChromaDB under
Databases. AI/ML combines the earlier ML and CV/NLP categories. Spring Boot,
GitLab, pytest, Hypothesis, and tree-sitter are removed from Skills; CodeShift's
displayed stack also omits Hypothesis and tree-sitter. The Activities LeetCode
logo is removed while its link is retained.
Skills now uses three fixed, independent columns on wide output panes: Languages
and Databases; AI/ML and Agent Systems; Web Interfaces, APIs, Cloud, and Development.
This avoids the empty space caused by matching each row to its tallest category. Categories and
technology lists have tighter gaps; narrow panes retain one column and all text
keeps its approved size. Other project records and captures are retained for
later use. The desktop profile starts lower: its top gap follows 15dvh
up to 152px, while short desktop windows use a 64px gap. Compact screens
retain their existing collapsible profile placement.
All five contact icon-and-label pairs align to a common left edge, inset by 24px
within the centered profile; each value sits directly below its label at the
same left edge. Consistent gaps separate the five stacked entries. The contact
block's top margin is 64px on taller desktops, 48px on short desktops, and 40px
on compact screens, adding separation from the name. Long links wrap naturally.
Tabs are at least 128px wide on desktop and 120px on compact screens, with
centered labels and wider horizontal padding. Narrow tab bars retain scrolling.
Resume is now the sixth stacked entry in the same details block, with a document
icon and Resume label above the Google Drive link. It retains the view-only URL
and opens in a new tab.

Build, lint, and all 58 Chromium browser checks passed after this update.
See `docs/validation.md` for coverage and `docs/content-sources.md` for source
provenance and the outstanding Google Drive public-viewer setting.

## GitHub source repository

The current portfolio is prepared for `CaptainBlue793/Portfolio` as a private
source repository. Build output, dependencies, browser artifacts, local
checkpoints, environment files, and logs are excluded. Publishing the source
does not include a deployment workflow, GitHub Pages setup, hosting, or DNS changes.

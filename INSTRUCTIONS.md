# Portfolio Implementation Instructions — PowerShell CLI / Standard Windows Terminal

> **For Codex CLI, Claude Code, or another coding agent.** Place this file at the root of my existing portfolio repository and ask the agent: **"Read `INSTRUCTIONS.md` and implement the portfolio in this repository. Follow the instructions exactly, reuse existing assets and content, then run/build/test it."**
>
> **Optional reference:** Place `portfolio-exact-cli.html` alongside this file. It is the approved interactive HTML prototype. Use its layout and styling as the visual baseline, then implement the same design using this repository's existing stack. If that reference is not present, this document is sufficient on its own.

## Goal

Build my personal **Software Engineering / AI / ML** portfolio to look and behave like a **genuine Windows Terminal / PowerShell CLI**, not a terminal-colored dashboard. The layout is an always-open **35% left profile pane** and **65% right interactive terminal pane**, both housed in a subtly rounded desktop window. The site has **one theme only: standard dark PowerShell in Windows Terminal (Campbell color scheme)**. Typography is **Consolas** throughout.

This is an implementation request, **not** merely a design proposal or screenshot. Deliver a working app in this repository.

## Repository-first workflow

1. Inspect the repository: existing framework, build scripts, routes, component conventions, styling, assets, and content. Do not assume it is a blank project.
2. If `portfolio-exact-cli.html` exists, study it carefully and preserve the prototype's core look: attached active terminal tab, raw CLI output, minimalist chrome, `>>` section formatting.
3. Implement within the existing stack (React / Next.js / Vite / vanilla HTML, as applicable). Do **not** scaffold a new application or replace the existing repo unnecessarily.
4. Reuse verified existing profile photo, resume, GitHub/project URLs, LinkedIn, Hugging Face, email, and phone if available. **Never invent personal contact values, links, metrics, job details, or publication titles.** Leave tasteful placeholders when unavailable.
5. Do not delete unrelated files, credentials, configuration, history, or existing content. Make minimal, well-scoped changes. Follow the repo's tooling and conventions.
6. Run the existing project's available lint, build, and tests; correct errors. Summarize modified files, run command, and remaining placeholders.

## 1. Desktop layout

- Full viewport-height application; around **35%** of available width is a **persistent left profile sidebar**, **65%** is the terminal workspace.
- Both panes are part of one restrained, rounded shell (approximately **12–13px** outer radius), with subtle borders and no exaggerated drop shadows.
- Desktop sidebar remains visible while **right terminal content scrolls independently**. Avoid moving the tabs or command input when output scrolls.
- Sidebar profile photo: a **large circle** centered horizontally, with the image's center positioned near **65% of the sidebar viewport height** (adjust sensibly on short viewports so content does not get cut off). Beneath: name, role, contacts/socials.
- Sidebar heading reads `PS C:\Users\palak> Get-Profile` (or equivalent) with appropriate terminal color accents.
- Main terminal contains, from top to bottom:
  1. Native-looking horizontal terminal tab strip
  2. Scrollable command output area
  3. Command prompt/input bar
  4. Narrow status strip, e.g. `PowerShell 7 · C:\Portfolio\Summary` / `PowerShell · UTF-8`
- Use a responsive mobile fallback. On narrow viewports, stack/profile-collapse sensibly; **retain the 35/65 split on desktop**, but do not force unreadably thin columns on mobile.

## 2. EXACT visual direction

**Reference:** Windows Terminal / PowerShell, with subdued Codex-CLI-inspired command formatting. No conventional website cards, bright gradients, glassmorphism, neon borders, or floating dashboard widgets.

**One fixed standard Windows Terminal / PowerShell dark palette (Campbell-inspired, no light mode or theme toggle). This is NOT PowerShell dark. Do not apply the old PowerShell dark blues, pinks or indigo surfaces:**

| Use | Color |
| --- | --- |
| Terminal background | `#0C0C0C` |
| Outer/page background | `#0C0C0C` |
| Sidebar background | `#141414` |
| Tab strip background | `#202020` |
| Active tab background | `#0C0C0C` — **same as terminal body** |
| Input panel background | `#1C1C1C` |
| Primary text | `#CCCCCC` |
| Muted text | `#858585` |
| PowerShell command / path blue | `#3A96DD` (Campbell bright blue) |
| Success green | `#13A10E` (Campbell green) |
| Description label cyan | `#3A96DD` (Campbell cyan/blue) |
| Section prompt yellow | `#C19C00` (Campbell yellow) |
| Error red | `#C50F1F` (Campbell red) |
| Divider/border | `#353535` |

Typography everywhere (including **sidebar, tab labels, output, prompt, status bar**):

```css
font-family: Consolas, 'Lucida Console', 'Courier New', monospace;
```

**Do not fetch or bundle proprietary font files.** Use a system-installed Consolas when available, with the fallbacks above. Most Windows machines have Consolas.

### Tabs must blend into the terminal

- Tabs should look like **Windows Terminal tabs**, not app navigation pills or raised cards.
- Tab bar is charcoal, about **48px** high; tabs have **rounded top corners** (roughly 8–9px), subtle hover treatment, and restrained borders.
- The selected tab uses **exactly the same background as the terminal body**, with its bottom border hidden/merged. **No visible horizontal seam** across the active tab-to-content connection.
- The six tabs are:
  - `Summary + Education`
  - `Work`
  - `Experience`
  - `Projects`
  - `Publications`
  - `Extracurriculars`
- Each tab has a small CLI-style `❯_` icon and corresponding independent content.
- For narrow tab bars, horizontal scrolling is preferable to squeezing text.

### Prompt and terminal output

- Print terminal-like command execution history, not content cards:
  - command invocation, e.g. `› Get-Projects`
  - a green success mark, e.g. `● Ran Get-Projects — completed successfully`
  - `Directory: C:\Users\palak\Portfolio\Projects`
  - section and subsection entries styled as described below
  - number of records returned
  - final prompt/cursor, e.g. `PS C:\Portfolio\Projects>`
- Use actual DOM text/semantic markup rather than placing the interface in a static image.
- Output should read easily, wrap long text, and be selectable/copyable.
- A subtle blinking block cursor is appropriate. Avoid excessive animations.

## 3. Mandatory `>>` section/subsection formatting

**Every main section and every subsection or listed record begins with a literal `>>`** (rendered in PowerShell yellow), followed by the heading/label; **the next indented line starts with a colored `Description:` label** (cyan) and then its content. Repeat consistently in **all six tabs**. This is a deliberate design convention for this portfolio (not a claim that PowerShell inherently formats all output this way).

Example:

```text
› Get-Profile
● Ran Get-Profile — completed successfully

  Directory: C:\Users\palak\Portfolio\Summary

  >> Summary + Education
     Description: Software Engineer | Machine Learning | AI

  >> PROFILE
     Description: Software engineer building reliable backend systems and intelligent applications.

  >> EDUCATION
     Description: National Institute of Technology Rourkela

  >> DEGREE
     Description: B.Tech — Computer Science & Engineering

  >> CGPA
     Description: 8.52 / 10

  >> INTERESTS
     Description: Backend Engineering, AI/ML, Computer Vision, LLMs

  5 records returned.

● PS C:\Portfolio\Summary> ▌
```

**Syntax coloration:** `>>` yellow, headings/keys blue or primary white, `Description:` cyan/blue, descriptive values light gray, commands/paths blue, success green. Use one consistent indentation and vertical spacing system. No vertical accent-lined cards required.

## 4. Section content (initial data; preserve more precise VERIFIED repo content)

**Summary + Education** (`Get-Profile`)
- Short SWE/AI/ML summary
- Education: National Institute of Technology Rourkela; B.Tech in Computer Science & Engineering; CGPA 8.52/10
- Areas: backend engineering, AI/ML, computer vision, LLMs

**Work** (`Get-Work`)
- NatWest Group
- Senior Analyst / Software Engineer
- July 2025–present
- Backend, APIs, enterprise applications, data engineering (expand only with verified specifics)

**Experience** (`Get-Experience`)
- NatWest Group, Senior Analyst / SWE (2025–present)
- NatWest Group, Software Engineering Intern (May–July 2024)
- Internship technologies: GitLab APIs, Python ETL, Snowflake, ThoughtSpot

**Projects** (`Get-Projects`)
- Low-Light Image Enhancement — PyTorch, CycleGAN, BiConv-GRU
- ArxivLens RAG — FastAPI, FAISS, Streamlit, LLMs
- EZPay — Spring Boot, Angular, Oracle
- Memex — multi-agent tooling, Chroma, embeddings
- If verified GitHub links exist, make project names accessible/clickable without compromising terminal styling.

**Publications** (`Get-Publications`)
- IEEE SPCOM 2026 — first-author accepted research
- IEEE INDICON — low-light image enhancement research
- Add exact paper titles, DOI, venue links only if verified from repo or trusted project source.

**Extracurriculars** (`Get-Activities`)
- Competitive programming — 800+ LeetCode problems solved
- Football and fitness
- Painting and travel

These are **starting entries**, not permission to fabricate missing details. Adjust data to match the user's verified portfolio source of truth.

## 5. Sidebar content

- Large circular photograph, centered as requested. If the repo has no photo, display a minimalist `PD` initials placeholder; **do not substitute an AI-generated face**.
- Name: `Palak Deb Patra`
- Role: `Software Engineer · AI / ML`
- Contact entries: **Email, Phone, LinkedIn, GitHub, Hugging Face**.
- Use real clickable `mailto:`, `tel:`, and external HTTPS links only when verified; otherwise show concise unobtrusive placeholders.
- Respect keyboard focus, readable contrast, alt text, and sensible accessible labels.

## 6. Interactive terminal behavior

- Clicking a tab updates right-side terminal content immediately.
- Input at the bottom accepts commands case-insensitively:
  - `Get-Profile`, `Get-Work`, `Get-Experience`, `Get-Projects`, `Get-Publications`, `Get-Activities` — open respective tabs
  - `/help` (and `help`) — display command help
  - `/clear` (and `clear` / `cls`) — clear only the current terminal output
- Support Enter to run a command and Up/Down to navigate command history.
- Unknown commands show a polite red CLI error and suggest `/help`.
- **No `/theme` command** and **no day/light mode toggle**.
- For user-supplied terminal commands, render text safely (escape HTML; avoid direct raw HTML insertion of unchecked input). Never execute arbitrary shell commands on the server, browser, or host machine; this is a **simulated portfolio CLI only**.
- Tabs should retain their session/output state when switching if practical.
- If this is a React/Next implementation, use state and components rather than DOM mutation where possible.

## 7. Quality checklist / definition of done

- [ ] The application builds and starts using this repository's normal commands.
- [ ] Desktop 35/65 split is clear, with large centered circular portrait in left pane.
- [ ] Sidebar remains stationary; right content scrolls independently.
- [ ] Exactly one theme: standard dark PowerShell / Windows Terminal Campbell. No light theme UI or code paths.
- [ ] Consolas is primary font site-wide.
- [ ] Active rounded terminal tab visually merges into the terminal body.
- [ ] Six clickable tabs with the exact content categories above.
- [ ] Every heading/subsection begins `>>` and has a following colored `Description:` line.
- [ ] Command form, help, clear, unknown-command error, and history work.
- [ ] No card-like dashboard layout, excessive decoration, or fake contact links.
- [ ] Responsive fallback functions without clipping essential content.
- [ ] Keyboard support and contrast are acceptable.
- [ ] Build/lint/tests (where present) complete or remaining issues are explicitly reported.

## 8. Run locally

After implementation, **use the scripts already in this repo** and report the correct command. Typical examples **only**:

```bash
# Common Vite / React or Next.js workflow (if package.json defines these)
npm install
npm run dev
```

For a specific port, inspect the framework/configuration first, then use its supported option, e.g. Vite:

```bash
npm run dev -- --port 3000
```

Or Next.js (depending on the repo's scripts):

```bash
npm run dev -- -p 3000
```

For a standalone HTML-only repo, open `index.html` locally or serve it using an existing static server. **Do not add a framework solely to display this portfolio**.

## 9. Expected agent handoff

At the end, tell me:

1. What you changed and where (file paths)
2. How to run it locally (exact command/port)
3. What verification you ran and results
4. Which photo/contact/project links still need input

**Primary acceptance criterion:** A visitor should immediately recognize the site as a functional, refined **PowerShell / Windows Terminal interface**, not a normal web portfolio with terminal-colored cards.

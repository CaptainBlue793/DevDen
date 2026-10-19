# Portfolio requirements

Version 0.1 · Planning draft · 7 October 2026

## 1. Purpose and audience

The portfolio should help a visitor understand who Palak is, see evidence of engineering ability, explore relevant projects, and find a contact channel. Aim for a visitor to identify Palak's focus and open a featured project within roughly 30 seconds.

Primary audience, provisionally: recruiters and engineering teams. Secondary audience: collaborators and people interested in the projects. The emphasis can change without changing the core architecture.

User stories:

- As a recruiter, I can scan the homepage, open a relevant case study, and find a resume or contact link when supplied.
- As an engineer, I can understand a project's problem, architecture, tradeoffs, and limitations, then inspect its source.
- As a collaborator, I can see Palak's interests and find a reliable way to reach out.
- As the owner, I can add or reorder a project by editing content files without modifying the page layouts.

## 2. Confirmed constraints and assumptions

| Item | Status |
| --- | --- |
| Personal portfolio showcasing projects | Requested |
| React + Vite frontend | Required |
| Deployment to `palakdebpatra.com` through Cloudflare | Required deployment capability |
| Plan, requirements, and design before implementation | Current scope |
| TypeScript, pre-rendering, and CSS Modules | Recommended technical choices |
| Dark navy and blue visual direction | Proposed; adjustable |
| Recruiter and collaborator audience | Assumption pending preference |
| Repository-based content editing | Recommended launch workflow |
| Domain registered, active Cloudflare zone, and account access | Unverified deployment prerequisites |

Use the existing `Portfolio/` directory as the project boundary. Keep neighboring repositories independent. Any Python utility used during implementation or validation must use the existing `starGPU` environment; frontend tools use Node.js.

## 3. Launch requirements

| ID | Requirement | Acceptance condition |
| --- | --- | --- |
| FR-01 | Personal introduction | Name, approved headline, short introduction, and a clear link to featured work |
| FR-02 | Featured work | Three selected projects with useful visuals, a short problem statement, and a case-study link |
| FR-03 | Project index | Published projects are listed at `/projects`, with category filters and a clear reset option |
| FR-04 | Case studies | Every published project has a direct URL and explains the problem, contribution, approach, outcome, and limitations |
| FR-05 | About and capabilities | Concise bio and capabilities connected to actual projects; no unsupported proficiency scores |
| FR-06 | Contact | Approved email link and verified professional profiles; copying the email has a fallback when unavailable |
| FR-07 | Resume | View/download link appears only when a real, current PDF is supplied |
| FR-08 | Navigation | Home, Projects, About, and Contact work on keyboard, touch, and direct links |
| FR-09 | Maintainable content | Adding a published project generates its index entry, detail route, and sitemap entry |
| FR-10 | Missing content | Optional demo, resume, and profile links are omitted when absent; no dead buttons or invented URLs |
| FR-11 | Not found | Unknown page and project URLs show a helpful page and return HTTP 404 on direct requests |
| FR-12 | Custom domain | Valid HTTPS at the apex, `www` redirect, and working direct project URLs |

Project categories begin with All, AI & ML, Developer Tools, and Learning. Assign them editorially during content preparation; hide any category with no published projects. Projects may belong to more than one category. The default order is curated rather than based on stars or repository dates.

Contact is an email/profile workflow for launch. A message form with email delivery would require a separate backend feature and is deferred.

## 4. Candidate content from this workspace

These summaries come from local READMEs, not an independent implementation audit. Featured order is an editorial proposal, not a claim about production readiness.

| Project | Draft description | Proposed placement |
| --- | --- | --- |
| Memex | Local document question answering with retrieval and citations | Featured: applied AI and privacy-conscious architecture |
| CodeShift | Python-to-TypeScript migration with dependency ordering and behavior verification | Featured: developer tooling and verification |
| The Engineering Atlas | Browser-based engineering courses with interactive explanations | Featured: teaching and frontend breadth |
| FrameSmith | Graphics-settings optimization using local measurement and search | Catalog; candidate for a deeper technical case study |
| SummaScribe | PDF/text summaries with extractive mode and optional local AI | Catalog: document processing |
| Tagify | Topic discovery and explainable dictionary-based industry labels | Catalog: text analysis |
| WatchWise | Content-based movie discovery with filters and session watchlists | Catalog: recommendation systems |
| NetChat | Questions grounded in the contents of a public webpage | Catalog after reviewing demo readiness and implementation |
| Project X | Reusable system-design draft rather than an implemented application | Omit at launch, or explicitly label as a design study |

If the preferred lead projects are Tagify, SummaScribe, and WatchWise, change the featured flags and ordering; no structural redesign is needed.

Source repositories for the first seven projects were found in local Git remote configuration under the `CaptainBlue793` GitHub account. Repository visibility, public links, licensing, demo availability, and image rights must be checked when publishing content. Do not repeat README test counts or performance claims without current evidence.

## 5. Case-study content contract

Each published project needs:

1. Title, stable slug, one-sentence summary, categories, technologies, and an accurate status.
2. The problem and who benefits from solving it.
3. Palak's role and contribution, distinguishing personal work from team or third-party work.
4. One authentic screenshot or a diagram clearly identified as a diagram.
5. The approach, architecture, and one or two meaningful engineering decisions.
6. Outcomes supported by evidence; qualitative outcomes are acceptable when measurements are unavailable.
7. Limitations and lessons learned.
8. Source link when public, optional live demo, and optional additional screenshots.

A portfolio hosts descriptions, images, diagrams, and links. Running the projects themselves is separate work. Existing Python/Streamlit applications, local LLMs, Windows tooling, and GPU workloads will retain their own runtime and hosting arrangements. Projects without a public demo can still have strong case studies.

## 6. Quality requirements

| Area | Launch target |
| --- | --- |
| Responsive layout | Verify 360, 390, 768, 1024, and 1440 px widths; support narrower screens without horizontal overflow |
| Accessibility | Target WCAG 2.2 AA: semantic structure, contrast, visible focus, keyboard operation, alt text, and reduced motion |
| Performance | Aim for mobile Lighthouse Performance >= 90 on home and one detail page under documented conditions |
| Other audits | Aim for Lighthouse Accessibility, Best Practices, and SEO >= 95; supplement automation with manual checks |
| Loading | Home's initial compressed JavaScript target <= 180 KB; optimize if the chosen framework exceeds this |
| Images | Responsive WebP/AVIF where practical, explicit dimensions, lazy loading below the fold |
| Search and sharing | Pre-rendered route content, unique titles/descriptions, canonical links, and social text metadata |
| Discoverability | Sitemap generated from published routes, robots configuration, favicon, and accurate Person structured data |
| Reliability | Production build passes; no hydration errors, blocking console errors, broken internal links, or missing assets |
| Privacy | No trackers or external font requests by default; analytics is a separate optional decision |

Performance scores are acceptance targets, not promises about every device or network. The main content and navigation should remain readable in initial HTML before JavaScript loads; filters and email-copy behavior enhance that content.

## 7. Deferred features

Blog/writing archive, a visual CMS, admin authentication, automated GitHub synchronization, visitor analytics, contact-form delivery, theme switching, embedded live applications, and elaborate 3D effects are possible follow-up work. They are not launch dependencies.

## 8. Content decisions still open

- Primary audience and visual preference.
- Final project selection and order.
- Professional title, short bio, and public contact details.
- Current resume and optional experience/education information.
- Screenshots, ownership details, outcomes, and verified public demo links.

These can be resolved while the foundation is built. Missing personal details should remain marked in draft content and prevent publication of that section, rather than becoming fabricated facts.

# Portfolio audit — October 13, 2026

October 21 follow-up: the new resume and academic CV now include the current
NatWest role and the SPCOM publication. The portfolio serves both original PDFs,
offers a download action, and shows the user-supplied details for the current
role. The related historical findings below were addressed locally; this dated
audit still records the evidence and decisions from October 13.

The audit covered the local application, the existing resume, source documentation,
and selected public evidence. Confirmed implementation defects were fixed locally.
Personal facts and the original resume were preserved. These audit fixes have not
been published to DevDen preview.

## Content and release findings at the time of the audit

| Priority | Finding | Evidence and next step |
| --- | --- | --- |
| Medium | The resume and portfolio tell different versions of the career timeline. | The January 2026 source resume shows the 2024 NatWest internship but omits the July 2025–Present role displayed in Experience. It also predates the July 2026 publication and emphasizes older projects. Replace it with an updated original CV when available; do not generate new personal claims. |
| Medium | The resume viewer is an image, so its contents are not available as document text. | Both the inline preview and modal render `resume-preview.png`. Visitors cannot select the resume text or follow its embedded links, and screen readers receive only the image description. The original `resume.pdf` exists but has no visible viewer action. A PDF action inside the viewer would improve access without rewriting the document; the existing single-button design was preserved. |
| Low | LeetCode achievements have no visible date. | The 800+ problems, peak rating 1795, and top 8% come from the January 2026 resume. A peak rating is historical; problem count and percentile can change. Add a verified date or refresh the numbers after checking the account. No claim that the existing figures are false is made. |
| Low | The current NatWest role is much less specific than the internship. | The current role has one general Backend Systems/APIs/Data Workflows bullet; the internship has specific tools and outcomes. Add actual responsibilities or outcomes supplied by the owner. Do not invent project details or metrics. |
| Medium | The published build is ahead of committed application source. | Source HEAD is `3549147`; the preview was published as `f144732` from local changes. The copy and mobile-resume work, plus these audit fixes, remain uncommitted in the source repository. Commit and push the source when retaining an authoritative remote record of these changes. The separate preview checkout is clean. |

## Confirmed defects fixed locally

1. **Section URLs could disagree with the visible content.** Changing a hash to
   `#portfolio/publications` left Activities selected in the reproduction. The
   application now follows hash changes, including browser Back/Forward between
   hash entries. Existing tab clicks still replace the current entry, and refresh
   still restarts Welcome as previously requested.
2. **Inactive tabs had invalid screen-reader references.** Each tab referred to
   a panel that was absent until selected. Only the active tab now declares its
   control relationship to the rendered panel.
3. **Several sections skipped from the page's H1 to H3.** Each active section now
   has a visually hidden H2, preserving the visual design and giving assistive
   technology a complete heading hierarchy.
4. **The normal lint command scanned archived compiled bundles.** Ignored
   `checkpoints/` builds produced 1,163 unrelated lint errors in the earlier run.
   ESLint now ignores this generated directory, matching Git's existing exclusion.
5. **The documentation described the wrong phone resume default.** README and
   deployment instructions said every opening was enlarged. Both now describe
   fitting compact windows up to 1050px and enlarging desktop windows.

## Evidence checks

- The public [CodeShift run report](https://github.com/CaptainBlue793/CodeShift/blob/main/docs/scale-run-2026-08-19.md)
  contains 31 module rows, 15 marked verified, and 197 checked callables when its
  Checked column is summed. The portfolio appropriately ties the figures to one
  recorded run; this audit did not rerun the migration.
- The [official SPCOM accepted-paper list](https://ece.iisc.ac.in/~spcom/2026/accepted_papers_complete.html)
  confirms the paper title and author order, with Palak Deb Patra listed first.
  The local research repository records IEEE's Crossref metadata for the DOI,
  pages, and publication month. Crossref and IEEE could not be independently
  retrieved during this audit, so that metadata is not described as freshly verified.
- The public Memex and FrameSmith READMEs were fetched. Memex documents its
  optional cloud provider and retrieval limitations; FrameSmith documents open
  measurement problems. The portfolio's local-default wording and prototype
  qualification are consistent with those sources.
- Public repository records were accessible for the four displayed projects and
  the research repository. Automated requests to some external destinations,
  including IEEE, LeetCode, and Hugging Face, were inconclusive. Fetch failures
  are not evidence of broken links.

## Validation

- Production build passed: `npm.cmd run build`.
- Normal lint passed: `npm.cmd run lint`.
- All 84 Chromium tests passed: `npm.cmd test -- --workers=4`.
- Two added regression checks cover hash/history synchronization and valid
  accessibility references plus H2 headings in every section.
- An additional 30-view inspection checked six sections at 320×568, 390×844,
  844×390, 1051×650, and 1440×900. It found no clipped target text, horizontal
  page overflow, browser exceptions, or failed asset responses. After the fixes,
  the missing references were gone and hash navigation selected Publications.
- Existing browser tests cover both themes, phone resume fitting, rotation,
  enlarged text, keyboard navigation, and sizes up to 2560px. These are browser
  emulations, not physical-device tests or a complete accessibility certification.

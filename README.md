# DevDen

Palak Deb Patra's interactive portfolio for software engineering, AI, and machine learning, presented as a terminal workspace.

**[Visit the live site](https://palakdebpatra.com/)**

## Explore

- Browse six sections: Skills, Resume, Experience, Projects, Publications, and Activities.
- Read project case studies with screenshots, technical details, and source links.
- View or download the professional and academic CVs directly from the Resume section.
- Use the site on desktop or mobile, with keyboard navigation, reduced motion support, and a theme that follows your browser preference.

Built with **React, TypeScript, and Vite**. The site is published through GitHub Pages.

## Run locally

Requires Node.js 22.12 or newer. In PowerShell:

```powershell
git clone https://github.com/CaptainBlue793/DevDen.git
cd DevDen
npm.cmd ci
npm.cmd run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). On macOS or Linux, use `npm` and `npx` in place of `npm.cmd` and `npx.cmd`.

## Check changes

```powershell
npm.cmd run lint
npm.cmd run build
npx.cmd playwright install chromium  # First time only
npm.cmd test
```

`npm.cmd run build` writes the production site to `dist/`. To serve that build locally, stop the development server and run `npm.cmd run preview` on the same port.

## Where to edit

| Area | Location |
| --- | --- |
| Profile, skills, experience, projects, and CV links | [`src/content.ts`](src/content.ts) |
| Layout and interactions | [`src/App.tsx`](src/App.tsx), [`src/styles.css`](src/styles.css) |
| CV PDFs and page previews | [`public/`](public/) |
| Browser tests | [`tests/`](tests/) |

The CVs are bundled as local PDFs so visitors can open them without Google Drive access. See [content sources](docs/content-sources.md) for provenance and [deployment notes](docs/deployment.md) for the GitHub Pages workflow. Third-party icon credits are in [`public/third-party-notices.txt`](public/third-party-notices.txt).

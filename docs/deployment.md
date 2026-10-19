# DevDen live website

Live site: [captainblue793.github.io/DevDen](https://captainblue793.github.io/DevDen/)

Source repository: [CaptainBlue793/DevDen](https://github.com/CaptainBlue793/DevDen).

DevDen is a public repository containing both the complete application source and
the GitHub Actions workflow that publishes its production build to GitHub Pages.
The former `devden-preview` repository is retired after verifying this deployment.

## Automatic updates

Push changes to the `main` branch of `CaptainBlue793/DevDen`. The
[`Deploy DevDen to GitHub Pages`](../.github/workflows/deploy.yml) workflow installs
the locked dependencies, runs lint and TypeScript checks, builds the application,
and deploys `dist/`. The live site updates when that workflow succeeds.
Uncommitted local edits and pushes to other repositories or branches do not deploy.

Check progress and logs in [GitHub Actions](https://github.com/CaptainBlue793/DevDen/actions).
The workflow can also be started manually with **Run workflow**.
GitHub Pages uses **GitHub Actions** as its publishing source.

## Reproduce the production build

Use the Node.js version specified in `.nvmrc`, then run:

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd run build -- --base=/DevDen/
```

The `/DevDen/` base matches the case-sensitive public URL. Images, icons, and PDF
URLs use Vite's `BASE_URL`. Local development remains available at `/` with
`npm.cmd run dev`. Hash navigation needs no server rewrite.

The CV uses the unchanged original `public/resume.pdf` and its matching
`public/images/resume-preview.png`. Do not regenerate the resume from portfolio
content. Custom domains and DNS are not required for this GitHub Pages URL.

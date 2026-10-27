# DevDen live website

Live site: [palakdebpatra.com](https://palakdebpatra.com/)

Application source: [CaptainBlue793/DevDen](https://github.com/CaptainBlue793/DevDen).
Publishing repository: [CaptainBlue793/captainblue793.github.io](https://github.com/CaptainBlue793/captainblue793.github.io).

The publishing repository's GitHub Actions workflow checks out `DevDen/main`,
installs the locked dependencies, runs lint and TypeScript checks, builds with a
Vite base of `/`, and deploys `dist/` to GitHub Pages. It owns the custom domain
`palakdebpatra.com`.

## Automatic updates

Push changes to `DevDen/main`. The
[`Publish portfolio at palakdebpatra.com`](../.github/workflows/publish-main-site.yml)
workflow uses the repository secret `MAIN_SITE_DISPATCH_TOKEN` to trigger the
publishing repository's [deployment workflow](https://github.com/CaptainBlue793/captainblue793.github.io/actions).
The [`Check DevDen`](../.github/workflows/deploy.yml) workflow validates the
source repository without deploying a second copy of the site.

Uncommitted local edits and pushes to other branches do not update the live site.
If the dispatch fails, check the token's expiry and its Actions write permission
on the publishing repository. The publishing workflow can also be started
manually from its Actions tab.

## Reproduce the production build

Use the Node.js version specified in `.nvmrc`, then run:

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd run build -- --base=/
```

The `/` base matches the portfolio at the domain root. Images, icons, and PDF
URLs use Vite's `BASE_URL`. Local development remains available at `/` with
`npm.cmd run dev`. Hash navigation needs no server rewrite.

The resume and academic CV use the unchanged originals at `public/resume.pdf`
and `public/academic-cv.pdf`, with matching previews in `public/images/`.
Do not regenerate either document from portfolio content.

## Project sites

Project repositories under `CaptainBlue793` can publish their own GitHub Pages
sites beneath the domain at `https://palakdebpatra.com/<repository-name>/`.
Each project must enable Pages, leave its own Custom domain field empty, and use
asset URLs that work under its repository path. Engineering Atlas is available
at [palakdebpatra.com/palak-engineering-atlas](https://palakdebpatra.com/palak-engineering-atlas/).

Cloudflare DNS provides the apex GitHub Pages A records and a `www` CNAME to
`captainblue793.github.io`. Keep the GitHub verification TXT record and Atlas
email authentication records. The Atlas accounts Worker allows the
`https://palakdebpatra.com` origin.

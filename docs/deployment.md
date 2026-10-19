# DevDen source and preview

Viewing link: https://captainblue793.github.io/devden-preview/

Source repository: [CaptainBlue793/DevDen](https://github.com/CaptainBlue793/DevDen).

The DevDen repository contains the full application source; `CaptainBlue793/Portfolio` is the original private working repository.
Published build: `CaptainBlue793/devden-preview` (public).

GitHub rejected Pages on the private source repository because the current plan
does not support it. The separate preview repository publishes compiled assets
through Pages from its `main` branch, using the repository root and `.nojekyll`.
No source-repository visibility, custom-domain, or DNS settings were changed.

To prepare an updated preview, run:

```powershell
npm.cmd run build -- --base=/devden-preview/
```

Publish the contents of `dist/` to the preview repository, retaining `.nojekyll`.
The source repository's ordinary push does not automatically refresh this separate
build. Rebuild and publish the preview when an update is requested.

Image and PDF URLs use Vite's `BASE_URL`, so local development still works at `/`
and the published site works beneath `/devden-preview/`. Hash navigation needs
no server rewrite. The CV uses the unchanged original `resume.pdf` and its matching
`images/resume-preview.png`. The viewer uses these local assets, with no Drive link
or sign-in requirement. View Resume opens fitted to the screen on compact
windows up to 1050px wide, and enlarged with scrolling on desktop. Fit page and
Enlarge switch views; each opening resets the view for the current screen size.
Do not regenerate the resume from portfolio content.

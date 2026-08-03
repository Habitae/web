# Habitae Web

The public Habitae website for condominium management.

This repository contains the marketing site and help pages. It is separate
from the private Habitae application and backend. Until the application is
ready, links to `/app` open a coming-soon page.

Built with React, TypeScript, Vite, and Manrope.

## Run locally

Requires Node.js 22+ and npm.

```bash
npm ci
npm run dev
```

Other commands:

```bash
npm run typecheck
npm run build
npm run preview
```

## Routes

- `/` — marketing homepage
- `/app` — coming-soon page for the application
- `/ajuda` — Portuguese help center
- `/help` — English help center

Portuguese is the default language. The language switcher also supports
English and remembers the choice in the browser.

## Deployment

The site is deployed to GitHub Pages at [habitae.pt](https://habitae.pt).
Pushing to `main` runs the workflow in
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

The custom domain is configured in [`public/CNAME`](public/CNAME). For a new
Pages setup, select **GitHub Actions** as the Pages deployment source in the
repository settings.

## License

The source code is available under the [MIT License](LICENSE).

The Habitae name, logo, product names, copy, screenshots, and other brand
assets are not covered by that license. See [TRADEMARKS.md](TRADEMARKS.md).

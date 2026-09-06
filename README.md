# Habitae Web

The public [Habitae website](https://habitae.pt) for condominium management,
built with React, TypeScript and Vite. It includes Portuguese and English
marketing pages, a blog, help guides, legal pages and a waitlist.

## Development

Requires Node.js 22.19+ and pnpm 11.25.0.

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Environment settings are optional for local development. Without
`VITE_WAITLIST_ENDPOINT`, the site shows that registration opens soon.
All `VITE_*` values are included in public output; never use them for secrets.

```bash
pnpm typecheck
pnpm test
pnpm build
pnpm preview
```

`pnpm test:build` checks generated pages and requires a configured waitlist
endpoint. `pnpm test:edge` runs browser tests through the local Cloudflare
Worker with mocked integrations. Install Chromium first with
`pnpm exec playwright install chromium`.

## Project structure

- `src/components/` — pages and shared interface components.
- `src/content/` — bilingual blog, help, legal and business content.
- `public/` — published images, domain configuration and agent guidance.
- `scripts/` — prerendering, audits and automated checks.
- `services/agent-edge/` — website hosting and HTML/Markdown negotiation.
- `services/waitlist/` — signup Worker, email delivery and database migrations.
- `tests/` — browser tests.

The build creates static HTML, Markdown mirrors, sitemaps and agent discovery
files in `dist/`. Portuguese is the default; English pages use `/en/`, with
help centers at `/ajuda/` and `/help/`. `/app/` is the waitlist page.

See [content maintenance](docs/CONTENT.md) and [deployment](docs/DEPLOYMENT.md).
Keep internal plans, operational records and data exports out of this public
repository. `.private/` is ignored for local notes.

## License

Source code is available under the [MIT License](LICENSE). The Habitae name,
logo, copy, screenshots and other brand assets are covered separately by
[TRADEMARKS.md](TRADEMARKS.md).

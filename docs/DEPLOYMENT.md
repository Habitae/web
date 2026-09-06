# Deployment

## Website configuration

Copy `.env.example` to `.env.local` for development or `.env.production.local`
for local production builds. Both are ignored. Configure these public build
values in the deployment host:

| Variable | Purpose |
| --- | --- |
| `VITE_WAITLIST_ENDPOINT` | HTTPS signup endpoint ending in `/waitlist`. |
| `VITE_GTM_ID` | Optional Google Tag Manager container. Loads after analytics consent. |
| `VITE_AHREFS_VERIFICATION` | Optional site verification value. |
| `VITE_GOOGLE_SITE_VERIFICATION` | Optional Search Console verification value. |
| `HABITAE_BASE_PATH` | Defaults to `/`; supports GitHub Pages repository prefixes. |

The Pages workflow requires the `VITE_WAITLIST_ENDPOINT` repository variable
to prevent a release from silently disabling signup. Cloudflare Workers Builds
also needs that environment variable; ignored local files are unavailable to
remote builds. Keep build values consistent across hosts.

Pushing to `main` runs `.github/workflows/deploy-pages.yml`. Configure GitHub
Pages to use GitHub Actions. The custom domain is in `public/CNAME`.

The website Worker uses `services/agent-edge/wrangler.jsonc` and requires an
apex build (`HABITAE_BASE_PATH=/`). Review its route for your deployment.

```bash
pnpm build
pnpm test:build
pnpm edge:check
pnpm test:edge:http
pnpm edge:deploy
```

For automated Worker deployment through GitHub Actions, set repository variable
`CLOUDFLARE_AGENT_EDGE_ENABLED=true` and secrets `CLOUDFLARE_ACCOUNT_ID` and
`CLOUDFLARE_API_TOKEN`. If using Cloudflare Workers Builds, leave the Actions
flag unset to avoid competing deployments. Use `pnpm run build` and
`pnpm run edge:deploy` as the Workers Builds commands.

The Worker serves HTML and Markdown through content negotiation, with actual
404 responses for unknown routes. Preserve its `Vary` and `no-store` headers.
After deployment, run `pnpm verify:agents https://YOUR_SITE_HOST` against the
matching local build. Reports and local Worker state are ignored by Git.

## Waitlist Worker

Create an ignored deployment configuration:

```bash
cp services/waitlist/wrangler.example.jsonc services/waitlist/wrangler.local.jsonc
```

Set your D1 database ID, site origin, verified sender, reply-to address and
administrator recipient in the local configuration. Replace the example rate
limit namespace with an unused value in your account. For an existing
deployment, retain its database and namespace identifiers.

Store `RESEND_API_KEY` using the interactive Wrangler secret prompt:

```bash
pnpm exec wrangler secret put RESEND_API_KEY --config services/waitlist/wrangler.local.jsonc
```

For local development, copy `services/waitlist/.dev.vars.example` to `.dev.vars`
in the same directory and fill it locally. Never put this key in `VITE_*`.

Apply pending migrations before deploying:

```bash
pnpm exec wrangler d1 migrations apply habitae-waitlist --remote --config services/waitlist/wrangler.local.jsonc
pnpm exec wrangler deploy --config services/waitlist/wrangler.local.jsonc
```

Use migrations for existing databases; rerunning `schema.sql` does not upgrade
them. Signup email delivery requires the email-outbox migration and all four
email settings. The Worker stores signups before attempting delivery and retries
pending email jobs on its schedule. Keep deployment records and signup exports
in private storage.

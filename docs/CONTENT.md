# Content maintenance

Keep Portuguese, English and French translations in sync. Public content belongs in
`src/content/`; avoid customer records, internal source mappings and operational
notes. Everything in `public/` is copied to the deployed website.

The standalone translation runtime and catalogs live in `shared/`. Keep catalog
keys aligned across `pt.json`, `en.json` and `fr.json`. `withFrench` translates
application-owned Portuguese copy structures while preserving stable IDs and
URLs; never apply it to customer records.

## Help and blog

Help articles use stable IDs, translated slugs and related-guide IDs.
`helpReadingOrder` in `src/content/helpArticles.ts` must include each guide
exactly once. Shared structures live in `helpTypes.ts`; additional guides live
in `helpAccount.ts`, `helpFinance.ts` and `helpOperations.ts`.

Blog articles live in `blog.ts` and `blogManagers.ts`. Each translation needs
a unique slug, title, description and section IDs. Preserve publication dates
on edits and update modification dates when content changes. Advance legal
review dates only after checking the cited sources. Use original examples,
label illustrative figures, and keep product availability accurate.

Routes, metadata, Markdown mirrors and discovery indexes are generated from
the content. Update route-count assertions when adding or removing pages.

## Legal and contact content

`src/content/legal.ts` contains the translated legal pages and draft settings.
Search for `[[` to find remaining placeholders. Keep unfinished documents
identified as drafts and excluded from indexing until reviewed and completed.
Public business contact details are shared through `organization.ts`.

## Validation

Run `pnpm typecheck`, `pnpm test`, and `pnpm build`. With a configured waitlist
endpoint, run `pnpm test:build`. Use `pnpm test:edge` for browser checks,
including all three languages, mobile layouts and JavaScript-disabled navigation.
Rebuild with deployment settings after browser tests, which use mocked values.

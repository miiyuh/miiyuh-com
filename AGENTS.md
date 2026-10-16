# AGENTS.md — miiyuh.com

Personal portfolio (Next.js 16 + Payload CMS 3 + MongoDB + Tailwind CSS v4).

## Toolchain

- **Package manager**: `bun` (v1.4.0, see `package.json` `packageManager` field). Ignore `.npmrc` (stale).
- **Dev server**: `bun run dev` (Turbopack)
- **Production build**: `bun run build` (webpack via Payload)
- **Lint**: `bun run lint` (oxlint, see `.oxlintrc.json`). Auto-fix: `bun run lint:fix`
  - Type-aware rules are on (`options.typeAware`), powered by `oxlint-tsgolint`, which **requires TypeScript 7+**.
  - Existing `// eslint-disable-next-line <rule>` comments are still honoured.
- **Type-check**: `bun run type-check` (tsc --noEmit, TypeScript 7 / native)
- **Clean**: `bun run clean` (removes `.next`)
- **No tests** exist in this repo.

## Architecture

- **Two route groups**: `src/app/(my-app)/[locale]/` (public site: blog, projects, gallery, surveys, etc.; its `layout.tsx` is the root layout) and `src/app/(payload)/` (CMS admin, API, GraphQL).
- **Locales**: English (`en`) is served at unprefixed URLs, Malay (`ms`) under `/ms`. `src/proxy.ts` rewrites unprefixed requests to `/en/...` internally and redirects `/en/...` to the canonical URL. Read the locale with `resolveLocale(params)` (`src/lib/locale.ts`) and pass it to every Payload query; never read it from cookies/headers (that makes pages dynamic). Internal links use `@/components/locale-link`. `revalidatePath` needs the internal paths for every locale (`allLocaleRoutePaths`).
- **Data fetching pattern**: Server components (`page.tsx`) fetch from Payload CMS → pass props to client wrapper (`*-client.tsx`). Never fetch data in client components.
- **Route slugs**: blog = `/blog/:year/:month/:slug` (year/month in Malaysia time; build with `getBlogPostPath` from `src/utils/blog-path.ts`), projects = `/projects/:slug`, gallery = `/gallery/:slug`. Each also exists under `/ms`.
- **Caching**: pages are static/ISR (`revalidate` + `generateStaticParams`). Do not set `dynamicParams = false` on the root layout (it is inherited and 404s non-prebuilt posts). The CSP is a static header in `next.config.mjs`.
- **Component exports**: Via `src/components/index.ts` — import from `@/components`.

## Payload CMS

- **Database**: MongoDB (Mongoose adapter). Requires `DATABASE_URI` env var.
- **Media storage**: Cloudflare R2 (S3-compatible). Enabled when `R2_BUCKET_NAME` is set.
- **Admin UI**: `/admin` route, user slug `users`. Admin access guarded by `src/access/is-admin.ts`.
- **Type generation**: `payload-types.ts` is committed (import via `@payload-types`). After changing any collection, global or field, regenerate with `bun run payload generate:types` and commit the result.
- **Seed scripts**: `scripts/` dir is gitignored; has `seed:gallery`, `seed:projects`, `seed:about`, `create:admin`. Always run dev server first before seeding.

## Style

- **Theme**: Dark (#070707 bg, #FAF3E0 text), CSS variables in `globals.css`, glass-morphism panels. Use the tokens (`text-text-primary`, `bg-bg-primary`, `bg-surface-primary`); no hex values in class names. Accent: `#035940` for fills only, `text-accent-hover` (`#86efac`) for green text/icons. See `DESIGN.md`.
- **Typography**: Stack Sans Text (body, weight 200), Stack Sans Headline (headings), Stack Sans Notch (display/nav, `font-notch`), Noto Serif (long-form body in `.lexical-content`, weight 450; headings in it 600), Paper Mono (footer clock), Noto Sans Mono (`font-mono`). Stack Sans and Paper Mono are local; Noto Serif / Noto Sans Mono / Noto Color Emoji come from next/font/google.
- **Responsive spacing**: `px-8 md:px-16 lg:px-32 xl:px-56 2xl:px-80` for main containers, header and footer. Blog posts keep a fixed `max-w-4xl` reading width.
- **Motion**: page entrance `animate-page-in` (200ms, no delay), lists `animate-stagger-item`; use `transition`/`transition-colors`, never `transition-all`.
- **Emojis**: NEVER use unless the user explicitly asks.

## Conventions

- All interactive components need `'use client'`.
- Layout changes must keep skeleton (`loading.tsx`) in sync.
- Server components handle data + metadata; client components handle interactivity + hooks.
- Hash navigation via `HeadingWithHash` (GitHub-style anchor links).
- Use `revalidatePath` + ISR for blog posts; pre-define MongoDB indexes per collection.

## Versioning

- **Current version**: `"version"` field in `package.json`.
- **Automated** via semantic-release (see `.releaserc.json`), which runs on every push to `master`. Do NOT hand-edit the `version` field or `CHANGELOG.md` — the release job commits both.
- Version is derived from conventional commit types: `fix:` → patch, `feat:` → minor, `BREAKING CHANGE:` → major. `chore:` and `docs:` do not cut a release.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

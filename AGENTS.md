# AGENTS.md — miiyuh.com

Personal portfolio (Next.js 16 + Payload CMS 3 + MongoDB + Tailwind CSS v4).

## Toolchain

- **Package manager**: `bun` (v1.3.14, see `package.json` `packageManager` field). Ignore `.npmrc` (stale).
- **Dev server**: `bun run dev` (Turbopack)
- **Production build**: `bun run build` (webpack via Payload)
- **Lint**: `bun run lint` (ESLint flat config). Auto-fix: `bun run lint:fix`
- **Type-check**: `bun run type-check` (tsc --noEmit)
- **Clean**: `bun run clean` (removes `.next`)
- **No tests** exist in this repo.

## Architecture

- **Two route groups**: `src/app/(my-app)/` (public site: blog, projects, gallery, surveys, etc.) and `src/app/(payload)/` (CMS admin, API, GraphQL).
- **Data fetching pattern**: Server components (`page.tsx`) fetch from Payload CMS → pass props to client wrapper (`*-client.tsx`). Never fetch data in client components.
- **Route slugs**: blog = `/blog/:year/:month/:slug`, projects = `/projects/:slug`, gallery = `/gallery/:slug`.
- **Component exports**: Via `src/components/index.ts` — import from `@/components`.

## Payload CMS

- **Database**: MongoDB (Mongoose adapter). Requires `DATABASE_URI` env var.
- **Media storage**: Cloudflare R2 (S3-compatible). Enabled when `R2_BUCKET_NAME` is set.
- **Admin UI**: `/admin` route, user slug `users`. Admin access guarded by `src/access/is-admin.ts`.
- **Type generation**: `payload-types.ts` is gitignored (generated). Regenerate with `bun run payload generate:types`.
- **Seed scripts**: `scripts/` dir is gitignored; has `seed:gallery`, `seed:projects`, `seed:about`, `create:admin`. Always run dev server first before seeding.

## Style

- **Theme**: Dark (#070707 bg, #FAF3E0 text), CSS variables in `globals.css`, glass-morphism panels.
- **Typography**: Inter (via rsms.me), Instrument Serif, Noto families loaded via Next.js Google Fonts.
- **Responsive spacing**: `px-16 md:px-32 lg:px-56 xl:px-80` for main containers.
- **Emojis**: NEVER use unless the user explicitly asks.

## Conventions

- All interactive components need `'use client'`.
- Layout changes must keep skeleton (`loading.tsx`) in sync.
- Server components handle data + metadata; client components handle interactivity + hooks.
- Hash navigation via `HeadingWithHash` (GitHub-style anchor links).
- Use `revalidatePath` + ISR for blog posts; pre-define MongoDB indexes per collection.

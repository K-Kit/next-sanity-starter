# Next.js + Sanity Starter

A minimal, SEO-optimized starter template for building landing pages with Next.js, Sanity CMS, shadcn/ui, and Framer Motion.

## Stack

- **Next.js 16** — App Router, Turbopack
- **Sanity v5** — Embedded studio, visual editing, AI Assist
- **shadcn/ui** — Radix UI primitives + Tailwind CSS v4
- **Framer Motion** — Scroll-triggered animations
- **TypeScript** — Strict mode

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url> my-project
cd my-project
bun install
```

### 2. Configure environment

Copy `.env.local.example` or create `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_READ_TOKEN="your-read-token"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Get your project ID from [sanity.io/manage](https://www.sanity.io/manage). Create a read token under **API > Tokens**.

### 3. Run

```bash
bun run dev
```

- **Site** — [localhost:3000](http://localhost:3000)
- **Studio** — [localhost:3000/studio](http://localhost:3000/studio)

### 4. Create your first page

Open the Studio, create a **Page** with slug `home`, add sections, and publish. The homepage will render automatically.

## Project Structure

```
app/
  layout.tsx              # Root layout (fonts, theme, SanityLive, VisualEditing)
  page.tsx                # Home page (slug: "home")
  [slug]/page.tsx         # Dynamic pages with SEO metadata
  studio/[[...tool]]/     # Embedded Sanity Studio
  api/draft-mode/         # Draft mode enable/disable routes
components/
  sections/               # Landing page sections (hero, features, cta, etc.)
  ui/                     # shadcn/ui primitives
sanity/
  schemaTypes/
    documents/            # page, siteSettings
    objects/              # link, navItem, navMenu, megaMenuColumn, seo
    objects/sections/     # hero, features, cta, testimonials, faq, logoCloud
  lib/                    # client, image helper, live API, GROQ queries
  desk-structure.ts       # Studio sidebar layout
  resolve.ts              # Presentation tool URL resolver
```

## Landing Page Builder

Pages are composed of **sections**, each with a `style` field for display variants:

| Section | Styles |
|---------|--------|
| Hero | `centered` · `split` · `minimal` |
| Features | `grid` · `alternating` · `cards` |
| CTA | `banner` · `centered` · `split` |
| Testimonials | `carousel` · `grid` · `stacked` |
| FAQ | `accordion` · `two-column` |
| Logo Cloud | `scroll` · `grid` · `minimal` |

### Adding a new section

1. Create the schema in `sanity/schemaTypes/objects/sections/`
2. Register it in `sanity/schemaTypes/index.ts`
3. Add it to the `sections` array in `sanity/schemaTypes/documents/page.ts`
4. Create the component in `components/sections/`
5. Add it to the map in `components/sections/section-renderer.tsx`

## Navigation

The header uses a **mega menu** pattern:

- **`navMenu`** — Top-level nav item: either a direct link or a dropdown with columns
- **`megaMenuColumn`** — A titled group of links within a dropdown
- **`navItem`** — A single link using Sanity references (slugs stay in sync automatically)

Managed in Studio under **Site Settings > Navigation**.

## Visual Editing

Visual editing and draft mode are pre-configured:

1. Add a `SANITY_API_READ_TOKEN` to `.env.local`
2. Open the Studio's **Presentation** tool
3. Edit content with live preview overlay

## SEO

Each page has an SEO object with:

- Meta title and description
- Open Graph image
- `noIndex` toggle

Fallbacks to Site Settings values when page-level SEO is not set.

## Adding shadcn Components

```bash
bunx shadcn@latest add dialog
```

Components are placed in `components/ui/`.

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server (Turbopack) |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run typecheck` | Run TypeScript checks |
| `bun run format` | Format with Prettier |

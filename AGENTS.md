# Agent Instructions for next-sanity-starter

**Generated:** 2026-04-04  
**Tech Stack:** Next.js 16 (App Router, Turbopack) + Sanity CMS v5 + shadcn/ui + Framer Motion + Tailwind CSS v4

---

## Project Overview

A minimal, SEO-optimized landing page builder starter template with embedded Sanity Studio at `/studio`, visual editing, and AI-assisted content creation. Built for fast iteration with type-safe schemas, strict TypeScript, and modern React 19 patterns.

### Key Features
- **Next.js 16** with App Router and Turbopack for blazing-fast builds
- **Sanity CMS v5** with embedded studio, visual editing, and AI assist
- **Section-based architecture** for composable landing page builder
- **Dynamic routing** via `app/[slug]/page.tsx` for unlimited pages
- **Framer Motion** for smooth animations and micro-interactions
- **shadcn/ui + Radix UI** for accessible, themeable components
- **Tailwind CSS v4** with tight integration
- **TypeScript strict mode** throughout

---

## Project Structure

```
next-sanity-starter/
├── app/                          # Next.js App Router
│   ├── (studio)/                 # Studio route group
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page (/)
│   ├── [slug]/                   # Dynamic page routes
│   │   └── page.tsx              # Renders pages from Sanity
│   ├── api/                      # API routes
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── sections/                 # Page section components
│   │   ├── hero.tsx              # Hero section
│   │   ├── features.tsx          # Features grid section
│   │   ├── cta.tsx               # Call-to-action section
│   │   ├── testimonials.tsx      # Testimonials carousel
│   │   ├── faq.tsx               # FAQ accordion
│   │   ├── logo-cloud.tsx        # Logo cloud section
│   │   └── section-renderer.tsx  # Dynamic section dispatcher
│   ├── ui/                       # shadcn/ui primitives
│   │   ├── button.tsx
│   │   └── [other primitives]
│   └── theme-provider.tsx        # Dark mode + theming
│
├── sanity/                       # Sanity CMS configuration
│   ├── schemaTypes/              # Schema definitions
│   │   ├── documents/
│   │   │   ├── page.ts           # Page document type
│   │   │   └── siteSettings.ts   # Global site config
│   │   └── objects/
│   │       ├── sections/         # Section type definitions
│   │       │   ├── hero.ts
│   │       │   ├── features.ts
│   │       │   ├── cta.ts
│   │       │   ├── testimonials.ts
│   │       │   ├── faq.ts
│   │       │   └── logoCloud.ts
│   │       ├── link.ts           # Link object (for CTAs, nav)
│   │       ├── navItem.ts        # Nav menu item (reference-based)
│   │       ├── navMenu.ts        # Nav menu container
│   │       ├── megaMenuColumn.ts # Mega menu column layout
│   │       ├── seo.ts            # SEO metadata object
│   │       └── index.ts          # Schema export
│   │
│   ├── lib/                      # Sanity utilities
│   │   ├── client.ts             # Sanity client singleton
│   │   ├── queries.ts            # GROQ queries
│   │   ├── image.ts              # Image URL builder
│   │   ├── live.ts               # Live editing (Presentation API)
│   │   └── [helpers]
│   │
│   ├── desk-structure.ts         # Studio desk customization
│   ├── resolve.ts                # Visual editing config (not in structure/)
│   ├── env.ts                    # Environment validation
│   └── sanity.config.ts          # Sanity studio config (at root)
│
├── lib/                          # Shared utilities
│   └── utils.ts                  # cn() helper + utilities
│
├── hooks/                        # Custom React hooks
│   └── [custom hooks]
│
├── public/                       # Static assets
│   └── [images, favicons, etc]
│
├── .agents/skills/               # Claude Code skill plugins
│   └── [skill definitions]       # DO NOT MODIFY
│
├── sanity.cli.ts                 # Sanity CLI config (at root)
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies (bun)
└── AGENTS.md                     # This file
```

### Important Structure Notes

1. **Sanity Directory Naming Conflict:** The local `sanity/` directory has the same name as the `sanity` npm package. This causes import conflicts with `sanity/structure` and `sanity/presentation`.
   - **Solution:** Studio structure is in `sanity/desk-structure.ts` (not `sanity/structure/`)
   - **Solution:** Visual editing config is in `sanity/resolve.ts` (not `sanity/presentation/resolve.ts`)
   - **Never create:** `sanity/structure/` or `sanity/presentation/` directories

2. **Path Aliases:** All imports from project code use `@/` prefix (configured in `tsconfig.json`)
   - Example: `import { cn } from '@/lib/utils'`

3. **Package Manager:** Use `bun` exclusively (not npm, yarn, or pnpm)
   - Commands: `bun run dev`, `bun run build`, `bun run lint`, `bun run typecheck`

---

## Core Concepts

### Page Data Model
Pages are stored as Sanity documents with:
- `title` - Page title
- `slug` - URL slug (unique)
- `description` - Meta description for SEO
- `sections[]` - Array of content sections (hero, features, cta, etc.)
- `seo` - SEO metadata (title, description, Open Graph)

### Section Architecture
Sections are reusable content blocks. Each section:
- Has a corresponding **schema type** in `sanity/schemaTypes/objects/sections/`
- Has a corresponding **React component** in `components/sections/`
- Implements a `style` field for display variants
- Is dispatched by `SectionRenderer` based on `_type`

Supported sections: `hero`, `features`, `cta`, `testimonials`, `faq`, `logoCloud`

### Navigation Patterns
- **Simple Links:** Use `link` object (href + text)
- **Nav Items:** Use `navItem` (reference-based, links to pages)
- **Nav Menu:** Container for `navItem` array
- **Mega Menu:** Multi-column layout using `megaMenuColumn` objects

### SEO & Metadata
- Global settings via `siteSettings` document
- Per-page SEO via `seo` object on each page
- Auto-generated Open Graph images via Sanity AI
- Metadata templates in `app/layout.tsx`

---

## Common Tasks & Routing

### Adding a New Section Type
1. **Create schema** in `sanity/schemaTypes/objects/sections/mySection.ts`
   - Export with `defineType()` and `defineField()`
   - Add `style` field for variants
2. **Create component** in `components/sections/my-section.tsx`
   - Accept section data as props
   - Use Framer Motion for animations
3. **Register in schema index** at `sanity/schemaTypes/objects/sections/index.ts`
4. **Add to SectionRenderer** in `components/sections/section-renderer.tsx`

**Agents:** Use `executor` (opus) for complex multi-file schema + component work. Use `writer` for documentation of new sections.

### Querying Pages from Sanity
- **All pages GROQ:** `*[_type == "page"] | order(title)`
- **Single page by slug:** `*[_type == "page" && slug.current == $slug][0]`
- **Live queries:** Use `sanity/lib/live.ts` for real-time updates
- **Examples:** See `sanity/lib/queries.ts`

**Agents:** Use `document-specialist` for GROQ query help; consult Sanity best practices skill before implementing.

### Visual Editing & AI Assist
- **Live Editing:** Configured in `sanity/resolve.ts` (maps frontend to studio)
- **AI Assist:** Built into Sanity Studio v5 at `/studio` - available on text fields
- **Draft Mode:** Enabled in `app/layout.tsx` when `draftMode()` is active
- **Presentation API:** Synced via `SanityLive` component

**Agents:** Use `sanity-best-practices` skill for visual editing patterns.

### Styling & Theming
- **Tailwind v4:** No config file needed for most cases; uses `@tailwind` in `app/globals.css`
- **CSS Variables:** Integrated with Tailwind for dark mode
- **Theme Provider:** `components/theme-provider.tsx` manages dark/light toggle
- **shadcn/ui:** Use `shadcn` skill to add/update components

**Agents:** Use `shadcn` skill for component additions. Use `web-design-guidelines` for UI review.

### Animations
- **Framer Motion:** Used in section components for scroll-triggered and entrance animations
- **Patterns:** Use `MotionConfig`, `useInView`, stagger effects
- **Examples:** See `components/sections/hero.tsx` and `features.tsx`

**Agents:** Use `framer-motion-animator` skill for animation patterns and micro-interactions.

---

## Development Workflow

### Local Development
```bash
bun run dev        # Start dev server with Turbopack (localhost:3000)
bun run build      # Build for production
bun run start      # Start production server
bun run lint       # Run ESLint
bun run typecheck  # Run TypeScript check
bun run format     # Format code with Prettier
```

### Accessing Sanity Studio
- **URL:** `http://localhost:3000/studio`
- **Features:** Visual editing, content structure, AI assist, preview
- **Config:** `sanity.config.ts` and `sanity/desk-structure.ts`

### Type Safety
- **TypeScript strict mode** is enabled
- **Sanity TypeGen:** Schema types are auto-generated (consider integrating `sanity-typegen` for codegen)
- **API types:** Import from `next/types` and Sanity type stubs

**Agents:** Use `lsp_diagnostics` to find type errors before committing.

### Testing
- Not yet configured; add vitest, testing-library, or Jest as needed
- Consider `ultraqa` skill for test-driven workflows

**Agents:** Use `executor` for test setup. Use `ultraqa` for TDD workflows.

---

## Agent Delegation Guide

### Route to `executor` (opus model)
- Complex schema changes with side effects
- Multi-file refactors (sections, components, utilities)
- Performance optimization requiring architecture review
- Debugging production issues

### Route to `writer`
- Creating/updating documentation (README, guides, comments)
- Sanity schema comments and field descriptions
- Component prop documentation

### Route to `document-specialist`
- GROQ query help (use `sanity-best-practices` first)
- Sanity schema pattern questions
- Content modeling decisions

### Route to `shadcn`
- Adding new UI components
- Fixing component styling issues
- Updating existing components

### Route to skill-specific agents
- `framer-motion-animator` - animation implementation
- `seo-aeo-best-practices` - metadata, sitemaps, robots.txt
- `vercel-react-best-practices` - React patterns and performance
- `sanity-best-practices` - schema design, visual editing, GROQ

### Use `oh-my-claudecode:team` for
- Full-stack feature implementation (schema + component + page + docs)
- Parallel work on multiple sections
- Large refactors with testing and review

---

## Code Style & Conventions

### TypeScript
- **Strict mode:** All code must pass `bun run typecheck`
- **No `any`:** Use explicit types or `unknown` with type guards
- **React:** Use functional components with hooks
- **Naming:** `PascalCase` for components, `camelCase` for functions/variables

### Component Files
- **Sections:** Named like `hero.tsx` (lowercase, hyphenated)
- **UI Primitives:** Imported from shadcn/ui
- **Props:** Define interfaces explicitly, no inline prop objects
- **Exports:** Default export for main component, named exports for helpers

### Sanity Schemas
- **Naming:** `camelCase` for field names, `PascalCase` for display titles
- **Validation:** Use `validation()` for required fields and patterns
- **Descriptions:** Add helpful descriptions to fields for studio users
- **Order:** Group related fields, use `group()` for organization
- **Sections:** Always include `style` field for variants

### Imports
- **Local:** Use `@/` alias for all project imports
- **Sanity:** Import from `sanity` and specific entry points (`sanity/structure`, `sanity/presentation`)
- **Next.js:** Import from `next/*` and `next-sanity`
- **UI:** Import from `@/components/ui/*`

### Git & Commits
- **Branch naming:** `feature/`, `fix/`, `docs/`, `refactor/`
- **Commit messages:** Conventional Commits format (feat:, fix:, docs:, refactor:, style:, test:)
- **PR reviews:** Verify type safety, test coverage, and documentation updates

---

## Troubleshooting & Known Issues

### Import Conflicts with `sanity/` Directory
- **Problem:** `Cannot find module 'sanity/structure'` or similar
- **Solution:** Never create `sanity/structure/` or `sanity/presentation/` directories
- **Workaround:** All structure config is in `sanity/desk-structure.ts`; resolve config is in `sanity/resolve.ts`

### Turbopack Build Issues
- **Problem:** Unexpected build failures with Turbopack
- **Solution:** Clear `.next` and `node_modules/.vite` cache, then `bun run build`
- **Fallback:** Use standard webpack by removing `--turbopack` from `next.config.ts`

### Sanity Studio Not Loading at `/studio`
- **Problem:** 404 or blank page at `/studio`
- **Solution:** Ensure `sanity.config.ts` is at project root, check `SANITY_STUDIO_PROJECT_ID` env vars
- **Debug:** Check browser console for auth errors or missing tokens

### Visual Editing Not Updating Preview
- **Problem:** Changes in studio don't reflect in preview
- **Solution:** Verify `sanity/resolve.ts` maps frontend elements correctly
- **Check:** Ensure `VisualEditing` component is rendered in draft mode (see `app/layout.tsx`)

---

## Environment Variables

Required variables (see `.env.example` or Sanity dashboard):
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset (usually `production`)
- `SANITY_API_READ_TOKEN` - Read-only token for public content
- `NEXT_PUBLIC_SITE_URL` - Site URL for metadata (e.g., `https://example.com`)

Optional:
- `SANITY_API_WRITE_TOKEN` - Write token for draft mode (on-demand revalidation)
- `SANITY_STUDIO_*` - Studio-specific overrides

---

## Resources & Documentation

### Official Docs
- **Next.js:** https://nextjs.org/docs
- **Sanity:** https://www.sanity.io/docs
- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion/
- **shadcn/ui:** https://ui.shadcn.com

### Related Skills
- `/oh-my-claudecode:sanity-best-practices` - Schema design, GROQ, visual editing
- `/oh-my-claudecode:framer-motion-animator` - Animation patterns
- `/oh-my-claudecode:shadcn` - Component management
- `/oh-my-claudecode:seo-aeo-best-practices` - SEO metadata and Open Graph
- `/oh-my-claudecode:vercel-react-best-practices` - React patterns and performance

### Getting Help
- Check this file first for routing decisions
- Use skill commands for domain-specific help
- Consult official docs before implementing with SDKs
- If blocked, escalate to `executor` (opus) for deep analysis

---

## Summary

**When you see this file, you are working on a Next.js + Sanity landing page builder.** Understand the section architecture, respect the `sanity/` directory naming constraints, use the `@/` import alias, run commands with `bun`, and route complex tasks to specialized agents or skills. The project favors type safety, accessibility, and fast iteration—start with schema definition before component implementation.

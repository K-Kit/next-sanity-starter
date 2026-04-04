<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-04 -->

# Sanity Lib

Sanity client utilities and data fetching helpers.

## Files

- **client.ts** — Sanity client instance configured with projectId, dataset, and apiVersion. Enables CDN for read-only requests. Use for backend operations only; use `sanityFetch()` for frontend.
- **image.ts** — `urlFor()` helper function using `createImageUrlBuilder`. Converts Sanity image objects to URLs with optional width/height params.
- **live.ts** — Real-time content API setup. Exports `defineLive` configuration, `sanityFetch()` function (enables live updates + draft mode), and `SanityLive` component (wraps layout for real-time sync).
- **queries.ts** — All GROQ queries as `defineQuery()` exports. Includes:
  - `PAGE_QUERY` — Fetch page by slug, includes all sections with nested data.
  - `SITE_SETTINGS_QUERY` — Fetch siteSettings singleton (dereferences internal link references in headerNav for mega menu).
  - `ALL_PAGES_SLUGS_QUERY` — Fetch all page slugs for `generateStaticParams()`.

## Key Patterns for AI Agents

**Data fetching (frontend):**
- Always use `sanityFetch()` from `live.ts`, never the raw client.
- `sanityFetch()` automatically enables live preview during draft mode and real-time updates in production.
- Example: `const page = await sanityFetch(PAGE_QUERY, { slug: "home" });`

**Image URLs:**
- Sanity image objects have a structure like `{ _type: "image", asset: { _ref: "..." } }`.
- Convert to URL with: `urlFor(image).url()` or `urlFor(image).width(400).url()`.
- Always check for null/undefined before calling `urlFor()`.

**GROQ queries:**
- All queries are in `queries.ts` using `defineQuery()`.
- `SITE_SETTINGS_QUERY` includes dereference operations to resolve internal link references (e.g. `-> {}` for mega menu links).
- Add new queries to `queries.ts` using the same `defineQuery()` pattern.

**Adding a new query:**
1. Open `sanity/lib/queries.ts`.
2. Use `defineQuery()` to define and validate the GROQ query.
3. Export it: `export const MY_QUERY = defineQuery(\`*[_type == "myType"] { ... }\`);`
4. Use it in pages: `const data = await sanityFetch(MY_QUERY);`

<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-04 -->

# App Directory

Next.js App Router configuration and pages for the site frontend.

## Structure

- **layout.tsx** — Root layout wrapper. Applies fonts (Inter via next/font), ThemeProvider (dark mode toggle with next-themes), SanityLive (real-time preview), and VisualEditing (Sanity presentation tools).
- **page.tsx** — Home page. Fetches the page document with slug "home" from Sanity using `sanityFetch()`. Renders sections via `SectionRenderer`.
- **globals.css** — Tailwind v4 base styles and shadcn theme CSS variables (colors, radius, etc.).
- **[slug]/page.tsx** — Dynamic page routes. Implements `generateStaticParams()` to fetch all page slugs at build time and enable ISR. Uses `generateMetadata()` to render SEO metadata from page and siteSettings (title, description, og:image, noIndex).
- **api/draft-mode/enable/route.ts** — Route to enable Sanity draft mode for visual editing. Validates draft token and sets response cookie.
- **api/draft-mode/disable/route.ts** — Route to disable draft mode and clear cookie.
- **studio/[[...tool]]/page.tsx** — Embeds Sanity Studio (content management UI) in a catch-all route for Studio paths.

## Key Patterns for AI Agents

**Data fetching:**
- All pages use `sanityFetch()` from `@/sanity/lib/live` — this enables live updates and draft mode. Never use the raw client.
- Home page always uses slug "home".
- Dynamic pages fetch by slug param: `sanityFetch(PAGE_QUERY, { slug })`.

**SEO metadata:**
- `generateMetadata()` accepts the `params` object and page slug.
- Fallback to siteSettings values (siteName, siteDescription, ogImage) when page values are undefined.
- Set `robots: { noIndex: seo.noIndex }` when present.

**Styling:**
- Use Tailwind v4 utility classes.
- Import theme variables from CSS for consistency.

**Dark mode:**
- Controlled by next-themes ThemeProvider in layout.
- Users toggle via component with key 'd'.

<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-04 -->

# Documents

Top-level Sanity document type schemas.

## Types

**page.ts**
- Main content type for site pages.
- Fields: title (string), slug (slug), sections (array of section objects), seo (SEO metadata object).
- Field groups: content (title, slug, sections), seo (SEO metadata).
- The `sections` array supports any section type (hero, features, cta, testimonials, faq, logoCloud).
- Each section is rendered by the frontend using `section-renderer.tsx`.

**siteSettings.ts**
- Singleton document for site-wide configuration.
- Fields: siteName (string), siteDescription (string), ogImage (Sanity image), headerNav (array of navMenu objects), footerLinks (array of link objects), socialLinks (array of social links).
- Field groups: general (siteName, siteDescription), navigation (headerNav, footerLinks), social (socialLinks).
- Uses `__experimental_actions: ['update', 'publish']` to prevent deletion and limit to one instance.
- The `headerNav` array supports mega menus (complex nested navItems) and simple links.

## Key Patterns for AI Agents

**Page document:**
- Always has a slug field for URL generation.
- The `sections` array is flexible — add new section types by updating the `objects/sections/` schemas and the sections array type.
- SEO metadata is optional but recommended for all pages.

**siteSettings singleton:**
- Accessed by ID: reference as `*[_id == "siteSettings"][0]` in GROQ queries.
- The `SITE_SETTINGS_QUERY` in `lib/queries.ts` includes dereference operations to resolve internal links in the mega menu.
- Used as fallback for page SEO metadata (siteName, siteDescription, ogImage).

**Adding fields to existing documents:**
- Use `defineField()` to add new fields.
- Add to appropriate field group for UI organization.
- Update GROQ queries to fetch the new fields if needed.

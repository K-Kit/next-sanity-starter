<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-04 -->

# Objects

Reusable Sanity object type schemas for use within documents and other objects.

## Types

**link.ts**
- Simple link object: label (string), href (string URL), isExternal (boolean), style (button style option).
- Used for static links in sections (hero CTA, footer, etc.) and any place that needs a simple URL string.
- Stores the URL as a plain string — ideal for external links or static URLs.

**navItem.ts**
- Navigation item with reference-based links: label (string), internalLink (reference to page document) OR externalLink (string URL).
- Used inside mega menu columns (`megaMenuColumn.ts`) for flexible navigation.
- Supports linking to internal pages via reference (automatic slug resolution) or external URLs.

**navMenu.ts**
- Top-level navigation entry in headerNav: label (string), type (simple or megaMenu).
- If type is "simple": uses a simple `link` object.
- If type is "megaMenu": contains array of `megaMenuColumn` objects.
- Enables rich navigation UIs (mega menus) in headers.

**megaMenuColumn.ts**
- Column within a mega menu: title (string), navItems (array of navItem objects).
- Each column is a logical grouping of related navigation items.
- Used only inside navMenu when type is "megaMenu".

**seo.ts**
- SEO metadata object: metaTitle (string), metaDescription (string), ogImage (Sanity image), noIndex (boolean).
- Used in page documents and as fallback in siteSettings.
- Optional in documents but recommended for all pages.

**sections/** — Section object schemas
- Individual schemas for each section type (hero, features, cta, testimonials, faq, logoCloud).
- Each has a `style` field to support layout variants.
- See `objects/sections/AGENTS.md` for details.

## Key Patterns for AI Agents

**link vs navItem:**
- Use `link` for simple, static URLs (sections, footer, CTAs).
- Use `navItem` for navigation menus that may link to internal pages or external URLs dynamically.
- Don't mix them — `link` stores plain strings, `navItem` stores references.

**References in schemas:**
- Use `type: 'reference'` and `to: [{ type: 'page' }]` for internal page links.
- GROQ query can dereference with `-> {}` to get the full page object (e.g. for slug resolution).
- `SITE_SETTINGS_QUERY` includes dereference operations for nav items.

**Adding fields to objects:**
- Use `defineField()` to add new fields.
- Update frontend components to render the new fields.
- Update GROQ queries if the new fields need to be fetched.

**Creating a new object type:**
1. Create file in `objects/` (or `objects/sections/` for sections).
2. Export using `defineType()`.
3. Register in `schemaTypes/index.ts`.
4. Reference the object in document or other object schemas as `type: 'objectName'`.

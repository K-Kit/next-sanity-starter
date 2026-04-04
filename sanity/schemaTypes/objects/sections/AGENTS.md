<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-04 -->

# Sections

Sanity schema definitions for landing page section types. Each section schema has a `style` field to support multiple layout variants.

## Available Section Schemas

**hero.ts**
- Schema for hero section.
- Fields: headline (string), subheading (string), cta (link object), backgroundImage (Sanity image).
- Style variants: centered, split, minimal.

**features.ts**
- Schema for features section.
- Fields: title (string), description (string), features (array of feature objects with icon/image, title, description).
- Style variants: grid, alternating, cards.

**cta.ts**
- Schema for call-to-action section.
- Fields: heading (string), description (string), primaryCTA (link), secondaryCTA (link).
- Style variants: banner, centered, split.

**testimonials.ts**
- Schema for testimonials section.
- Fields: title (string), testimonials (array of testimonial objects with quote, author, role, image).
- Style variants: carousel, grid, stacked.

**faq.ts**
- Schema for FAQ section.
- Fields: title (string), description (string), faqs (array of objects with question, answer).
- Style variants: accordion, two-column.

**logoCloud.ts**
- Schema for logo grid (clients, partners).
- Fields: title (string), logos (array of objects with logo image, company name).
- Style variants: scroll, grid, minimal.

## Key Patterns for AI Agents

**Style field:**
All section schemas include: `defineField({ name: 'style', type: 'string', options: { list: ['variant1', 'variant2', 'variant3'] }, title: 'Layout Style' })`

**Frontend-backend sync:**
When creating a new section type:
1. Create schema in this file (with style field and appropriate fields).
2. Register in `sanity/schemaTypes/index.ts`.
3. Create React component in `components/sections/<name>.tsx` that accepts the schema data and renders each style variant.
4. Add component to `section-renderer.tsx` map (map `_type` to component).
5. Add the section type to the `sections` array in `documents/page.ts`.

**Nested objects in section schemas:**
Use `defineArrayMember()` with inline object types for arrays within sections (e.g. features array, testimonials array).

Example:
```tsx
defineField({
  name: 'features',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'string' }),
      ],
    }),
  ],
})
```

**Referencing common objects:**
For reusable objects (like `link`), use `type: 'link'` instead of defining inline.

**Image fields in sections:**
Use `type: 'image'` for Sanity images. Frontend uses `urlFor()` to generate URLs.

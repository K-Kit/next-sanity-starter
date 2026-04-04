<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-04 -->

# Schema Types

Sanity schema definitions for documents, objects, and sections.

## Structure

- **index.ts** — Barrel export file. Registers all schema types by importing and re-exporting from subdirectories. All new schema types must be added here.
- **documents/** — Top-level document types (page, siteSettings). These appear as editable content types in Sanity Studio.
- **objects/** — Reusable object types for fields within documents (link, navItem, navMenu, megaMenuColumn, seo, sections).

## Conventions

All schemas use Sanity SDK functions:
- `defineType()` — Define a document or object type.
- `defineField()` — Define a field within a type.
- `defineArrayMember()` — Define a member type in an array field.

Field organization uses `groups` for better UI organization in Studio (e.g. "content", "seo", "navigation").

Add AI-friendly `description` fields to all types and fields for clarity.

## Key Patterns for AI Agents

**Creating a new schema:**
1. Create file in appropriate subdirectory (documents/ or objects/).
2. Use `defineType()`, `defineField()`, `defineArrayMember()`.
3. Export the schema: `export const mySchema = defineType({ ... })`.
4. Register in `index.ts`: add to imports and barrel export.

**Example document schema:**
```tsx
export const page = defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug' }),
  ],
});
```

**Singleton types (like siteSettings):**
- Add to schema definition: `__experimental_actions: ['update', 'publish']` (no create/delete).
- Reference by ID in `desk-structure.ts`.

**Field groups for organization:**
- Use `group: "seo"` to organize related fields in Studio UI.
- Improves editor experience without affecting data structure.

**Adding a new section type:**
1. Create schema in `objects/sections/<name>.ts`.
2. Add `style` field with options (e.g. `options: { list: ['centered', 'split', 'minimal'] }`).
3. Register in `index.ts`.
4. Create corresponding React component in `components/sections/<name>.tsx`.
5. Add to `section-renderer.tsx` map.
6. Add to `documents/page.ts` sections array.

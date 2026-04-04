<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-04 -->

# Sanity

Sanity CMS configuration, schema definitions, and client utilities.

## Structure

- **env.ts** — Environment variable exports: `projectId`, `dataset`, `apiVersion`.
- **desk-structure.ts** — Sanity Studio sidebar configuration. Defines document types visible in the editor (Site Settings singleton, Pages list).
- **resolve.ts** — Presentation tool URL resolver. Maps Sanity documents to their frontend URLs for visual editing preview.
- **lib/** — Client utilities (client instance, image helper, live content API, GROQ queries).
- **schemaTypes/** — All Sanity schema type definitions (documents, objects, sections).

## Critical Constraint for AI Agents

**Directory naming conflict:**
The `sanity/` directory name conflicts with the `sanity` npm package. NEVER create subdirectories named `structure/` or `presentation/` inside this folder — doing so will shadow the `sanity/structure` and `sanity/presentation` package imports at build time and break the build.

The structure file is deliberately named `desk-structure.ts` (not `structure.ts` or in a `structure/` folder) and the resolve file lives at `sanity/resolve.ts` for this reason. Follow this pattern for any new files in this directory.

## Key Patterns for AI Agents

**Working with the client:**
- Use `sanityFetch()` from `@/sanity/lib/live` for all frontend data fetching — it enables live preview and draft mode.
- The raw client in `lib/client.ts` is for backend/server use only.

**Adding new queries:**
- Add GROQ queries to `sanity/lib/queries.ts` using `defineQuery()`.
- Export them for use in pages and components.
- Example: `export const MY_QUERY = defineQuery(\`*[_type == "myType"]\`);`

**Image URLs:**
- Use `urlFor()` from `@/sanity/lib/image.ts` to build image URLs from Sanity image objects.
- Example: `urlFor(image).url()`.

**Adding new schema types:**
1. Create schema file in appropriate subdirectory (documents/, objects/, objects/sections/).
2. Use `defineType()`, `defineField()`, `defineArrayMember()` from Sanity SDK.
3. Register in `sanity/schemaTypes/index.ts` — add to barrel export.
4. For singletons (like siteSettings), use `__experimental_actions` to limit create/delete.

<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-04 -->

# Components

Reusable React components for UI, themes, and page sections.

## Structure

- **theme-provider.tsx** — Dark mode provider using next-themes. Exports `ThemeProvider` wrapper and `ThemeToggle` component (triggers dark/light toggle on key 'd'). Wrap layout in this to enable theme switching globally.
- **sections/** — Landing page section components (hero, features, cta, testimonials, faq, logo-cloud, section-renderer). Each receives Sanity data props and supports `style` variants for layout options.
- **ui/** — shadcn/ui primitive components (button, etc.). Base components for consistent styling.

## Key Patterns for AI Agents

**Section components:**
- Each section receives data from Sanity and a `style` prop (e.g. `style="split"`, `style="grid"`).
- All use framer-motion `whileInView` animations for scroll effects.
- Images use `urlFor()` helper from `@/sanity/lib/image` to build Sanity image URLs.
- Links use Next.js `Link` component + shadcn `Button` with `asChild` prop for flexibility.

**Styling:**
- Use `cn()` from `@/lib/utils` to merge Tailwind classes.
- Reference theme CSS variables for colors (e.g. `var(--background)`, `var(--primary)`).

**Adding new shadcn components:**
- Run `bunx shadcn@latest add <component>` to scaffold and install.
- Place installed components in `ui/`.

**Creating new section types:**
1. Create frontend component in `components/sections/<name>.tsx` (receive data props, render with `style` variants).
2. Create Sanity schema in `sanity/schemaTypes/objects/sections/<name>.ts` (define fields and style options).
3. Register schema in `sanity/schemaTypes/index.ts`.
4. Add to `section-renderer.tsx` map (map `_type` to component).
5. Add to page schema `sections` array in `sanity/schemaTypes/documents/page.ts`.

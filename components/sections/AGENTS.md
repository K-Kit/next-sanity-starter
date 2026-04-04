<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-04 -->

# Sections

Landing page section components for the visual page builder.

## Available Sections

- **hero.tsx** — Hero banner with headline, subheading, and CTA. Style variants: centered, split, minimal.
- **features.tsx** — Feature list with icons/images. Style variants: grid, alternating, cards.
- **cta.tsx** — Call-to-action block. Style variants: banner, centered, split.
- **testimonials.tsx** — Customer testimonials. Style variants: carousel, grid, stacked.
- **faq.tsx** — Frequently asked questions. Style variants: accordion, two-column.
- **logo-cloud.tsx** — Logo grid (clients, partners). Style variants: scroll, grid, minimal.
- **section-renderer.tsx** — Router component. Maps Sanity `_type` to section component, renders sections array from page document.

## Component Signature

All section components follow this pattern:

```tsx
interface SectionProps {
  data: {
    // section-specific fields from Sanity
    style?: string;
  };
}

export default function Section({ data }: SectionProps) {
  // render with framer-motion whileInView
  // use urlFor() for images
  // use Link + Button for CTAs
}
```

## Key Patterns for AI Agents

**Animation:**
- All sections use `framer-motion` with `whileInView` to trigger scroll animations.
- Wrap content in `<motion.div whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} />`.

**Images:**
- Use `urlFor(image).url()` from `@/sanity/lib/image` to generate image URLs from Sanity image objects.
- Pass Sanity image objects, not strings.

**Links & buttons:**
- For external links: use `<Link href={url} target="_blank">`.
- For internal links: use `<Link href={slug}>`.
- Wrap in shadcn `Button` with `asChild` for styling: `<Button asChild><Link>...</Link></Button>`.

**Style variants:**
- Receive `style` prop from Sanity data (e.g. `data.style = "split"`).
- Use conditional rendering to render different layouts: `if (data.style === "split") { ... }`.
- Ensure each variant is responsive (mobile-first Tailwind).

**Updating section-renderer:**
- When adding a new section type, add an entry to the map in `section-renderer.tsx`:
  ```tsx
  const SECTION_MAP: Record<string, React.ComponentType<any>> = {
    hero: Hero,
    features: Features,
    myNewSection: MyNewSection,
  };
  ```

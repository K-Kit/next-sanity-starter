// Run: npx tsx scripts/seed.ts
// Or:  SANITY_API_TOKEN=xxx npx tsx scripts/seed.ts

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'xtjmnuk9',
  dataset: 'production',
  apiVersion: '2026-04-04',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// ---------------------------------------------------------------------------
// Blog Categories
// ---------------------------------------------------------------------------

const categories = [
  {
    _type: 'blogCategory',
    _id: 'category-engineering',
    title: 'Engineering',
    slug: { current: 'engineering' },
    description: 'Technical deep-dives and engineering insights',
  },
  {
    _type: 'blogCategory',
    _id: 'category-design',
    title: 'Design',
    slug: { current: 'design' },
    description: 'UI/UX design principles and case studies',
  },
  {
    _type: 'blogCategory',
    _id: 'category-product',
    title: 'Product',
    slug: { current: 'product' },
    description: 'Product strategy and development updates',
  },
]

// ---------------------------------------------------------------------------
// Blog Posts
// ---------------------------------------------------------------------------

const posts = [
  {
    _type: 'blogPost',
    _id: 'post-design-systems',
    title: 'Building Scalable Design Systems',
    slug: { current: 'building-scalable-design-systems' },
    excerpt:
      'A practical guide to building design systems that scale across teams and products, covering tokens, components, and governance.',
    author: 'Sarah Chen',
    publishedAt: '2026-03-15',
    categories: [
      { _type: 'reference', _ref: 'category-engineering' },
      { _type: 'reference', _ref: 'category-design' },
    ],
    body: [
      {
        _type: 'block',
        _key: 'post1-h2-1',
        style: 'h2',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post1-h2-1-span',
            text: 'Why Design Systems Matter',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post1-block-1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post1-span-1',
            text: 'Design systems have become the backbone of modern product development. They create a shared language between designers and engineers, reducing the cognitive overhead of decision-making and allowing teams to focus on solving user problems rather than debating button border radii. When implemented well, a design system acts as a force multiplier for every team member.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post1-block-2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post1-span-2',
            text: 'The foundation of any scalable design system starts with design tokens — the atomic values that define your visual language. Colors, spacing, typography scales, and motion curves should all be expressed as tokens that flow through every layer of your system. This single-source-of-truth approach means a brand refresh can ripple through an entire product suite with a handful of token value changes.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post1-h2-2',
        style: 'h2',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post1-h2-2-span',
            text: 'Component Architecture and Governance',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post1-block-3',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post1-span-3',
            text: 'Component architecture should follow a clear hierarchy from primitives to patterns to templates. Primitive components like buttons and inputs compose into patterns like forms and cards, which in turn assemble into page-level templates. Each layer should be independently testable and documented with clear usage guidelines and known limitations.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post1-block-4',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post1-span-4',
            text: 'Governance is what separates a design system that thrives from one that slowly becomes shelfware. Establish a clear contribution model, a deprecation process, and regular office hours where product teams can bring their needs directly to the system team. Treating your internal consumers as customers with real feedback loops will keep the system relevant as your product evolves.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _type: 'blogPost',
    _id: 'post-headless-cms',
    title: 'The Future of Content-Driven Websites',
    slug: { current: 'future-of-content-driven-websites' },
    excerpt:
      'Exploring how headless CMS architectures are changing the way teams build, manage, and deliver web content at scale.',
    author: 'Marcus Johnson',
    publishedAt: '2026-03-22',
    categories: [{ _type: 'reference', _ref: 'category-product' }],
    body: [
      {
        _type: 'block',
        _key: 'post2-h2-1',
        style: 'h2',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post2-h2-1-span',
            text: 'The Shift from Monolith to Headless',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post2-block-1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post2-span-1',
            text: 'The traditional CMS model — where content, presentation, and logic are tightly coupled — served the web well for decades. But as content now needs to flow to mobile apps, voice interfaces, digital signage, and AI-generated summaries, the monolithic approach shows its seams. Headless CMS platforms decouple the authoring experience from delivery, treating content as structured data that can be rendered by any consumer.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post2-block-2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post2-span-2',
            text: 'Structured content is the key concept here. Rather than storing HTML blobs, a headless CMS stores content as a graph of typed documents with explicit relationships. A product page is not a wall of markup — it is a document with a title field, a description field, an array of feature references, and a relationship to a pricing tier. This structure makes content portable, queryable, and future-proof.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post2-h2-2',
        style: 'h2',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post2-h2-2-span',
            text: 'What This Means for Marketing and Engineering Teams',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post2-block-3',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post2-span-3',
            text: 'For marketing teams, modern headless platforms offer visual editing experiences that rival traditional page builders. Real-time preview, live collaboration, and content scheduling mean editors no longer need to rely on engineering for routine updates. The authoring experience has caught up with the flexibility of the underlying architecture.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post2-block-4',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post2-span-4',
            text: 'Engineering teams benefit from the clean separation of concerns — they own the frontend stack and can adopt React, Vue, or any framework without negotiating with CMS vendor limitations. Content APIs expose GROQ or GraphQL endpoints that integrate cleanly into existing data fetching patterns. The result is a workflow where both teams operate at full velocity in their respective domains.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _type: 'blogPost',
    _id: 'post-core-web-vitals',
    title: 'Optimizing Core Web Vitals in Next.js',
    slug: { current: 'optimizing-core-web-vitals-nextjs' },
    excerpt:
      'A hands-on guide to diagnosing and improving LCP, INP, and CLS scores in production Next.js applications.',
    author: 'Sarah Chen',
    publishedAt: '2026-03-28',
    categories: [{ _type: 'reference', _ref: 'category-engineering' }],
    body: [
      {
        _type: 'block',
        _key: 'post3-h2-1',
        style: 'h2',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post3-h2-1-span',
            text: 'Understanding the Three Core Metrics',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post3-block-1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post3-span-1',
            text: 'Core Web Vitals are Google\'s set of user-centric performance metrics that directly influence search ranking and user satisfaction. Largest Contentful Paint (LCP) measures loading performance, Interaction to Next Paint (INP) measures responsiveness, and Cumulative Layout Shift (CLS) measures visual stability. Together they paint a clear picture of whether a page feels fast and reliable to real users.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post3-block-2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post3-span-2',
            text: 'LCP is most commonly degraded by unoptimized hero images. In Next.js, the `<Image>` component handles format conversion, responsive sizing, and lazy loading automatically, but you need to add the `priority` prop to above-the-fold images to trigger eager loading. Pair this with explicit `width` and `height` attributes or a `fill` layout to eliminate layout shift and you will address two metrics simultaneously.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post3-h2-2',
        style: 'h2',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post3-h2-2-span',
            text: 'Reducing INP with Deferred Hydration',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post3-block-3',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post3-span-3',
            text: 'INP problems in Next.js applications typically stem from large JavaScript bundles blocking the main thread during hydration. React\'s `use client` boundary should be pushed as deep into the component tree as possible — interactive widgets like dropdowns and modals should be client components, while the surrounding layout remains a server component. This reduces the hydration payload dramatically.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post3-block-4',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post3-span-4',
            text: 'Route-level code splitting is automatic in Next.js, but third-party scripts are a common source of main thread contention that falls outside this boundary. Use the `<Script>` component with `strategy="lazyOnload"` for non-critical scripts like analytics and chat widgets. For critical third-party code, `strategy="afterInteractive"` ensures it loads after the page is interactive without blocking the initial render.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _type: 'blogPost',
    _id: 'post-accessibility-first',
    title: 'Designing for Accessibility First',
    slug: { current: 'designing-for-accessibility-first' },
    excerpt:
      'How adopting an accessibility-first mindset produces better products for everyone, not just users with disabilities.',
    author: 'Alex Rivera',
    publishedAt: '2026-04-01',
    categories: [{ _type: 'reference', _ref: 'category-design' }],
    body: [
      {
        _type: 'block',
        _key: 'post4-h2-1',
        style: 'h2',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post4-h2-1-span',
            text: 'Accessibility Is a Design Constraint, Not an Afterthought',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post4-block-1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post4-span-1',
            text: 'Retrofitting accessibility onto a finished design is expensive and often results in an experience that feels bolted on rather than intentional. When you treat WCAG compliance as a design constraint from day one — like responsive layout or color contrast ratios — the solutions you find are more elegant and often benefit your entire user base. The curb cut effect is real: features built for users with disabilities regularly become features everyone relies on.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post4-block-2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post4-span-2',
            text: 'Color contrast is the most common accessibility failure and the easiest to prevent. A 4.5:1 contrast ratio for normal text and 3:1 for large text are the WCAG AA thresholds, but aiming for AAA (7:1) where possible creates a more comfortable reading experience in bright sunlight and for users with low vision. Tools like Radix Colors are designed with accessible contrast scales baked in, making it easy to build a compliant palette.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post4-h2-2',
        style: 'h2',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post4-h2-2-span',
            text: 'Keyboard Navigation and Focus Management',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post4-block-3',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post4-span-3',
            text: 'Every interactive element in your UI should be reachable and operable via keyboard alone. This means logical tab order that follows the visual flow of the page, visible focus indicators that meet contrast requirements, and proper use of ARIA roles for custom widgets like accordions, dialogs, and comboboxes. Testing with a keyboard before any mouse interaction is one of the highest-signal manual QA steps you can add to your workflow.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'post4-block-4',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'post4-span-4',
            text: 'Focus management in single-page applications deserves special attention. When a dialog opens, focus should move to the first interactive element inside it and be trapped within the dialog until it closes. When a route changes, focus should move to the main content area or page heading so screen reader users get a clear signal that navigation occurred. Libraries like Radix UI handle these patterns correctly out of the box, which is one of the strongest arguments for using a well-maintained headless component library.',
            marks: [],
          },
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

const pages = [
  {
    _type: 'page',
    _id: 'page-home',
    title: 'Home',
    slug: { current: 'home' },
    sections: [
      {
        _type: 'hero',
        _key: 'hero-1',
        eyebrow: 'Welcome to Acme',
        heading: 'Build faster, launch sooner',
        subheading:
          'A modern platform for content-driven websites. Manage your content with Sanity, build with Next.js, and deploy with confidence.',
        style: 'centered',
        links: [
          {
            _type: 'link',
            _key: 'hero-link-1',
            label: 'Get Started',
            href: '/contact',
            isExternal: false,
            style: 'default',
          },
          {
            _type: 'link',
            _key: 'hero-link-2',
            label: 'Learn More',
            href: '/about',
            isExternal: false,
            style: 'outline',
          },
        ],
      },
      {
        _type: 'features',
        _key: 'features-1',
        eyebrow: 'Why Acme',
        heading: 'Everything you need to ship',
        subtitle:
          'From content management to deployment, our platform handles the complexity so you can focus on building great experiences.',
        style: 'grid',
        features: [
          {
            _key: 'feat-1',
            icon: 'Zap',
            title: 'Lightning Fast',
            description:
              'Static generation and edge caching deliver sub-second page loads worldwide.',
          },
          {
            _key: 'feat-2',
            icon: 'Shield',
            title: 'Secure by Default',
            description:
              'Built-in security headers, CSP policies, and automatic HTTPS for every deployment.',
          },
          {
            _key: 'feat-3',
            icon: 'Paintbrush',
            title: 'Visual Editing',
            description:
              'Edit content directly on the page with real-time preview and live collaboration.',
          },
          {
            _key: 'feat-4',
            icon: 'Code',
            title: 'Developer Experience',
            description:
              'TypeScript, hot reload, and a modular architecture that scales with your team.',
          },
          {
            _key: 'feat-5',
            icon: 'Globe',
            title: 'Global CDN',
            description:
              'Content delivered from the edge with automatic image optimization and caching.',
          },
          {
            _key: 'feat-6',
            icon: 'BarChart',
            title: 'Analytics Built In',
            description:
              'Track performance, engagement, and conversions without third-party scripts.',
          },
        ],
      },
      {
        _type: 'testimonials',
        _key: 'testimonials-1',
        heading: 'Trusted by teams everywhere',
        style: 'grid',
        testimonials: [
          {
            _key: 'test-1',
            quote:
              'Switching to Acme cut our development cycle in half. The structured content model means our marketing team can ship landing pages without waiting on engineering.',
            author: 'Jamie Park',
            role: 'VP of Engineering, TechCorp',
          },
          {
            _key: 'test-2',
            quote:
              'The visual editing experience is unmatched. I can make changes and see them instantly — no more guessing what the final page will look like.',
            author: 'Maria Santos',
            role: 'Content Lead, StartupHQ',
          },
          {
            _key: 'test-3',
            quote:
              'We migrated from a legacy CMS in under a week. The developer experience and documentation made it one of the smoothest migrations we have done.',
            author: 'David Kim',
            role: 'CTO, DigitalFirst',
          },
        ],
      },
      {
        _type: 'faq',
        _key: 'faq-1',
        heading: 'Frequently asked questions',
        subtitle: 'Everything you need to know to get started.',
        style: 'accordion',
        items: [
          {
            _key: 'faq-item-1',
            question: 'How do I get started?',
            answer:
              'Sign up for a free account, connect your repository, and deploy your first site in under five minutes. Our quickstart guide walks you through every step.',
          },
          {
            _key: 'faq-item-2',
            question: 'Can I use my own domain?',
            answer:
              'Yes. Add a custom domain in your project settings and we handle SSL certificates automatically. DNS propagation typically takes less than an hour.',
          },
          {
            _key: 'faq-item-3',
            question: 'Is there a free tier?',
            answer:
              'Absolutely. The free tier includes unlimited pages, up to 10,000 monthly visitors, and full access to the visual editor. No credit card required.',
          },
          {
            _key: 'faq-item-4',
            question: 'What frameworks are supported?',
            answer:
              'We support Next.js, Remix, Astro, SvelteKit, and Nuxt out of the box. Any framework that can consume a REST or GraphQL API will work.',
          },
        ],
      },
      {
        _type: 'cta',
        _key: 'cta-1',
        heading: 'Ready to get started?',
        body: 'Join thousands of teams building better websites with structured content. Free to start, scales as you grow.',
        style: 'centered',
        links: [
          {
            _type: 'link',
            _key: 'cta-link-1',
            label: 'Start Building',
            href: '/contact',
            isExternal: false,
            style: 'default',
          },
          {
            _type: 'link',
            _key: 'cta-link-2',
            label: 'View Documentation',
            href: '/docs',
            isExternal: false,
            style: 'outline',
          },
        ],
      },
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Acme — Build faster, launch sooner',
      metaDescription:
        'A modern platform for content-driven websites. Manage your content with Sanity, build with Next.js, and deploy with confidence.',
      noIndex: false,
    },
  },
  {
    _type: 'page',
    _id: 'page-about',
    title: 'About',
    slug: { current: 'about' },
    sections: [
      {
        _type: 'hero',
        _key: 'about-hero-1',
        eyebrow: 'Our Story',
        heading: 'Built by developers, for developers',
        subheading:
          'We started Acme because we were tired of fighting our tools instead of building products. Our mission is to make content-driven development fast, flexible, and enjoyable.',
        style: 'minimal',
        links: [],
      },
      {
        _type: 'features',
        _key: 'about-features-1',
        eyebrow: 'Our Values',
        heading: 'What drives us',
        subtitle: '',
        style: 'alternating',
        features: [
          {
            _key: 'val-1',
            icon: 'Heart',
            title: 'User Obsession',
            description:
              'Every decision starts with the question: does this make our users more productive? If the answer is unclear, we talk to users until it is.',
          },
          {
            _key: 'val-2',
            icon: 'Lightbulb',
            title: 'Simplicity First',
            description:
              'We ship the simplest solution that solves the problem well. Complexity is a last resort, not a default.',
          },
          {
            _key: 'val-3',
            icon: 'Users',
            title: 'Open by Default',
            description:
              'We build in the open, share our roadmap publicly, and contribute to the tools and communities we depend on.',
          },
        ],
      },
      {
        _type: 'cta',
        _key: 'about-cta-1',
        heading: 'Want to join the team?',
        body: 'We are always looking for talented people who care about developer experience and structured content.',
        style: 'banner',
        links: [
          {
            _type: 'link',
            _key: 'about-cta-link-1',
            label: 'View Open Roles',
            href: '/careers',
            isExternal: false,
            style: 'default',
          },
        ],
      },
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'About — Acme',
      metaDescription:
        'Learn about the team and values behind Acme, a modern platform for content-driven websites.',
      noIndex: false,
    },
  },
  {
    _type: 'page',
    _id: 'page-contact',
    title: 'Contact',
    slug: { current: 'contact' },
    sections: [
      {
        _type: 'hero',
        _key: 'contact-hero-1',
        eyebrow: 'Get in Touch',
        heading: 'We would love to hear from you',
        subheading:
          'Whether you have a question about features, pricing, or anything else, our team is ready to answer.',
        style: 'centered',
        links: [],
      },
      {
        _type: 'contactForm',
        _key: 'contact-form-1',
        heading: 'Send us a message',
        description:
          'Fill out the form below and we will get back to you within one business day.',
        successMessage: 'Thank you! We will be in touch soon.',
        style: 'centered',
      },
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Contact — Acme',
      metaDescription:
        'Get in touch with the Acme team. We are happy to answer questions about features, pricing, and partnerships.',
      noIndex: false,
    },
  },
]

// ---------------------------------------------------------------------------
// Header Settings
// ---------------------------------------------------------------------------

const headerSettings = {
  _type: 'headerSettings',
  _id: 'headerSettings',
  logoText: 'Acme',
  navItems: [
    {
      _type: 'navMenu',
      _key: 'nav-1',
      label: 'Features',
      link: [
        {
          _type: 'internalLink',
          _key: 'l1',
          reference: { _type: 'reference', _ref: 'page-home' },
        },
      ],
    },
    {
      _type: 'navMenu',
      _key: 'nav-2',
      label: 'Blog',
      link: [
        {
          _type: 'externalLink',
          _key: 'l2',
          url: 'https://localhost:3000/blog',
        },
      ],
    },
    {
      _type: 'navMenu',
      _key: 'nav-3',
      label: 'About',
      link: [
        {
          _type: 'internalLink',
          _key: 'l3',
          reference: { _type: 'reference', _ref: 'page-about' },
        },
      ],
    },
    {
      _type: 'navMenu',
      _key: 'nav-4',
      label: 'Contact',
      link: [
        {
          _type: 'internalLink',
          _key: 'l4',
          reference: { _type: 'reference', _ref: 'page-contact' },
        },
      ],
    },
  ],
  ctaButton: {
    _type: 'link',
    label: 'Get Started',
    href: '/contact',
    isExternal: false,
    style: 'default',
  },
  sticky: true,
  style: 'default',
}

// ---------------------------------------------------------------------------
// Footer Settings
// ---------------------------------------------------------------------------

const footerSettings = {
  _type: 'footerSettings',
  _id: 'footerSettings',
  logoText: 'Acme',
  description: 'Building the future of content-driven web experiences.',
  navColumns: [
    {
      _key: 'col-1',
      title: 'Product',
      links: [
        {
          _type: 'link',
          _key: 'fl-1',
          label: 'Features',
          href: '/#features',
          isExternal: false,
          style: 'default',
        },
        {
          _type: 'link',
          _key: 'fl-2',
          label: 'Pricing',
          href: '/pricing',
          isExternal: false,
          style: 'default',
        },
        {
          _type: 'link',
          _key: 'fl-3',
          label: 'Blog',
          href: '/blog',
          isExternal: false,
          style: 'default',
        },
      ],
    },
    {
      _key: 'col-2',
      title: 'Company',
      links: [
        {
          _type: 'link',
          _key: 'fl-4',
          label: 'About',
          href: '/about',
          isExternal: false,
          style: 'default',
        },
        {
          _type: 'link',
          _key: 'fl-5',
          label: 'Careers',
          href: '/careers',
          isExternal: false,
          style: 'default',
        },
        {
          _type: 'link',
          _key: 'fl-6',
          label: 'Contact',
          href: '/contact',
          isExternal: false,
          style: 'default',
        },
      ],
    },
    {
      _key: 'col-3',
      title: 'Resources',
      links: [
        {
          _type: 'link',
          _key: 'fl-7',
          label: 'Documentation',
          href: '/docs',
          isExternal: false,
          style: 'default',
        },
        {
          _type: 'link',
          _key: 'fl-8',
          label: 'Help Center',
          href: '/help',
          isExternal: false,
          style: 'default',
        },
        {
          _type: 'link',
          _key: 'fl-9',
          label: 'Status',
          href: '/status',
          isExternal: false,
          style: 'default',
        },
      ],
    },
  ],
  bottomLinks: [
    {
      _type: 'link',
      _key: 'bl-1',
      label: 'Privacy Policy',
      href: '/privacy',
      isExternal: false,
      style: 'default',
    },
    {
      _type: 'link',
      _key: 'bl-2',
      label: 'Terms of Service',
      href: '/terms',
      isExternal: false,
      style: 'default',
    },
  ],
  socialLinks: [
    { _key: 'sl-1', platform: 'twitter', url: 'https://twitter.com/acme' },
    { _key: 'sl-2', platform: 'github', url: 'https://github.com/acme' },
    {
      _key: 'sl-3',
      platform: 'linkedin',
      url: 'https://linkedin.com/company/acme',
    },
  ],
  copyrightText: '© 2026 Acme Inc. All rights reserved.',
  style: 'default',
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: SANITY_API_TOKEN environment variable is not set.')
    console.error('Usage: SANITY_API_TOKEN=xxx npx tsx scripts/seed.ts')
    process.exit(1)
  }

  console.log('Seeding Sanity dataset...\n')

  const tx = client.transaction()

  console.log(`Adding ${categories.length} blog categories...`)
  for (const category of categories) {
    tx.createOrReplace(category)
  }

  console.log(`Adding ${posts.length} blog posts...`)
  for (const post of posts) {
    tx.createOrReplace(post)
  }

  console.log(`Adding ${pages.length} pages...`)
  for (const page of pages) {
    tx.createOrReplace(page as any)
  }

  console.log('Adding header settings...')
  tx.createOrReplace(headerSettings)

  console.log('Adding footer settings...')
  tx.createOrReplace(footerSettings)

  try {
    const result = await tx.commit()
    console.log(`\nDone! Committed ${result.results.length} documents.`)
    console.log(
      'Document IDs:',
      result.results.map((r) => r.id),
    )
  } catch (err) {
    console.error('\nFailed to commit transaction:', err)
    process.exit(1)
  }
}

main()

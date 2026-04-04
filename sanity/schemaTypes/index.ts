import { type SchemaTypeDefinition } from 'sanity'

// Documents
import { blogCategory } from './documents/blogCategory'
import { blogPost } from './documents/blogPost'
import { footerSettings } from './documents/footerSettings'
import { headerSettings } from './documents/headerSettings'
import { page } from './documents/page'
import { siteSettings } from './documents/siteSettings'

// Objects
import { link } from './objects/link'
import { megaMenuColumn } from './objects/megaMenuColumn'
import { navItem } from './objects/navItem'
import { navMenu } from './objects/navMenu'
import { seo } from './objects/seo'

// Sections
import { cta } from './objects/sections/cta'
import { faq } from './objects/sections/faq'
import { features } from './objects/sections/features'
import { hero } from './objects/sections/hero'
import { logoCloud } from './objects/sections/logoCloud'
import { contactForm } from './objects/sections/contactForm'
import { testimonials } from './objects/sections/testimonials'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    blogCategory,
    blogPost,
    footerSettings,
    headerSettings,
    page,
    siteSettings,
    // Objects
    link,
    navItem,
    navMenu,
    megaMenuColumn,
    seo,
    // Sections
    contactForm,
    hero,
    features,
    cta,
    testimonials,
    faq,
    logoCloud,
  ],
}

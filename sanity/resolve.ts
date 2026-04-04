import {defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    siteSettings: defineLocations({
      message: 'This document is used on all pages',
      tone: 'caution',
    }),
    headerSettings: defineLocations({
      message: 'This document affects the header on all pages',
      tone: 'caution',
      locations: [{ title: 'Home', href: '/' }],
    }),
    footerSettings: defineLocations({
      message: 'This document affects the footer on all pages',
      tone: 'caution',
      locations: [{ title: 'Home', href: '/' }],
    }),
    page: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: doc?.slug === 'home' ? '/' : `/${doc?.slug}`,
          },
        ],
      }),
    }),
    blogPost: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled post',
            href: `/blog/${doc?.slug}`,
          },
        ],
      }),
    }),
  },
}

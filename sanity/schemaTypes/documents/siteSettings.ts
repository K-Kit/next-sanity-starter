import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      description: 'The name of your website or product. Used in the browser tab, SEO metadata, and default social share titles.',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      group: 'general',
      description: 'A short description of what your site is about. Used as the default meta description on pages that do not have their own.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default OG Image',
      type: 'image',
      group: 'general',
      description: 'The fallback image used when a page is shared on social media and has no specific OG image set. Recommended size: 1200x630px.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
    },
    prepare({ title }) {
      return {
        title: title || 'Site Settings',
      }
    },
  },
})

// Singleton: restricts Studio to update and publish only (no create/delete).
// __experimental_actions is not in the public TS types so we assign at runtime.
;(siteSettings as Record<string, unknown>).__experimental_actions = ['update', 'publish']

import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'social', title: 'Social' },
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
    defineField({
      name: 'headerNav',
      title: 'Header Navigation',
      type: 'array',
      group: 'navigation',
      description: 'Top-level navigation items. Each can be a simple link or a mega menu dropdown with columns of grouped links.',
      of: [defineArrayMember({ type: 'navMenu' })],
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      group: 'navigation',
      description: 'Navigation links shown in the site footer. Typically includes legal pages, support links, and secondary navigation.',
      of: [defineArrayMember({ type: 'link' })],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
      description: 'Links to your social media profiles. These are typically displayed as icons in the header or footer.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              description: 'The social media platform.',
              options: {
                list: [
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Instagram', value: 'instagram' },
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'The full URL to your profile on this platform, e.g. https://twitter.com/yourusername.',
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        }),
      ],
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

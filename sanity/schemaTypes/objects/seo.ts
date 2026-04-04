import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  groups: [
    { name: 'seo', title: 'SEO', default: true },
  ],
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      description: 'The page title shown in search engine results and browser tabs. Keep it under 60 characters and include the primary keyword.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'A concise summary of the page content shown in search results. Should be compelling, include the primary keyword, and be under 160 characters.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      group: 'seo',
      description: 'The image displayed when this page is shared on social media. Recommended size is 1200x630 pixels.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      group: 'seo',
      description: 'When enabled, this page will be excluded from search engine indexes. Use for staging pages, thank-you pages, or duplicate content.',
      initialValue: false,
    }),
  ],
})

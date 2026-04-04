import { defineArrayMember, defineField, defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The internal name for this page used in the Sanity studio. Also used as the default page title if no SEO title is set.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'The URL path for this page, e.g. /about or /pricing. Generated automatically from the title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      description: 'The page content built from modular sections. Add, reorder, and configure sections to build the page layout.',
      of: [
        defineArrayMember({ type: 'hero', title: 'Hero' }),
        defineArrayMember({ type: 'features', title: 'Features' }),
        defineArrayMember({ type: 'cta', title: 'CTA' }),
        defineArrayMember({ type: 'testimonials', title: 'Testimonials' }),
        defineArrayMember({ type: 'faq', title: 'FAQ' }),
        defineArrayMember({ type: 'logoCloud', title: 'Logo Cloud' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
      description: 'Search engine optimization settings for this page. Leave blank to inherit from site settings.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled page',
        subtitle: slug ? `/${slug}` : 'No slug set',
      }
    },
  },
})

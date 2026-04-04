import { defineArrayMember, defineField, defineType } from 'sanity'

export const testimonials = defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'options', title: 'Options' },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
      description: 'The section heading displayed above the testimonials, e.g. "What our customers say" or "Trusted by thousands".',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      group: 'content',
      description: 'A collection of customer quotes. Aim for 3–6 testimonials that represent diverse use cases or personas.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonialItem',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              description: 'The customer\'s exact words. Focus on specific outcomes or benefits they experienced. Keep it authentic and concise.',
            }),
            defineField({
              name: 'author',
              title: 'Author',
              type: 'string',
              description: 'The full name of the person giving the testimonial.',
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              description: 'The author\'s job title and company, e.g. "CEO at Acme Corp". This adds credibility to the testimonial.',
            }),
            defineField({
              name: 'avatar',
              title: 'Avatar',
              type: 'image',
              description: 'A headshot or profile photo of the testimonial author. Use a square or circular crop for best results.',
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'role',
              media: 'avatar',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      group: 'options',
      description: 'Controls how testimonials are displayed. "Carousel" auto-scrolls through them, "Grid" shows all at once in columns, "Stacked" shows them in a single column.',
      options: {
        list: [
          { title: 'Carousel', value: 'carousel' },
          { title: 'Grid', value: 'grid' },
          { title: 'Stacked', value: 'stacked' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'style',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Testimonials',
        subtitle: subtitle ? `Style: ${subtitle}` : 'Testimonials section',
      }
    },
  },
})

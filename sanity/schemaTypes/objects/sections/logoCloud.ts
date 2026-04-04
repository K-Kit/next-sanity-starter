import { defineArrayMember, defineField, defineType } from 'sanity'

export const logoCloud = defineType({
  name: 'logoCloud',
  title: 'Logo Cloud',
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
      description: 'Optional label displayed above the logos, e.g. "Trusted by teams at" or "Used by leading companies".',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      group: 'content',
      description: 'Company or partner logos to display. Use recognizable brands your target audience will know.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'logoItem',
          fields: [
            defineField({
              name: 'name',
              title: 'Company Name',
              type: 'string',
              description: 'The name of the company or organization. Used as the image alt text for accessibility.',
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              description: 'The company logo image. SVG or PNG with a transparent background works best. Use the horizontal lockup variant.',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'url',
              description: 'Optional link to the company\'s website. When provided, the logo will be clickable.',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
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
      description: 'Controls how logos are displayed. "Scroll" creates an infinite marquee animation, "Grid" arranges logos in a static grid, "Minimal" shows a simple row.',
      options: {
        list: [
          { title: 'Scroll', value: 'scroll' },
          { title: 'Grid', value: 'grid' },
          { title: 'Minimal', value: 'minimal' },
        ],
        layout: 'radio',
      },
      initialValue: 'scroll',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'style',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Logo Cloud',
        subtitle: subtitle ? `Style: ${subtitle}` : 'Logo cloud section',
      }
    },
  },
})

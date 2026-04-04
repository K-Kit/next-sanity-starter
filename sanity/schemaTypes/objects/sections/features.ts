import { defineArrayMember, defineField, defineType } from 'sanity'

export const features = defineType({
  name: 'features',
  title: 'Features',
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'options', title: 'Options' },
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'content',
      description: 'A short label above the heading to frame the features section, e.g. "Everything you need" or "Key capabilities".',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
      description: 'The main title for the features section. Summarize what makes this product or service valuable.',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Optional supporting text beneath the heading that provides additional context about the features listed.',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      group: 'content',
      description: 'Individual feature items. Each should highlight one specific capability or benefit.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'featureItem',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'An icon identifier or emoji representing this feature visually, e.g. "bolt", "shield", or "⚡".',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'The feature name. Keep it short and descriptive, e.g. "Real-time sync" or "99.9% uptime".',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'A brief explanation of this feature and why it matters to the user. Aim for 1–2 sentences.',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
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
      description: 'Controls how features are displayed. "Grid" shows them in a uniform grid, "Alternating" alternates image and text rows, "Cards" uses elevated card components.',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Alternating', value: 'alternating' },
          { title: 'Cards', value: 'cards' },
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
        title: title || 'Features',
        subtitle: subtitle ? `Style: ${subtitle}` : 'Features section',
      }
    },
  },
})

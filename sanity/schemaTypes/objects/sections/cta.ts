import { defineArrayMember, defineField, defineType } from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'CTA',
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
      description: 'The CTA headline. Use urgency or benefit-driven language to encourage action, e.g. "Start your free trial today".',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Supporting text that reinforces the CTA. Address any last objections or restate the key benefit.',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      group: 'content',
      description: 'Action buttons for this section. Include a primary CTA and optionally a secondary link for users who need more information.',
      of: [defineArrayMember({ type: 'link' })],
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      group: 'options',
      description: 'Controls the visual layout. "Banner" is a full-width bar, "Centered" stacks everything in the middle, "Split" places text and actions side by side.',
      options: {
        list: [
          { title: 'Banner', value: 'banner' },
          { title: 'Centered', value: 'centered' },
          { title: 'Split', value: 'split' },
        ],
        layout: 'radio',
      },
      initialValue: 'centered',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'style',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'CTA',
        subtitle: subtitle ? `Style: ${subtitle}` : 'CTA section',
      }
    },
  },
})

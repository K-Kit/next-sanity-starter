import { defineArrayMember, defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'options', title: 'Options' },
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'content',
      description: 'A short label displayed above the heading to provide context or category, e.g. "New feature" or "Introducing".',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
      description: 'The primary headline of the hero section. Should be concise, benefit-focused, and capture attention immediately.',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Supporting text beneath the heading. Expand on the headline by describing key benefits or what the user can expect.',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      group: 'content',
      description: 'Call-to-action buttons displayed in the hero. The first link is typically the primary CTA.',
      of: [defineArrayMember({ type: 'link' })],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'media',
      description: 'The hero image or product screenshot. For split layouts this appears beside the text; for centered it appears below.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      group: 'options',
      description: 'Controls the visual layout of the hero. "Centered" stacks content centrally, "Split" places text and image side by side, "Minimal" shows text only.',
      options: {
        list: [
          { title: 'Centered', value: 'centered' },
          { title: 'Split', value: 'split' },
          { title: 'Minimal', value: 'minimal' },
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
        title: title || 'Hero',
        subtitle: subtitle ? `Style: ${subtitle}` : 'Hero section',
      }
    },
  },
})

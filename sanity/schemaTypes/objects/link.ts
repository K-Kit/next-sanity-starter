import { defineField, defineType } from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The visible text of the link. Use action-oriented language like "Get started" or "Learn more".',
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      description: 'The destination URL. Use a relative path (e.g. /about) for internal pages or a full URL for external links.',
    }),
    defineField({
      name: 'isExternal',
      title: 'Open in new tab',
      type: 'boolean',
      description: 'When enabled, the link will open in a new browser tab. Recommended for external URLs.',
      initialValue: false,
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      description: 'The visual style of the link when rendered as a button. "Default" is the primary filled style.',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Outline', value: 'outline' },
          { title: 'Ghost', value: 'ghost' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'href',
    },
  },
})

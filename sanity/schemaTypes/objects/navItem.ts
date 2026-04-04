import { defineField, defineType } from 'sanity'

export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The visible text for this navigation link.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'array',
      description: 'Choose an internal page reference or an external URL.',
      validation: (rule) => rule.max(1).required(),
      of: [
        {
          name: 'internalLink',
          type: 'object',
          title: 'Internal Link',
          fields: [
            defineField({
              name: 'reference',
              title: 'Page',
              type: 'reference',
              to: [{ type: 'page' }],
              description: 'Select an internal page. The URL will stay in sync if the slug changes.',
            }),
          ],
          preview: {
            select: { title: 'reference.title' },
            prepare({ title }) {
              return { title: title || 'Untitled page', subtitle: 'Internal link' }
            },
          },
        },
        {
          name: 'externalLink',
          type: 'object',
          title: 'External Link',
          fields: [
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'A full external URL, e.g. https://example.com.',
              validation: (rule) =>
                rule.required().uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
            }),
          ],
          preview: {
            select: { title: 'url' },
            prepare({ title }) {
              return { title: title || 'No URL', subtitle: 'External link' }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      description: 'Open this link in a new browser tab. Recommended for external URLs.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      internalTitle: 'link.0.reference.title',
      externalUrl: 'link.0.url',
    },
    prepare({ title, internalTitle, externalUrl }) {
      const subtitle = internalTitle
        ? `→ ${internalTitle}`
        : externalUrl
          ? `→ ${externalUrl}`
          : 'No link set'
      return { title: title || 'Untitled', subtitle }
    },
  },
})

import { defineArrayMember, defineField, defineType } from 'sanity'

export const navMenu = defineType({
  name: 'navMenu',
  title: 'Navigation Menu',
  type: 'object',
  description: 'A top-level navigation item that can be a simple link or a mega menu dropdown with columns of links.',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The text shown in the navigation bar for this menu item.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Direct Link',
      type: 'array',
      description: 'Optional: link this item directly to a page. Leave empty if this item opens a mega menu dropdown instead.',
      validation: (rule) => rule.max(1),
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
            }),
          ],
          preview: {
            select: { title: 'reference.title' },
            prepare({ title }) {
              return { title: title || 'Untitled page', subtitle: 'Internal' }
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
              validation: (rule) =>
                rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
            }),
          ],
          preview: {
            select: { title: 'url' },
            prepare({ title }) {
              return { title: title || 'No URL', subtitle: 'External' }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'columns',
      title: 'Mega Menu Columns',
      type: 'array',
      description: 'Add columns of grouped links to create a mega menu dropdown. If columns are present, the "Direct Link" is used as a fallback for the label click.',
      of: [defineArrayMember({ type: 'megaMenuColumn' })],
    }),
  ],
  preview: {
    select: {
      title: 'label',
      columns: 'columns',
    },
    prepare({ title, columns }) {
      const isMegaMenu = columns?.length > 0
      return {
        title: title || 'Untitled',
        subtitle: isMegaMenu
          ? `Mega menu · ${columns.length} column${columns.length === 1 ? '' : 's'}`
          : 'Simple link',
      }
    },
  },
})

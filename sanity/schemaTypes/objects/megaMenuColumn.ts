import { defineArrayMember, defineField, defineType } from 'sanity'

export const megaMenuColumn = defineType({
  name: 'megaMenuColumn',
  title: 'Mega Menu Column',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Column Title',
      type: 'string',
      description: 'The heading shown above this group of links in the mega menu dropdown.',
    }),
    defineField({
      name: 'items',
      title: 'Links',
      type: 'array',
      description: 'The links displayed in this column.',
      of: [defineArrayMember({ type: 'navItem' })],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      return {
        title: title || 'Untitled column',
        subtitle: items?.length ? `${items.length} link${items.length === 1 ? '' : 's'}` : 'Empty',
      }
    },
  },
})

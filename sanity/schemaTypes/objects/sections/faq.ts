import { defineArrayMember, defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
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
      description: 'The FAQ section title, e.g. "Frequently asked questions" or "Got questions? We have answers."',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      group: 'content',
      description: 'Optional supporting text below the heading. You can direct users to contact support if their question is not listed.',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      group: 'content',
      description: 'Individual FAQ items. Prioritize questions that reduce friction or address common objections in the sales process.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              description: 'A common question your customers ask. Write it in first-person from the customer\'s perspective, e.g. "How do I cancel my subscription?"',
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              description: 'A clear, direct answer to the question. Be concise but complete. Link to relevant documentation where appropriate.',
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
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
      description: 'Controls the FAQ layout. "Accordion" collapses answers until clicked for a compact view, "Two-column" shows questions and answers side by side.',
      options: {
        list: [
          { title: 'Accordion', value: 'accordion' },
          { title: 'Two Column', value: 'two-column' },
        ],
        layout: 'radio',
      },
      initialValue: 'accordion',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'style',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'FAQ',
        subtitle: subtitle ? `Style: ${subtitle}` : 'FAQ section',
      }
    },
  },
})

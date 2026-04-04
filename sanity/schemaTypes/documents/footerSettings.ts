import { defineArrayMember, defineField, defineType } from 'sanity'
import { LayoutPanelTopIcon } from 'lucide-react'

export const footerSettings = defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  icon: LayoutPanelTopIcon,
  groups: [
    { name: 'branding', title: 'Branding', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'social', title: 'Social' },
    { name: 'options', title: 'Options' },
  ],
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'branding',
      description: 'The logo image displayed in the footer.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      group: 'branding',
      description: 'Fallback text displayed when no logo image is set.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'branding',
      description: 'A short company or site description shown in the footer.',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'branding',
      description: 'Copyright line shown at the bottom of the footer, e.g. "© 2026 Company. All rights reserved."',
    }),
    defineField({
      name: 'navColumns',
      title: 'Navigation Columns',
      type: 'array',
      group: 'navigation',
      description: 'Columns of grouped links displayed in the footer.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navColumn',
          title: 'Column',
          fields: [
            defineField({
              name: 'title',
              title: 'Column Title',
              type: 'string',
              description: 'The heading for this column of links.',
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              description: 'The links in this column.',
              of: [defineArrayMember({ type: 'link' })],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              links: 'links',
            },
            prepare({ title, links }) {
              return {
                title: title || 'Untitled column',
                subtitle: links?.length ? `${links.length} link${links.length === 1 ? '' : 's'}` : 'No links',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'bottomLinks',
      title: 'Bottom Links',
      type: 'array',
      group: 'navigation',
      description: 'Links shown in the footer bottom bar, e.g. Privacy Policy, Terms of Service.',
      of: [defineArrayMember({ type: 'link' })],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
      description: 'Links to your social media profiles displayed as icons in the footer.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              description: 'The social media platform.',
              options: {
                list: [
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'TikTok', value: 'tiktok' },
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'The full URL to your profile on this platform.',
              validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
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
      description: 'The layout style for the footer.',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Minimal', value: 'minimal' },
          { title: 'Centered', value: 'centered' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      logoText: 'logoText',
      media: 'logo',
    },
    prepare({ logoText, media }) {
      return {
        title: logoText || 'Footer Settings',
        media,
      }
    },
  },
})

// Singleton: restricts Studio to update and publish only (no create/delete).
// __experimental_actions is not in the public TS types so we assign at runtime.
;(footerSettings as Record<string, unknown>).__experimental_actions = ['update', 'publish']

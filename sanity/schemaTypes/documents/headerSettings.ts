import { defineArrayMember, defineField, defineType } from 'sanity'
import { MenuIcon } from 'lucide-react'

export const headerSettings = defineType({
  name: 'headerSettings',
  title: 'Header Settings',
  type: 'document',
  icon: MenuIcon,
  groups: [
    { name: 'branding', title: 'Branding', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'options', title: 'Options' },
  ],
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'branding',
      description: 'The logo image displayed in the header.',
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
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      group: 'navigation',
      description: 'Top-level navigation items. Each can be a simple link or a mega menu dropdown with columns of links.',
      of: [defineArrayMember({ type: 'navMenu' })],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'link',
      group: 'navigation',
      description: 'Optional call-to-action button displayed in the header navigation.',
    }),
    defineField({
      name: 'sticky',
      title: 'Sticky Header',
      type: 'boolean',
      group: 'options',
      description: 'Keep the header fixed at the top of the page as the user scrolls.',
      initialValue: true,
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      group: 'options',
      description: 'The layout style for the header.',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Centered', value: 'centered' },
          { title: 'Minimal', value: 'minimal' },
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
        title: logoText || 'Header Settings',
        media,
      }
    },
  },
})

// Singleton: restricts Studio to update and publish only (no create/delete).
// __experimental_actions is not in the public TS types so we assign at runtime.
;(headerSettings as Record<string, unknown>).__experimental_actions = ['update', 'publish']

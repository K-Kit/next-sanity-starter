import type {StructureResolver} from 'sanity/structure'
import {FileTextIcon, MenuIcon, PanelBottomIcon, Settings2Icon} from 'lucide-react'
import {BookIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(Settings2Icon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Header')
        .icon(MenuIcon)
        .child(
          S.document()
            .schemaType('headerSettings')
            .documentId('headerSettings')
        ),
      S.listItem()
        .title('Footer')
        .icon(PanelBottomIcon)
        .child(
          S.document()
            .schemaType('footerSettings')
            .documentId('footerSettings')
        ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(FileTextIcon)
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Blog')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Posts')
                .icon(FileTextIcon)
                .child(S.documentTypeList('blogPost').title('Posts')),
              S.listItem()
                .title('Categories')
                .child(S.documentTypeList('blogCategory').title('Categories')),
            ])
        ),
    ])

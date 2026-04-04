import type {StructureResolver} from 'sanity/structure'
import {FileTextIcon, Settings2Icon} from 'lucide-react'

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
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(FileTextIcon)
        .child(S.documentTypeList('page').title('Pages')),
    ])

import {MdMenuBook} from 'react-icons/md'
import type {StructureBuilder} from 'sanity/structure'

import {EditorGuideView} from '../EditorGuideView'

export function editorGuideListItem(S: StructureBuilder) {
  return S.listItem()
    .title('Editor guide')
    .icon(MdMenuBook)
    .child(
      S.component()
        .component(EditorGuideView)
        .title('Editor guide')
        .id('editorGuide'),
    )
}

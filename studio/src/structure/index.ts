import {BsSignpostSplit} from 'react-icons/bs'
import {GiCobweb, GiSettingsKnobs} from 'react-icons/gi'
import {GoHome, GoMegaphone} from 'react-icons/go'
import {GiPhotoCamera} from 'react-icons/gi'
import {MdCollections, MdPhoto, MdPhotoAlbum} from 'react-icons/md'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

import {editorGuideListItem} from '../guide/structure/editorGuide'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const SINGLETONS = [
  {name: 'home', title: 'Home', icon: GoHome, documentId: 'home'},
  {name: 'settings', title: 'Settings and Menus', icon: GiSettingsKnobs, documentId: 'siteSettings'},
  {name: 'blogLandingPage', title: 'Blog', icon: GoMegaphone, documentId: 'blogLandingPage'},
]

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Singletons at the top
      ...SINGLETONS.map((singleton) =>
        S.listItem()
          .title(singleton.title)
          .icon(singleton.icon)
          .child(S.document().schemaType(singleton.name).documentId(singleton.documentId)),
      ),
      S.divider(),
      // Pages
      S.listItem()
        .title('Pages')
        .icon(GiCobweb)
        .child(S.documentTypeList('page').title('Pages')),
      // Posts
      S.listItem()
        .title('Posts')
        .icon(BsSignpostSplit)
        .child(S.documentTypeList('post').title('Posts')),
      // Gear
      S.listItem()
        .title('Gear')
        .icon(GiPhotoCamera)
        .child(S.documentTypeList('gear').title('Gear')),
      S.listItem()
        .title('Photo Library')
        .icon(MdPhotoAlbum)
        .child(
          S.list()
            .title('Photo Library')
            .items([
              S.listItem()
                .title('All Photos')
                .icon(MdPhoto)
                .child(S.documentTypeList('photo').title('All Photos')),
              S.divider(),
              S.listItem()
                .title('Collections')
                .icon(MdCollections)
                .child(
                  S.documentTypeList('collection')
                    .title('Collections')
                    .child((collectionId) =>
                      S.documentList()
                        .title('Photos in Collection')
                        .schemaType('photo')
                        .filter(
                          '_type == "photo" && $collectionId in collections[]._ref',
                        )
                        .params({collectionId})
                    ),
                ),
            ]),
        ),
      S.divider(),
      editorGuideListItem(S),
    ])

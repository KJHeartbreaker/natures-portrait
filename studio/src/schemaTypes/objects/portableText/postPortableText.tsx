import {BsCardText} from 'react-icons/bs'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {mainPortableTextMembers, portableTextPreview} from './mainPortableText'

/**
 * Rich text for journal posts. Posts have no page builder, so this editor adds
 * the layout pieces a post body needs on top of the shared text features.
 * Pages build these layouts from blocks instead, so keep these out of `mainPortableText`.
 *
 * Stored at `body.portableTextBlock`, the same shape as `mainPortableText`, so
 * posts written before this type existed need no migration.
 */
export const postPortableText = defineType({
  type: 'object',
  name: 'postPortableText',
  title: 'Post Body',
  icon: BsCardText,
  fields: [
    defineField({
      name: 'portableTextBlock',
      type: 'array',
      of: [...mainPortableTextMembers, defineArrayMember({type: 'photoGridContainer'})],
    }),
  ],
  preview: portableTextPreview,
})

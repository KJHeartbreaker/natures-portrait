import {sanityFetch} from '@/sanity/lib/live'
import {autoGalleryQuery} from '@/sanity/lib/queries'
import AutoGallery from '@/app/components/AutoGallery'
import type {ExtractPageSectionType} from '@/sanity/lib/types'

type Props = {
  block: ExtractPageSectionType<'autoGallery'>
}

export default async function AutoGallerySection({block}: Props) {
  if (block.disabled) return null
  const {data} = await sanityFetch({query: autoGalleryQuery})
  if (!data) return null
  return (
    <AutoGallery
      photos={(data.photos ?? []) as Parameters<typeof AutoGallery>[0]['photos']}
      collections={(data.collections ?? []) as Parameters<typeof AutoGallery>[0]['collections']}
    />
  )
}

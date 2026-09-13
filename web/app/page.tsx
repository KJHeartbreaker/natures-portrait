import PageBuilder from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {autoGalleryQuery, homeQuery} from '@/sanity/lib/queries'
import type {PageBuilderInput} from '@/sanity/lib/types'

export default async function Page() {
  const {data: home} = await sanityFetch({query: homeQuery})

  const hasAutoGallery = home?.content?.some((b) => b._type === 'autoGallery' && !b.disabled)
  const autoGalleryData = hasAutoGallery
    ? (await sanityFetch({query: autoGalleryQuery, stega: false})).data
    : null

  // home and GetPageQueryResult share identical content[] projections — the cast is safe.
  return <PageBuilder page={home as PageBuilderInput} autoGalleryData={autoGalleryData} />
}

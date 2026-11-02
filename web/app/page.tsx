import type {Metadata} from 'next'

import PageBuilder from '@/app/components/PageBuilder'
import {seoMetadata} from '@/app/lib/seo'
import {sanityFetch} from '@/sanity/lib/live'
import {autoGalleryQuery, homeMetaQuery, homeQuery} from '@/sanity/lib/queries'
import type {PageBuilderInput} from '@/sanity/lib/types'

export async function generateMetadata(): Promise<Metadata> {
  const {data: home} = await sanityFetch({query: homeMetaQuery, stega: false})
  const meta = seoMetadata(home?.seo)
  return home?.seo?.seoTitle ? {...meta, title: {absolute: home.seo.seoTitle}} : meta
}

export default async function Page() {
  const {data: home} = await sanityFetch({query: homeQuery})

  const hasAutoGallery = home?.content?.some((b) => b._type === 'autoGallery' && !b.disabled)
  const autoGalleryData = hasAutoGallery
    ? (await sanityFetch({query: autoGalleryQuery, stega: false})).data
    : null

  // home and GetPageQueryResult share identical content[] projections — the cast is safe.
  return <PageBuilder page={home as PageBuilderInput} autoGalleryData={autoGalleryData} />
}

import {notFound} from 'next/navigation'

import PhotoGrid from '@/app/components/PhotoGrid'
import SectionEyebrow from '@/app/components/SectionEyebrow'
import {sanityFetch} from '@/sanity/lib/live'
import {getCollectionQuery} from '@/sanity/lib/queries'

type Props = {
  params: Promise<{slug: string}>
}

export default async function CollectionPage({params}: Props) {
  const {slug} = await params
  const {data: collection} = await sanityFetch({
    query: getCollectionQuery,
    params: {slug},
  })

  if (!collection) notFound()

  return (
    <div className="container pt-32 pb-24 md:pt-40">
      <SectionEyebrow label="Series" />
      <h1
        className="font-serif font-light text-luxe-noir mb-12"
        style={{fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.08}}
      >
        {collection.title}
      </h1>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PhotoGrid images={(collection.photos ?? []) as any[]} columns={3} gap={12} showCaptions />
    </div>
  )
}

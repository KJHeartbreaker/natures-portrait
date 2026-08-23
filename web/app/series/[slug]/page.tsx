import {notFound} from 'next/navigation'
import type {PortableTextBlock} from 'next-sanity'

import PhotoGrid from '@/app/components/PhotoGrid'
import PortableText from '@/app/components/PortableText'
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

  const descriptionBlocks = collection.description?.portableTextBlock as
    | PortableTextBlock[]
    | undefined

  return (
    <main>
      <div className="container pt-24 pb-8">
        <div className="mb-2 flex items-center gap-4">
          <span className="text-[10px] font-sans font-light uppercase tracking-[0.25em] text-dusty-sage whitespace-nowrap">
            Series
          </span>
          <span className="flex-1 h-px bg-linen-clay" aria-hidden="true" />
        </div>
        <h1
          className="font-serif font-light text-luxe-noir mt-4"
          style={{fontSize: 'clamp(36px, 5vw, 64px)'}}
        >
          {collection.title}
        </h1>
        {descriptionBlocks?.length ? (
          <div className="mt-4 max-w-2xl">
            <PortableText
              value={descriptionBlocks}
              className="prose-p:font-sans prose-p:font-light prose-p:text-[13px] prose-p:leading-[1.875] prose-p:text-coastal-pine"
            />
          </div>
        ) : null}
      </div>

      <div className="pb-24">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <PhotoGrid images={(collection.photos ?? []) as any[]} columns={3} gap={12} showCaptions />
      </div>
    </main>
  )
}

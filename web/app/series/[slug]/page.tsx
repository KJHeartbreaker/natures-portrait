import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import PhotoGrid from '@/app/components/PhotoGrid'
import SectionEyebrow from '@/app/components/SectionEyebrow'
import {sanityFetch} from '@/sanity/lib/live'
import {getCollectionQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {ARTIST_NAME} from '@/app/lib/site'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const {data: collection} = await sanityFetch({
    query: getCollectionQuery,
    params: {slug},
    stega: false,
  })
  if (!collection) return {}

  const count = collection.photos?.length ?? 0
  const ogImage = resolveOpenGraphImage(collection.coverImage ?? collection.photos?.[0]?.image)
  return {
    title: collection.title,
    description:
      collection.description?.trim() ||
      `${collection.title}: a series of ${count} photograph${count === 1 ? '' : 's'} by ${ARTIST_NAME}.`,
    ...(ogImage ? {openGraph: {images: [ogImage]}} : {}),
  }
}

export default async function CollectionPage({params}: Props) {
  const {slug} = await params
  const {data: collection} = await sanityFetch({
    query: getCollectionQuery,
    params: {slug},
  })

  if (!collection) notFound()

  const description = collection.description?.trim()

  return (
    <div className="container pt-32 pb-24 md:pt-40">
      {collection.galleryPath ? (
        <Link
          href={`/${collection.galleryPath}`}
          className="mb-8 inline-block font-sans text-[10px] font-light uppercase tracking-[0.25em] text-dusty-sage transition-colors hover:text-coastal-pine focus-visible:text-coastal-pine"
        >
          <span aria-hidden="true">←</span> Full gallery
        </Link>
      ) : null}
      <SectionEyebrow label="Series" />
      <h1
        className={`font-serif font-light text-luxe-noir ${description ? 'mb-6' : 'mb-12'}`}
        style={{fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.08}}
      >
        {collection.title}
      </h1>
      {description && (
        <p className="mb-12 max-w-[36rem] font-sans text-sm font-light leading-[1.9] text-coastal-pine whitespace-pre-line">
          {description}
        </p>
      )}

      <PhotoGrid
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        images={(collection.photos ?? []) as any[]}
        columns={3}
        gap={12}
        showCaptions
        currentSeriesSlug={collection.slug}
      />
    </div>
  )
}

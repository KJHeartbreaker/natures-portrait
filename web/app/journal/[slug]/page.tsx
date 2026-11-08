import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {type PortableTextBlock} from 'next-sanity'
import {format} from 'date-fns'
import Link from 'next/link'

import CustomPortableText from '@/app/components/PortableText'
import SanityImage from '@/app/components/SanityImage'
import ShareLinks from '@/app/components/ShareLinks'
import {sanityFetch} from '@/sanity/lib/live'
import {journalPostQuery, postPagesSlugs} from '@/sanity/lib/queries'
import {seoMetadata} from '@/app/lib/seo'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {adaptCrop, adaptHotspot, getImageId} from '@/app/lib/sanityImageHelpers'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: postPagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const {data: post} = await sanityFetch({query: journalPostQuery, params, stega: false})
  const previousImages = (await parent).openGraph?.images || []
  const coverImage = resolveOpenGraphImage(post?.image)

  const meta = seoMetadata(post?.seo, {title: post?.title, description: post?.subheader})
  return {
    ...meta,
    openGraph: meta.openGraph ?? {images: coverImage ? [coverImage] : previousImages},
  } satisfies Metadata
}

export default async function JournalPostPage(props: Props) {
  const params = await props.params
  const {data: post} = await sanityFetch({query: journalPostQuery, params})

  if (!post?._id) return notFound()

  const imageId = getImageId(post.image)
  const date = post.publishedAt ?? post._createdAt
  const formattedDate = date ? format(new Date(date), 'MMMM d, yyyy') : null
  const bodyBlocks = post.body?.portableTextBlock as PortableTextBlock[] | undefined

  return (
    <div className="w-full pt-16 md:pt-[72px]">
      {/* Hero image */}
      {imageId && (
        <div
          className="w-full overflow-hidden bg-luxe-noir"
          style={{height: 'clamp(320px, 52vw, 600px)'}}
        >
          <SanityImage
            id={imageId}
            alt={post.image?.alt ?? ''}
            width={1400}
            height={600}
            mode="cover"
            crop={adaptCrop(post.image?.crop)}
            hotspot={adaptHotspot(post.image?.hotspot)}
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      )}

      {/* Post header */}
      <div
        className="w-full"
        style={{backgroundColor: '#F0EDE5'}} // softOat
      >
        <div className="mx-auto max-w-[720px] px-6 pt-14 pb-2">
          {formattedDate && (
            <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-dusty-sage font-sans font-normal">
              {formattedDate}
            </p>
          )}
          <h1
            className="font-serif font-light text-luxe-noir mb-5"
            style={{fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.1}}
          >
            {post.title}
          </h1>
          {post.subheader && (
            <p className="text-base leading-relaxed text-coastal-pine font-sans font-light">
              {post.subheader}
            </p>
          )}
        </div>

        {/* Divider, with the share row closing it at the right */}
        <div className="mx-auto max-w-[720px] px-6 py-8 flex items-center gap-5">
          <div className="h-px flex-1 bg-linen-clay" />
          <ShareLinks
            title={post.title ?? ''}
            imageUrl={resolveOpenGraphImage(post.image, 1000, 1500)?.url}
          />
        </div>

        {/* Body */}
        {bodyBlocks?.length ? (
          <div className="mx-auto max-w-[720px] px-6 pb-24">
            <CustomPortableText
              value={bodyBlocks}
              className="prose-p:text-sm prose-p:leading-[1.9] prose-p:text-coastal-pine prose-p:font-light prose-headings:font-serif prose-headings:font-light prose-headings:text-luxe-noir"
            />
          </div>
        ) : null}

        {/* Back link */}
        <div className="mx-auto max-w-[720px] px-6 pb-24 mt-4">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-dusty-sage font-sans font-normal hover:text-coastal-pine transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M10 3L5 8l5 5"/>
            </svg>
            Back to journal
          </Link>
        </div>
      </div>
    </div>
  )
}

import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {toPlainText} from 'next-sanity'
import {type PortableTextBlock} from 'next-sanity'
import {format} from 'date-fns'
import Link from 'next/link'

import CustomPortableText from '@/app/components/PortableText'
import SanityImage from '@/app/components/SanityImage'
import {sanityFetch} from '@/sanity/lib/live'
import {journalPostQuery, postPagesSlugs} from '@/sanity/lib/queries'
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

  return {
    title: post?.seo?.seoTitle || post?.title,
    description:
      post?.seo?.seoDescription ||
      (post?.overview ? toPlainText(post.overview as PortableTextBlock[]) : post?.subheader) ||
      undefined,
    openGraph: {
      images: previousImages,
    },
  } satisfies Metadata
}

export default async function JournalPostPage(props: Props) {
  const params = await props.params
  const {data: post} = await sanityFetch({query: journalPostQuery, params})

  if (!post?._id) return notFound()

  const imageId = getImageId(post.image)
  const date = post.publishedAt ?? post._createdAt
  const formattedDate = date ? format(new Date(date), 'MMMM d, yyyy') : null
  const bodyBlocks = (post.body as any)?.portableTextBlock as PortableTextBlock[] | undefined

  return (
    <div className="w-full pt-16 md:pt-[72px]">
      {/* Hero image */}
      {imageId && (
        <div
          className="w-full overflow-hidden bg-luxeNoir"
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
            <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-dustySage font-sans font-normal">
              {formattedDate}
            </p>
          )}
          <h1
            className="font-serif font-light text-luxeNoir mb-5"
            style={{fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.1}}
          >
            {post.title}
          </h1>
          {post.subheader && (
            <p className="text-base leading-relaxed text-coastalPine font-sans font-light">
              {post.subheader}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-[720px] px-6 py-8">
          <div className="h-px bg-linenClay" />
        </div>

        {/* Body */}
        {bodyBlocks?.length ? (
          <div className="mx-auto max-w-[720px] px-6 pb-24">
            <CustomPortableText
              value={bodyBlocks}
              className="prose-p:text-sm prose-p:leading-[1.9] prose-p:text-coastalPine prose-p:font-light prose-headings:font-serif prose-headings:font-light prose-headings:text-luxeNoir"
            />
          </div>
        ) : null}

        {/* Back link */}
        <div className="mx-auto max-w-[720px] px-6 pb-24 mt-4">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-dustySage font-sans font-normal hover:text-coastalPine transition-colors"
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

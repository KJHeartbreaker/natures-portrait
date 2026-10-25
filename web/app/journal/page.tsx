import type {Metadata} from 'next'
import Link from 'next/link'
import {toPlainText} from 'next-sanity'

import SanityImage from '@/app/components/SanityImage'
import SectionEyebrow from '@/app/components/SectionEyebrow'
import {sanityFetch} from '@/sanity/lib/live'
import {journalIndexQuery} from '@/sanity/lib/queries'
import {adaptCrop, adaptHotspot, getImageId} from '@/app/lib/sanityImageHelpers'
import {format} from 'date-fns'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Notes from the field — reflections on light, landscape, and the practice of photography.',
}

export default async function JournalPage() {
  const {data: posts} = await sanityFetch({query: journalIndexQuery})

  const bg = '#C6C2BB' // linenClay

  return (
    <section className="w-full min-h-screen" style={{backgroundColor: bg}}>
      <div className="container pt-32 pb-8 md:pt-40">
        <SectionEyebrow label="Journal" bg={bg} />
        <h1
          className="font-serif font-light text-luxeNoir"
          style={{fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.08}}
        >
          Notes from the field
        </h1>
      </div>

      {!posts?.length ? (
        <div className="container pb-24">
          <p className="text-dustySage text-sm">No entries yet — check back soon.</p>
        </div>
      ) : (
        <div className="container pb-24">
          <PostList posts={posts} />
        </div>
      )}
    </section>
  )
}

type Post = Awaited<ReturnType<typeof sanityFetch<typeof journalIndexQuery>>>['data'][number]

function postDate(post: Post): string {
  const raw = post.publishedAt ?? post._createdAt
  if (!raw) return ''
  return format(new Date(raw), 'MMMM d, yyyy')
}

function postExcerpt(post: Post): string {
  if (post.subheader) return post.subheader
  if (!post.excerpt) return ''
  const block = (post.excerpt as {portableTextBlock?: unknown})?.portableTextBlock
  return Array.isArray(block) ? toPlainText(block) : ''
}

function PostList({posts}: {posts: Post[]}) {
  const rows: Array<{type: 'featured'; post: Post} | {type: 'grid'; posts: Post[]}> = []
  let gridAccum: Post[] = []

  for (const post of posts) {
    if (post.featured) {
      if (gridAccum.length) {
        rows.push({type: 'grid', posts: gridAccum})
        gridAccum = []
      }
      rows.push({type: 'featured', post})
    } else {
      gridAccum.push(post)
    }
  }
  if (gridAccum.length) rows.push({type: 'grid', posts: gridAccum})

  return (
    <div className="mt-12 flex flex-col gap-16">
      {rows.map((row, i) => {
        if (row.type === 'featured') return <FeaturedPost key={row.post._id} post={row.post} />
        const isLastRow = i === rows.length - 1
        const hasOrphan = row.posts.length % 2 !== 0 && !isLastRow
        return (
          <div key={i} className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
            {row.posts.map((post, j) => {
              const isOrphan = hasOrphan && j === row.posts.length - 1
              return <PostCard key={post._id} post={post} wide={isOrphan} />
            })}
          </div>
        )
      })}
    </div>
  )
}

function FeaturedPost({post}: {post: Post}) {
  const imageId = getImageId(post.image)
  const date = postDate(post)
  const excerpt = postExcerpt(post)

  return (
    <Link
      href={`/journal/${post.slug}`}
      className="group grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 block"
    >
      {imageId && (
        <div className="overflow-hidden" style={{aspectRatio: '4/3'}}>
          <SanityImage
            id={imageId}
            alt={post.image?.alt ?? ''}
            width={800}
            height={600}
            mode="cover"
            crop={adaptCrop(post.image?.crop)}
            hotspot={adaptHotspot(post.image?.hotspot)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-col justify-center">
        {date && (
          <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-dustySage font-sans font-normal">
            {date}
          </p>
        )}
        <h2
          className="font-serif font-light text-luxeNoir mb-4"
          style={{fontSize: 'clamp(26px, 3vw, 36px)', lineHeight: 1.15}}
        >
          {post.title}
        </h2>
        {excerpt && (
          <p className="text-sm leading-relaxed text-coastalPine mb-6 line-clamp-3">{excerpt}</p>
        )}
        <span className="text-[10px] uppercase tracking-[0.22em] text-dustySage font-sans font-normal border-b border-linenClay pb-px w-fit">
          Read
        </span>
      </div>
    </Link>
  )
}

function PostCard({post, wide = false}: {post: Post; wide?: boolean}) {
  const imageId = getImageId(post.image)
  const date = postDate(post)
  const excerpt = postExcerpt(post)

  return (
    <Link href={`/journal/${post.slug}`} className={`group block${wide ? ' md:col-span-2' : ''}`}>
      {imageId && (
        <div className="overflow-hidden mb-5" style={{aspectRatio: wide ? '21/9' : '16/9'}}>
          <SanityImage
            id={imageId}
            alt={post.image?.alt ?? ''}
            width={720}
            height={405}
            mode="cover"
            crop={adaptCrop(post.image?.crop)}
            hotspot={adaptHotspot(post.image?.hotspot)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      )}
      {date && (
        <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-dustySage font-sans font-normal">
          {date}
        </p>
      )}
      <h2
        className="font-serif font-light text-luxeNoir mb-3"
        style={{fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.2}}
      >
        {post.title}
      </h2>
      {excerpt && (
        <p className="text-sm leading-relaxed text-coastalPine line-clamp-2">{excerpt}</p>
      )}
    </Link>
  )
}

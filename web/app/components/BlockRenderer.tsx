import React from 'react'

import type {PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import PhotoGrid from '@/app/components/PhotoGrid'
import PullQuote from '@/app/components/PullQuote'
import RowContainer from '@/app/components/RowContainer'
import UnderConstruction from '@/app/components/UnderConstruction'
import {HeroBanner, HeroTwoPanel} from '@/app/components/hero'
import {adaptCrop, adaptHotspot, getImageDims, getImageId} from '@/app/lib/sanityImageHelpers'
import {dataAttr} from '@/sanity/lib/utils'
import type {ExtractPageSectionType, PageSection} from '@/sanity/lib/types'

type BlockProps = {
  block: PageSection
  pageId: string
  pageType: string
}

function SingleColumnContentBlockSection({block}: {block: ExtractPageSectionType<'singleColumnContentBlock'>}) {
  if (block.disabled) return null
  const portableText = block.contentBlock?.portableTextBlock?.portableTextBlock
  const bg = block.backgroundColor ?? '#F0EDE5'
  const isLight = bg === '#F0EDE5' || bg === '#C6C2bb'
  // Drive prose colour via prose-invert on dark backgrounds
  const proseTheme = isLight
    ? 'prose-headings:text-luxe-noir prose-p:text-coastal-pine prose-a:text-coastal-pine'
    : 'prose-invert prose-headings:text-soft-oat prose-p:text-soft-oat prose-a:text-soft-oat'

  return (
    <section
      className="w-full px-6 py-20 md:py-28 xl:px-0"
      style={{backgroundColor: bg}}
      aria-label={block.title || undefined}
    >
      <div className="mx-auto max-w-3xl text-center">
        {portableText?.length ? (
          <PortableText
            value={portableText as PortableTextBlock[]}
            centered
            className={`max-w-none text-center
              prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight
              prose-p:font-sans prose-p:font-light prose-p:text-[13px] prose-p:leading-[1.875]
              prose-a:font-light prose-a:underline
              ${proseTheme}`}
          />
        ) : null}
      </div>
    </section>
  )
}

function PostsGridContainerSection({block}: {block: ExtractPageSectionType<'postsGridContainer'>}) {
  return (
    <UnderConstruction
      name="PostsGridContainer"
      style={
        block.backgroundColor
          ? {backgroundColor: block.backgroundColor, paddingTop: '1.5rem', paddingBottom: '1.5rem'}
          : undefined
      }
    >
      <div className="font-mono text-sm opacity-70">
        Posts grid{block.posts?.length ? ` (${block.posts.length})` : ''}
      </div>
      {block.posts?.length ? (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
          {block.posts.slice(0, 6).map((p) => {
            const id = getImageId(p?.image)
            const dims = getImageDims(p?.image)
            if (!id) return null
            return (
              <Image
                key={p._id}
                id={id}
                alt={p?.image?.alt || ''}
                className="rounded-sm w-full"
                width={420}
                height={dims ? Math.round((420 / dims.width) * dims.height) : 280}
                mode="cover"
                crop={adaptCrop(p?.image?.crop)}
                hotspot={adaptHotspot(p?.image?.hotspot)}
              />
            )
          })}
        </div>
      ) : null}
    </UnderConstruction>
  )
}

function PhotoGridContainerSection({block}: {block: ExtractPageSectionType<'photoGridContainer'>}) {
  if (block.disabled) return null
  return (
    <UnderConstruction
      name="PhotoGridContainer"
      note={block.title ? `“${block.title}”` : undefined}
      style={
        block.backgroundColor
          ? {backgroundColor: block.backgroundColor, paddingTop: '1.5rem', paddingBottom: '1.5rem'}
          : undefined
      }
    >
      <PhotoGrid images={block.images || []} columns={block.columns} gap={block.gap} showCaptions={block.showCaptions} />
    </UnderConstruction>
  )
}

function UnknownSection({block}: {block: PageSection}) {
  return (
    <UnderConstruction name={block._type} note="No renderer yet">
      <div className="font-mono text-sm opacity-70">This block type hasn’t been implemented yet.</div>
    </UnderConstruction>
  )
}

// These block types break out of the container and span the full viewport width.
const FULL_BLEED_TYPES = new Set(['heroBanner', 'heroTwoPanel', 'pullQuote', 'singleColumnContentBlock'])

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({block, pageId, pageType}: BlockProps) {
  const isFullBleed = FULL_BLEED_TYPES.has(block._type)

  const inner = (() => {
    switch (block._type) {
      case 'heroBanner':
        return <HeroBanner block={block} />
      case 'heroTwoPanel':
        return <HeroTwoPanel block={block} />
      case 'pullQuote':
        return <PullQuote block={block} />
      case 'singleColumnContentBlock':
        return <SingleColumnContentBlockSection block={block} />
      case 'rowContainer':
        return <RowContainer block={block} />
      case 'postsGridContainer':
        return <PostsGridContainerSection block={block} />
      case 'photoGridContainer':
        return <PhotoGridContainerSection block={block} />
      default:
        return <UnknownSection block={block} />
    }
  })()

  return (
    <div
      key={block._key}
      data-sanity={dataAttr({
        id: pageId,
        type: pageType,
        path: `content[_key=="${block._key}"]`,
      }).toString()}
    >
      {isFullBleed ? inner : <div className="container py-16 md:py-24">{inner}</div>}
    </div>
  )
}

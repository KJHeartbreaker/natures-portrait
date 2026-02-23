import React from 'react'

import type {PortableTextBlock} from 'next-sanity'

import Cta from '@/app/components/Cta'
import PortableText from '@/app/components/PortableText'
import {dataAttr} from '@/sanity/lib/utils'
import type {PageSection} from '@/sanity/lib/types'
import type {
  HeroBanner,
  HeroTwoPanel,
  SingleColumnContentBlock,
  RowContainer,
  PostsGridContainer,
} from '@/sanity.types'

type BlockProps = {
  block: PageSection
  pageId: string
  pageType: string
}

function HeroBannerSection({block}: {block: HeroBanner}) {
  if (block.disabled) return null
  return (
    <section className="container py-12">
      <div className="space-y-4 max-w-3xl">
        {block.subheading ? (
          <p className="uppercase font-mono text-sm tracking-tight opacity-70">{block.subheading}</p>
        ) : null}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">{block.heading}</h2>
        {block.copy?.portableTextBlock?.length ? (
          <PortableText value={block.copy.portableTextBlock as PortableTextBlock[]} />
        ) : null}
        {block.cta ? <Cta cta={block.cta} /> : null}
      </div>
    </section>
  )
}

function HeroTwoPanelSection({block}: {block: HeroTwoPanel}) {
  if (block.disabled) return null
  return (
    <section className="container py-12">
      {block.mainPortableText?.portableTextBlock?.length ? (
        <PortableText value={block.mainPortableText.portableTextBlock as PortableTextBlock[]} />
      ) : null}
    </section>
  )
}

function SingleColumnContentBlockSection({block}: {block: SingleColumnContentBlock}) {
  if (block.disabled) return null
  const portableText = block.contentBlock?.portableTextBlock?.portableTextBlock
  return (
    <section className="container py-12">
      <div className="max-w-3xl space-y-4">
        {block.title ? <h2 className="text-2xl sm:text-3xl font-semibold">{block.title}</h2> : null}
        {portableText?.length ? <PortableText value={portableText as PortableTextBlock[]} /> : null}
      </div>
    </section>
  )
}

function RowContainerSection({block}: {block: RowContainer}) {
  if (block.disabled) return null
  return (
    <section className="container py-12">
      {block.title ? <h2 className="text-2xl sm:text-3xl font-semibold">{block.title}</h2> : null}
      {block.rowContent?.length ? (
        <div className="mt-4 text-sm text-gray-600 font-mono">
          {block.rowContent.length} item{block.rowContent.length === 1 ? '' : 's'}
        </div>
      ) : null}
    </section>
  )
}

function PostsGridContainerSection({block}: {block: PostsGridContainer}) {
  return (
    <section className="container py-12">
      <div className="text-sm text-gray-600 font-mono">
        Posts grid{block.posts?.length ? ` (${block.posts.length})` : ''}
      </div>
    </section>
  )
}

function UnknownSection({block}: {block: PageSection}) {
  return (
    <section className="container py-12">
      <div className="w-full bg-gray-100 text-center text-gray-500 p-10 rounded">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been implemented yet
      </div>
    </section>
  )
}

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({block, pageId, pageType}: BlockProps) {
  return (
    <div
      key={block._key}
      data-sanity={dataAttr({
        id: pageId,
        type: pageType,
        path: `content[_key=="${block._key}"]`,
      }).toString()}
    >
      {(() => {
        switch (block._type) {
          case 'heroBanner':
            return <HeroBannerSection block={block as HeroBanner} />
          case 'heroTwoPanel':
            return <HeroTwoPanelSection block={block as HeroTwoPanel} />
          case 'singleColumnContentBlock':
            return <SingleColumnContentBlockSection block={block as SingleColumnContentBlock} />
          case 'rowContainer':
            return <RowContainerSection block={block as RowContainer} />
          case 'postsGridContainer':
            return <PostsGridContainerSection block={block as PostsGridContainer} />
          default:
            return <UnknownSection block={block} />
        }
      })()}
    </div>
  )
}

import React from 'react'

import type {PortableTextBlock} from 'next-sanity'

import Cta from '@/app/components/Cta'
import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import UnderConstruction from '@/app/components/UnderConstruction'
import {dataAttr} from '@/sanity/lib/utils'
import type {ExtractPageSectionType, PageSection} from '@/sanity/lib/types'

function getImageId(image: any): string | null {
  return image?.asset?._ref || image?.asset?._id || null
}

function getImageDims(image: any): {width: number; height: number} | null {
  const w = image?.asset?.metadata?.dimensions?.width
  const h = image?.asset?.metadata?.dimensions?.height
  if (typeof w === 'number' && typeof h === 'number' && w > 0 && h > 0) return {width: w, height: h}
  return null
}

type BlockProps = {
  block: PageSection
  pageId: string
  pageType: string
}

function HeroBannerSection({block}: {block: ExtractPageSectionType<'heroBanner'>}) {
  if (block.disabled) return null
  const heroImageId = getImageId(block.image)
  const heroDims = getImageDims(block.image)
  return (
    <UnderConstruction name="HeroBanner">
      <div className="space-y-4">
        {heroImageId ? (
          <div>
            <Image
              id={heroImageId}
              alt={block.image?.alt || ''}
              className="rounded-sm w-full"
              width={1200}
              height={heroDims ? Math.round((1200 / heroDims.width) * heroDims.height) : 650}
              mode="cover"
              crop={block.image?.crop}
              hotspot={block.image?.hotspot}
            />
          </div>
        ) : null}
        {block.subheading ? (
          <p className="font-mono text-sm opacity-70" style={block.subHeadingColor ? {color: block.subHeadingColor} : {}}>
            {block.subheading}
          </p>
        ) : null}
        {block.heading ? (
          <h2 className="text-2xl font-semibold" style={block.headingColor ? {color: block.headingColor} : {}}>
            {block.heading}
          </h2>
        ) : null}
        {block.copy?.portableTextBlock?.length ? (
          <div style={block.copyColor ? {color: block.copyColor} : {}}>
            <PortableText value={block.copy.portableTextBlock as PortableTextBlock[]} />
          </div>
        ) : null}
        {block.cta ? <Cta cta={block.cta} /> : null}
      </div>
    </UnderConstruction>
  )
}

function HeroTwoPanelSection({block}: {block: ExtractPageSectionType<'heroTwoPanel'>}) {
  if (block.disabled) return null
  const imageId = getImageId(block.image)
  const dims = getImageDims(block.image)
  return (
    <UnderConstruction
      name="HeroTwoPanel"
      style={
        block.backgroundColor
          ? {backgroundColor: block.backgroundColor, paddingTop: '1.5rem', paddingBottom: '1.5rem'}
          : undefined
      }
    >
      {imageId ? (
        <div className="mb-6">
          <Image
            id={imageId}
            alt={block.image?.alt || ''}
            className="rounded-sm w-full"
            width={1200}
            height={dims ? Math.round((1200 / dims.width) * dims.height) : 650}
            mode="cover"
            crop={block.image?.crop}
            hotspot={block.image?.hotspot}
          />
        </div>
      ) : null}
      {block.mainPortableText?.portableTextBlock?.length ? (
        <PortableText value={block.mainPortableText.portableTextBlock as PortableTextBlock[]} />
      ) : (
        <div className="font-mono text-sm opacity-70">No content yet.</div>
      )}
    </UnderConstruction>
  )
}

function SingleColumnContentBlockSection({block}: {block: ExtractPageSectionType<'singleColumnContentBlock'>}) {
  if (block.disabled) return null
  const portableText = block.contentBlock?.portableTextBlock?.portableTextBlock
  return (
    <UnderConstruction
      name="SingleColumnContentBlock"
      style={
        block.backgroundColor
          ? {backgroundColor: block.backgroundColor, paddingTop: '1.5rem', paddingBottom: '1.5rem'}
          : undefined
      }
    >
      <div className="space-y-4">
        {block.title ? <h2 className="text-xl font-semibold">{block.title}</h2> : null}
        {portableText?.length ? (
          <PortableText value={portableText as PortableTextBlock[]} />
        ) : (
          <div className="font-mono text-sm opacity-70">No content yet.</div>
        )}
      </div>
    </UnderConstruction>
  )
}

function RowContainerSection({block}: {block: ExtractPageSectionType<'rowContainer'>}) {
  if (block.disabled) return null
  const bgImageId = getImageId(block.image)
  const bgDims = getImageDims(block.image)
  return (
    <UnderConstruction
      name="RowContainer"
      style={
        block.backgroundColor
          ? {backgroundColor: block.backgroundColor, paddingTop: '1.5rem', paddingBottom: '1.5rem'}
          : undefined
      }
    >
      <div className="space-y-2">
        {bgImageId ? (
          <div className="mb-4">
            <Image
              id={bgImageId}
              alt={block.image?.alt || ''}
              className="rounded-sm w-full"
              width={1200}
              height={bgDims ? Math.round((1200 / bgDims.width) * bgDims.height) : 450}
              mode="cover"
              crop={block.image?.crop}
              hotspot={block.image?.hotspot}
            />
          </div>
        ) : null}
        {block.title ? (
          <h2 className="text-xl font-semibold" style={block.titleColor ? {color: block.titleColor} : {}}>
            {block.title}
          </h2>
        ) : null}
        <div className="font-mono text-sm opacity-70">
          Row: {block.row || 'unset'} · Items: {block.rowContent?.length || 0}
        </div>
        {block.rowContent?.length ? (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {block.rowContent.map((item: any) => {
              if (!item) return null
              if (item._type === 'mainImage') {
                const id = getImageId(item)
                const dims = getImageDims(item)
                if (!id) return null
                return (
                  <Image
                    key={item._key}
                    id={id}
                    alt={item.alt || ''}
                    className="rounded-sm w-full"
                    width={420}
                    height={dims ? Math.round((420 / dims.width) * dims.height) : 280}
                    mode="cover"
                    crop={item.crop}
                    hotspot={item.hotspot}
                  />
                )
              }
              if (item._type === 'carousel') {
                const first = item.carouselImages?.[0]
                const id = getImageId(first)
                const dims = getImageDims(first)
                if (!id) return null
                return (
                  <Image
                    key={item._key}
                    id={id}
                    alt={first?.alt || ''}
                    className="rounded-sm w-full"
                    width={420}
                    height={dims ? Math.round((420 / dims.width) * dims.height) : 280}
                    mode="cover"
                    crop={first?.crop}
                    hotspot={first?.hotspot}
                  />
                )
              }
              return null
            })}
          </div>
        ) : null}
      </div>
    </UnderConstruction>
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
          {block.posts.slice(0, 6).map((p: any) => {
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
                crop={p?.image?.crop}
                hotspot={p?.image?.hotspot}
              />
            )
          })}
        </div>
      ) : null}
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
            return <HeroBannerSection block={block} />
          case 'heroTwoPanel':
            return <HeroTwoPanelSection block={block} />
          case 'singleColumnContentBlock':
            return <SingleColumnContentBlockSection block={block} />
          case 'rowContainer':
            return <RowContainerSection block={block} />
          case 'postsGridContainer':
            return <PostsGridContainerSection block={block} />
          default:
            return <UnknownSection block={block} />
        }
      })()}
    </div>
  )
}

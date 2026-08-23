import type {PortableTextBlock} from 'next-sanity'

import Image from '@/app/components/SanityImage'
import PortableText from '@/app/components/PortableText'
import {adaptCrop, adaptHotspot, getImageDims, getImageId} from '@/app/lib/sanityImageHelpers'
import type {ExtractPageSectionType} from '@/sanity/lib/types'

type Props = {
  block: ExtractPageSectionType<'featuredCollection'>
}

export default function FeaturedCollection({block}: Props) {
  if (block.disabled) return null

  const photo = block.photo
  const imgId = photo?.image ? getImageId(photo.image) : null
  const dims = photo?.image ? getImageDims(photo.image) : null

  const bodyBlocks = block.body?.portableTextBlock as PortableTextBlock[] | undefined
  const ctaLabel = block.ctaLabel || 'View the full series'
  const collectionSlug = block.collection?.slug
  const ctaHref = collectionSlug ? `/series/${collectionSlug}` : null

  return (
    <section className="w-full py-20 md:py-28">
      <div className="container">
        {/* Eyebrow */}
        <div className="mb-10 flex items-center gap-4">
          <span className="text-[10px] font-sans font-light uppercase tracking-[0.25em] text-dusty-sage whitespace-nowrap">
            Featured Work
          </span>
          <span className="flex-1 h-px bg-linen-clay" aria-hidden="true" />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image column */}
          <div className="flex flex-col gap-3">
            {imgId ? (
              <div className="overflow-hidden">
                <Image
                  id={imgId}
                  alt={photo?.image?.alt || photo?.title || ''}
                  width={720}
                  height={dims ? Math.round((720 / dims.width) * dims.height) : 900}
                  mode="cover"
                  crop={adaptCrop(photo?.image?.crop)}
                  hotspot={adaptHotspot(photo?.image?.hotspot)}
                  className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            ) : (
              <div className="aspect-[3/4] bg-linen-clay" />
            )}
            {/* Caption */}
            {(photo?.location || photo?.dateCaptured) && (
              <p className="text-[10px] font-sans font-light uppercase tracking-[0.25em] text-dusty-sage">
                {[photo.location, photo.dateCaptured].filter(Boolean).join(' — ')}
              </p>
            )}
          </div>

          {/* Text column */}
          <div className="flex flex-col justify-center gap-6">
            {block.heading && (
              <h2 className="font-serif font-light text-luxe-noir leading-[1.1]"
                style={{fontSize: 'clamp(28px, 3vw, 40px)'}}>
                {block.heading}
              </h2>
            )}
            {block.subheading && (
              <p className="font-serif font-light italic text-coastal-pine"
                style={{fontSize: 'clamp(18px, 2vw, 22px)'}}>
                {block.subheading}
              </p>
            )}
            {bodyBlocks?.length ? (
              <PortableText
                value={bodyBlocks}
                className="prose-p:font-sans prose-p:font-light prose-p:text-[13px] prose-p:leading-[1.875] prose-p:text-coastal-pine"
              />
            ) : null}
            {ctaHref && (
              <a
                href={ctaHref}
                className="inline-block text-[10px] font-sans font-light uppercase tracking-[0.25em] text-luxe-noir border-b border-current pb-0.5 hover:text-coastal-pine transition-colors duration-200 self-start"
              >
                {ctaLabel} →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

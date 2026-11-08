import Link from 'next/link'
import type {PortableTextBlock} from 'next-sanity'

import {textLinkClass, textLinkLightClass} from '@/app/components/Cta'

import Image from '@/app/components/SanityImage'
import PortableText from '@/app/components/PortableText'
import {adaptCrop, adaptHotspot, getImageDims, getImageId} from '@/app/lib/sanityImageHelpers'
import {eyebrowThemeForBg, headingColorForBg, isDarkBg, proseThemeForBg} from '@/app/lib/proseTheme'
import type {ExtractPageSectionType} from '@/sanity/lib/types'
import SectionEyebrow from '@/app/components/SectionEyebrow'

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

  const bg = block.backgroundColor ?? '#F0EDE5'
  const isDark = isDarkBg(bg)

  return (
    <section className="w-full py-20 md:py-28" style={{backgroundColor: bg}}>
      <div className="container">
        {/* Eyebrow */}
        {block.eyebrow ? <SectionEyebrow label={block.eyebrow} bg={bg} /> : null}

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
              <div className={`aspect-[3/4] ${isDark ? 'bg-luxe-noir/30' : 'bg-linen-clay'}`} />
            )}
            {/* Caption */}
            {photo?.location && (
              <p className={`text-[10px] font-sans font-light uppercase tracking-[0.25em] ${eyebrowThemeForBg(bg).label}`}>
                {photo.location}
              </p>
            )}
          </div>

          {/* Text column */}
          <div className="flex flex-col justify-center gap-6">
            {block.heading && (
              <h2 className={`font-serif font-light leading-[1.1] ${headingColorForBg(bg)}`}
                style={{fontSize: 'clamp(28px, 3vw, 40px)'}}>
                {block.heading}
              </h2>
            )}
            {block.subheading && (
              <p className={`font-serif font-light italic ${isDark ? 'text-soft-oat/80' : 'text-coastal-pine'}`}
                style={{fontSize: 'clamp(18px, 2vw, 22px)'}}>
                {block.subheading}
              </p>
            )}
            {bodyBlocks?.length ? (
              <PortableText
                value={bodyBlocks}
                className={proseThemeForBg(bg)}
              />
            ) : null}
            {ctaHref && (
              <Link href={ctaHref} className={`${isDark ? textLinkLightClass : textLinkClass} self-start`}>
                {ctaLabel}
                <span className="ml-2">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

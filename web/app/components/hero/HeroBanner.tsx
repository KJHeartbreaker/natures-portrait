import type {PortableTextBlock} from 'next-sanity'

import Cta from '@/app/components/Cta'
import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import {getImageDims, getImageId} from '@/app/lib/sanityImageHelpers'
import type {ExtractPageSectionType} from '@/sanity/lib/types'

const sizeHeightClass = {
  standard: 'min-h-[420px] md:min-h-[520px] xl:min-h-[600px]',
  'x-large': 'min-h-[520px] md:min-h-[680px] xl:min-h-[800px]',
} as const

/** Bottom-weighted gradients so type stays legible on bright or busy photos. */
const overlayClass: Record<NonNullable<ExtractPageSectionType<'heroBanner'>['overlay']>, string> = {
  noOverlay: '',
  /* Stronger veil at the bottom where copy sits; lighter toward top so the image still breathes */
  darkOverlay: 'bg-gradient-to-t from-black/90 via-black/55 to-black/20',
  blueOverlay: 'bg-gradient-to-t from-coastalPine/90 via-coastalPine/55 to-coastalPine/20',
}

/** When editors choose “none”, a very light bottom scrim still helps palette-driven text without a full overlay */
const subtleNoOverlayScrim = 'bg-gradient-to-t from-black/30 via-black/5 to-transparent'

/** Fixed palette tokens per editor choice — no per-field colours in the CMS */
const textToneClass = {
  light: {
    subheading: 'text-linenClay',
    heading: 'text-softOat',
    copyWrap:
      'prose prose-lg max-w-2xl prose-p:leading-relaxed prose-invert text-softOat/95 prose-headings:text-softOat prose-strong:text-softOat prose-p:text-softOat/90',
    portableText: 'prose-a:text-linenClay hover:prose-a:text-softOat',
    textShadow:
      '[&_h1]:drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] [&_.prose]:drop-shadow-[0_1px_16px_rgba(0,0,0,0.45)]',
    subShadow: 'drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)]',
  },
  dark: {
    subheading: 'text-dustySage',
    heading: 'text-luxeNoir',
    copyWrap:
      'prose prose-lg max-w-2xl prose-p:leading-relaxed text-luxeNoir prose-headings:text-luxeNoir prose-strong:text-luxeNoir prose-p:text-luxeNoir/90',
    portableText: 'prose-a:text-coastalPine hover:prose-a:text-coastalPine/90',
    textShadow:
      '[&_h1]:drop-shadow-[0_1px_14px_rgba(255,255,255,0.45)] [&_.prose]:drop-shadow-[0_1px_10px_rgba(255,255,255,0.35)]',
    subShadow: 'drop-shadow-[0_1px_8px_rgba(255,255,255,0.4)]',
  },
} as const

type Props = {
  block: ExtractPageSectionType<'heroBanner'>
}

export default function HeroBanner({block}: Props) {
  if (block.disabled) return null

  const heroImageId = getImageId(block.image)
  const heroDims = getImageDims(block.image)
  const size = block.size === 'x-large' ? 'x-large' : 'standard'
  const overlay =
    block.overlay && block.overlay !== 'noOverlay' && overlayClass[block.overlay] !== undefined
      ? block.overlay
      : 'noOverlay'

  const tone = block.textTone === 'dark' ? 'dark' : 'light'
  const tc = textToneClass[tone]

  const imgW = 1920
  const imgH = heroDims ? Math.round((imgW / heroDims.width) * heroDims.height) : Math.round(imgW * (9 / 16))

  return (
    <section
      className={`relative isolate flex w-full flex-col justify-end overflow-hidden ${sizeHeightClass[size]}`}
      aria-labelledby={block.heading ? `hero-banner-heading-${block._key}` : undefined}
    >
      {/* Photo layer */}
      <div className="absolute inset-0 z-0">
        {heroImageId ? (
          <Image
            id={heroImageId}
            alt={block.image?.alt || ''}
            className="h-full w-full object-cover object-center"
            width={imgW}
            height={imgH}
            mode="cover"
            crop={block.image?.crop}
            hotspot={block.image?.hotspot}
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-gray-800" aria-hidden />
        )}
      </div>

      {/* Overlay: full scrims for dark / blue; optional light scrim when overlay is off */}
      {heroImageId && overlay !== 'noOverlay' ? (
        <div className={`absolute inset-0 z-1 ${overlayClass[overlay]}`} aria-hidden />
      ) : null}
      {heroImageId && overlay === 'noOverlay' ? (
        <div className={`absolute inset-0 z-1 ${subtleNoOverlayScrim}`} aria-hidden />
      ) : null}

      {/* Copy — sits above image; generous padding keeps type readable without competing with the frame */}
      <div className={`relative z-2 w-full ${heroImageId ? tc.textShadow : ''}`}>
        <div className="container flex max-w-5xl flex-col gap-4 pb-12 pt-24 md:pb-16 md:pt-32">
          {block.subheading ? (
            <p
              className={`font-mono text-xs uppercase tracking-[0.2em] md:text-sm ${tc.subheading} ${heroImageId ? tc.subShadow : ''}`}
            >
              {block.subheading}
            </p>
          ) : null}
          {block.heading ? (
            <h1
              id={`hero-banner-heading-${block._key}`}
              className={`max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight md:text-5xl xl:text-6xl ${tc.heading}`}
            >
              {block.heading}
            </h1>
          ) : null}
          {block.copy?.portableTextBlock?.length ? (
            <div className={tc.copyWrap}>
              <PortableText
                className={tc.portableText}
                value={block.copy.portableTextBlock as PortableTextBlock[]}
              />
            </div>
          ) : null}
          {block.cta ? (
            <div className="pt-2">
              <Cta cta={block.cta} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

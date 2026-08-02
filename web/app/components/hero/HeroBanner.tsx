import type {CSSProperties} from 'react'
import type {PortableTextBlock} from 'next-sanity'

import Cta from '@/app/components/Cta'
import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import ParallaxBg from '@/app/components/ParallaxBg'
import {adaptCrop, adaptHotspot, getImageDims, getImageId} from '@/app/lib/sanityImageHelpers'
import type {ExtractPageSectionType} from '@/sanity/lib/types'

const sizeHeightClass = {
  standard: 'min-h-[420px] md:min-h-[520px] xl:min-h-[600px]',
  'x-large': 'min-h-[520px] md:min-h-[680px] xl:min-h-[800px]',
} as const

type TextAlign = 'left' | 'center' | 'right'
type TextTone = 'light' | 'dark'
type CtaTone = 'light' | 'dark'

/** Inline text-shadow so tint always shows (Tailwind may not detect classes built from string constants). */
function tintTextShadowStyle(tone: TextTone): CSSProperties {
  if (tone === 'light') {
    return {
      textShadow:
        '0 1px 3px rgba(0,0,0,0.65), 0 4px 28px rgba(0,0,0,0.45), 0 12px 48px rgba(0,0,0,0.25)',
    }
  }
  return {
    textShadow:
      '0 1px 2px rgba(255,255,255,0.45), 0 0 20px rgba(255,255,255,0.3), 0 4px 32px rgba(255,255,255,0.2)',
  }
}

const lightOnImage = {
  subheading: 'text-white/85',
  heading: 'text-white',
  copyWrap:
    'prose prose-lg max-w-2xl prose-p:leading-relaxed text-white/95 prose-headings:text-white prose-strong:text-white prose-p:text-white/90',
  portableText: 'prose-a:text-white hover:prose-a:text-white/85 underline-offset-4',
} as const

const darkOnImage = {
  subheading: 'text-dustySage',
  heading: 'text-luxeNoir',
  copyWrap:
    'prose prose-lg max-w-2xl prose-p:leading-relaxed text-luxeNoir prose-headings:text-luxeNoir prose-strong:text-luxeNoir prose-p:text-luxeNoir/90',
  portableText: 'prose-a:text-coastalPine hover:prose-a:text-coastalPine/90',
} as const

const alignFlexClass: Record<TextAlign, string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
}

type Props = {
  block: ExtractPageSectionType<'heroBanner'>
}

/** Legacy blocks used `copyTint` as "yes" | "no" strings before the boolean field was renamed. */
function tintBehindCopyEnabled(
  block: ExtractPageSectionType<'heroBanner'> & {copyTint?: boolean | string | null},
): boolean {
  if (block.tintBehindCopy === true) {
    return true
  }
  if (block.tintBehindCopy === false) {
    return false
  }
  const legacy = block.copyTint
  return legacy === true || legacy === 'yes'
}

export default function HeroBanner({block}: Props) {
  if (block.disabled) return null

  const heroImageId = getImageId(block.image)
  const heroDims = getImageDims(block.image)
  const size = block.size === 'x-large' ? 'x-large' : 'standard'
  const textTone: TextTone = block.textTone === 'dark' ? 'dark' : 'light'
  const tc = textTone === 'light' ? lightOnImage : darkOnImage

  const textAlign: TextAlign =
    block.textAlign === 'center' || block.textAlign === 'right' ? block.textAlign : 'left'
  const ctaTone: CtaTone = block.ctaTone === 'light' ? 'light' : 'dark'
  const tintOn = tintBehindCopyEnabled(block)
  const tintStyle = heroImageId && tintOn ? tintTextShadowStyle(textTone) : undefined

  const imgW = 1920
  const imgH = heroDims ? Math.round((imgW / heroDims.width) * heroDims.height) : Math.round(imgW * (9 / 16))

  return (
    <section
      className={`relative isolate flex w-full flex-col justify-end overflow-hidden ${sizeHeightClass[size]}`}
      aria-labelledby={block.heading ? `hero-banner-heading-${block._key}` : undefined}
    >
      {/* overflow-hidden clips the oversized parallax element */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ParallaxBg>
          {heroImageId ? (
            <Image
              id={heroImageId}
              alt={block.image?.alt || ''}
              className="h-full w-full object-cover object-center"
              width={imgW}
              height={imgH}
              mode="cover"
              crop={adaptCrop(block.image?.crop)}
              hotspot={adaptHotspot(block.image?.hotspot)}
              sizes="100vw"
            />
          ) : (
            <div className="h-full w-full bg-coastal-pine" aria-hidden />
          )}
        </ParallaxBg>
      </div>

      <div className="relative z-1 w-full">
        <div className="container">
          <div
            className={`flex w-full flex-col gap-4 pb-12 pt-16 md:pb-16 md:pt-24 ${alignFlexClass[textAlign]}`}
          >
            {block.subheading ? (
              <p
                className={`font-mono text-xs uppercase tracking-[0.2em] md:text-sm ${tc.subheading}`}
                style={tintStyle}
              >
                {block.subheading}
              </p>
            ) : null}
            {block.heading ? (
              <h1
                id={`hero-banner-heading-${block._key}`}
                className={`max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight md:text-5xl xl:text-6xl ${tc.heading}`}
                style={tintStyle}
              >
                {block.heading}
              </h1>
            ) : null}
            {block.copy?.portableTextBlock?.length ? (
              <div className={tc.copyWrap} style={tintStyle}>
                <PortableText
                  className={tc.portableText}
                  value={block.copy.portableTextBlock as PortableTextBlock[]}
                />
              </div>
            ) : null}
            {block.cta ? (
              <div className="pt-2">
                <Cta cta={block.cta} variant={ctaTone} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

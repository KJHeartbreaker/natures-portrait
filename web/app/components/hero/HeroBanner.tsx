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

      {/* Gradient vignette behind copy — dark tone: luxe-noir wash; light tone: soft-oat wash */}
      <div
        className={`absolute inset-x-0 bottom-0 z-1 h-2/3 pointer-events-none bg-gradient-to-t to-transparent ${textTone === 'dark' ? 'from-soft-oat/80' : 'from-luxe-noir/75'}`}
        aria-hidden
      />

      <div className="relative z-[2] w-full">
        <div className="container">
          <div
            className={`flex w-full max-w-3xl flex-col gap-4 pb-12 pt-16 md:pb-16 md:pt-24 ${alignFlexClass[textAlign]}`}
          >
            {block.subheading ? (
              <p
                className={`font-mono text-xs uppercase tracking-[0.2em] md:text-sm ${tc.subheading}`}
              >
                {block.subheading}
              </p>
            ) : null}
            {block.heading ? (
              <h1
                id={`hero-banner-heading-${block._key}`}
                className={`text-4xl font-light leading-[1.08] tracking-tight md:text-5xl xl:text-6xl ${tc.heading}`}
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
                <Cta cta={block.cta} variant={ctaTone} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

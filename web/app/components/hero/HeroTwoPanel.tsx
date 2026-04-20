import type {PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import {getImageDims, getImageId} from '@/app/lib/sanityImageHelpers'
import type {ExtractPageSectionType} from '@/sanity/lib/types'

const sizeHeightClass = {
  standard: 'min-h-[min(70svh,520px)] md:min-h-[560px] xl:min-h-[600px]',
  'x-large': 'min-h-[min(80svh,640px)] md:min-h-[720px] xl:min-h-[800px]',
} as const

type Props = {
  block: ExtractPageSectionType<'heroTwoPanel'>
}

export default function HeroTwoPanel({block}: Props) {
  if (block.disabled) return null

  const imageId = getImageId(block.image)
  const dims = getImageDims(block.image)
  const size = block.size === 'x-large' ? 'x-large' : 'standard'
  const center = Boolean(block.centerText)

  const imgW = 1600
  const imgH = dims ? Math.round((imgW / dims.width) * dims.height) : Math.round(imgW * (3 / 4))

  return (
    <section
      className={`grid w-full grid-cols-1 md:grid-cols-2 ${sizeHeightClass[size]}`}
      aria-label="Hero"
    >
      {/* Image panel — dominant column on desktop, first on mobile */}
      <div className="relative min-h-[42svh] md:min-h-0">
        {imageId ? (
          <Image
            id={imageId}
            alt={block.image?.alt || ''}
            className="absolute inset-0 h-full w-full object-cover object-center"
            width={imgW}
            height={imgH}
            mode="cover"
            crop={block.image?.crop}
            hotspot={block.image?.hotspot}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-800" aria-hidden />
        )}
      </div>

      {/* Copy panel */}
      <div
        className={`flex flex-col justify-center px-6 py-12 md:px-10 md:py-16 xl:px-14 ${center ? 'text-center' : 'text-left'}`}
        style={block.backgroundColor ? {backgroundColor: block.backgroundColor} : undefined}
      >
        {block.mainPortableText?.portableTextBlock?.length ? (
          <div
            className={`prose prose-lg max-w-none prose-headings:tracking-tight ${center ? 'mx-auto' : ''}`}
          >
            <PortableText value={block.mainPortableText.portableTextBlock as PortableTextBlock[]} />
          </div>
        ) : (
          <p className="font-mono text-sm text-dustySage">No content yet.</p>
        )}
      </div>
    </section>
  )
}

import type {PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import {getImageDims, getImageId} from '@/app/lib/sanityImageHelpers'
import type {ExtractPageSectionType} from '@/sanity/lib/types'

type Block = ExtractPageSectionType<'rowContainer'>
type Panel = NonNullable<Block['leftPanel']>

// Literal class strings so Tailwind can statically detect them.
const splitColsClass: Record<string, string> = {
  '40-60': 'md:grid-cols-[2fr_3fr]',
  '50-50': 'md:grid-cols-[1fr_1fr]',
  '60-40': 'md:grid-cols-[3fr_2fr]',
}

function PanelView({panel}: {panel: Panel | null}) {
  if (!panel) return null

  if (panel.panelType === 'image') {
    const imageId = getImageId(panel.image)
    const dims = getImageDims(panel.image)
    const imgW = 1200
    const imgH = dims ? Math.round((imgW / dims.width) * dims.height) : Math.round(imgW * (3 / 4))

    return (
      <div className="relative min-h-[42svh] md:min-h-[420px]">
        {imageId ? (
          <Image
            id={imageId}
            alt={panel.image?.alt || ''}
            className="absolute inset-0 h-full w-full object-cover object-center"
            width={imgW}
            height={imgH}
            mode="cover"
            crop={panel.image?.crop as any}
            hotspot={panel.image?.hotspot as any}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-coastal-pine" aria-hidden />
        )}
      </div>
    )
  }

  const center = Boolean(panel.centerText)
  const blocks = panel.content?.portableTextBlock

  return (
    <div
      className={`flex flex-col justify-center px-6 py-12 md:px-10 md:py-16 xl:px-14 ${center ? 'text-center' : 'text-left'}`}
      style={panel.backgroundColor ? {backgroundColor: panel.backgroundColor} : undefined}
    >
      {blocks?.length ? (
        <div
          className={`
            prose max-w-none
            prose-headings:font-serif prose-headings:font-light prose-headings:tracking-tight
            prose-p:font-sans prose-p:font-light prose-p:text-[13px] prose-p:leading-[1.875] prose-p:text-coastal-pine
            prose-a:text-coastal-pine prose-a:font-light prose-a:underline
            ${center ? 'mx-auto text-center' : ''}
          `}
        >
          <PortableText value={blocks as PortableTextBlock[]} />
        </div>
      ) : (
        <p className="font-mono text-sm text-dusty-sage">No content yet.</p>
      )}
    </div>
  )
}

type Props = {
  block: Block
}

export default function RowContainer({block}: Props) {
  if (block.disabled) return null

  const split = block.split ?? '50-50'
  const showTitle = Boolean(block.title) && !block.hideTitle

  return (
    <section className="w-full" aria-label={block.title || 'Two column section'}>
      {showTitle ? (
        <div className="px-6 pt-12 md:px-10 xl:px-14">
          <h2
            className={`font-serif font-light tracking-tight text-[clamp(28px,3vw,40px)] ${block.centerTitle ? 'text-center' : 'text-left'}`}
            style={block.titleColor ? {color: block.titleColor} : undefined}
          >
            {block.title}
          </h2>
        </div>
      ) : null}

      <div className={`grid grid-cols-1 ${splitColsClass[split] ?? splitColsClass['50-50']}`}>
        <PanelView panel={block.leftPanel ?? null} />
        <PanelView panel={block.rightPanel ?? null} />
      </div>
    </section>
  )
}

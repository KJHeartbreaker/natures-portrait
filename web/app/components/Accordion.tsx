'use client'

import {useState} from 'react'
import type {PortableTextBlock} from 'next-sanity'
import Image from '@/app/components/SanityImage'
import PortableText from '@/app/components/PortableText'
import SectionEyebrow from '@/app/components/SectionEyebrow'
import {adaptCrop, adaptHotspot, getImageDims, getImageId} from '@/app/lib/sanityImageHelpers'
import type {ExtractPageSectionType} from '@/sanity/lib/types'

type Props = {
  block: ExtractPageSectionType<'accordion'>
}

type ItemProps = {
  question: string
  answer: PortableTextBlock[] | null
  isOpen: boolean
  onToggle: () => void
  isDark: boolean
}

const DARK_BGS = new Set(['#060d0c', '#3e5954', '#758886'])

function AccordionItem({question, answer, isOpen, onToggle, isDark}: ItemProps) {
  return (
    <div className="border-b border-linen-clay last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-8 py-6 text-left transition-colors duration-200 ${
          isDark
            ? 'text-soft-oat hover:text-linen-clay'
            : 'text-luxe-noir hover:text-coastal-pine'
        }`}
        aria-expanded={isOpen}
      >
        <span className="font-serif font-light leading-snug" style={{fontSize: 'clamp(17px, 2vw, 21px)'}}>
          {question}
        </span>
        <span
          className={`shrink-0 font-sans text-[18px] font-light text-dusty-sage transition-transform duration-300 ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{maxHeight: isOpen ? '600px' : '0'}}
      >
        {answer?.length ? (
          <div className="pb-6">
            <PortableText
              value={answer}
              className={isDark ? 'prose-p:text-linen-clay' : 'prose-p:text-coastal-pine'}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function Accordion({block}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (block.disabled) return null

  const bg = block.backgroundColor ?? '#F0EDE5'
  const isDark = DARK_BGS.has(bg.toLowerCase())

  const img = block.image
  const imgId = img ? getImageId(img) : null
  const dims = img ? getImageDims(img) : null
  const hasImage = Boolean(imgId)

  const accordionList = (
    <div>
      {block.eyebrow ? <SectionEyebrow label={block.eyebrow} bg={bg} /> : null}
      <div>
        {block.items?.map((item, i) => (
          <AccordionItem
            key={item._key}
            question={item.question ?? ''}
            answer={item.answer as PortableTextBlock[] | null}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  )

  return (
    <section className="w-full py-20 md:py-28" style={{backgroundColor: bg}}>
      <div className="container">
        {hasImage ? (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16 lg:items-start">
            {/* Accordion — 60% (3/5 cols) */}
            <div className="lg:col-span-3">{accordionList}</div>

            {/* Image — 40% (2/5 cols), sticky so it anchors as items open */}
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              {imgId && (
                <div className="overflow-hidden">
                  <Image
                    id={imgId}
                    alt={img?.alt || ''}
                    width={600}
                    height={dims ? Math.round((600 / dims.width) * dims.height) : 750}
                    mode="cover"
                    crop={adaptCrop(img?.crop)}
                    hotspot={adaptHotspot(img?.hotspot)}
                    className="w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl">{accordionList}</div>
        )}
      </div>
    </section>
  )
}

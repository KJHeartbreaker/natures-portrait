import Image from '@/app/components/SanityImage'
import {adaptCrop, adaptHotspot, getImageId} from '@/app/lib/sanityImageHelpers'
import type {ExtractPageSectionType} from '@/sanity/lib/types'

type Props = {
  block: ExtractPageSectionType<'seriesGrid'>
}

export default function SeriesGrid({block}: Props) {
  if (block.disabled) return null

  const collections = block.collections ?? []
  if (collections.length === 0) return null

  return (
    <section className="w-full py-20 md:py-28">
      <div className="container">
        {/* Eyebrow */}
        <div className="mb-10 flex items-center gap-4">
          <span className="text-[10px] font-sans font-light uppercase tracking-[0.25em] text-dusty-sage whitespace-nowrap">
            Series
          </span>
          <span className="flex-1 h-px bg-linen-clay" aria-hidden="true" />
        </div>

        {/* Grid */}
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {collections.map((col) => {
            const imgId = col.coverPhoto?.image ? getImageId(col.coverPhoto.image) : null
            const collectionSlug = col.slug
            const href = collectionSlug ? `/series/${collectionSlug}` : undefined

            const cardContent = (
              <>
                {/* Portrait image — 3:4 aspect ratio */}
                <div className="aspect-[3/4] overflow-hidden bg-linen-clay">
                  {imgId ? (
                    <Image
                      id={imgId}
                      alt={col.coverPhoto?.image?.alt || col.title || ''}
                      width={600}
                      height={800}
                      mode="cover"
                      crop={adaptCrop(col.coverPhoto?.image?.crop)}
                      hotspot={adaptHotspot(col.coverPhoto?.image?.hotspot)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                {/* Meta */}
                <div className="mt-4 flex flex-col gap-1">
                  <h3 className="font-serif font-light text-luxe-noir text-[18px] leading-snug">
                    {col.title}
                  </h3>
                  {typeof col.photoCount === 'number' && (
                    <p className="text-[10px] font-sans font-light uppercase tracking-[0.25em] text-dusty-sage">
                      {col.photoCount} {col.photoCount === 1 ? 'Photograph' : 'Photographs'}
                    </p>
                  )}
                </div>
              </>
            )

            return (
              <li key={col._id} className="group">
                {href ? (
                  <a href={href} className="block">
                    {cardContent}
                  </a>
                ) : (
                  <div>{cardContent}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

'use client'

import {useState, useMemo} from 'react'
import PhotoGrid from '@/app/components/PhotoGrid'

type Collection = {
  _id: string
  title: string | null
  slug: string | null
}

type Photo = {
  _id: string
  _key: string
  title?: string | null
  location?: string | null
  description?: {portableTextBlock?: unknown[] | null} | null
  dateCaptured?: string | null
  cameraText?: string | null
  lensText?: string | null
  cameraRef?: unknown | null
  lensRef?: unknown | null
  image?: unknown
  collectionIds: string[]
}

type Props = {
  photos: Photo[]
  collections: Collection[]
}

export default function AutoGallery({photos, collections}: Props) {
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null)

  const visiblePhotos = useMemo(() => {
    if (!activeCollectionId) return photos
    return photos.filter((p) => p.collectionIds.includes(activeCollectionId))
  }, [photos, activeCollectionId])

  return (
    <div>
      {collections.length > 0 && (
        <div className="container pb-8 flex flex-wrap gap-6 items-center">
          <button
            onClick={() => setActiveCollectionId(null)}
            className={`text-[10px] font-sans font-light uppercase tracking-[0.25em] transition-colors ${
              activeCollectionId === null
                ? 'text-luxe-noir border-b border-luxe-noir'
                : 'text-dusty-sage hover:text-coastal-pine'
            }`}
          >
            All
          </button>
          {collections.map((c) => (
            <button
              key={c._id}
              onClick={() => setActiveCollectionId(c._id)}
              className={`text-[10px] font-sans font-light uppercase tracking-[0.25em] transition-colors ${
                activeCollectionId === c._id
                  ? 'text-luxe-noir border-b border-luxe-noir'
                  : 'text-dusty-sage hover:text-coastal-pine'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      )}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PhotoGrid images={visiblePhotos as any[]} columns={3} gap={12} showCaptions />
    </div>
  )
}

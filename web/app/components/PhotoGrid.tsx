'use client'

import {useCallback, useEffect, useMemo, useState} from 'react'

import Image from '@/app/components/SanityImage'
import type {SanityImageCrop, SanityImageHotspot} from '@/sanity.types'
import PortableText from '@/app/components/PortableText'

type PhotoImageLike = {
  _key?: string
  alt?: string | null
  crop?: SanityImageCrop | null
  hotspot?: SanityImageHotspot | null
  asset?: {
    _ref?: string
    _id?: string
  } | null
} | null

type GearLike = {
  _id?: string
  kind?: 'camera' | 'lens' | 'accessory'
  brand?: string | null
  model?: string | null
  nickname?: string | null
  link?: string | null
} | null

type PhotoItemLike = {
  _key?: string
  title?: string | null
  location?: string | null
  description?: {portableTextBlock?: any[] | null} | null
  dateCaptured?: string | null
  cameraText?: string | null
  lensText?: string | null
  cameraRef?: GearLike | undefined
  lensRef?: GearLike | undefined
  image?: PhotoImageLike
} | null

function getImageId(image: PhotoImageLike): string | null {
  return image?.asset?._ref || image?.asset?._id || null
}

function gearLabel(gear: GearLike | undefined): string | null {
  if (!gear) return null
  const label = `${gear.brand || ''} ${gear.model || ''}`.trim()
  return label || null
}

export default function PhotoGrid({
  images,
  columns,
  gap,
  showCaptions,
}: {
  images: PhotoItemLike[]
  columns?: number | null
  gap?: number | null
  showCaptions?: boolean | null
}) {
  const THUMB_BAR_HEIGHT_PX = 92
  const PEEK_BAR_HEIGHT_PX = 86

  const cols = useMemo(() => {
    if (columns && [2, 3, 4].includes(columns)) return columns
    return 3
  }, [columns])

  const cellGap = typeof gap === 'number' ? gap : 12

  const safeItems = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images])

  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [drawer, setDrawer] = useState<'peek' | 'open'>('peek')

  const replaceUrlPhotoParam = useCallback((photoKey: string | null) => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    if (photoKey) url.searchParams.set('photo', photoKey)
    else url.searchParams.delete('photo')
    // Avoid pointless updates that can cause router/navigation churn
    if (url.toString() === window.location.href) return
    window.history.replaceState({}, '', url)
  }, [])

  const open = useCallback(
    (nextIndex: number) => {
      setIndex(nextIndex)
      setIsOpen(true)
      setDrawer('peek')
    },
    [setIndex, setIsOpen],
  )

  const close = useCallback(() => {
    // Remove param immediately so "open-from-URL" won't re-open
    replaceUrlPhotoParam(null)
    setIsOpen(false)
  }, [replaceUrlPhotoParam])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + safeItems.length) % safeItems.length)
  }, [safeItems.length])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % safeItems.length)
  }, [safeItems.length])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, close, prev, next])

  useEffect(() => {
    if (!isOpen) return
    const scrollY = window.scrollY || window.pageYOffset || 0
    const prevOverflow = document.body.style.overflow
    const prevPosition = document.body.style.position
    const prevTop = document.body.style.top
    const prevWidth = document.body.style.width

    // Robust scroll lock that prevents "jump to top" on iOS/desktop
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.position = prevPosition
      document.body.style.top = prevTop
      document.body.style.width = prevWidth
      // Restore scroll position
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

  // Deep link: open if URL has ?photo=<photoItem._key>
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isOpen) return
    const key = new URL(window.location.href).searchParams.get('photo')
    if (!key) return
    const nextIndex = safeItems.findIndex((it) => it?._key === key)
    if (nextIndex >= 0) open(nextIndex)
  }, [safeItems, isOpen, open])

  // Keep URL in sync while modal is open (without triggering Next navigation)
  useEffect(() => {
    if (!isOpen) return
    const key = safeItems[index]?._key || null
    replaceUrlPhotoParam(key)
  }, [isOpen, index, safeItems, replaceUrlPhotoParam])

  useEffect(() => {
    if (isOpen) return
    replaceUrlPhotoParam(null)
  }, [isOpen, replaceUrlPhotoParam])

  const active = safeItems[index] ?? null
  const activeImage = active?.image ?? null
  const activeId = getImageId(activeImage)

  const activeTitle = active?.title || activeImage?.alt || null
  const activeLocation = active?.location || null
  const activeCamera = gearLabel(active?.cameraRef) || active?.cameraText || null
  const activeLens = gearLabel(active?.lensRef) || active?.lensText || null
  const hasInfo = Boolean(activeTitle || activeLocation || active?.description?.portableTextBlock?.length || activeCamera || activeLens)

  return (
    <>
      <div
        className="grid"
        style={{
          gap: cellGap,
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {safeItems.map((item, i) => {
          const img = item?.image ?? null
          const id = getImageId(img)
          if (!id) return null
          return (
            <figure key={item?._key || id} className="space-y-2">
              <button
                type="button"
                onClick={() => open(i)}
                className="group relative block w-full overflow-hidden rounded-sm"
                style={{aspectRatio: '1 / 1'}}
                aria-label={img?.alt ? `Open image: ${img.alt}` : 'Open image'}
              >
                <Image
                  id={id}
                  alt={img?.alt || ''}
                  width={900}
                  height={900}
                  mode="cover"
                  crop={img?.crop}
                  hotspot={img?.hotspot}
                  className="w-full h-full object-cover"
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/10" />
              </button>
              {showCaptions ? (
                <figcaption className="font-mono text-xs opacity-70">{item?.title || img?.alt}</figcaption>
              ) : null}
            </figure>
          )
        })}
      </div>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="font-mono text-xs text-white/80">
                {safeItems.length ? `${index + 1} / ${safeItems.length}` : ''}
              </div>
              <button
                type="button"
                onClick={close}
                className="font-mono text-xs text-white/90 hover:text-white underline underline-offset-4"
              >
                Close
              </button>
            </div>

            <div className="relative rounded-sm overflow-hidden bg-black/30">
              {/* Stage: image + separate peek bar + separate thumb nav. */}
              <div className="relative" style={{height: '80vh'}}>
                <div
                  className="absolute left-0 right-0 top-0"
                  style={{
                    bottom: `${(safeItems.length > 1 ? THUMB_BAR_HEIGHT_PX : 0) + (hasInfo && drawer === 'peek' ? PEEK_BAR_HEIGHT_PX : 0)}px`,
                  }}
                >
                  {activeId ? (
                    <Image
                      id={activeId}
                      alt={activeImage?.alt || ''}
                      width={1800}
                      height={1100}
                      mode="contain"
                      crop={activeImage?.crop}
                      hotspot={activeImage?.hotspot}
                      className="w-full h-full"
                      style={{width: '100%', height: '100%', objectFit: 'contain'}}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-white/70 font-mono text-sm">
                      Image unavailable
                    </div>
                  )}
                </div>

                {/* Peek bar (state 2): outside the drawer and always below the image. */}
                {hasInfo && drawer === 'peek' ? (
                  <div
                    className="absolute left-0 right-0 z-40 bg-black/55 backdrop-blur-md border-t border-white/10 px-4 py-3 text-white"
                    style={{
                      height: `${PEEK_BAR_HEIGHT_PX}px`,
                      bottom: `${safeItems.length > 1 ? THUMB_BAR_HEIGHT_PX : 0}px`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setDrawer('open')}
                      className="w-full text-left"
                      aria-label="Show details"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          {activeTitle ? <div className="text-sm font-semibold truncate">{activeTitle}</div> : null}
                          {activeLocation ? <div className="text-xs text-white/75 truncate">{activeLocation}</div> : null}
                        </div>
                        <div className="font-mono text-[11px] text-white/70 shrink-0">{active?.dateCaptured || ''}</div>
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="h-1 w-10 rounded bg-white/40" />
                        <span className="font-mono text-xs text-white/80 underline underline-offset-4">Show details</span>
                      </div>
                    </button>
                  </div>
                ) : null}

                {/* Drawer (state 3): overlays image only, and is auto-height based on content. */}
                {hasInfo ? (
                  <div
                    className="absolute left-0 right-0 z-40"
                    style={{
                      bottom: `${safeItems.length > 1 ? THUMB_BAR_HEIGHT_PX : 0}px`,
                      transform: drawer === 'open' ? 'translateY(0)' : 'translateY(100%)',
                      transition: 'transform 220ms ease',
                      pointerEvents: drawer === 'open' ? 'auto' : 'none',
                    }}
                  >
                    <div
                      className="bg-black/55 backdrop-blur-md border-t border-white/10"
                      style={{
                        maxHeight: `calc(80vh - ${(safeItems.length > 1 ? THUMB_BAR_HEIGHT_PX : 0)}px)`,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setDrawer('peek')}
                        className="w-full flex items-center justify-center gap-2 py-3"
                        aria-label="Hide details"
                      >
                        <span className="h-1 w-10 rounded bg-white/40" />
                      </button>

                      <div className="px-4 pb-4 space-y-3 text-white overflow-auto">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <div className="min-w-0 space-y-1">
                            {activeTitle ? <div className="text-base font-semibold truncate">{activeTitle}</div> : null}
                            {activeLocation ? <div className="text-xs text-white/75 truncate">{activeLocation}</div> : null}
                          </div>
                          <div className="font-mono text-[11px] text-white/70 shrink-0">{active?.dateCaptured || ''}</div>
                        </div>

                        {active?.description?.portableTextBlock?.length ? (
                          <div className="text-white/90">
                            <PortableText
                              className="prose prose-invert prose-p:leading-relaxed prose-a:text-white"
                              value={active.description.portableTextBlock as any[]}
                            />
                          </div>
                        ) : null}

                        {activeCamera || activeLens ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            {activeCamera ? (
                              <div>
                                <div className="font-mono text-xs text-white/70">Camera</div>
                                <div className="text-white/90">{activeCamera}</div>
                              </div>
                            ) : null}
                            {activeLens ? (
                              <div>
                                <div className="font-mono text-xs text-white/70">Lens</div>
                                <div className="text-white/90">{activeLens}</div>
                              </div>
                            ) : null}
                          </div>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => setDrawer('peek')}
                          className="font-mono text-xs text-white/80 hover:text-white underline underline-offset-4"
                        >
                          Hide details
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Thumbnail navigation bar (thumbnails only, always visible, totally separate). */}
                {safeItems.length > 1 ? (
                  <div
                    className="absolute left-0 right-0 bottom-0 z-50 bg-black/60 backdrop-blur-md border-t border-white/10 px-4 py-3"
                    style={{height: `${THUMB_BAR_HEIGHT_PX}px`}}
                  >
                    <div className="flex gap-2 overflow-x-auto">
                      {safeItems.map((it, i) => {
                        const im = it?.image ?? null
                        const id = getImageId(im)
                        if (!id) return null
                        const isActive = i === index
                        return (
                          <button
                            key={it?._key || id}
                            type="button"
                            onClick={() => setIndex(i)}
                            className={`shrink-0 overflow-hidden rounded-sm border ${isActive ? 'border-white' : 'border-white/30'}`}
                            style={{width: 64, height: 64}}
                            aria-label={`Go to image ${i + 1}`}
                          >
                            <Image
                              id={id}
                              alt={im?.alt || ''}
                              width={200}
                              height={200}
                              mode="cover"
                              crop={im?.crop}
                              hotspot={im?.hotspot}
                              className="w-full h-full object-cover"
                              style={{width: '100%', height: '100%', objectFit: 'cover'}}
                            />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ) : null}
              </div>

              {safeItems.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/55 text-white px-3 py-2 rounded"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/55 text-white px-3 py-2 rounded"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}


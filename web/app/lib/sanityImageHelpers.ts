/** Shared helpers for Sanity image references in page blocks. */

import type {SanityImageCrop, SanityImageHotspot} from '@/sanity.types'

type AssetRef = {_ref?: string; _id?: string} | null | undefined

export function getImageId(image: {asset?: AssetRef} | null | undefined): string | null {
  const asset = image?.asset
  if (!asset) return null
  return asset._ref || asset._id || null
}

/** Accepts loosely typed / GROQ-resolved image shapes (nullable metadata and dimensions). */
export function getImageDims(image: unknown): {width: number; height: number} | null {
  const dims = (image as {asset?: {metadata?: {dimensions?: {width?: number; height?: number} | null} | null} | null} | null)
    ?.asset?.metadata?.dimensions
  const w = dims?.width
  const h = dims?.height
  if (typeof w === 'number' && typeof h === 'number' && w > 0 && h > 0) return {width: w, height: h}
  return null
}

/** Maps Sanity's nullable crop type (optional fields) to the required CropData shape. */
export function adaptCrop(
  crop: SanityImageCrop | null | undefined,
): {top: number; bottom: number; left: number; right: number} | null {
  if (!crop) return null
  return {
    top: crop.top ?? 0,
    bottom: crop.bottom ?? 0,
    left: crop.left ?? 0,
    right: crop.right ?? 0,
  }
}

/** Maps Sanity's nullable hotspot type (optional fields) to the required HotspotData shape. */
export function adaptHotspot(
  hotspot: SanityImageHotspot | null | undefined,
): {x: number; y: number} | null {
  if (!hotspot) return null
  return {
    x: hotspot.x ?? 0.5,
    y: hotspot.y ?? 0.5,
  }
}

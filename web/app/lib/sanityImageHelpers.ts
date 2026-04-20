/** Shared helpers for Sanity image references in page blocks. */

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

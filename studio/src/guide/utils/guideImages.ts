/** Served from `studio/static/guide-images/` at `/static/guide-images/`. */
export const GUIDE_IMAGES_BASE = '/static/guide-images'

export function guideImage(filename: string): string {
  return `${GUIDE_IMAGES_BASE}/${filename}`
}

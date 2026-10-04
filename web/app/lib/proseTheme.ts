/**
 * Returns Tailwind prose modifier classes appropriate for a given background colour.
 *
 * Light bgs (soft-oat, linen-clay)  → headings luxe-noir, body coastal-pine
 * Mid bg   (dusty-sage)             → headings + body luxe-noir (coastal-pine fails contrast)
 * Dark bgs (coastal-pine, luxe-noir)→ all soft-oat (prose-invert)
 */
export function proseThemeForBg(bg: string | null | undefined): string {
  const normalized = bg?.toLowerCase()
  // Dark/mid palette colours — use light (soft-oat) text
  const darkBgs = ['#060d0c', '#3e5954', '#758886']
  if (normalized && darkBgs.includes(normalized)) {
    return 'prose-invert prose-headings:text-soft-oat prose-p:text-soft-oat prose-a:text-soft-oat'
  }
  // soft-oat (#F0EDE5), linen-clay (#C6C2BB), or no bg — light surface defaults
  return 'prose-headings:text-luxe-noir prose-p:text-coastal-pine prose-a:text-coastal-pine'
}

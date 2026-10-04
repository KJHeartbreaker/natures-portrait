const DARK_BGS = ['#060d0c', '#3e5954', '#758886']

/**
 * Returns eyebrow label + hairline colour classes appropriate for a given background.
 *
 * Light bgs → dusty-sage label, linen-clay hairline (default)
 * Dark/mid  → soft-oat/30 label, soft-oat/20 hairline
 */
export function eyebrowThemeForBg(bg: string | null | undefined): {label: string; rule: string} {
  const normalized = bg?.toLowerCase()
  if (normalized && DARK_BGS.includes(normalized)) {
    return {label: 'text-soft-oat/80', rule: 'bg-soft-oat/35'}
  }
  return {label: 'text-dusty-sage', rule: 'bg-linen-clay'}
}

/**
 * Returns Tailwind prose modifier classes appropriate for a given background colour.
 *
 * Light bgs (soft-oat, linen-clay)  → headings luxe-noir, body coastal-pine
 * Mid bg   (dusty-sage)             → headings + body luxe-noir (coastal-pine fails contrast)
 * Dark bgs (coastal-pine, luxe-noir)→ all soft-oat (prose-invert)
 */
export function proseThemeForBg(bg: string | null | undefined): string {
  const normalized = bg?.toLowerCase()
  if (normalized && DARK_BGS.includes(normalized)) {
    return 'prose-invert prose-headings:text-soft-oat prose-p:text-soft-oat prose-a:text-soft-oat'
  }
  // soft-oat (#F0EDE5), linen-clay (#C6C2BB), or no bg — light surface defaults
  return 'prose-headings:text-luxe-noir prose-p:text-coastal-pine prose-a:text-coastal-pine'
}

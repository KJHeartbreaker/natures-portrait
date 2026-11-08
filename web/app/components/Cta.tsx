import Link from 'next/link'

import StegaText from '@/app/components/StegaText'
import {linkResolver, type CtaLike} from '@/sanity/lib/utils'

export type CtaVariant = 'light' | 'dark'

const textLinkBase =
  'inline-block text-xs font-sans font-normal uppercase tracking-[0.22em] border-b border-current pb-1 transition-colors duration-200'

export const textLinkClass = `${textLinkBase} text-luxe-noir hover:text-coastal-pine`
export const textLinkLightClass = `${textLinkBase} text-soft-oat hover:text-linen-clay`

const ctaVariantClass: Record<CtaVariant, string> = {
  dark: textLinkClass,
  light: textLinkLightClass,
}

type CtaProps = {
  cta: CtaLike
  className?: string
  variant?: CtaVariant
  arrow?: boolean
}

export default function Cta({cta, className, variant = 'dark', arrow = false}: CtaProps) {
  const href = linkResolver(cta)
  if (!href || !cta.title) return null

  const isExternal = /^https?:\/\//.test(href)

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={className ?? ctaVariantClass[variant]}
      data-sanity-edit-target
    >
      <StegaText text={cta.title} />
      {arrow ? <span className="ml-2">→</span> : null}
    </Link>
  )
}

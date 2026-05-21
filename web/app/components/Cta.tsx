import Link from 'next/link'

import {linkResolver, type CtaLike} from '@/sanity/lib/utils'

export type CtaVariant = 'light' | 'dark'

const ctaVariantClass: Record<CtaVariant, string> = {
  dark: 'inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-mono text-white hover:bg-blue transition-colors',
  light:
    'inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-mono text-black shadow-md ring-1 ring-black/15 hover:bg-linen-clay transition-colors',
}

type CtaProps = {
  cta: CtaLike
  className?: string
  variant?: CtaVariant
}

export default function Cta({cta, className, variant = 'dark'}: CtaProps) {
  const href = linkResolver(cta)
  if (!href || !cta.title) return null

  const isExternal = /^https?:\/\//.test(href)

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={className ?? ctaVariantClass[variant]}
    >
      {cta.title}
      {cta.arrow ? <span className="ml-2">→</span> : null}
    </Link>
  )
}

import Link from 'next/link'

import type {Cta as CtaType} from '@/sanity.types'
import {linkResolver} from '@/sanity/lib/utils'
import type {ResolvedLandingPage} from '@/sanity/lib/types'

type CtaProps = {
  cta: CtaType & {landingPage?: ResolvedLandingPage}
  className?: string
}

export default function Cta({cta, className}: CtaProps) {
  const href = linkResolver(cta)
  if (!href || !cta.title) return null

  const isExternal = /^https?:\/\//.test(href)

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={
        className ??
        'inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-mono text-white hover:bg-blue transition-colors'
      }
    >
      {cta.title}
      {cta.arrow ? <span className="ml-2">→</span> : null}
    </Link>
  )
}

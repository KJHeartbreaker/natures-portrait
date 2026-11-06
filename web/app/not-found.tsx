import Link from 'next/link'

import SectionEyebrow from '@/app/components/SectionEyebrow'
import {textLinkClass} from '@/app/components/Cta'

export const metadata = {title: 'Page not found'}

export default function NotFound() {
  return (
    <div className="container pt-32 pb-24 md:pt-40">
      <SectionEyebrow label="404" />
      <h1
        className="font-serif font-light text-luxe-noir mb-8"
        style={{fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.08}}
      >
        This path leads nowhere
      </h1>
      <p className="text-coastal-pine font-light mb-10 max-w-xl leading-[1.85]">
        The page you were looking for has moved or never existed.
      </p>
      <Link href="/" className={textLinkClass}>
        Return home
      </Link>
    </div>
  )
}

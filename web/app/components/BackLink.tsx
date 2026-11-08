import Link from 'next/link'

import {textLinkClass} from '@/app/components/Cta'

/** "← Back to …" link, in the same underlined text-link style as CTAs so it reads as a link. */
export default function BackLink({href, label}: {href: string; label: string}) {
  return (
    <Link href={href} className={textLinkClass}>
      <span aria-hidden="true" className="mr-2">
        ←
      </span>
      {label}
    </Link>
  )
}

import Link from 'next/link'

import {linkResolver} from '@/sanity/lib/utils'
import type {PortableTextMarkLink} from '@/sanity/lib/types'

interface ResolvedLinkProps {
  link: PortableTextMarkLink & {blank?: boolean}
  children: React.ReactNode
  className?: string
}

export default function ResolvedLink({link, children, className}: ResolvedLinkProps) {
  // resolveLink() is used to determine the type of link and return the appropriate URL.
  const resolvedLink = linkResolver(link)

  if (typeof resolvedLink === 'string') {
    return (
      <Link
        href={resolvedLink}
        target={link?.blank ? '_blank' : undefined}
        rel={link?.blank ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {children}
      </Link>
    )
  }
  return <>{children}</>
}

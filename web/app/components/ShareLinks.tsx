'use client'

import {useSyncExternalStore} from 'react'
import {FaEnvelope, FaFacebookF, FaLinkedinIn, FaPinterestP, FaXTwitter} from 'react-icons/fa6'

const noopSubscribe = () => () => {}

type Props = {
  title: string
  /** Absolute image URL, used for Pinterest pins. */
  imageUrl?: string
}

/**
 * "Share via" row for journal entries: filled square badges with solid brand
 * glyphs. Badges use the palette (coastalPine, darkening to luxeNoir on hover)
 * rather than brand colours, per the no-accent-colour rule.
 */
export default function ShareLinks({title, imageUrl}: Props) {
  // Page URL is only known in the browser; '' during SSR, so links render without href until hydrated.
  const url = useSyncExternalStore(
    noopSubscribe,
    () => window.location.origin + window.location.pathname,
    () => '',
  )

  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)

  const links = [
    {label: 'Facebook', Icon: FaFacebookF, href: `https://www.facebook.com/sharer/sharer.php?u=${u}`},
    {label: 'X', Icon: FaXTwitter, href: `https://x.com/intent/post?url=${u}&text=${t}`},
    {label: 'LinkedIn', Icon: FaLinkedinIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`},
    {
      label: 'Pinterest',
      Icon: FaPinterestP,
      href: `https://pinterest.com/pin/create/button/?url=${u}&description=${t}${
        imageUrl ? `&media=${encodeURIComponent(imageUrl)}` : ''
      }`,
    },
    {label: 'Email', Icon: FaEnvelope, href: `mailto:?subject=${t}&body=${u}`},
  ]

  return (
    <div role="group" aria-label="Share this entry" className="flex items-center gap-3">
      <span className="text-[10px] font-sans font-normal uppercase tracking-[0.25em] text-dusty-sage">
        Share via
      </span>
      <div className="flex items-center gap-1.5">
        {links.map(({label, Icon, href}) => {
          const external = label !== 'Email'
          return (
            <a
              key={label}
              href={url ? href : undefined}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="flex h-6 w-6 items-center justify-center bg-coastal-pine text-soft-oat transition-colors duration-200 hover:bg-luxe-noir"
              aria-label={label === 'Email' ? 'Share by email' : `Share on ${label}`}
              title={label === 'Email' ? 'Share by email' : `Share on ${label}`}
            >
              <Icon size={label === 'Email' ? 10 : 11} aria-hidden />
            </a>
          )
        })}
      </div>
    </div>
  )
}

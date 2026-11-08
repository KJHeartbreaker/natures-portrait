/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {PortableText, type PortableTextComponents, type PortableTextBlock} from 'next-sanity'
import Cta, {textLinkClass} from '@/app/components/Cta'
import ResolvedLink from '@/app/components/ResolvedLink'
import Image from '@/app/components/SanityImage'
import {linkifyEmails} from '@/app/lib/linkifyEmails'

export default function CustomPortableText({
  className,
  value,
  centered = false,
}: {
  className?: string
  value: PortableTextBlock[]
  centered?: boolean
}) {
  const components: PortableTextComponents = {
    types: {
      cta: ({value}) => (
        <p className="not-prose mt-8">
          <Cta cta={value} className={textLinkClass} arrow />
        </p>
      ),
      // Hairline divider. `size` = spacing above/below (px), `width` = % of container.
      // Dusty Sage reads on every section bg (soft oat, linen clay, pine, noir).
      hr: ({value}) => {
        const spacing = clampNumber(value?.size, 0, 200, 25)
        const width = clampNumber(value?.width, 5, 100, 70)
        return (
          <hr
            className="not-prose mx-auto h-0 border-0 border-t border-dusty-sage"
            style={{width: `${width}%`, marginBlock: `${spacing}px`}}
          />
        )
      },
      image: ({value}) => {
        const id = value?.asset?._ref || value?.asset?._id
        if (!id) {
          return null
        }

        return (
          <figure className={`my-8${centered ? ' flex justify-center' : ''}`}>
            <Image
              id={id}
              alt={value.alt || ''}
              width={672}
              crop={value.crop}
              hotspot={value.hotspot}
              mode="cover"
            />
          </figure>
        )
      },
    },
    marks: {
      link: ({children, value: link}) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>
      },
      internalLink: ({children, value: link}) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>
      },
    },
  }

  return (
    <div className={`prose-a:text-brand prose ${className}`}>
      <PortableText components={components} value={linkifyEmails(value)} />
    </div>
  )
}

/** Editors type these as free-text strings in the Studio — parse defensively. */
function clampNumber(raw: unknown, min: number, max: number, fallback: number): number {
  const n = Number.parseFloat(String(raw ?? ''))
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, n))
}

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
import PhotoGrid from '@/app/components/PhotoGrid'
import SectionEyebrow from '@/app/components/SectionEyebrow'
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
      // Photo Grid inside a journal post body (posts have no page builder).
      // Breaks out of the text column to the full viewport, then sits in the
      // standard page `container` so it lines up with page-builder sections.
      // The block's background colour is ignored here: the article keeps its own.
      // The post page clips horizontal overflow, so `w-screen` can't cause sideways scroll.
      photoGridContainer: ({value}) => {
        if (value?.disabled || !value?.images?.length) return null
        return (
          <div className="not-prose relative left-1/2 my-14 w-screen -translate-x-1/2">
            <div className="container">
              {value.eyebrow ? <SectionEyebrow label={value.eyebrow} /> : null}
              <PhotoGrid
                images={value.images}
                columns={value.columns}
                gap={value.gap}
                showCaptions={value.showCaptions}
              />
            </div>
          </div>
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

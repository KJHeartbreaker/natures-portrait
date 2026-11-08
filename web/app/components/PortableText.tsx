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
  wideImages = false,
}: {
  className?: string
  value: PortableTextBlock[]
  centered?: boolean
  /** Journal posts: landscape images break out to the same width as Photo Grid. */
  wideImages?: boolean
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

        // Same breakout as photoGridContainer, so single photos and grids share one edge.
        // Portrait and square photos stay at text width: at grid width they'd run past the fold.
        if (wideImages && isLandscape(id, value.crop)) {
          return (
            <figure className="not-prose relative left-1/2 my-14 w-screen -translate-x-1/2">
              <div className="container">
                <Image
                  id={id}
                  alt={value.alt || ''}
                  width={1600}
                  crop={value.crop}
                  hotspot={value.hotspot}
                  mode="cover"
                  sizes="(min-width: 1440px) 1280px, 100vw"
                  // Full grid width when there's room; on short screens a taller landscape
                  // shrinks to 85vh and centres, so it still fits on screen.
                  className="mx-auto block h-auto max-h-[85vh] w-auto max-w-full"
                />
              </div>
            </figure>
          )
        }

        // In posts, cap portrait height so the whole photo fits on screen at once.
        if (wideImages) {
          return (
            <figure className="not-prose my-14 flex justify-center">
              <Image
                id={id}
                alt={value.alt || ''}
                width={1200}
                crop={value.crop}
                hotspot={value.hotspot}
                mode="cover"
                sizes="(min-width: 768px) 672px, 100vw"
                className="block h-auto max-h-[85vh] w-auto max-w-full"
              />
            </figure>
          )
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

/** Orientation from the asset ref (`image-<hash>-<w>x<h>-<ext>`), after any Studio crop. */
function isLandscape(
  ref: string,
  crop?: {top?: number; bottom?: number; left?: number; right?: number},
): boolean {
  const match = /-(\d+)x(\d+)-/.exec(ref)
  if (!match) return false
  const w = Number(match[1]) * (1 - (crop?.left ?? 0) - (crop?.right ?? 0))
  const h = Number(match[2]) * (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0))
  return h > 0 && w / h > 1.1
}

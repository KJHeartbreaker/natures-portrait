import {stegaClean} from 'next-sanity'

/**
 * Renders a Sanity string so preview's stega markers don't change the layout.
 *
 * In Presentation, strings carry an invisible run of zero-width characters (appended
 * at the end) that power click-to-edit. With wide `letter-spacing`, each of those
 * characters still gets the spacing, so tracked labels like the nav balloon and wrap.
 * We show the clean text and keep the markers in a span with no letter-spacing.
 *
 * Put `data-sanity-edit-target` on the surrounding link or button so the edit overlay
 * covers the whole label rather than the zero-width span.
 */
export default function StegaText({text}: {text: string}) {
  const clean = stegaClean(text)
  if (clean === text || !text.startsWith(clean)) return <>{clean}</>
  return (
    <>
      {clean}
      <span style={{letterSpacing: 0}}>{text.slice(clean.length)}</span>
    </>
  )
}

import {Box, Stack, Text} from '@sanity/ui'

import {guideImage} from '../utils/guideImages'

type GuideScreenshotProps = {
  src: string
  alt: string
  caption?: string
}

export function GuideScreenshot({src, alt, caption}: GuideScreenshotProps) {
  return (
    <Stack gap={2}>
      <Box
        style={{
          borderRadius: '6px',
          overflow: 'hidden',
          border: '1px solid var(--card-border-color)',
          backgroundColor: 'var(--card-bg-color)',
        }}
      >
        <a href={src} target="_blank" rel="noreferrer" title="Open full size in a new tab">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              verticalAlign: 'middle',
            }}
          />
        </a>
      </Box>
      {caption ? (
        <Text as="p" muted size={1} style={{lineHeight: 1.5}}>
          {caption}
        </Text>
      ) : null}
    </Stack>
  )
}

/** A Studio screenshot from `studio/static/guide-images/`. Red boxes in the image mark what the caption describes. */
export function GuideShot({file, alt, caption}: {file: string; alt: string; caption?: string}) {
  return <GuideScreenshot src={guideImage(file)} alt={alt} caption={caption} />
}

export type GuideScreenshotItem = GuideScreenshotProps

import {Box, Stack, Text} from '@sanity/ui'

type GuideScreenshotProps = {
  src: string
  alt: string
  caption?: string
}

export function GuideScreenshot({src, alt, caption}: GuideScreenshotProps) {
  return (
    <Stack space={2}>
      <Box
        style={{
          borderRadius: '6px',
          overflow: 'hidden',
          border: '1px solid var(--card-border-color)',
          backgroundColor: 'var(--card-bg-color)',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            verticalAlign: 'middle',
          }}
        />
      </Box>
      {caption ? (
        <Text as="p" muted size={1} style={{lineHeight: 1.5}}>
          {caption}
        </Text>
      ) : null}
    </Stack>
  )
}

export type GuideScreenshotItem = GuideScreenshotProps

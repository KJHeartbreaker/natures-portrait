import {Box, Card, Heading, Stack} from '@sanity/ui'
import type {ReactNode} from 'react'

type GuideSectionProps = {
  id: string
  title: string
  level?: 'h2' | 'h3' | 'h4'
  children: ReactNode
}

export function GuideSection({id, title, level = 'h2', children}: GuideSectionProps) {
  const isMajor = level === 'h2'
  const isNested = level === 'h4'

  return (
    <Box as="section" id={id} style={{scrollMarginTop: '1.5rem'}}>
      <Card
        padding={isMajor ? 4 : isNested ? 2 : 3}
        radius={2}
        border
        shadow={isMajor ? 1 : 0}
        tone="default"
        style={
          isMajor
            ? undefined
            : {
                borderLeftWidth: isNested ? '2px' : '3px',
                borderLeftColor: 'var(--card-accent-fg-color, var(--brand-primary-color, #2276fc))',
              }
        }
      >
        <Stack space={isMajor ? 5 : isNested ? 3 : 4}>
          <Heading
            as={level}
            size={isMajor ? 2 : isNested ? 0 : 1}
            style={{
              paddingBottom: isMajor ? '0.75rem' : '0.5rem',
              borderBottom: isNested ? undefined : '1px solid var(--card-border-color)',
            }}
          >
            {title}
          </Heading>
          <Stack space={isMajor ? 5 : isNested ? 3 : 4}>{children}</Stack>
        </Stack>
      </Card>
    </Box>
  )
}

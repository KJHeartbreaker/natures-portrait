import {Box, Card, Stack, Text} from '@sanity/ui'
import type {ReactNode} from 'react'

import {guideProse} from '../guideStyles'

type GuideCalloutTone = 'primary' | 'positive' | 'caution' | 'critical'

const toneLabels: Record<GuideCalloutTone, string> = {
  primary: 'Note',
  positive: 'Tip',
  caution: 'Caution',
  critical: 'Important',
}

type GuideCalloutProps = {
  tone?: GuideCalloutTone
  title?: string
  children: ReactNode
}

export function GuideCallout({tone = 'primary', title, children}: GuideCalloutProps) {
  return (
    <Card padding={4} radius={2} shadow={1} tone={tone} border>
      <Stack space={3}>
        <Text size={1} weight="semibold" muted>
          {title ?? toneLabels[tone]}
        </Text>
        <Box style={guideProse}>{children}</Box>
      </Stack>
    </Card>
  )
}

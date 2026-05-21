import {Box, Text} from '@sanity/ui'
import type {ReactNode} from 'react'

import {guideList, guideListItem, guideListItemLast, guideProse} from '../guideStyles'

export function GuideParagraph({children}: {children: ReactNode}) {
  return (
    <Text as="p" size={2} style={guideProse}>
      {children}
    </Text>
  )
}

export function GuideSubheading({children}: {children: ReactNode}) {
  return (
    <Text as="p" size={2} weight="semibold" style={{...guideProse, marginTop: '0.25rem'}}>
      {children}
    </Text>
  )
}

export function GuideList({items}: {items: ReactNode[]}) {
  return (
    <Box as="ul" className="guide-list" style={{...guideList, listStyleType: 'disc'}}>
      {items.map((item, index) => (
        <Text
          as="li"
          key={index}
          size={2}
          style={{
            ...(index === items.length - 1 ? guideListItemLast : guideListItem),
            ...guideProse,
          }}
        >
          {item}
        </Text>
      ))}
    </Box>
  )
}

export function GuideSteps({steps}: {steps: ReactNode[]}) {
  return (
    <Box as="ol" className="guide-list" style={{...guideList, listStyleType: 'decimal'}}>
      {steps.map((step, index) => (
        <Text
          as="li"
          key={index}
          size={2}
          style={{
            ...(index === steps.length - 1 ? guideListItemLast : guideListItem),
            ...guideProse,
          }}
        >
          {step}
        </Text>
      ))}
    </Box>
  )
}

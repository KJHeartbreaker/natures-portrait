import {Stack} from '@sanity/ui'
import type {ReactNode} from 'react'

import {GuideList, GuideParagraph, GuideSubheading} from './GuideProse'
import {GuideScreenshot, type GuideScreenshotItem} from './GuideScreenshot'

export type GuideBlockVariant = {
  title: string
  whenToUse: string
  fields?: string[]
  images?: GuideScreenshotItem[]
  gotchas?: string[]
}

export function variantScreenshots(variant: GuideBlockVariant): GuideScreenshotItem[] {
  return variant.images ?? []
}

export function guideVariantSectionId(parentId: string, variantTitle: string): string {
  const slug = variantTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${parentId}--${slug}`
}

export function GuideVariantDoc({variant}: {variant: GuideBlockVariant}) {
  return (
    <Stack gap={5}>
      <GuideParagraph>{variant.whenToUse}</GuideParagraph>
      {variantScreenshots(variant).map((screenshot) => (
        <GuideScreenshot
          key={screenshot.src}
          src={screenshot.src}
          alt={screenshot.alt}
          caption={screenshot.caption}
        />
      ))}
      {variant.fields && variant.fields.length > 0 ? (
        <Stack gap={3}>
          <GuideSubheading>Key fields</GuideSubheading>
          <GuideList items={variant.fields} />
        </Stack>
      ) : null}
      {variant.gotchas && variant.gotchas.length > 0 ? (
        <Stack gap={3}>
          <GuideSubheading>Good to know</GuideSubheading>
          <GuideList items={variant.gotchas} />
        </Stack>
      ) : null}
    </Stack>
  )
}

type GuideBlockDocProps = {
  whenToUse: string
  fields?: string[]
  gotchas?: string[]
  images?: GuideScreenshotItem[]
  callout?: ReactNode
}

export function GuideBlockDoc({whenToUse, fields, gotchas, images, callout}: GuideBlockDocProps) {
  return (
    <Stack gap={5}>
      <GuideParagraph>{whenToUse}</GuideParagraph>
      {images && images.length > 0 ? (
        <Stack gap={4}>
          {images.map((image) => (
            <GuideScreenshot
              key={image.src}
              src={image.src}
              alt={image.alt}
              caption={image.caption}
            />
          ))}
        </Stack>
      ) : null}
      {callout}
      {fields && fields.length > 0 ? (
        <Stack gap={3}>
          <GuideSubheading>Key fields</GuideSubheading>
          <GuideList items={fields} />
        </Stack>
      ) : null}
      {gotchas && gotchas.length > 0 ? (
        <Stack gap={3}>
          <GuideSubheading>Good to know</GuideSubheading>
          <GuideList items={gotchas} />
        </Stack>
      ) : null}
    </Stack>
  )
}

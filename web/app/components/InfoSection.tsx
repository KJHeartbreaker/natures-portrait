import {type PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import type {SingleColumnContentBlock} from '@/sanity.types'

type InfoProps = {
  block: SingleColumnContentBlock
  index: number
  // Needed if you want to createDataAttributes to do non-text overlays in Presentation (Visual Editing)
  pageId: string
  pageType: string
}

export default function InfoSection({block}: InfoProps) {
  const portableText = block.contentBlock?.portableTextBlock?.portableTextBlock
  const center = block.centerContent ?? false
  return (
    <section className="container my-12">
      <div className={`max-w-3xl space-y-4${center ? ' mx-auto text-center' : ''}`}>
        {block.title ? <h2 className="text-2xl md:text-3xl lg:text-4xl">{block.title}</h2> : null}
        {portableText?.length ? (
          <PortableText className="" centered={center} value={portableText as PortableTextBlock[]} />
        ) : null}
      </div>
    </section>
  )
}

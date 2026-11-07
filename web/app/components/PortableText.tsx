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

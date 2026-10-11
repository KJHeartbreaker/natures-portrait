'use client'

import {useState, useTransition, useEffect} from 'react'

declare global {
  interface Window {
    grecaptcha: {
      execute(siteKey: string, options: {action: string}): Promise<string>
      ready(cb: () => void): void
    }
  }
}
import {PortableText, type PortableTextComponents, type PortableTextBlock} from 'next-sanity'
import {submitContactForm, type ContactFormState} from '@/app/actions/contact'
import SectionEyebrow from '@/app/components/SectionEyebrow'
import SanityImage from '@/app/components/SanityImage'
import {adaptCrop, adaptHotspot, getImageDims, getImageId} from '@/app/lib/sanityImageHelpers'
import type {ExtractPageSectionType} from '@/sanity/lib/types'

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden className="inline-block w-4 h-4 mb-0.5 mr-1.5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden className="inline-block w-4 h-4 mb-0.5 mr-1.5 shrink-0">
      <rect x="2.25" y="2.25" width="19.5" height="19.5" rx="5.25" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="4.125" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17.625" cy="6.375" r="0.375" fill="currentColor" stroke="none" />
    </svg>
  )
}

const linkComponents: PortableTextComponents = {
  marks: {
    link: ({children, value}) => {
      const icon = value?.icon
      const href: string = value?.href ?? ''
      const isExternal = value?.blank && !href.startsWith('mailto:') && !href.startsWith('tel:')
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center transition-colors hover:text-luxe-noir"
        >
          {icon === 'email' && <EmailIcon />}
          {icon === 'instagram' && <InstagramIcon />}
          {children}
        </a>
      )
    },
  },
  block: {
    normal: ({children}) => (
      <p className="mb-2 last:mb-0">{children}</p>
    ),
  },
}

const introComponents: PortableTextComponents = {
  block: {
    normal: ({children}) => (
      <p className="mb-2 last:mb-0">{children}</p>
    ),
  },
}

type Props = {
  block: ExtractPageSectionType<'contactForm'>
}

export default function ContactForm({block}: Props) {
  if (block.disabled) return null

  const bg = block.backgroundColor ?? '#F0EDE5'
  const [state, setState] = useState<ContactFormState>({status: 'idle'})
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey || document.querySelector('#recaptcha-script')) return
    const script = document.createElement('script')
    script.id = 'recaptcha-script'
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    document.head.appendChild(script)
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      try {
        if (siteKey && typeof window !== 'undefined' && window.grecaptcha) {
          const token = await new Promise<string>((resolve) => {
            window.grecaptcha.ready(async () => {
              resolve(await window.grecaptcha.execute(siteKey, {action: 'contact'}))
            })
          })
          formData.set('recaptchaToken', token)
        }
      } catch {
        // proceed without token — server will reject bots
      }
      const result = await submitContactForm(state, formData)
      setState(result)
    })
  }

  const imageId = getImageId(block.image)
  const imageDims = getImageDims(block.image)
  const hasImage = !!imageId

  const inputClass =
    'w-full border-b border-coastal-pine bg-transparent py-3 text-sm text-luxe-noir placeholder:text-dusty-sage focus:border-luxe-noir focus:outline-none transition-colors duration-200'

  const labelClass = 'block text-[10px] uppercase tracking-[0.25em] text-dusty-sage mb-1'

  return (
    <section className="w-full py-20 md:py-28" style={{backgroundColor: bg}}>
      <div className="container">
        <div className={hasImage ? 'grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16' : ''}>

          {/* Form column (always left) */}
          <div className={hasImage ? '' : 'max-w-2xl'}>
            {block.eyebrow ? <SectionEyebrow label={block.eyebrow} bg={bg} /> : null}

            {block.heading ? (
              <h2
                className="mb-4 font-serif font-light text-luxe-noir"
                style={{fontSize: 'clamp(28px, 3vw, 40px)'}}
              >
                {block.heading}
              </h2>
            ) : null}

            {/* Intro copy — above the form */}
            {block.intro?.length ? (
              <div className="mb-8 text-base leading-relaxed text-coastal-pine">
                <PortableText value={block.intro as PortableTextBlock[]} components={introComponents} />
              </div>
            ) : null}

            {/* Form / success state */}
            {state.status === 'success' ? (
              <div className="py-4">
                <p className="font-serif font-light text-luxe-noir" style={{fontSize: 'clamp(22px, 2.5vw, 30px)'}}>
                  {block.successMessage ?? "Thank you — I'll be in touch soon."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <input type="hidden" name="subject" value={block.emailSubject ?? 'New message from naturesportrait.ca'} />

                <div className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className={labelClass}>Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className={inputClass}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className={labelClass}>Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className={inputClass}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={labelClass}>Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      required
                      className={`${inputClass} resize-none`}
                      placeholder="What's on your mind?"
                    />
                  </div>

                  {state.status === 'error' ? (
                    <p className="text-sm text-dusty-sage" role="alert">{state.message}</p>
                  ) : null}

                  <div>
                    <button
                      type="submit"
                      disabled={pending}
                      className="border border-luxe-noir bg-luxe-noir px-8 py-3 text-[11px] uppercase tracking-[0.25em] text-soft-oat transition-colors duration-200 hover:bg-coastal-pine hover:border-coastal-pine disabled:opacity-50"
                    >
                      {pending ? 'Sending…' : (block.submitLabel ?? 'Send message')}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Contact links — below the form */}
            {block.contactLinks?.length ? (
              <div className="mt-10 text-base leading-relaxed text-coastal-pine">
                <PortableText value={block.contactLinks as PortableTextBlock[]} components={linkComponents} />
              </div>
            ) : null}
          </div>

          {/* Image column (always right) */}
          {hasImage ? (
            <div className="hidden md:block">
              <SanityImage
                id={imageId!}
                alt={block.image?.alt ?? ''}
                width={700}
                height={imageDims ? Math.round((700 / imageDims.width) * imageDims.height) : 900}
                mode="cover"
                crop={adaptCrop(block.image?.crop)}
                hotspot={adaptHotspot(block.image?.hotspot)}
                className="h-full w-full object-cover"
                style={{aspectRatio: '3/4'}}
              />
            </div>
          ) : null}

        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Cta from '@/app/components/Cta'
import Image from '@/app/components/SanityImage'
import type { SanityImageCrop, SanityImageHotspot } from '@/sanity.types'
import { adaptCrop, adaptHotspot } from '@/app/lib/sanityImageHelpers'

type NavCTA = {
  _key: string
  _type: 'navCTA'
  cta?: {
    title?: string | null
    href?: string | null
    blank?: boolean | null
  } | null
}

type NavDropdownCTA = {
  _key: string
  _type: 'navDropdownCTA'
  cta?: {
    title?: string | null
    href?: string | null
    blank?: boolean | null
  } | null
  subnav?: Array<{
    _key: string
    title?: string | null
    href?: string | null
    blank?: boolean | null
  }> | null
}

type BlogLandingPage = {
  _key: string
  _type: 'blogLandingPage'
  title?: string | null
  slug?: string | null
}

type MenuItem = NavCTA | NavDropdownCTA | BlogLandingPage

type Props = {
  menuItems: MenuItem[]
  siteTitle: string
  logoId?: string | null
  logoAlt?: string | null
  logoCrop?: SanityImageCrop | null
  logoHotspot?: SanityImageHotspot | null
}

export default function MobileNav({ menuItems, siteTitle, logoId, logoAlt, logoCrop, logoHotspot }: Props) {
  // `mounted` keeps the overlay in the DOM during the exit fade
  // `visible` drives the CSS opacity — lags one frame on open, leads by FADE_MS on close
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [expandedKey, setExpandedKey] = useState<string | null>(null)
  const pathname = usePathname()
  const prevPathname = useRef(pathname)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const FADE_MS = 280

  function open() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMounted(true)
    // Double rAF: ensures opacity:0 is painted before transitioning to 1
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
  }

  function close() {
    setVisible(false)
    closeTimer.current = setTimeout(() => {
      setMounted(false)
      setExpandedKey(null)
    }, FADE_MS)
  }

  // Close after navigation completes (pathname change), not on link click
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname
      close()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Lock body scroll while mounted (overlay visible or fading out)
  useEffect(() => {
    if (mounted) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mounted])

  // Close on Escape
  useEffect(() => {
    if (!mounted) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted])

  function handleNavClick(e: React.MouseEvent) {
    const anchor = (e.target as Element).closest('a')
    if (!anchor) return
    const href = anchor.getAttribute('href')
    if (!href) return
    const normalize = (h: string) => h.replace(/\/$/, '') || '/'
    if (normalize(href) === normalize(pathname)) close()
  }

  function toggleExpanded(key: string) {
    setExpandedKey((prev) => (prev === key ? null : key))
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        type="button"
        onClick={open}
        className="md:hidden flex flex-col justify-center gap-[6px] w-8 h-8 shrink-0"
        aria-label="Open navigation"
        aria-expanded={mounted}
      >
        <span className="block h-[1.5px] w-[22px] bg-soft-oat rounded-none" />
        <span className="block h-[1.5px] w-[14px] bg-soft-oat rounded-none" />
      </button>

      {/* Overlay — portalled to body to escape backdrop-filter stacking context on the header */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[60] bg-luxe-noir flex flex-col"
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity ${visible ? 260 : 220}ms ease`,
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          {/* Top bar — logo + site name left, close right. px/py mirrors NavScrollWrapper scrolled state. */}
          <div className="flex items-center justify-between px-5 py-4 shrink-0 border-b border-white/[0.06]">
            <Link href="/" onClick={handleNavClick} className="flex items-center gap-2.5 sm:gap-3 pl-2">
              {logoId ? (
                <span className="block h-18 shrink-0 sm:h-14">
                  <Image
                    id={logoId}
                    alt={logoAlt || siteTitle}
                    width={160}
                    height={110}
                    mode="contain"
                    crop={adaptCrop(logoCrop)}
                    hotspot={adaptHotspot(logoHotspot)}
                    className="h-full w-full object-contain object-left"
                  />
                </span>
              ) : null}
              <span className="font-serif text-lg font-light leading-none text-soft-oat sm:text-2xl">
                {siteTitle}
              </span>
            </Link>
            <button
              type="button"
              onClick={close}
              className="font-sans text-[22px] font-light text-dusty-sage hover:text-soft-oat transition-colors leading-none ml-4"
              aria-label="Close navigation"
            >
              ×
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-6" onClick={handleNavClick}>
            <ul role="list" className="flex flex-col">
              {menuItems.map((item) => {
                if (!item) return null

                if (item._type === 'navCTA' && item.cta) {
                  return (
                    <li key={item._key} className="border-t border-white/[0.06]">
                      <div className="py-4">
                        <Cta
                          cta={item.cta}
                          className="font-serif font-light text-[40px] leading-none tracking-[-0.01em] text-soft-oat hover:text-linen-clay transition-colors"
                        />
                      </div>
                    </li>
                  )
                }

                if (item._type === 'navDropdownCTA' && item.cta) {
                  const isExpanded = expandedKey === item._key
                  const hasSubnav = (item.subnav?.length ?? 0) > 0

                  return (
                    <li key={item._key} className="border-t border-white/[0.06]">
                      <button
                        type="button"
                        onClick={() => (hasSubnav ? toggleExpanded(item._key) : close())}
                        className="w-full flex items-baseline justify-between py-4 text-left"
                        aria-expanded={hasSubnav ? isExpanded : undefined}
                      >
                        <span className="font-serif font-light text-[40px] leading-none tracking-[-0.01em] text-soft-oat">
                          {item.cta?.title || 'Menu'}
                        </span>
                        {hasSubnav && (
                          <span
                            className="font-sans text-[18px] font-light text-dusty-sage transition-transform duration-200 shrink-0"
                            style={{ transform: isExpanded ? 'rotate(45deg)' : 'none' }}
                            aria-hidden="true"
                          >
                            +
                          </span>
                        )}
                      </button>

                      {hasSubnav && isExpanded && (
                        <ul role="list" className="flex flex-col pb-4 pl-1 gap-0">
                          {(item.subnav || []).map((sub) => (
                            <li key={sub._key}>
                              <Cta
                                cta={sub}
                                className="block py-2.5 font-sans font-light text-[13px] uppercase tracking-[0.18em] text-linen-clay hover:text-soft-oat transition-colors"
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                }

                if (item._type === 'blogLandingPage' && item.slug) {
                  const href = `/${item.slug}`
                  return (
                    <li key={item._key} className="border-t border-white/[0.06]">
                      <div className="py-4">
                        <Link
                          href={href}
                          className="font-serif font-light text-[40px] leading-none tracking-[-0.01em] text-soft-oat hover:text-linen-clay transition-colors"
                        >
                          {item.title || 'Untitled'}
                        </Link>
                      </div>
                    </li>
                  )
                }

                return null
              })}

              {/* Bottom border */}
              <li className="border-t border-white/[0.06]" aria-hidden="true" />
            </ul>
          </nav>

        </div>,
        document.body
      )}
    </>
  )
}

'use client'

import {useEffect, useRef, type ReactNode} from 'react'

export default function NavScrollWrapper({children}: {children: ReactNode}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const THRESHOLD = window.innerHeight * 0.15

    function update() {
      if (!el) return
      const hasHero = document.body.dataset.hasHero === 'true'
      const scrolled = !hasHero || window.scrollY > THRESHOLD
      el.dataset.scrolled = scrolled ? 'true' : 'false'
    }

    update()
    window.addEventListener('scroll', update, {passive: true})

    // React to PageBuilder setting body[data-has-hero] after mount
    const observer = new MutationObserver(update)
    observer.observe(document.body, {attributes: true, attributeFilter: ['data-has-hero']})

    return () => {
      window.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [])

  return (
    <header
      ref={ref}
      data-scrolled="false"
      className="
        fixed inset-x-0 top-0 z-50 flex items-center
        text-soft-oat
        transition-[background-color,backdrop-filter,padding] duration-400 ease-in-out
        [&[data-scrolled=false]]:bg-transparent [&[data-scrolled=false]]:backdrop-blur-none [&[data-scrolled=false]]:py-6
        [&[data-scrolled=true]]:bg-coastal-pine [&[data-scrolled=true]]:backdrop-blur-sm [&[data-scrolled=true]]:py-4
      "
    >
      {children}
    </header>
  )
}

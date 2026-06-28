'use client'

import {useEffect, useRef, type ReactNode} from 'react'

export default function NavScrollWrapper({children}: {children: ReactNode}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const THRESHOLD = window.innerHeight * 0.15

    function onScroll() {
      if (!el) return
      const scrolled = window.scrollY > THRESHOLD
      el.dataset.scrolled = scrolled ? 'true' : 'false'
    }

    onScroll()
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
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

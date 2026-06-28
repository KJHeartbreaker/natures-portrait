'use client'

import {useEffect, useRef, type ReactNode} from 'react'

export default function ParallaxBg({children}: {children: ReactNode}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced-motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    function onScroll() {
      if (!el) return
      const y = window.scrollY * 0.4
      el.style.transform = `translateY(${y}px)`
    }

    onScroll()
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    // Sized to 130% height, offset -15% so the top edge never shows during parallax travel
    <div
      ref={ref}
      className="absolute inset-x-0 will-change-transform"
      style={{top: '-15%', height: '130%'}}
    >
      {children}
    </div>
  )
}

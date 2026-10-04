'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function NavDropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null)
  const pathname = usePathname()

  // Close on navigation
  useEffect(() => {
    if (ref.current) ref.current.open = false
  }, [pathname])

  // Close when a link inside is clicked
  function handleClick(e: React.MouseEvent) {
    if ((e.target as Element).closest('a')) {
      if (ref.current) ref.current.open = false
    }
  }

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        ref.current.open = false
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <details ref={ref} className="relative" onClick={handleClick}>
      <summary className="flex items-center gap-1.5 list-none cursor-pointer select-none text-soft-oat/80 hover:text-soft-oat transition-colors duration-200 [&::-webkit-details-marker]:hidden">
        {label}
        <svg className="w-2.5 h-2.5 opacity-60" viewBox="0 0 10 6" fill="none" aria-hidden>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </summary>
      {children}
    </details>
  )
}

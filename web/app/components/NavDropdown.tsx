'use client'

import Link from 'next/link'
import {useEffect, useId, useRef, useState} from 'react'
import {usePathname} from 'next/navigation'
import {stegaClean} from 'next-sanity'
import StegaText from '@/app/components/StegaText'

const labelClass = 'text-soft-oat/80 hover:text-soft-oat transition-colors duration-200'

function Chevron({open}: {open: boolean}) {
  return (
    <svg
      className={`w-2.5 h-2.5 opacity-60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden
    >
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Desktop dropdown following the WAI-ARIA disclosure navigation pattern.
 * - With `href`: the label is a plain link and the chevron is a separate toggle button.
 * - Without `href`: label and chevron form a single toggle button.
 * Either way each control does one thing, and the toggle exposes aria-expanded.
 */
export default function NavDropdown({
  label,
  href,
  children,
}: {
  label: string
  href?: string | null
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const pathname = usePathname()
  const isExternal = href ? /^https?:\/\//.test(href) : false

  // Close on navigation (reset during render when the path changes)
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setOpen(false)
  }

  // Close on outside click or focus leaving the dropdown
  useEffect(() => {
    if (!open) return
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onFocusIn(e: FocusEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [open])

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      setOpen(false)
      toggleRef.current?.focus()
    }
  }

  // Close when a link inside the panel is clicked
  function onPanelClick(e: React.MouseEvent) {
    if ((e.target as Element).closest('a')) setOpen(false)
  }

  const toggleProps = {
    ref: toggleRef,
    type: 'button' as const,
    'aria-expanded': open,
    'aria-controls': panelId,
    onClick: () => setOpen((o) => !o),
  }

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
      {href ? (
        <div className="flex items-center gap-1.5">
          <Link
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={labelClass}
            data-sanity-edit-target
          >
            <StegaText text={label} />
          </Link>
          <button {...toggleProps} aria-label={`${stegaClean(label)} submenu`} className={`-m-2 p-2 cursor-pointer ${labelClass}`}>
            <Chevron open={open} />
          </button>
        </div>
      ) : (
        <button
          {...toggleProps}
          data-sanity-edit-target
          className={`flex items-center gap-1.5 cursor-pointer uppercase tracking-[inherit] ${labelClass}`}
        >
          <StegaText text={label} />
          <Chevron open={open} />
        </button>
      )}
      <div id={panelId} hidden={!open} onClick={onPanelClick}>
        {children}
      </div>
    </div>
  )
}

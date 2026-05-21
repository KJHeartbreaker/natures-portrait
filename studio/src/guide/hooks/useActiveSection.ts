import {useEffect, useState} from 'react'

/** Distance from the top of the scroll pane used as the "reading line" for TOC highlighting. */
const SCROLL_SPY_OFFSET = 96

export function useActiveSection(
  sectionIds: string[],
  defaultId: string,
  scrollRoot: HTMLElement | null,
) {
  const [activeId, setActiveId] = useState(defaultId)

  useEffect(() => {
    if (!scrollRoot || sectionIds.length === 0) return

    const updateActive = () => {
      const scrollTop = scrollRoot.scrollTop
      const maxScroll = scrollRoot.scrollHeight - scrollRoot.clientHeight
      let nextActive = defaultId

      if (maxScroll > 0 && scrollTop >= maxScroll - 8) {
        setActiveId((current) => {
          const lastId = sectionIds[sectionIds.length - 1] ?? defaultId
          return current === lastId ? current : lastId
        })
        return
      }

      for (const id of sectionIds) {
        const element = scrollRoot.querySelector<HTMLElement>(`#${CSS.escape(id)}`)
        if (!element) continue

        const elementTop =
          element.getBoundingClientRect().top -
          scrollRoot.getBoundingClientRect().top +
          scrollTop

        if (elementTop <= scrollTop + SCROLL_SPY_OFFSET) {
          nextActive = id
        }
      }

      setActiveId((current) => (current === nextActive ? current : nextActive))
    }

    updateActive()
    scrollRoot.addEventListener('scroll', updateActive, {passive: true})
    window.addEventListener('resize', updateActive)

    return () => {
      scrollRoot.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [scrollRoot, sectionIds, defaultId])

  return {activeId, setActiveId}
}

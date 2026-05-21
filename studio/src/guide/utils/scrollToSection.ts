/** Scroll a section into view inside the guide pane (not the document). */
export function scrollToSection(container: HTMLElement, sectionId: string) {
  const section = container.querySelector<HTMLElement>(`#${CSS.escape(sectionId)}`)
  if (!section) return

  const containerTop = container.getBoundingClientRect().top
  const sectionTop = section.getBoundingClientRect().top
  const offset = sectionTop - containerTop + container.scrollTop - 24

  container.scrollTo({top: offset, behavior: 'smooth'})
}

/** Remove the URL hash after handling a deep link so scroll is not re-anchored. */
export function clearLocationHash() {
  const {pathname, search} = window.location
  window.history.replaceState(window.history.state, '', `${pathname}${search}`)
}

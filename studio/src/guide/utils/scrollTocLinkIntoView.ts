/** Scroll a TOC link within the nav only — never the main guide pane. */
export function scrollTocLinkIntoView(nav: HTMLElement, link: HTMLElement) {
  const navRect = nav.getBoundingClientRect()
  const linkRect = link.getBoundingClientRect()

  if (linkRect.top < navRect.top) {
    nav.scrollTop -= navRect.top - linkRect.top
  } else if (linkRect.bottom > navRect.bottom) {
    nav.scrollTop += linkRect.bottom - navRect.bottom
  }
}

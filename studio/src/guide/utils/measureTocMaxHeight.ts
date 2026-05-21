/** Sticky offset — keep in sync with `top` on the guide TOC nav. */
export const TOC_STICKY_TOP_REM = 1.5

/**
 * Max height for the sticky TOC inside the guide scroll pane.
 * Must fit within the visible pane so `overflow-y: auto` on the nav can scroll the list.
 */
export function measureTocMaxHeight(scrollRoot: HTMLElement): number {
  const fontSize = parseFloat(getComputedStyle(scrollRoot).fontSize) || 16
  const stickyTopPx = TOC_STICKY_TOP_REM * fontSize

  return Math.max(200, Math.floor(scrollRoot.clientHeight - stickyTopPx))
}

import type {PortableTextBlock} from 'next-sanity'

// Deliberately simple: matches what editors actually type (name@example.com),
// not the full RFC 5322 grammar.
const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g

type Span = {_type: 'span'; _key?: string; text?: string; marks?: string[]}
type MarkDef = {_key: string; _type: string; href?: string}

/**
 * Turns plain email addresses typed into rich text into `mailto:` links, so
 * editors don't have to add a link annotation by hand. Text that already sits
 * inside a link is left alone. Returns the input unchanged when nothing matches.
 */
export function linkifyEmails<T extends PortableTextBlock>(blocks: T[]): T[] {
  if (!Array.isArray(blocks)) return blocks
  return blocks.map((block) => linkifyBlock(block))
}

function linkifyBlock<T extends PortableTextBlock>(block: T): T {
  if (block?._type !== 'block' || !Array.isArray(block.children)) return block

  const markDefs = ((block.markDefs ?? []) as MarkDef[]).slice()
  const linkKeys = new Set(markDefs.filter((d) => d._type === 'link').map((d) => d._key))
  const children: Span[] = []
  let changed = false

  for (const child of block.children as Span[]) {
    const text = child?._type === 'span' ? child.text : undefined
    const alreadyLinked = (child?.marks ?? []).some((m) => linkKeys.has(m))
    if (!text || alreadyLinked || !text.includes('@')) {
      children.push(child)
      continue
    }

    const pieces: Span[] = []
    let last = 0
    for (const match of text.matchAll(EMAIL_RE)) {
      const start = match.index ?? 0
      const email = match[0]
      if (start > last) pieces.push({...child, _key: `${child._key}-t${last}`, text: text.slice(last, start)})
      const markKey = `${child._key}-email${start}`
      markDefs.push({_key: markKey, _type: 'link', href: `mailto:${email}`})
      pieces.push({...child, _key: `${child._key}-e${start}`, text: email, marks: [...(child.marks ?? []), markKey]})
      last = start + email.length
    }

    if (!pieces.length) {
      children.push(child)
      continue
    }
    if (last < text.length) pieces.push({...child, _key: `${child._key}-t${last}`, text: text.slice(last)})
    children.push(...pieces)
    changed = true
  }

  return changed ? {...block, children, markDefs} : block
}

import type {ExtractPageSectionType} from '@/sanity/lib/types'

type Props = {
  block: ExtractPageSectionType<'pullQuote'>
}

// Decorative mark colour per background — a complementary mid-tone from the palette
const markColour: Record<string, string> = {
  '#060d0c': 'text-coastal-pine',   // luxe-noir bg
  '#3e5954': 'text-dusty-sage',     // coastal-pine bg
  '#758886': 'text-linen-clay',     // dusty-sage bg
}

export default function PullQuote({block}: Props) {
  if (block.disabled) return null

  const bg = block.backgroundColor ?? '#060D0C'
  const mark = markColour[bg.toLowerCase()] ?? 'text-coastal-pine'

  return (
    <section
      className="w-full px-6 py-20 md:py-28 xl:px-0"
      style={{backgroundColor: bg}}
      aria-label="Pull quote"
    >
      <div className="mx-auto max-w-3xl text-center">
        {/* Decorative mark */}
        <span className={`mb-8 block font-serif text-5xl italic leading-none select-none ${mark}`} aria-hidden>
          &ldquo;
        </span>

        <blockquote className="font-serif text-[clamp(22px,3vw,32px)] italic leading-[1.55] text-soft-oat">
          {block.quote}
        </blockquote>

        {block.attribution ? (
          <p className="mt-8 font-sans text-[12px] font-light uppercase tracking-[0.26em] text-linen-clay">
            — {block.attribution}
          </p>
        ) : null}
      </div>
    </section>
  )
}

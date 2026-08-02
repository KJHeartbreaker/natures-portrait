import type {ExtractPageSectionType} from '@/sanity/lib/types'

type Props = {
  block: ExtractPageSectionType<'pullQuote'>
}

export default function PullQuote({block}: Props) {
  if (block.disabled) return null

  return (
    <section
      className="w-full bg-luxe-noir px-6 py-20 md:py-28 xl:px-0"
      aria-label="Pull quote"
    >
      <div className="mx-auto max-w-3xl text-center">
        {/* Decorative mark */}
        <span className="mb-8 block font-serif text-5xl italic leading-none text-coastal-pine select-none" aria-hidden>
          &ldquo;
        </span>

        <blockquote className="font-serif text-[clamp(22px,3vw,32px)] italic leading-[1.55] text-soft-oat">
          {block.quote}
        </blockquote>

        {block.attribution ? (
          <p className="mt-8 font-sans text-[10px] font-light uppercase tracking-[0.26em] text-dusty-sage">
            — {block.attribution}
          </p>
        ) : null}
      </div>
    </section>
  )
}

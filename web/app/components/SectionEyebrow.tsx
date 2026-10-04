import {eyebrowThemeForBg} from '@/app/lib/proseTheme'

type Props = {
  label: string
  bg?: string | null
}

export default function SectionEyebrow({label, bg}: Props) {
  const theme = eyebrowThemeForBg(bg)
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className={`text-[10px] font-sans font-light uppercase tracking-[0.25em] whitespace-nowrap ${theme.label}`}>
        {label}
      </span>
      <span className={`flex-1 h-px ${theme.rule}`} aria-hidden="true" />
    </div>
  )
}

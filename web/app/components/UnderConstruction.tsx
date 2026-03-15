import type {PropsWithChildren} from 'react'
import type React from 'react'

type UnderConstructionProps = PropsWithChildren<{
  name: string
  note?: string
  className?: string
  style?: React.CSSProperties
}>

export default function UnderConstruction({name, note, className, style, children}: UnderConstructionProps) {
  return (
    <section
      style={{border: '2px solid springgreen', ...style}}
      className={`container py-6 my-6 ${className ?? ''}`}
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs">
        <span className="uppercase tracking-tight">Component: {name}</span>
        <span className="opacity-70">{note ?? 'Under construction'}</span>
      </div>
      {children}
    </section>
  )
}


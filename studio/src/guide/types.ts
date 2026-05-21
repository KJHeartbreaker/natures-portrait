import type {ReactNode} from 'react'

export type GuideSection = {
  id: string
  title: string
  children?: GuideSection[]
  content: ReactNode
}

export type GuideTocItem = {
  id: string
  title: string
  depth: number
}

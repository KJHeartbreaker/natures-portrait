import type {GuideSection, GuideTocItem} from '../types'

export function flattenToc(sections: GuideSection[], depth = 0): GuideTocItem[] {
  return sections.flatMap((section) => {
    const item: GuideTocItem = {id: section.id, title: section.title, depth}
    const childItems = section.children ? flattenToc(section.children, depth + 1) : []
    return [item, ...childItems]
  })
}

export function collectSectionIds(sections: GuideSection[]): string[] {
  return sections.flatMap((section) => [
    section.id,
    ...(section.children ? collectSectionIds(section.children) : []),
  ])
}

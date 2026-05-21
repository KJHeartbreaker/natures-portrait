import type {CSSProperties} from 'react'

export const guideProse: CSSProperties = {
  lineHeight: 1.65,
}

export const guideList: CSSProperties = {
  margin: 0,
  paddingLeft: '1.5rem',
  listStylePosition: 'outside',
}

export const guideListItem: CSSProperties = {
  display: 'list-item',
  marginBottom: '0.625rem',
  paddingLeft: '0.125rem',
}

export const guideListItemLast: CSSProperties = {
  ...guideListItem,
  marginBottom: 0,
}

export const editorGuideCss = `
  [data-editor-guide] ul.guide-list,
  [data-editor-guide] ol.guide-list {
    list-style-position: outside;
  }
  [data-editor-guide] .guide-list > li {
    display: list-item;
  }
  [data-editor-guide] .guide-list > li > span {
    display: inline;
  }
  [data-editor-guide] code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.875em;
    padding: 0.15em 0.4em;
    border-radius: 4px;
    background-color: var(--card-muted-bg-color);
  }
  [data-editor-guide] strong {
    font-weight: 600;
  }
`

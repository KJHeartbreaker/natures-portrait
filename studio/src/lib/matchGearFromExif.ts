type GetFormValue = (path: (string | number | {_key: string})[]) => unknown

/** Studio `useClient()` — only `fetch` is required here. */
type FetchClient = {
  fetch: <R>(query: string, params?: Record<string, unknown>, options?: Record<string, unknown>) => Promise<R>
}

function isRecord(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val)
}

function referenceFieldEmpty(getFormValue: GetFormValue, key: string): boolean {
  const v = getFormValue([key])
  if (!isRecord(v)) return true
  const ref = v._ref
  return typeof ref !== 'string' || ref.trim() === ''
}

export type GearMatchRow = {
  _id: string
  kind: 'camera' | 'lens' | 'accessory'
  brand: string
  model: string
  nickname?: string | null
  exifMatchHints?: string[] | null
}

const GEAR_FOR_EXIF_QUERY = `*[_type == "gear" && kind in ["camera", "lens"]]{
  _id,
  kind,
  brand,
  model,
  nickname,
  exifMatchHints
}`

export function fetchGearForExifMatch(client: FetchClient) {
  return client.fetch<GearMatchRow[]>(GEAR_FOR_EXIF_QUERY, {}, {perspective: 'raw', tag: 'photo-album.gear-match'})
}

function normalizeLine(s: string): string {
  return s.toLowerCase().replace(/\s+/g, ' ').trim()
}

function compactAlnum(s: string): string {
  return normalizeLine(s).replace(/[^a-z0-9]/g, '')
}

/** Tokens of length ≥ 2 from brand, model, nickname (for substring checks). */
function collectTokens(g: GearMatchRow): string[] {
  const raw = [g.brand, g.model, g.nickname].filter(Boolean).join(' ')
  return normalizeLine(raw)
    .split(/[^a-z0-9]+/i)
    .filter((t) => t.length >= 2)
}

/** e.g. 100-400, 24-70 in EXIF lens strings */
function focalRangeInLine(line: string): string | undefined {
  const m = line.match(/\b\d{2,3}\s*-\s*\d{2,3}\b/)
  if (!m) return undefined
  return m[0].toLowerCase().replace(/\s/g, '')
}

function scoreWithHints(exifLine: string, hints: string[] | null | undefined): number {
  const lineC = compactAlnum(exifLine)
  let best = 0
  for (const raw of hints ?? []) {
    const h = compactAlnum(String(raw))
    if (h.length >= 3 && lineC.includes(h)) {
      best = Math.max(best, 1000 + h.length * 3)
    }
  }
  return best
}

function scoreCamera(exifLine: string, g: GearMatchRow): number {
  if (g.kind !== 'camera') return 0
  const hintScore = scoreWithHints(exifLine, g.exifMatchHints)
  if (hintScore > 0) return hintScore

  const line = normalizeLine(exifLine)
  const b = normalizeLine(g.brand)
  if (b.length < 2 || !line.includes(b)) return 0

  const tokens = collectTokens(g).filter((t) => t !== b.toLowerCase())
  let hits = 0
  let longest = 0
  for (const t of tokens) {
    if (line.includes(t)) {
      hits++
      longest = Math.max(longest, t.length)
    }
  }
  if (hits >= 2) return 260 + hits * 20
  if (hits === 1 && longest >= 5) return 240
  return 0
}

function scoreLens(exifLine: string, g: GearMatchRow): number {
  if (g.kind !== 'lens') return 0
  const hintScore = scoreWithHints(exifLine, g.exifMatchHints)
  if (hintScore > 0) return hintScore

  const line = normalizeLine(exifLine)
  const b = normalizeLine(g.brand)
  if (b.length < 2 || !line.includes(b)) return 0

  const tokens = collectTokens(g).filter((t) => t !== b.toLowerCase())
  let hits = 0
  let longest = 0
  for (const t of tokens) {
    if (line.includes(t)) {
      hits++
      longest = Math.max(longest, t.length)
    }
  }

  const range = focalRangeInLine(exifLine)
  const gm = compactAlnum(`${g.brand} ${g.model}`)
  const rangeBoost = range && gm.includes(range) ? 140 : 0

  if (hits >= 2) return 260 + hits * 25 + rangeBoost
  if (hits === 1 && longest >= 8) return 250 + rangeBoost
  if (hits >= 1 && rangeBoost >= 100) return 230 + rangeBoost
  return 0
}

const AMBIGUITY_MARGIN = 35
const MIN_SCORE_NO_HINT = 220

/**
 * Picks a single gear `_id` when one match clearly wins; returns undefined if none or ambiguous.
 */
export function pickGearId(
  kind: 'camera' | 'lens',
  exifLine: string | undefined,
  gear: GearMatchRow[],
): string | undefined {
  if (!exifLine?.trim()) return undefined

  const scoreFn = kind === 'camera' ? scoreCamera : scoreLens
  const scored = gear
    .filter((g) => g.kind === kind)
    .map((g) => ({_id: g._id, score: scoreFn(exifLine, g)}))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)

  if (scored.length === 0) return undefined

  const [top, second] = scored
  if (top.score < MIN_SCORE_NO_HINT && top.score < 1000) return undefined
  if (second && second.score >= top.score - AMBIGUITY_MARGIN) return undefined

  return top._id
}

export function sanityReference(refId: string) {
  return {_type: 'reference' as const, _ref: refId}
}

/**
 * Adds `cameraRef` / `lensRef` to the EXIF patch when a unique gear row scores clearly best.
 */
export function mergeGearRefsIntoPhotoUpdates(
  updates: Record<string, unknown>,
  getFormValue: GetFormValue,
  {
    overwrite,
    gear,
    cameraLine,
    lensLine,
  }: {
    overwrite: boolean
    gear: GearMatchRow[]
    cameraLine?: string
    lensLine?: string
  },
): Record<string, unknown> {
  const out = {...updates}

  if (cameraLine?.trim()) {
    const canSet = overwrite || referenceFieldEmpty(getFormValue, 'cameraRef')
    if (canSet) {
      const id = pickGearId('camera', cameraLine, gear)
      if (id) out.cameraRef = sanityReference(id)
    }
  }

  if (lensLine?.trim()) {
    const canSet = overwrite || referenceFieldEmpty(getFormValue, 'lensRef')
    if (canSet) {
      const id = pickGearId('lens', lensLine, gear)
      if (id) out.lensRef = sanityReference(id)
    }
  }

  return out
}

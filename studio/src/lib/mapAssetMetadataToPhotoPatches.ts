type GetFormValue = (path: (string | number | {_key: string})[]) => unknown

function isEmpty(val: unknown): boolean {
  if (val === undefined || val === null) return true
  if (typeof val === 'string') return val.trim() === ''
  if (Array.isArray(val)) return val.length === 0
  return false
}

function isRecord(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val)
}

function formatShutterSpeed(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return ''
  if (seconds >= 1) {
    const rounded = seconds % 1 === 0 ? String(seconds) : seconds.toFixed(1)
    return `${rounded}s`
  }
  const denom = Math.round(1 / seconds)
  return denom > 0 ? `1/${denom}` : ''
}

function formatAperture(fNumber: number): string {
  if (!Number.isFinite(fNumber) || fNumber <= 0) return ''
  const rounded = Math.round(fNumber * 10) / 10
  const body = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
  return `f/${body}`
}

function exifDateToDateField(isoOrString: unknown): string | undefined {
  if (typeof isoOrString !== 'string' || !isoOrString.trim()) return undefined
  const d = new Date(isoOrString)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toISOString().slice(0, 10)
}

function readString(rec: Record<string, unknown> | null | undefined, key: string): string | undefined {
  const v = rec?.[key]
  return typeof v === 'string' && v.trim() ? v.trim() : undefined
}

function readNumber(rec: Record<string, unknown> | null | undefined, key: string): number | undefined {
  const v = rec?.[key]
  if (typeof v === 'number' && Number.isFinite(v)) return v
  return undefined
}

export type AlbumAssetMetadata = {
  exif?: Record<string, unknown> | null
  imageTags?: Record<string, unknown> | null
  location?: {lat?: number; lon?: number; alt?: number} | null
  dimensions?: {width?: number; height?: number} | null
}

/** Same strings written to `cameraText` / `lensText` — used for gear matching. */
export function getExifCameraAndLensLines(meta: AlbumAssetMetadata | null | undefined): {
  cameraLine?: string
  lensLine?: string
} {
  if (!meta) return {}
  const exif = meta.exif ?? undefined
  const imageTags = meta.imageTags ?? undefined

  const make = readString(imageTags, 'Make')
  const model = readString(imageTags, 'Model')
  const cameraLine = [make, model].filter(Boolean).join(' ').trim() || undefined

  const lensLine =
    readString(exif, 'LensModel') ||
    readString(exif, 'Lens') ||
    readString(imageTags, 'LensModel') ||
    undefined

  return {cameraLine, lensLine}
}

/**
 * Top-level fields (and optional `image` object) to pass to `client.patch(id).set(...)`.
 * `useFormCallbacks().onChange` is scoped to the image field and prefixes paths — it cannot set
 * sibling fields — so we apply EXIF via a document patch instead.
 */
export function mapAssetMetadataToPhotoRootSet(
  meta: AlbumAssetMetadata | null | undefined,
  getFormValue: GetFormValue,
  {overwrite}: {overwrite: boolean},
): Record<string, unknown> {
  if (!meta) return {}

  const out: Record<string, unknown> = {}
  const exif = meta.exif ?? undefined

  const assign = (key: string, next: unknown) => {
    if (next === undefined || next === null) return
    if (typeof next === 'string' && next.trim() === '') return
    if (!overwrite && !isEmpty(getFormValue([key]))) return
    out[key] = next
  }

  const dateRaw =
    readString(exif, 'DateTimeOriginal') ||
    readString(exif, 'DateTimeDigitized') ||
    readString(exif, 'CreateDate')
  const dateField = dateRaw ? exifDateToDateField(dateRaw) : undefined
  assign('dateCaptured', dateField)

  const {cameraLine, lensLine} = getExifCameraAndLensLines(meta)
  assign('cameraText', cameraLine)
  assign('lensText', lensLine)

  const focal = readNumber(exif, 'FocalLength') ?? readNumber(exif, 'FocalLengthIn35mmFormat')
  if (focal !== undefined) {
    const rounded = Math.round(focal * 10) / 10
    assign('focalLength', rounded)
  }

  const fNum = readNumber(exif, 'FNumber')
  if (fNum !== undefined) {
    assign('aperture', formatAperture(fNum))
  }

  const exp = readNumber(exif, 'ExposureTime')
  if (exp !== undefined) {
    assign('shutterSpeed', formatShutterSpeed(exp))
  }

  const iso = readNumber(exif, 'ISO') ?? readNumber(exif, 'PhotographicSensitivity')
  if (iso !== undefined) {
    assign('iso', Math.round(iso))
  }

  const w = meta.dimensions?.width
  const h = meta.dimensions?.height
  const img = getFormValue(['image'])
  if (isRecord(img)) {
    const nextW = typeof w === 'number' && w > 0 ? Math.round(w) : undefined
    const nextH = typeof h === 'number' && h > 0 ? Math.round(h) : undefined
    const canSetW = nextW !== undefined && (overwrite || isEmpty(img.width))
    const canSetH = nextH !== undefined && (overwrite || isEmpty(img.height))
    if (canSetW || canSetH) {
      out.image = {
        ...img,
        ...(canSetW ? {width: nextW} : {}),
        ...(canSetH ? {height: nextH} : {}),
      }
    }
  }

  return out
}

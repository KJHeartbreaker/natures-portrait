import {Button, Flex, Stack, Text} from '@sanity/ui'
import {useCallback, useEffect, useRef, useState} from 'react'
import {type ImageInputProps, useClient, useFormValue, useGetFormValue} from 'sanity'

import {fetchGearForExifMatch, mergeGearRefsIntoPhotoUpdates} from '../lib/matchGearFromExif'
import {
  getExifCameraAndLensLines,
  mapAssetMetadataToPhotoRootSet,
  type AlbumAssetMetadata,
} from '../lib/mapAssetMetadataToPhotoPatches'

const ASSET_METADATA_QUERY = `*[_id == $id][0]{ metadata }`

async function fetchAssetMetadata(
  client: ReturnType<typeof useClient>,
  assetId: string,
  signal: AbortSignal,
): Promise<AlbumAssetMetadata | null> {
  for (let attempt = 0; attempt < 8; attempt++) {
    if (signal.aborted) return null
    const row = await client.fetch<{metadata?: AlbumAssetMetadata} | null>(ASSET_METADATA_QUERY, {id: assetId}, {
      perspective: 'raw',
      tag: 'photo-album.exif',
    })
    if (signal.aborted) return null
    const meta = row?.metadata as Record<string, unknown> | undefined
    if (!meta || typeof meta !== 'object') {
      await new Promise((r) => setTimeout(r, 400))
      continue
    }
    const exif = meta.exif
    const imageTags = meta.image
    const hasExif = exif && typeof exif === 'object' && Object.keys(exif as object).length > 0
    const hasImageTags = imageTags && typeof imageTags === 'object' && Object.keys(imageTags as object).length > 0
    const hasDimensions =
      meta.dimensions && typeof meta.dimensions === 'object' && Object.keys(meta.dimensions as object).length > 0
    if (hasExif || hasImageTags || hasDimensions) {
      return {
        exif: hasExif ? (exif as Record<string, unknown>) : null,
        imageTags: hasImageTags ? (imageTags as Record<string, unknown>) : null,
        location: meta.location as AlbumAssetMetadata['location'],
        dimensions: meta.dimensions as AlbumAssetMetadata['dimensions'],
      }
    }
    await new Promise((r) => setTimeout(r, 400))
  }
  return null
}

/**
 * Wraps the default image input for Photo Album documents: after upload, maps asset EXIF / tags
 * into sibling fields (only where those fields are still empty). Includes a button to re-apply.
 *
 * Patches are applied with `client.patch` on the document id — `useFormCallbacks` is scoped to
 * the `image` field and would incorrectly prefix paths (e.g. `image.dateCaptured`).
 */
export function PhotoAlbumImageInput(props: ImageInputProps) {
  const {renderDefault, value} = props
  const client = useClient({apiVersion: '2024-01-01'})
  const getFormValue = useGetFormValue()
  const documentId = useFormValue(['_id']) as string | undefined

  const lastAppliedAssetRef = useRef<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const applyFromAsset = useCallback(
    async (assetRef: string, {overwrite}: {overwrite: boolean}, signal: AbortSignal) => {
      if (!documentId) {
        if (!signal.aborted) setStatus('error')
        return
      }

      setStatus('loading')
      try {
        const meta = await fetchAssetMetadata(client, assetRef, signal)
        if (signal.aborted) return

        const updates = mapAssetMetadataToPhotoRootSet(meta, getFormValue, {overwrite})
        const gear = await fetchGearForExifMatch(client)
        if (signal.aborted) return
        const {cameraLine, lensLine} = getExifCameraAndLensLines(meta)
        const withRefs = mergeGearRefsIntoPhotoUpdates(updates, getFormValue, {
          overwrite,
          gear,
          cameraLine,
          lensLine,
        })
        if (Object.keys(withRefs).length > 0) {
          await client.patch(documentId).set(withRefs).commit({visibility: 'async'})
        }
        if (!signal.aborted) {
          setStatus('done')
        }
      } catch (err) {
        console.error('[PhotoAlbumImageInput]', err)
        if (!signal.aborted) {
          setStatus('error')
        }
      }
    },
    [client, documentId, getFormValue],
  )

  useEffect(() => {
    const assetRef = value?.asset?._ref
    if (!assetRef) {
      lastAppliedAssetRef.current = null
      setStatus('idle')
      return
    }
    if (lastAppliedAssetRef.current === assetRef) {
      return
    }

    const ac = new AbortController()
    void (async () => {
      await applyFromAsset(assetRef, {overwrite: false}, ac.signal)
      if (!ac.signal.aborted) {
        lastAppliedAssetRef.current = assetRef
      }
    })()

    return () => ac.abort()
  }, [value?.asset?._ref, applyFromAsset])

  const assetRef = value?.asset?._ref

  const handleReapply = () => {
    if (!assetRef) return
    void applyFromAsset(assetRef, {overwrite: true}, new AbortController().signal)
  }

  return (
    <Stack space={3}>
      {renderDefault(props)}
      {assetRef ? (
        <Flex align="center" gap={2} wrap="wrap">
          <Button text="Re-apply EXIF to fields" tone="primary" mode="ghost" onClick={handleReapply} />
          {status === 'loading' ? (
            <Text size={1} muted>
              Reading photo metadata…
            </Text>
          ) : null}
          {status === 'error' ? (
            <Text size={1} muted>
              {documentId
                ? 'Could not read metadata or update fields. Check the browser console, or try again after the upload finishes processing.'
                : 'Save the document once so it has an id, then try again.'}
            </Text>
          ) : null}
        </Flex>
      ) : null}
    </Stack>
  )
}

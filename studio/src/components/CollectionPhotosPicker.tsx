/**
 * Custom input for collection.photos[] that lets the editor select multiple
 * photos at once, rather than adding them one by one.
 *
 * Replaces the default array input's "Add item" button with an "Add photos"
 * button that opens a dialog showing all photos as thumbnails with checkboxes.
 * Photos already in the collection are shown but disabled.
 */
import {CheckmarkIcon} from '@sanity/icons/Checkmark'
import {Box, Button, Card, Checkbox, Dialog, Flex, Grid, Spinner, Stack, Text} from '@sanity/ui'
import {useCallback, useEffect, useId, useState} from 'react'
import {type ArrayOfObjectsInputProps, insert, setIfMissing, useClient} from 'sanity'

type PhotoRow = {
  _id: string
  title: string | null
  location: string | null
  dateCaptured: string | null
  thumbnailUrl: string | null
}

const PHOTOS_QUERY = `*[_type == "photo"] | order(_updatedAt desc) {
  _id,
  title,
  location,
  dateCaptured,
  "thumbnailUrl": image.asset->url
}`

export function CollectionPhotosPicker(props: ArrayOfObjectsInputProps) {
  const {renderDefault, onChange, value} = props
  const client = useClient({apiVersion: '2024-01-01'})
  const dialogId = useId()

  const [open, setOpen] = useState(false)
  const [photos, setPhotos] = useState<PhotoRow[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const existingRefs = new Set(
    (value ?? [])
      .map((item) => (item as {_ref?: string})._ref?.replace(/^drafts\./, ''))
      .filter(Boolean),
  )

  const openDialog = useCallback(async () => {
    setOpen(true)
    setSelected(new Set())
    setLoading(true)
    try {
      const results = await client.fetch<PhotoRow[]>(PHOTOS_QUERY)
      setPhotos(results)
    } finally {
      setLoading(false)
    }
  }, [client])

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleConfirm = useCallback(() => {
    const toAdd = Array.from(selected)
      .filter((id) => !existingRefs.has(id))
      .map((id) => {
        const ref = id.replace(/^drafts\./, '')
        return {
          _type: 'reference' as const,
          _ref: ref,
          _key: `${ref.slice(-8)}_${Date.now()}`,
        }
      })

    if (toAdd.length > 0) {
      onChange([setIfMissing([]), insert(toAdd, 'after', [-1])])
    }
    setOpen(false)
  }, [selected, existingRefs, onChange])

  // Reset selection when dialog closes
  useEffect(() => {
    if (!open) setSelected(new Set())
  }, [open])

  const newCount = Array.from(selected).filter((id) => !existingRefs.has(id)).length

  return (
    <Stack gap={3}>
      {renderDefault(props)}
      <Box>
        <Button text="Add photos…" mode="ghost" tone="primary" onClick={openDialog} />
      </Box>

      {open && (
        <Dialog
          id={dialogId}
          header="Add photos to collection"
          width={2}
          onClose={() => setOpen(false)}
          footer={
            <Box padding={3}>
              <Flex gap={2} justify="flex-end">
                <Button text="Cancel" mode="ghost" onClick={() => setOpen(false)} />
                <Button
                  text={newCount > 0 ? `Add ${newCount} photo${newCount === 1 ? '' : 's'}` : 'Add photos'}
                  tone="primary"
                  icon={CheckmarkIcon}
                  disabled={newCount === 0}
                  onClick={handleConfirm}
                />
              </Flex>
            </Box>
          }
        >
          <Box padding={4}>
            {loading ? (
              <Flex justify="center" padding={6}>
                <Spinner muted />
              </Flex>
            ) : photos.length === 0 ? (
              <Text muted>No photos found.</Text>
            ) : (
              <Grid gridTemplateColumns={3} gap={3}>
                {photos.map((photo) => {
                  const already = existingRefs.has(photo._id)
                  const isSelected = selected.has(photo._id)
                  const label =
                    photo.title ||
                    [photo.location, photo.dateCaptured].filter(Boolean).join(' · ') ||
                    photo._id.slice(-6)

                  return (
                    <Card
                      key={photo._id}
                      radius={2}
                      overflow="hidden"
                      tone={already ? 'positive' : isSelected ? 'primary' : 'default'}
                      style={{cursor: already ? 'default' : 'pointer', opacity: already ? 0.6 : 1}}
                      onClick={already ? undefined : () => toggle(photo._id)}
                    >
                      {/* Thumbnail */}
                      <Box style={{position: 'relative', aspectRatio: '1 / 1', background: '#1a1a1a'}}>
                        {photo.thumbnailUrl ? (
                          <img
                            src={`${photo.thumbnailUrl}?w=300&h=300&fit=crop&auto=format`}
                            alt={label}
                            style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
                          />
                        ) : null}
                        {/* Selection / already-added indicator */}
                        <Box
                          style={{
                            position: 'absolute',
                            top: 6,
                            right: 6,
                            background: 'rgba(0,0,0,0.5)',
                            borderRadius: 4,
                            padding: 2,
                          }}
                        >
                          {already ? (
                            <Text size={0} style={{color: '#fff', lineHeight: 1}}>✓ Added</Text>
                          ) : (
                            <Checkbox checked={isSelected} readOnly style={{display: 'block'}} />
                          )}
                        </Box>
                      </Box>
                      {/* Label */}
                      <Box padding={2}>
                        <Text size={0} muted style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                          {label}
                        </Text>
                      </Box>
                    </Card>
                  )
                })}
              </Grid>
            )}
          </Box>
        </Dialog>
      )}
    </Stack>
  )
}

/**
 * Read-only field component that shows which documents reference this photo.
 * Add it to the photo schema as a virtual field with components: {input: ReferencedBy}.
 */
import {LaunchIcon} from '@sanity/icons/Launch'
import {Box, Card, Flex, Spinner, Stack, Text} from '@sanity/ui'
import {useEffect, useState} from 'react'
import {useClient, useFormValue} from 'sanity'

type Referrer = {
  _id: string
  _type: string
  title: string | null
  slug: string | null
}

const TYPE_LABELS: Record<string, string> = {
  collection: 'Collection',
  home: 'Home',
  page: 'Page',
  post: 'Post',
}

export function ReferencedBy() {
  const client = useClient({apiVersion: '2024-01-01'})
  const rawId = useFormValue(['_id']) as string | undefined
  const id = rawId?.replace(/^drafts\./, '')

  const [refs, setRefs] = useState<Referrer[] | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    client
      .fetch<Referrer[]>(
        `*[references($id) && _type != "system.group"]{
          "_id": coalesce(_id, ""),
          _type,
          "title": coalesce(title, name, "Untitled"),
          "slug": slug.current
        } | order(_type asc, title asc)`,
        {id},
      )
      .then((result) => {
        if (!cancelled) setRefs(result)
      })
    return () => {
      cancelled = true
    }
  }, [id, client])

  if (refs === null) {
    return (
      <Flex justify="center" padding={4}>
        <Spinner muted />
      </Flex>
    )
  }

  // Deduplicate by bare ID (ignore drafts. prefix)
  const seen = new Set<string>()
  const unique = refs.filter((r) => {
    const bare = r._id.replace(/^drafts\./, '')
    if (seen.has(bare)) return false
    seen.add(bare)
    return true
  })

  if (unique.length === 0) {
    return (
      <Box padding={3}>
        <Text size={1} muted>
          Not referenced by any document.
        </Text>
      </Box>
    )
  }

  return (
    <Stack gap={2}>
      {unique.map((ref) => {
        const bare = ref._id.replace(/^drafts\./, '')
        return (
          <Card key={bare} padding={3} radius={2} tone="transparent" border>
            <Flex align="center" justify="space-between" gap={2}>
              <Stack gap={1}>
                <Text size={1} weight="medium">
                  {ref.title}
                </Text>
                <Text size={0} muted>
                  {TYPE_LABELS[ref._type] ?? ref._type}
                  {ref.slug ? ` · /${ref.slug}` : ''}
                </Text>
              </Stack>
              <Text size={1} muted>
                <LaunchIcon />
              </Text>
            </Flex>
          </Card>
        )
      })}
    </Stack>
  )
}

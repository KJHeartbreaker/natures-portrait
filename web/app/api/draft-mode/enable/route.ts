import {validatePreviewUrl} from '@sanity/preview-url-secret'
import {perspectiveCookieName} from '@sanity/preview-url-secret/constants'
import {cookies, draftMode} from 'next/headers'
import {redirect} from 'next/navigation'

import {client} from '@/sanity/lib/client'
import {token} from '@/sanity/lib/token'

/**
 * Enables draft mode for Sanity Presentation. Must match previewMode.enable in studio/sanity.config.ts.
 * @see https://github.com/sanity-io/next-sanity?tab=readme-ov-file#5-integrating-with-sanity-presentation-tool--visual-editing
 */
export async function GET(request: Request) {
  const url = new URL(request.url)

  if (!url.searchParams.get('sanity-preview-secret')) {
    return new Response(
      'Missing `sanity-preview-secret`.\n\nSanity Presentation requires URL Preview Secrets. Ensure your Sanity user/role can create documents of type `sanity.previewUrlSecret`.',
      {status: 401},
    )
  }

  const {isValid, redirectTo = '/', studioPreviewPerspective} = await validatePreviewUrl(
    client.withConfig({token}),
    request.url,
  )

  if (!isValid) return new Response('Invalid secret', {status: 401})

  const draftModeStore = await draftMode()
  if (!draftModeStore.isEnabled) draftModeStore.enable()

  const isSecure = process.env.NODE_ENV === 'production'
  const cookieStore = await cookies()
  const bypassCookie = cookieStore.get('__prerender_bypass')
  const bypassValue = bypassCookie?.value ?? globalThis.crypto?.randomUUID?.() ?? 'draft'

  cookieStore.set({
    name: '__prerender_bypass',
    value: bypassValue,
    httpOnly: true,
    path: '/',
    secure: isSecure,
    sameSite: isSecure ? 'none' : 'lax',
  })

  if (studioPreviewPerspective) {
    cookieStore.set({
      name: perspectiveCookieName,
      value: studioPreviewPerspective,
      httpOnly: true,
      path: '/',
      secure: isSecure,
      sameSite: isSecure ? 'none' : 'lax',
    })
  }

  return redirect(redirectTo)
}

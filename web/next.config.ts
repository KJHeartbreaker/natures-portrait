import type {NextConfig} from 'next'

function originFromUrl(value: string | undefined): string | undefined {
  if (!value) return undefined
  try {
    return new URL(value).origin
  } catch {
    return undefined
  }
}

// Allow Presentation to embed the site in an iframe from Studio (local + hosted).
const presentationFrameAncestors = [
  "'self'",
  'https://www.sanity.io',
  'https://*.sanity.studio',
  'https://sanity.studio',
  originFromUrl(process.env.NEXT_PUBLIC_SANITY_STUDIO_URL),
  'http://localhost:3333',
]
  .filter((value, index, list) => value && list.indexOf(value) === index)
  .join(' ')

const nextConfig: NextConfig = {
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: 'false',
  },
  images: {
    remotePatterns: [new URL('https://cdn.sanity.io/**')],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors ${presentationFrameAncestors}`,
          },
        ],
      },
    ]
  },
}

export default nextConfig

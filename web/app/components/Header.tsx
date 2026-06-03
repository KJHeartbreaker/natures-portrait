import Link from 'next/link'
import { homeMetaQuery, settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import Cta from '@/app/components/Cta'
import Image from '@/app/components/SanityImage'
import { getImageId } from '@/app/lib/sanityImageHelpers'

export default async function Header() {
  const [{ data: home }, { data: settings }] = await Promise.all([
    sanityFetch({ query: homeMetaQuery }),
    sanityFetch({ query: settingsQuery }),
  ])

  const siteTitle = home?.title || "Nature's Portrait"
  const logoId = getImageId(settings?.siteLogo)
  const logoAlt = settings?.siteLogo?.alt || `${siteTitle} logo`

  return (
    <header className="fixed z-50 h-24 inset-0 flex items-center bg-coastal-pine text-soft-oat backdrop-blur-lg">
      <div className="container py-6 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2.5 sm:gap-3 pl-2" href="/">
            {logoId ? (
              <span className="block h-18 shrink-0 sm:h-14 md:h-18">
                <Image
                  id={logoId}
                  alt={logoAlt}
                  width={280}
                  height={190}
                  mode="contain"
                  crop={settings?.siteLogo?.crop}
                  hotspot={settings?.siteLogo?.hotspot}
                  className="h-full w-full object-contain object-left"
                />
              </span>
            ) : null}
            <span className="font-serif text-lg font-bold leading-none text-soft-oat sm:text-2xl">
              {siteTitle}
            </span>
          </Link>

          <nav>
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-6 leading-5 text-xs sm:text-base tracking-tight font-mono"
            >
              {(settings?.menuItems || []).map((item) => {
                if (!item) return null
                if (item._type === 'navCTA' && item.cta) {
                  return (
                    <li key={item._key}>
                      <Cta cta={item.cta} className="hover:underline" />
                    </li>
                  )
                }

                if (item._type === 'navDropdownCTA' && item.cta) {
                  return (
                    <li key={item._key}>
                      <details className="relative">
                        <summary className="cursor-pointer select-none hover:underline">
                          {item.cta?.title || 'Menu'}
                        </summary>
                        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded p-2 min-w-56 shadow">
                          <ul role="list" className="flex flex-col gap-1">
                            {(item.subnav || []).map((sub) => (
                              <li key={sub._key}>
                                <Cta cta={sub} className="block px-3 py-2 hover:bg-gray-50 rounded" />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    </li>
                  )
                }

                // Embedded document or dereferenced ref projection
                if (item._type === 'blogLandingPage' && item.slug) {
                  return (
                    <li key={item._key}>
                      <Link href={`/${item.slug}`} className="hover:underline">
                        {item.title || 'Untitled'}
                      </Link>
                    </li>
                  )
                }

                return null
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

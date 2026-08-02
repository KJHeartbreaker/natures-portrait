import Link from 'next/link'
import { homeMetaQuery, settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import Cta from '@/app/components/Cta'
import Image from '@/app/components/SanityImage'
import { adaptCrop, adaptHotspot, getImageId } from '@/app/lib/sanityImageHelpers'
import NavScrollWrapper from '@/app/components/NavScrollWrapper'

export default async function Header() {
  const [{ data: home }, { data: settings }] = await Promise.all([
    sanityFetch({ query: homeMetaQuery }),
    sanityFetch({ query: settingsQuery }),
  ])

  const siteTitle = home?.title || "Nature's Portrait"
  const logoId = getImageId(settings?.siteLogo)
  const logoAlt = settings?.siteLogo?.alt || `${siteTitle} logo`

  return (
    <NavScrollWrapper>
      <div className="container px-2 sm:px-6">
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
                  crop={adaptCrop(settings?.siteLogo?.crop)}
                  hotspot={adaptHotspot(settings?.siteLogo?.hotspot)}
                  className="h-full w-full object-contain object-left"
                />
              </span>
            ) : null}
            <span className="font-serif text-lg font-light leading-none text-soft-oat sm:text-2xl">
              {siteTitle}
            </span>
          </Link>

          <nav>
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-6 leading-5 text-xs sm:text-sm tracking-[0.18em] uppercase font-sans font-light"
            >
              {(settings?.menuItems || []).map((item) => {
                if (!item) return null
                if (item._type === 'navCTA' && item.cta) {
                  return (
                    <li key={item._key}>
                      <Cta cta={item.cta} className="text-linen-clay hover:text-soft-oat transition-colors duration-200" />
                    </li>
                  )
                }

                if (item._type === 'navDropdownCTA' && item.cta) {
                  return (
                    <li key={item._key}>
                      <details className="relative">
                        <summary className="cursor-pointer select-none text-linen-clay hover:text-soft-oat transition-colors duration-200">
                          {item.cta?.title || 'Menu'}
                        </summary>
                        <div className="absolute right-0 mt-2 bg-luxe-noir border border-linen-clay/20 p-2 min-w-56">
                          <ul role="list" className="flex flex-col gap-1">
                            {(item.subnav || []).map((sub) => (
                              <li key={sub._key}>
                                <Cta cta={sub} className="block px-3 py-2 text-linen-clay hover:text-soft-oat transition-colors duration-200" />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    </li>
                  )
                }

                if (item._type === 'blogLandingPage' && item.slug) {
                  return (
                    <li key={item._key}>
                      <Link href={`/${item.slug}`} className="text-linen-clay hover:text-soft-oat transition-colors duration-200">
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
    </NavScrollWrapper>
  )
}

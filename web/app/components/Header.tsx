import Link from 'next/link'
import {homeMetaQuery, settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import Cta from '@/app/components/Cta'

export default async function Header() {
  const [{data: home}, {data: settings}] = await Promise.all([
    sanityFetch({query: homeMetaQuery}),
    sanityFetch({query: settingsQuery}),
  ])

  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg">
      <div className="container py-6 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <span className="text-lg sm:text-2xl pl-2 font-semibold">
              {home?.title || 'Natures Portrait'}
            </span>
          </Link>

          <nav>
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-6 leading-5 text-xs sm:text-base tracking-tight font-mono"
            >
              {(settings?.menuItems || []).map((item: any) => {
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
                            {(item.subnav || []).map((sub: any) => (
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
                if (item.slug) {
                  return (
                    <li key={item._key || item._id}>
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

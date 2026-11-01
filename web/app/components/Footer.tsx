import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { homeMetaQuery } from '@/sanity/lib/queries'
import { ARTIST_NAME, INSTAGRAM_URL } from '@/app/lib/site'

export default async function Footer() {
  const { data: home } = await sanityFetch({ query: homeMetaQuery })
  const siteTitle = home?.title || "Nature's Portrait"
  const year = new Date().getFullYear()

  return (
    <footer className="bg-luxe-noir text-soft-oat">
      <div className="container flex flex-col items-center gap-6 py-10 text-center md:flex-row md:justify-between md:gap-8 md:py-8 md:text-left">
        <div className="flex flex-col gap-2 md:gap-1">
          <p className="font-serif font-light text-sm tracking-wide">
            {siteTitle} &copy; {year}
          </p>
          <p className="text-[10px] tracking-[0.25em] uppercase font-sans font-light text-dusty-sage">
            Fine Art Photography by {ARTIST_NAME}
          </p>
        </div>
        <nav>
          <ul
            role="list"
            className="flex items-center gap-6 text-[10px] tracking-[0.25em] uppercase font-sans font-light text-linen-clay"
          >
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-soft-oat transition-colors duration-200"
              >
                Instagram
              </a>
            </li>
            <li>
              <Link href="/prints" className="hover:text-soft-oat transition-colors duration-200">
                Prints
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-soft-oat transition-colors duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

import { sanityFetch } from '@/sanity/lib/live'
import { homeMetaQuery } from '@/sanity/lib/queries'

export default async function Footer() {
  const { data: home } = await sanityFetch({ query: homeMetaQuery })
  const siteTitle = home?.title || "Nature's Portrait"
  const year = new Date().getFullYear()

  return (
    <footer className="bg-luxe-noir text-soft-oat">
      <div className="container flex items-center justify-between gap-8 py-8">
        <p className="font-serif font-light text-sm tracking-wide">
          {siteTitle} &copy; {year}
        </p>
        <nav>
          <ul
            role="list"
            className="flex items-center gap-6 text-[10px] tracking-[0.25em] uppercase font-sans font-light text-linen-clay"
          >
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-soft-oat transition-colors duration-200"
              >
                Instagram
              </a>
            </li>
            <li>
              <a href="/prints" className="hover:text-soft-oat transition-colors duration-200">
                Prints
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-soft-oat transition-colors duration-200">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

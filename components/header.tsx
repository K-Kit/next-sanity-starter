import Link from "next/link"
import Image from "next/image"
import { sanityFetch } from "@/sanity/lib/live"
import { HEADER_SETTINGS_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { cn } from "@/lib/utils"
import type { SanityImageSource } from "@sanity/image-url"

interface NavItem {
  _key: string
  label: string
  href?: string
  isExternal?: boolean
  hasColumns?: boolean
  columns?: {
    _key: string
    title?: string
    items?: {
      _key: string
      label: string
      href?: string
      isExternal?: boolean
      description?: string
    }[]
  }[]
}

interface CtaButton {
  label: string
  href: string
  isExternal?: boolean
  style?: "default" | "outline" | "secondary" | "ghost" | "link"
}

interface HeaderData {
  logo?: SanityImageSource
  logoText?: string
  navItems?: NavItem[]
  ctaButton?: CtaButton
  sticky?: boolean
  style?: "default" | "centered" | "minimal"
}

function NavDropdown({ item }: { item: NavItem }) {
  if (!item.columns || item.columns.length === 0) return null
  return (
    <div className="absolute top-full left-1/2 z-50 mt-2 hidden w-64 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg group-hover:block dark:border-gray-800 dark:bg-gray-950">
      {item.columns.map((col) => (
        <div key={col._key} className="mb-3 last:mb-0">
          {col.title && (
            <p className="mb-1 px-2 text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
              {col.title}
            </p>
          )}
          {col.items?.map((subItem) => (
            <Link
              key={subItem._key}
              href={subItem.href ?? "#"}
              target={subItem.isExternal ? "_blank" : undefined}
              rel={subItem.isExternal ? "noopener noreferrer" : undefined}
              className="block rounded-lg px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <span className="font-medium">{subItem.label}</span>
              {subItem.description && (
                <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
                  {subItem.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

function Brand({
  logo,
  logoText,
}: {
  logo?: SanityImageSource
  logoText?: string
}) {
  return (
    <Link href="/" className="flex items-center gap-2">
      {logo ? (
        <Image
          src={urlFor(logo).height(40).url()}
          alt={logoText ?? "Logo"}
          width={120}
          height={40}
          className="h-8 w-auto object-contain"
        />
      ) : (
        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {logoText ?? "Site"}
        </span>
      )}
    </Link>
  )
}

function DesktopNav({
  navItems,
  style,
}: {
  navItems?: NavItem[]
  style?: string
}) {
  if (!navItems || navItems.length === 0) return null
  return (
    <nav className="hidden items-center gap-1 md:flex">
      {navItems.map((item) =>
        item.hasColumns && item.columns?.length ? (
          <div key={item._key} className="group relative">
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
              {item.label}
              <svg
                className="size-3.5 opacity-60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <NavDropdown item={item} />
          </div>
        ) : (
          <Link
            key={item._key}
            href={item.href ?? "#"}
            target={item.isExternal ? "_blank" : undefined}
            rel={item.isExternal ? "noopener noreferrer" : undefined}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  )
}

export async function Header() {
  const { data } = await sanityFetch({ query: HEADER_SETTINGS_QUERY })
  const headerData = data as HeaderData | null

  const style = headerData?.style ?? "default"
  const sticky = headerData?.sticky ?? false

  const wrapperClass = cn(
    "w-full border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 dark:border-gray-800 dark:bg-gray-950/90 dark:supports-[backdrop-filter]:bg-gray-950/75",
    sticky && "sticky top-0 z-40"
  )

  if (style === "centered") {
    return (
      <header className={wrapperClass}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 py-4">
            <Brand logo={headerData?.logo} logoText={headerData?.logoText} />
            <div className="flex items-center gap-3">
              <DesktopNav
                navItems={headerData?.navItems}
                style={style}
              />
              {headerData?.ctaButton && (
                <Button variant={headerData.ctaButton.style ?? "default"} size="sm" asChild>
                  <Link
                    href={headerData.ctaButton.href}
                    target={headerData.ctaButton.isExternal ? "_blank" : undefined}
                    rel={headerData.ctaButton.isExternal ? "noopener noreferrer" : undefined}
                  >
                    {headerData.ctaButton.label}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
        <MobileNav
          navItems={headerData?.navItems}
          ctaButton={headerData?.ctaButton}
          logo={headerData?.logo}
          logoText={headerData?.logoText}
        />
      </header>
    )
  }

  if (style === "minimal") {
    return (
      <header className={wrapperClass}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Brand logo={headerData?.logo} logoText={headerData?.logoText} />
            <div className="hidden items-center gap-4 md:flex">
              <nav className="flex items-center gap-3">
                {headerData?.navItems?.map((item) => (
                  <Link
                    key={item._key}
                    href={item.href ?? "#"}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              {headerData?.ctaButton && (
                <Button variant={headerData.ctaButton.style ?? "default"} size="sm" asChild>
                  <Link
                    href={headerData.ctaButton.href}
                    target={headerData.ctaButton.isExternal ? "_blank" : undefined}
                    rel={headerData.ctaButton.isExternal ? "noopener noreferrer" : undefined}
                  >
                    {headerData.ctaButton.label}
                  </Link>
                </Button>
              )}
            </div>
            <MobileNav
              navItems={headerData?.navItems}
              ctaButton={headerData?.ctaButton}
              logo={headerData?.logo}
              logoText={headerData?.logoText}
              iconOnly
            />
          </div>
        </div>
      </header>
    )
  }

  // default: logo left, nav center, CTA right
  return (
    <header className={wrapperClass}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Brand logo={headerData?.logo} logoText={headerData?.logoText} />
          <DesktopNav navItems={headerData?.navItems} style={style} />
          <div className="flex items-center gap-2">
            {headerData?.ctaButton && (
              <Button
                variant={headerData.ctaButton.style ?? "default"}
                size="sm"
                asChild
                className="hidden md:inline-flex"
              >
                <Link
                  href={headerData.ctaButton.href}
                  target={headerData.ctaButton.isExternal ? "_blank" : undefined}
                  rel={headerData.ctaButton.isExternal ? "noopener noreferrer" : undefined}
                >
                  {headerData.ctaButton.label}
                </Link>
              </Button>
            )}
            <MobileNav
              navItems={headerData?.navItems}
              ctaButton={headerData?.ctaButton}
              logo={headerData?.logo}
              logoText={headerData?.logoText}
              iconOnly
            />
          </div>
        </div>
      </div>
    </header>
  )
}

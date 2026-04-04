import Link from "next/link"
import Image from "next/image"
import { sanityFetch } from "@/sanity/lib/live"
import { FOOTER_SETTINGS_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { cn } from "@/lib/utils"
import { Globe } from "lucide-react"
import { NewsletterForm } from "@/components/newsletter-form"
import type { SanityImageSource } from "@sanity/image-url"

import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa"

// Inline SVG paths for social platforms not in lucide-react
const socialSvgPaths: Record<string, string> = {
  twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.623zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.623zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  github: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  youtube: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
}

interface FooterLink {
  _key: string
  label: string
  href?: string
  isExternal?: boolean
}

interface NavColumn {
  _key: string
  title?: string
  links?: FooterLink[]
}

interface SocialLink {
  _key: string
  platform?: string
  url?: string
}

interface FooterData {
  logo?: SanityImageSource
  logoText?: string
  description?: string
  navColumns?: NavColumn[]
  bottomLinks?: FooterLink[]
  socialLinks?: SocialLink[]
  copyrightText?: string
  style?: "default" | "minimal" | "centered"
}

function SocialIcon({ platform }: { platform?: string }) {
  const key = (platform ?? "").toLowerCase()
  const path = socialSvgPaths[key?.toLowerCase()]
  if (path) {
    return (
      <svg
        className="size-4"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    )
  }
  return <Globe className="size-4" />
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

export async function Footer() {
  const { data } = await sanityFetch({ query: FOOTER_SETTINGS_QUERY })
  const footerData = data as FooterData | null

  const style = footerData?.style ?? "default"
  const year = new Date().getFullYear()
  const copyright =
    footerData?.copyrightText ?? `© ${year} All rights reserved.`

  if (style === "minimal") {
    return (
      <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Brand logo={footerData?.logo} logoText={footerData?.logoText} />
            <nav className="flex flex-wrap items-center gap-4">
              {footerData?.bottomLinks?.map((link) => (
                <Link
                  key={link._key}
                  href={link.href ?? "#"}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              {footerData?.socialLinks?.map((social) => (
                <a
                  key={social._key}
                  href={social.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{copyright}</p>
          </div>
        </div>
      </footer>
    )
  }

  if (style === "centered") {
    return (
      <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <Brand logo={footerData?.logo} logoText={footerData?.logoText} />
            {footerData?.description && (
              <p className="max-w-sm text-sm text-gray-600 dark:text-gray-400">
                {footerData.description}
              </p>
            )}
            {footerData?.socialLinks && footerData.socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {footerData.socialLinks.map((social) => (
                  <a
                    key={social._key}
                    href={social.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
              </div>
            )}
            {footerData?.navColumns && footerData.navColumns.length > 0 && (
              <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                {footerData.navColumns.flatMap(
                  (col) =>
                    col.links?.map((link) => (
                      <Link
                        key={link._key}
                        href={link.href ?? "#"}
                        target={link.isExternal ? "_blank" : undefined}
                        rel={link.isExternal ? "noopener noreferrer" : undefined}
                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                      >
                        {link.label}
                      </Link>
                    )) ?? []
                )}
              </nav>
            )}
            <div className="mt-4 border-t border-gray-200 pt-6 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">{copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  // default: multi-column
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Top section */}
        <div
          className={cn(
            "grid gap-10",
            footerData?.navColumns && footerData.navColumns.length > 0
              ? "lg:grid-cols-[1fr_2fr]"
              : "lg:grid-cols-1"
          )}
        >
          {/* Brand + description + social */}
          <div className="flex flex-col gap-4">
            <Brand logo={footerData?.logo} logoText={footerData?.logoText} />
            {footerData?.description && (
              <p className="max-w-xs text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {footerData.description}
              </p>
            )}
            {footerData?.socialLinks && footerData.socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {footerData.socialLinks.map((social) => (
                  <a
                    key={social._key}
                    href={social.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
              </div>
            )}
            <div className="mt-2">
              <p className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Stay up to date
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Nav columns */}
          {footerData?.navColumns && footerData.navColumns.length > 0 && (
            <div
              className={cn(
                "grid gap-8",
                `grid-cols-2 sm:grid-cols-${Math.min(footerData.navColumns.length, 4)}`
              )}
            >
              {footerData.navColumns.map((col) => (
                <div key={col._key}>
                  {col.title && (
                    <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {col.title}
                    </h3>
                  )}
                  <ul className="space-y-2">
                    {col.links?.map((link) => (
                      <li key={link._key}>
                        <Link
                          href={link.href ?? "#"}
                          target={link.isExternal ? "_blank" : undefined}
                          rel={link.isExternal ? "noopener noreferrer" : undefined}
                          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">{copyright}</p>
          {footerData?.bottomLinks && footerData.bottomLinks.length > 0 && (
            <nav className="flex flex-wrap items-center gap-4">
              {footerData.bottomLinks.map((link) => (
                <Link
                  key={link._key}
                  href={link.href ?? "#"}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </footer>
  )
}

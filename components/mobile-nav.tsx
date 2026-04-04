"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/sanity/lib/image"
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

interface MobileNavProps {
  navItems?: NavItem[]
  ctaButton?: CtaButton
  logo?: SanityImageSource
  logoText?: string
  iconOnly?: boolean
}

export function MobileNav({
  navItems,
  ctaButton,
  logo,
  logoText,
  iconOnly = false,
}: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={iconOnly ? "md:hidden" : "border-t border-gray-200 md:hidden dark:border-gray-800"}>
      {iconOnly ? (
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      ) : (
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300"
          aria-label="Toggle menu"
        >
          <span>Menu</span>
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-950">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-800">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
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
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-1">
              {navItems?.map((item) => (
                <li key={item._key}>
                  {item.hasColumns && item.columns?.length ? (
                    <div>
                      <p className="mb-1 px-3 text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                        {item.label}
                      </p>
                      {item.columns.map((col) => (
                        <div key={col._key} className="mb-3">
                          {col.title && (
                            <p className="mb-1 px-3 text-xs text-gray-400 dark:text-gray-500">
                              {col.title}
                            </p>
                          )}
                          {col.items?.map((subItem) => (
                            <Link
                              key={subItem._key}
                              href={subItem.href ?? "#"}
                              target={subItem.isExternal ? "_blank" : undefined}
                              rel={subItem.isExternal ? "noopener noreferrer" : undefined}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href ?? "#"}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          {ctaButton && (
            <div className="border-t border-gray-200 px-4 py-4 dark:border-gray-800">
              <Button
                variant={ctaButton.style ?? "default"}
                className="w-full"
                asChild
              >
                <Link
                  href={ctaButton.href}
                  target={ctaButton.isExternal ? "_blank" : undefined}
                  rel={ctaButton.isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {ctaButton.label}
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

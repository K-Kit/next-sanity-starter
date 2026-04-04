'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CtaLink {
  label: string
  href: string
  isExternal?: boolean
  style?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
}

interface CtaProps {
  heading?: string
  body?: string
  links?: CtaLink[]
  style?: 'banner' | 'centered' | 'split'
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

function CtaLinks({ links }: { links?: CtaLink[] }) {
  if (!links) return null
  return (
    <div className="flex flex-wrap gap-3">
      {links?.map((link, i) => (
        <Button key={i} variant={link.style ?? 'default'} size="lg" asChild>
          <Link
            href={link.href}
            target={link.isExternal ? '_blank' : undefined}
            rel={link.isExternal ? 'noopener noreferrer' : undefined}
          >
            {link.label}
          </Link>
        </Button>
      ))}
    </div>
  )
}

export function Cta({ heading, body, links = [], style = 'centered' }: CtaProps) {
  if (style === 'banner') {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="bg-primary text-primary-foreground rounded-3xl px-8 py-16 text-center sm:px-16"
          >
            {heading && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {heading}
              </h2>
            )}
            {body && (
              <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">{body}</p>
            )}
            {links?.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {links?.map((link, i) => (
                  <Button
                    key={i}
                    variant={link.style ?? 'secondary'}
                    size="lg"
                    asChild
                  >
                    <Link
                      href={link.href}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    )
  }

  if (style === 'split') {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"
          >
            <div className="max-w-2xl">
              {heading && (
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {heading}
                </h2>
              )}
              {body && (
                <p className="text-muted-foreground mt-4 text-lg">{body}</p>
              )}
            </div>
            {links?.length > 0 && (
              <div className="shrink-0">
                <CtaLinks links={links} />
              </div>
            )}
          </motion.div>
        </div>
      </section>
    )
  }

  // centered (default)
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="mx-auto max-w-2xl text-center">
          {heading && (
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {heading}
            </h2>
          )}
          {body && (
            <p className="text-muted-foreground mt-4 text-lg">{body}</p>
          )}
          {links?.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <CtaLinks links={links} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

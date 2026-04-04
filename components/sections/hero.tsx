'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'

interface HeroLink {
  label: string
  href: string
  isExternal?: boolean
  style?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
}

interface HeroProps {
  eyebrow?: string
  heading?: string
  subheading?: string
  links?: HeroLink[]
  image?: SanityImageSource
  style?: 'centered' | 'split' | 'minimal'
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export function Hero({
  eyebrow,
  heading,
  subheading,
  links,
  image,
  style = 'centered',
}: HeroProps) {
  const imageUrl = image ? urlFor(image).width(1200).height(800).url() : null

  if (style === 'split') {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...fadeInUp} className="flex flex-col gap-6">
              {eyebrow && (
                <p className="text-primary text-sm font-semibold tracking-widest uppercase">
                  {eyebrow}
                </p>
              )}
              {heading && (
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {heading}
                </h1>
              )}
              {subheading && (
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {subheading}
                </p>
              )}
              {links && links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {links?.map((link, i) => (
                    <Button
                      key={i}
                      variant={link.style ?? 'default'}
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
            {imageUrl && (
              <motion.div
                {...fadeInUp}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={imageUrl}
                  alt={heading ?? 'Hero image'}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>
    )
  }

  if (style === 'minimal') {
    return (
      <section className="py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mx-auto max-w-3xl text-center">
            {eyebrow && (
              <p className="text-primary mb-4 text-sm font-semibold tracking-widest uppercase">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                {heading}
              </h1>
            )}
            {subheading && (
              <p className="text-muted-foreground mt-6 text-xl leading-relaxed">
                {subheading}
              </p>
            )}
            {links && links.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {links?.map((link, i) => (
                  <Button
                    key={i}
                    variant={link.style ?? 'default'}
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

  // centered (default)
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <p className="text-primary mb-4 text-sm font-semibold tracking-widest uppercase">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {heading}
            </h1>
          )}
          {subheading && (
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              {subheading}
            </p>
          )}
          {links && links.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {links?.map((link, i) => (
                <Button
                  key={i}
                  variant={link.style ?? 'default'}
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
        {imageUrl && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 overflow-hidden rounded-2xl shadow-2xl"
          >
            <Image
              src={imageUrl}
              alt={heading ?? 'Hero image'}
              width={1200}
              height={800}
              className="w-full object-cover"
              priority
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}

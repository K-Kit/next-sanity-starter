'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'

interface Logo {
  name?: string
  logo?: SanityImageSource
  href?: string
}

interface LogoCloudProps {
  heading?: string
  logos?: Logo[]
  style?: 'scroll' | 'grid' | 'minimal'
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

function LogoItem({
  logo,
  grayscale = false,
}: {
  logo: Logo
  grayscale?: boolean
}) {
  const imageUrl = logo.logo ? urlFor(logo.logo).width(160).height(60).url() : null
  const content = imageUrl ? (
    <Image
      src={imageUrl}
      alt={logo.name ?? 'Logo'}
      width={120}
      height={40}
      className={cn(
        'h-8 w-auto object-contain',
        grayscale && 'opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0',
      )}
    />
  ) : (
    <span className="text-muted-foreground font-medium">{logo.name}</span>
  )

  if (logo.href) {
    return (
      <Link
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
      >
        {content}
      </Link>
    )
  }
  return <div className="flex items-center justify-center">{content}</div>
}

export function LogoCloud({ heading, logos = [], style = 'grid' }: LogoCloudProps) {
  if (style === 'scroll') {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {heading && (
            <motion.p
              {...fadeInUp}
              className="text-muted-foreground mb-8 text-center text-sm font-medium tracking-widest uppercase"
            >
              {heading}
            </motion.p>
          )}
          <div className="relative overflow-hidden">
            <div className="flex animate-[scroll_30s_linear_infinite] gap-12">
              {[...logos, ...logos].map((logo, i) => (
                <div key={i} className="shrink-0">
                  <LogoItem logo={logo} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>
    )
  }

  if (style === 'minimal') {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {heading && (
            <motion.p
              {...fadeInUp}
              className="text-muted-foreground mb-8 text-center text-sm font-medium tracking-widest uppercase"
            >
              {heading}
            </motion.p>
          )}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-10"
          >
            {logos?.map((logo, i) => (
              <LogoItem key={i} logo={logo} grayscale />
            ))}
          </motion.div>
        </div>
      </section>
    )
  }

  // grid (default)
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <motion.p
            {...fadeInUp}
            className="text-muted-foreground mb-8 text-center text-sm font-medium tracking-widest uppercase"
          >
            {heading}
          </motion.p>
        )}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6"
        >
          {logos?.map((logo, i) => (
            <LogoItem key={i} logo={logo} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

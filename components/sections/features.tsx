'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Feature {
  icon?: string
  title?: string
  description?: string
}

interface FeaturesProps {
  eyebrow?: string
  heading?: string
  subtitle?: string
  features?: Feature[]
  style?: 'grid' | 'alternating' | 'cards'
}

const containerVariants = {
  whileInView: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

function SectionHeader({
  eyebrow,
  heading,
  subtitle,
  centered = true,
}: {
  eyebrow?: string
  heading?: string
  subtitle?: string
  centered?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn('mb-16', centered && 'mx-auto max-w-2xl text-center')}
    >
      {eyebrow && (
        <p className="text-primary mb-4 text-sm font-semibold tracking-widest uppercase">
          {eyebrow}
        </p>
      )}
      {heading && (
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
      )}
      {subtitle && (
        <p className="text-muted-foreground mt-4 text-lg">{subtitle}</p>
      )}
    </motion.div>
  )
}

export function Features({
  eyebrow,
  heading,
  subtitle,
  features = [],
  style = 'grid',
}: FeaturesProps) {
  if (style === 'alternating') {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={eyebrow} heading={heading} subtitle={subtitle} />
          <div className="flex flex-col gap-24">
            {features?.map((feature, i) => (
              <motion.div
                key={i}
                {...itemVariants}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  'grid items-center gap-12 lg:grid-cols-2',
                  i % 2 !== 0 && 'lg:[&>*:first-child]:order-last',
                )}
              >
                <div className="flex flex-col gap-4">
                  {feature.icon && (
                    <span className="text-primary text-4xl">{feature.icon}</span>
                  )}
                  {feature.title && (
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                  )}
                  {feature.description && (
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </div>
                <div className="bg-muted h-64 rounded-2xl lg:h-80" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (style === 'cards') {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={eyebrow} heading={heading} subtitle={subtitle} />
          <motion.div
            variants={containerVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                {...itemVariants}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card border-border flex flex-col gap-4 rounded-2xl border p-8 shadow-sm"
              >
                {feature.icon && (
                  <span className="text-primary text-3xl">{feature.icon}</span>
                )}
                {feature.title && (
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                )}
                {feature.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                )}
              </motion.div>
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
        <SectionHeader eyebrow={eyebrow} heading={heading} subtitle={subtitle} />
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              {...itemVariants}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col gap-3"
            >
              {feature.icon && (
                <span className="text-primary text-3xl">{feature.icon}</span>
              )}
              {feature.title && (
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              )}
              {feature.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

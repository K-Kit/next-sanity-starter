'use client'

import { motion } from 'framer-motion'

interface FaqItem {
  question?: string
  answer?: string
}

interface FaqProps {
  heading?: string
  subtitle?: string
  items?: FaqItem[]
  style?: 'accordion' | 'two-column'
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export function Faq({ heading, subtitle, items = [], style = 'accordion' }: FaqProps) {
  if (style === 'two-column') {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-16 text-center">
            {heading && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {heading}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground mt-4 text-lg">{subtitle}</p>
            )}
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-2">
            {items?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex flex-col gap-3"
              >
                {item.question && (
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                )}
                {item.answer && (
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // accordion (default) - using native details/summary for zero dependencies
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {heading}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground mt-4 text-lg">{subtitle}</p>
            )}
          </div>
          <div className="divide-border divide-y">
            {items?.map((item, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group py-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {item.question}
                  <span className="text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                {item.answer && (
                  <p className="text-muted-foreground mt-4 leading-relaxed">
                    {item.answer}
                  </p>
                )}
              </motion.details>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

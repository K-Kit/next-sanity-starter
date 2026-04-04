'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'

interface Testimonial {
  quote?: string
  author?: string
  role?: string
  avatar?: SanityImageSource
}

interface TestimonialsProps {
  heading?: string
  testimonials?: Testimonial[]
  style?: 'carousel' | 'grid' | 'stacked'
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

function TestimonialCard({
  testimonial,
  delay = 0,
}: {
  testimonial: Testimonial
  delay?: number
}) {
  const avatarUrl = testimonial.avatar
    ? urlFor(testimonial.avatar).width(80).height(80).url()
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card border-border flex flex-col gap-6 rounded-2xl border p-8"
    >
      {testimonial.quote && (
        <blockquote className="text-foreground text-lg leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      )}
      <div className="flex items-center gap-4">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={testimonial.author ?? 'Avatar'}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        )}
        <div>
          {testimonial.author && (
            <p className="font-semibold">{testimonial.author}</p>
          )}
          {testimonial.role && (
            <p className="text-muted-foreground text-sm">{testimonial.role}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials({
  heading,
  testimonials = [],
  style = 'grid',
}: TestimonialsProps) {
  if (style === 'carousel') {
    const first = testimonials[0]
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {heading && (
            <motion.h2
              {...fadeInUp}
              className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {heading}
            </motion.h2>
          )}
          {first && (
            <div className="mx-auto max-w-3xl">
              <TestimonialCard testimonial={first} />
            </div>
          )}
        </div>
      </section>
    )
  }

  if (style === 'stacked') {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {heading && (
            <motion.h2
              {...fadeInUp}
              className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {heading}
            </motion.h2>
          )}
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {testimonials?.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // grid (default)
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <motion.h2
            {...fadeInUp}
            className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {heading}
          </motion.h2>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials?.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}

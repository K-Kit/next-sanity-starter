'use client'

import { useForm } from '@tanstack/react-form'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface ContactFormProps {
  heading?: string
  description?: string
  successMessage?: string
  style?: 'centered' | 'split'
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-100 dark:focus:ring-gray-100'

export function ContactForm({
  heading,
  description,
  successMessage = 'Thank you! We will be in touch soon.',
  style = 'centered',
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm({
    defaultValues: { name: '', email: '', message: '' },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Form submitted:', value)
      setSubmitted(true)
    },
  })

  if (submitted) {
    return (
      <section className="py-16 md:py-24">
        <motion.div
          {...fadeInUp}
          className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 text-center"
        >
          <CheckCircle className="size-12 text-green-600 dark:text-green-400" />
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {successMessage}
          </p>
        </motion.div>
      </section>
    )
  }

  const formElement = (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div className="space-y-5">
        <form.Field
          name="name"
          validators={{
            onBlur: ({ value }) =>
              !value.trim() ? 'Name is required' : undefined,
          }}
          children={(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Name
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Your name"
                className={inputClass}
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {field.state.meta.errors.map(String).join(', ')}
                  </p>
                )}
            </div>
          )}
        />
        <form.Field
          name="email"
          validators={{
            onBlur: ({ value }) => {
              if (!value.trim()) return 'Email is required'
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                return 'Enter a valid email'
              return undefined
            },
          }}
          children={(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Email
              </label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {field.state.meta.errors.map(String).join(', ')}
                  </p>
                )}
            </div>
          )}
        />
        <form.Field
          name="message"
          validators={{
            onBlur: ({ value }) =>
              !value.trim() ? 'Message is required' : undefined,
          }}
          children={(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Message
              </label>
              <textarea
                id={field.name}
                name={field.name}
                rows={5}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="How can we help?"
                className={inputClass}
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {field.state.meta.errors.map(String).join(', ')}
                  </p>
                )}
            </div>
          )}
        />
        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
          children={({ canSubmit, isSubmitting }) => (
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!canSubmit}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          )}
        />
      </div>
    </form>
  )

  if (style === 'split') {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <motion.div {...fadeInUp} className="flex flex-col gap-4">
              {heading && (
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
                  {heading}
                </h2>
              )}
              {description && (
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              )}
            </motion.div>
            <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.15 }}>
              {formElement}
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  // centered (default)
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="mx-auto max-w-xl">
          {(heading || description) && (
            <div className="mb-8 text-center">
              {heading && (
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
                  {heading}
                </h2>
              )}
              {description && (
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>
          )}
          {formElement}
        </motion.div>
      </div>
    </section>
  )
}

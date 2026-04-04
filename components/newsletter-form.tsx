'use client'

import { useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { useState } from 'react'

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm({
    defaultValues: { email: '' },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 800))
      console.log('Newsletter signup:', value)
      setSubmitted(true)
    },
  })

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
        <CheckCircle className="size-4" />
        <span>You are subscribed!</span>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex gap-2"
    >
      <form.Field
        name="email"
        validators={{
          onSubmit: ({ value }) => {
            if (!value.trim()) return 'Required'
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
              return 'Invalid email'
            return undefined
          },
        }}
        children={(field) => (
          <div className="flex-1">
            <input
              type="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-100 dark:focus:ring-gray-100"
            />
            {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {field.state.meta.errors.map(String).join(', ')}
              </p>
            )}
          </div>
        )}
      />
      <form.Subscribe
        selector={(state) => state.isSubmitting}
        children={(isSubmitting) => (
          <Button type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? '...' : 'Subscribe'}
          </Button>
        )}
      />
    </form>
  )
}

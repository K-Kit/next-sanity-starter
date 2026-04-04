"use client"

// Note: @portabletext/react must be installed for this component to work.
// Run: bun add @portabletext/react
// or: npm install @portabletext/react

import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

interface PortableTextBlock {
  _type: string
  _key?: string
  [key: string]: unknown
}

interface BlogBodyProps {
  body: PortableTextBlock[]
}

// Lazy-load PortableText to handle the case where it may not be installed
let PortableText: React.ComponentType<{
  value: PortableTextBlock[]
  components?: Record<string, unknown>
}> | null = null

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require("@portabletext/react")
  PortableText = mod.PortableText
} catch {
  // Package not installed
}

const portableTextComponents = {
  types: {
    image: ({
      value,
    }: {
      value: { asset?: unknown; alt?: string; caption?: string }
    }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <div className="overflow-hidden rounded-xl">
            <Image
              src={urlFor(value).width(800).url()}
              alt={value.alt ?? ""}
              width={800}
              height={450}
              className="w-full object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="mb-4 mt-10 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mb-4 mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mb-3 mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:border-gray-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-gray-900 dark:text-gray-100">
        {children}
      </strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200">
        {children}
      </code>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string; blank?: boolean }
      children?: React.ReactNode
    }) => (
      <a
        href={value?.href ?? "#"}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-gray-900 underline underline-offset-2 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
      >
        {children}
      </a>
    ),
  },
}

export function BlogBody({ body }: BlogBodyProps) {
  if (!PortableText) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
        <strong>@portabletext/react</strong> is not installed. Run{" "}
        <code className="rounded bg-yellow-100 px-1 dark:bg-yellow-900">
          bun add @portabletext/react
        </code>{" "}
        to render blog post content.
      </div>
    )
  }

  return (
    <div className="prose-neutral prose max-w-none dark:prose-invert">
      <PortableText value={body} components={portableTextComponents as Record<string, unknown>} />
    </div>
  )
}

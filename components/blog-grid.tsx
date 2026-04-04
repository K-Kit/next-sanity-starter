"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { urlFor } from "@/sanity/lib/image"

interface BlogPost {
  _id: string
  title?: string
  slug?: { current?: string }
  excerpt?: string
  coverImage?: { asset?: Record<string, unknown> }
  author?: { name?: string; image?: { asset?: Record<string, unknown> } }
  publishedAt?: string
  categories?: { _id: string; title?: string }[]
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => {
        const slug = post.slug?.current
        const coverUrl =
          post.coverImage?.asset
            ? urlFor(post.coverImage).width(800).height(450).url()
            : null
        const publishedDate = post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : null

        return (
          <motion.article
            key={post._id}
            variants={cardVariants}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            {/* Cover image */}
            {coverUrl ? (
              <Link href={`/blog/${slug}`} className="block overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={coverUrl}
                    alt={post.title ?? "Post cover"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            ) : (
              <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800" />
            )}

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-5">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.categories.map((cat) => (
                    <span
                      key={cat._id}
                      className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h2 className="text-lg font-semibold leading-snug text-gray-900 dark:text-gray-100">
                <Link
                  href={`/blog/${slug}`}
                  className="hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {post.title}
                </Link>
              </h2>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {post.excerpt}
                </p>
              )}

              {/* Author + date */}
              <div className="mt-auto flex items-center gap-2 pt-3">
                {post.author?.image?.asset && (
                  <Image
                    src={urlFor(post.author.image).width(32).height(32).url()}
                    alt={post.author.name ?? "Author"}
                    width={32}
                    height={32}
                    className="size-7 rounded-full object-cover"
                  />
                )}
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {post.author?.name && (
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {post.author.name}
                    </span>
                  )}
                  {post.author?.name && publishedDate && (
                    <span className="mx-1">·</span>
                  )}
                  {publishedDate && <span>{publishedDate}</span>}
                </div>
              </div>
            </div>
          </motion.article>
        )
      })}
    </motion.div>
  )
}

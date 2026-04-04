import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { ALL_BLOG_POSTS_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { BlogGrid } from "@/components/blog-grid"

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest articles and updates.",
}

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({ query: ALL_BLOG_POSTS_QUERY })

  return (
    <div className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
            Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Thoughts, ideas, and updates from our team.
          </p>
        </div>

        {posts && posts.length > 0 ? (
          <BlogGrid posts={posts} />
        ) : (
          <div className="flex min-h-40 items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              No posts published yet. Check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

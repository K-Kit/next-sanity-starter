import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { sanityFetch } from "@/sanity/lib/live"
import { BLOG_POST_QUERY, ALL_BLOG_SLUGS_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { ArrowLeft } from "lucide-react"
import { BlogBody } from "@/components/blog-body"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch({
    query: ALL_BLOG_SLUGS_QUERY,
    perspective: "published",
  })
  return (slugs ?? []).map((item: { slug: string }) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await sanityFetch({
    query: BLOG_POST_QUERY,
    params: { slug },
  })

  if (!post) return { title: "Post Not Found" }

  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.excerpt

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: post.seo?.ogImage?.asset
        ? [{ url: urlFor(post.seo.ogImage).width(1200).height(630).url() }]
        : post.coverImage?.asset
          ? [{ url: urlFor(post.coverImage).width(1200).height(630).url() }]
          : [],
    },
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const { data: post } = await sanityFetch({
    query: BLOG_POST_QUERY,
    params: { slug },
  })

  if (!post) notFound()

  const coverImageUrl = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : null

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <div className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        {/* Cover image */}
        {coverImageUrl && (
          <div className="mb-8 overflow-hidden rounded-2xl">
            <Image
              src={coverImageUrl}
              alt={post.title ?? "Post cover"}
              width={1200}
              height={630}
              className="w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.categories.map(
              (cat: { _id: string; title?: string; slug?: { current?: string } }) => (
                <span
                  key={cat._id}
                  className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {cat.title}
                </span>
              )
            )}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
          {post.title}
        </h1>

        {/* Author + date */}
        <div className="mt-4 flex items-center gap-3">
          {post.author?.image?.asset && (
            <Image
              src={urlFor(post.author.image).width(40).height(40).url()}
              alt={post.author.name ?? "Author"}
              width={40}
              height={40}
              className="size-9 rounded-full object-cover"
            />
          )}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {post.author?.name && (
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {post.author.name}
              </span>
            )}
            {post.author?.name && publishedDate && (
              <span className="mx-1.5">·</span>
            )}
            {publishedDate && <span>{publishedDate}</span>}
          </div>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            {post.excerpt}
          </p>
        )}

        {/* Body */}
        {post.body && post.body.length > 0 && (
          <div className="mt-10">
            <BlogBody body={post.body} />
          </div>
        )}

        {/* Back link bottom */}
        <div className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}

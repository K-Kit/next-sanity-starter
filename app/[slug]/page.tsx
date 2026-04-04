import { sanityFetch } from "@/sanity/lib/live"
import {
  PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  ALL_PAGES_SLUGS_QUERY,
} from "@/sanity/lib/queries"
import { SectionRenderer } from "@/components/sections/section-renderer"
import { urlFor } from "@/sanity/lib/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data: pages } = await sanityFetch({
    query: ALL_PAGES_SLUGS_QUERY,
    perspective: "published",
  })

  return (pages ?? [])
    .filter((page: { slug: string }) => page.slug !== "home")
    .map((page: { slug: string }) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  })
  const { data: settings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
  })

  if (!page) return {}

  const title = page.seo?.metaTitle || page.title
  const description =
    page.seo?.metaDescription || settings?.siteDescription

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: page.seo?.ogImage?.asset
        ? [{ url: urlFor(page.seo.ogImage).width(1200).height(630).url() }]
        : settings?.ogImage?.asset
          ? [{ url: urlFor(settings.ogImage).width(1200).height(630).url() }]
          : [],
    },
    robots: page.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  })

  if (!page) notFound()

  return (
    <main>
      <SectionRenderer sections={page.sections} />
    </main>
  )
}

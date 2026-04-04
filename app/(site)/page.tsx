import { sanityFetch } from "@/sanity/lib/live"
import { PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries"
import { SectionRenderer } from "@/components/sections/section-renderer"
import type { Metadata } from "next"
import { urlFor } from "@/sanity/lib/image"

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: "home" },
  })
  const { data: settings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
  })

  const title = page?.seo?.metaTitle || page?.title || settings?.siteName
  const description =
    page?.seo?.metaDescription || settings?.siteDescription

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: page?.seo?.ogImage?.asset
        ? [{ url: urlFor(page.seo.ogImage).width(1200).height(630).url() }]
        : settings?.ogImage?.asset
          ? [{ url: urlFor(settings.ogImage).width(1200).height(630).url() }]
          : [],
    },
    robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function HomePage() {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: "home" },
  })

  if (!page) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold">Welcome to your starter</h1>
          <p className="mt-2 text-muted-foreground">
            Create a page with the slug &quot;home&quot; in your{" "}
            <a href="/studio" className="underline">
              Sanity Studio
            </a>{" "}
            to get started.
          </p>
        </div>
      </div>
    )
  }

  return <SectionRenderer sections={page.sections} />
}

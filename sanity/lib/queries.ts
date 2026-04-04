import { defineQuery } from 'next-sanity'

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    sections[]{
      _type,
      _key,
      ...,
      _type == "hero" => {
        ...,
        links[]{...,},
        image{..., asset->},
      },
      _type == "features" => {
        ...,
        features[]{...,},
      },
      _type == "cta" => {
        ...,
        links[]{...,},
      },
      _type == "testimonials" => {
        ...,
        testimonials[]{..., avatar{..., asset->}},
      },
      _type == "faq" => {
        ...,
        items[]{...,},
      },
      _type == "logoCloud" => {
        ...,
        logos[]{..., logo{..., asset->}},
      },
    },
    seo{
      metaTitle,
      metaDescription,
      ogImage{..., asset->},
      noIndex,
    },
  }
`)

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    _id,
    siteName,
    siteDescription,
    ogImage{..., asset->},
  }
`)

export const ALL_PAGES_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current,
  }
`)

export const HEADER_SETTINGS_QUERY = defineQuery(`
  *[_type == "headerSettings"][0]{
    logo{..., asset->},
    logoText,
    navItems[]{
      _key,
      label,
      "href": select(
        link[0]._type == "internalLink" => "/" + link[0].reference->slug.current,
        link[0]._type == "externalLink" => link[0].url
      ),
      "isExternal": link[0]._type == "externalLink",
      "hasColumns": count(columns) > 0,
      columns[]{
        _key,
        title,
        items[]{
          _key,
          label,
          "href": select(
            link[0]._type == "internalLink" => "/" + link[0].reference->slug.current,
            link[0]._type == "externalLink" => link[0].url
          ),
          "isExternal": link[0]._type == "externalLink",
          openInNewTab,
        },
      },
    },
    ctaButton{
      label,
      href,
      isExternal,
      style,
    },
    sticky,
    style,
  }
`)

export const FOOTER_SETTINGS_QUERY = defineQuery(`
  *[_type == "footerSettings"][0]{
    logo{..., asset->},
    logoText,
    description,
    navColumns[]{
      _key,
      title,
      links[]{
        _key,
        label,
        href,
        isExternal,
      },
    },
    bottomLinks[]{
      _key,
      label,
      href,
      isExternal,
    },
    socialLinks[]{
      _key,
      platform,
      url,
    },
    copyrightText,
    style,
  }
`)

export const ALL_BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    coverImage{..., asset->},
    author->{name, image{..., asset->}},
    publishedAt,
    categories[]->{_id, title, slug},
  }
`)

export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->,
      },
    },
    coverImage{..., asset->},
    author->{name, image{..., asset->}},
    publishedAt,
    categories[]->{_id, title, slug},
    seo{
      metaTitle,
      metaDescription,
      ogImage{..., asset->},
      noIndex,
    },
  }
`)

export const ALL_BLOG_SLUGS_QUERY = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)]{
    "slug": slug.current,
  }
`)

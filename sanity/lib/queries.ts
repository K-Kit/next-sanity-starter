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
    headerNav[]{
      ...,
      link[]{
        ...,
        _type == "internalLink" => {
          "reference": reference->{title, "slug": slug.current},
        },
      },
      columns[]{
        ...,
        items[]{
          ...,
          link[]{
            ...,
            _type == "internalLink" => {
              "reference": reference->{title, "slug": slug.current},
            },
          },
        },
      },
    },
    footerLinks[]{...,},
    socialLinks[]{...,},
  }
`)

export const ALL_PAGES_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current,
  }
`)

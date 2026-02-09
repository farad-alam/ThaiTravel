import { defineQuery } from 'next-sanity';
import {
  authorFragment,
  categoryFragment,
  menuFragment,
  pageFragment,
  postCardFragment,
  postFragment,
} from './fragments/fragments';

export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  title,
  description,
  logo {
    asset-> {
      url
    },
    alt
  },
  favicon {
    asset-> {
      url
    }
  },
  socialMedia {
    facebook,
    twitter,
    instagram,
    linkedin,
    youtube
  },
  googleSiteVerificationId,
  googleAnalyticsId,
  footerText,
  ${menuFragment}
}`);

export const homePageQuery = defineQuery(`*[_type == "homePage"][0]{
  _id,
  _type,
  ...,
  ${pageFragment}
}`);

export const blogPageQuery = defineQuery(`*[_type == "blogPage"][0]{
  _id,
  _type,
  ...,
  ${pageFragment}
}`);

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    ${pageFragment}
  }
`);

export const getSitemapQuery = defineQuery(`
  *[((_type in ["page", "post", "category", "author"] && defined(slug.current)) || (_type in ["homePage", "aboutPage", "contactPage", "privacyPolicy", "termsOfService", "affiliateDisclosure"])) && seo.noIndex != true]{
    "href": select(
      _type == "homePage" => "/",
      _type == "aboutPage" => "/about",
      _type == "contactPage" => "/contact",
      _type == "privacyPolicy" => "/privacy-policy",
      _type == "termsOfService" => "/terms-of-service",
      _type == "affiliateDisclosure" => "/affiliate-disclosure",
      _type == "page" => "/" + slug.current,
      _type == "post" => "/blog/" + slug.current,
      _type == "category" => "/category/" + slug.current,
      _type == "author" => "/author/" + slug.current,
      slug.current
    ),
    "priority": select(
      _type == "homePage" => 1.0,
      _type == "post" && (slug.current match "review" || slug.current match "best") => 1.0,
      _type == "post" => 0.8,
      _type == "category" => 0.6,
      0.5
    ),
    _updatedAt
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    ${postFragment}
  }
`);

export const categoryQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug] [0] {
    ${categoryFragment}
  }
`);

export const authorQuery = defineQuery(`
  *[_type == "author" && slug.current == $slug] [0] {
    ${authorFragment}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)][0..$limit].slug.current
`);

export const categorySlugs = defineQuery(`
  *[_type == "category" && defined(slug.current)][0..$limit].slug.current
`);

export const authorSlugs = defineQuery(`
  *[_type == "author" && defined(slug.current)][0..$limit].slug.current
`);

export const postsArchiveQuery = defineQuery(`
  {
    "allResults": *[
      _type == "post"
      &&
      (
        !defined( $filters.categorySlug ) || references(*[_type == "category" && slug.current == $filters.categorySlug]._id)
      )
      &&
      (
        !defined( $filters.personSlug ) || references(*[_type == "person" && slug.current == $filters.personSlug]._id)
      )
      //
      // Add more filter here if needed
      //
      // The filter value should be passed as a property of the $filter parameter
      //
      // (
      //   !defined( $filters.anotherFilter ) || fieldname == $filters.anotherFilter)
      // )
    ] | order(_createdAt desc, _id desc)
  }
  {
    "total": count(allResults),
    "results": allResults[$from..$to] {
      ${postCardFragment}
    }
  }
`);

export const allCategoriesQuery = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    title,
    slug,
    _id
  }
`);

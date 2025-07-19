import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

// This function now acts as a Head component that Gatsby will use to populate <head>
export function Head({
  lang = 'en',
  meta = [],
  keywords = '',
  description = '',
  title,
}) {
  const { site, placeholderImage } = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
      placeholderImage: file(relativePath: { eq: "avatar.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 300, layout: FIXED)
          original {
            src
          }
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description

  const imageSrc = placeholderImage.childImageSharp.original.src
  const allMeta = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      property: `og:image`,
      content: imageSrc,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: 'twitter:site',
      content: site.siteMetadata.author,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      name: `twitter:image`,
      content: imageSrc,
    },
    {
      name: `twitter:domain`,
      content: `mattboldt.com`,
    },
    {
      name: `keywords`,
      content: keywords,
    },
  ].concat(meta)

  // When using Gatsby's Head API, we don't need fragments or html tag
  // Gatsby will automatically place these elements in the document head
  return (
    <>
      <title>{title} | {site.siteMetadata.title}</title>
      {allMeta.map((metaItem, i) => (
        <meta key={i} {...metaItem} />
      ))}
      <link rel="shortcut icon" href="/favicon.ico" />
    </>
  )
}

Head.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.string,
  title: PropTypes.string.isRequired,
}

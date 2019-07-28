import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Header from '../components/header'
import SEO from '../components/seo'
import PostList from '../components/post-list'
import GeoAnimation from '../components/geo-animation'

const Tagged = ({ data, pageContext }) => {
  console.log(pageContext)
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Header />
      <GeoAnimation />
      <SEO
        title={`Category: ${pageContext.category}`}
        description={''}
        keywords={pageContext.category}
      />

      <header className="container text-center mx-auto max-w-5xl px-1">
        <h1 className="font-bold break-normal mb-1 text-3xl md:text-5xl">
          Tag: {pageContext.category}
        </h1>
      </header>

      <div className="post-heading container mx-auto max-w-2xl px-1 py-6">
        <PostList posts={posts} />
      </div>
    </Layout>
  )
}

export default Tagged

export const pageQuery = graphql`
  query taggedQuery($categoryRegExp: String!) {
    allMarkdownRemark(
      filter: {
        fields: {
          categories: { regex: $categoryRegExp }
          unlisted: { ne: true }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

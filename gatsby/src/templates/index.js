import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import Header from '../components/header'
import PostList from '../components/post-list'
import GeoAnimation from '../components/geo-animation'

const IndexPage = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/' : `/page/${currentPage - 1}`
  const nextPage = `/page/${currentPage + 1}`

  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO
        title="Home"
        description="Ruby on Rails, JavaScript, and CSS tutorials, demos, and articles."
        keywords={'rails, ruby, javascript, react, tutorials'}
      />
      <Header />

      <GeoAnimation />

      <div className="container mx-auto max-w-3xl px-4">
        <header className="py-6">
          <div className="flex items-center">
            <div className="w-2/3 pr-3">
              <h1 className="leading-tight text-5xl">Matt Boldt</h1>
              <p className="text-grey-darkest text-lg">
                Ruby &amp; JavaScript developer from Texas. <br />I make
                software, beats, and synth patches.
              </p>
            </div>
            <div className="w-1/3">
              <Image />
            </div>
          </div>
        </header>

        <div className="py-6">
          <PostList posts={posts} />
        </div>

        <ul className="list-none flex">
          <li className="flex-1 mr-2">
            {!isFirst && (
              <Link
                to={prevPage}
                rel="previous"
                className="text-center block border border-white rounded hover:border-grey-lighter text-blue hover:bg-grey-lighter py-2 px-4"
              >
                &larr; Previous Page
              </Link>
            )}
          </li>
          <li className="flex-1 mr-2">
            {!isLast && (
              <Link
                to={nextPage}
                rel="next"
                className="text-center block border border-white rounded hover:border-grey-lighter text-blue hover:bg-grey-lighter py-2 px-4"
              >
                Next Page &rarr;
              </Link>
            )}
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { unlisted: { ne: true } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            desc
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

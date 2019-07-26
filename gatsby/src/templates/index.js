import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import Header from '../components/header'

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

      <div className="container mx-auto max-w-2xl px-4">
        <header className="py-6">
          <div className="flex items-center">
            <div className="w-full sm:w-2/3 pr-3">
              <h1 className="leading-tight">Matt Boldt</h1>
              <p className="text-grey-darkest text-lg">
                Ruby &amp; JavaScript developer from Texas. <br />I make beats,
                synth patches, and coffee tables.
              </p>
              <hr />
              <p>
                <Link to="/demos" className="mr-2">
                  Demos
                </Link>
                <Link to="/me" className="mr-2">
                  About
                </Link>
              </p>
            </div>
            <div className="w-full sm:w-1/3">
              <Image />
            </div>
          </div>
        </header>

        <div className="py-6">
          <ul className="base-list">
            {posts.map(({ node }, i) => (
              <li key={i} className="py-4">
                <Link to={node.fields.slug}>
                  <strong>{node.frontmatter.title}</strong>
                </Link>
                <p
                  className="pt-1"
                  dangerouslySetInnerHTML={{ __html: node.frontmatter.desc }}
                />
                <p className="text-gray-500 text-sm italic">
                  {node.frontmatter.date}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <ul className="list-none flex">
          <li className="flex-1 mr-2">
            {!isFirst && (
              <Link
                to={prevPage}
                rel="previous"
                className="text-center block border border-white rounded hover:border-grey-lighter text-blue hover:bg-grey-lighter py-2 px-4">
                &larr; Previous Page
              </Link>
            )}
          </li>
          <li className="flex-1 mr-2">
            {!isLast && (
              <Link
                to={nextPage}
                rel="next"
                className="text-center block border border-white rounded hover:border-grey-lighter text-blue hover:bg-grey-lighter py-2 px-4">
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
            unlisted
          }
        }
      }
    }
  }
`

import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import Header from '../components/header'
import SEO from '../components/seo'

const Tagged = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={this.props.location}>
      <Header />
      <SEO
        title={`Category: ${pageContext.category}`}
        description={''}
        keywords={pageContext.category}
      />

      <div className="post-heading container mx-auto max-w-lg py-6">
        <ul className="base-list">
          {posts.map(({ node }, i) => (
            <li key={i} className="px-2 py-4">
              <Link to={node.fields.slug}>
                <strong>
                  {node.frontmatter.title} ({node.frontmatter.date})
                </strong>
              </Link>
              <p dangerouslySetInnerHTML={{ __html: node.frontmatter.desc }} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default Tagged

export const pageQuery = graphql`
  query taggedQuery($category: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { categories: { regex: $category } } }
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

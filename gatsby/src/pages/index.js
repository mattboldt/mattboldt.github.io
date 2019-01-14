import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = ({ data, pageContext }) => {
  console.log(pageContext)
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <div className="flex items-center">
        <div className="w-2/3">
          <h1 className="font-semibold text-5xl">Matt Boldt</h1>
          <p className="text-grey-darkest text-lg">
            Ruby &amp; JavaScript developer from Texas. <br />
            I make beats, synth patches, and coffee tables.
          </p>
        </div>
        <div className="w-1/3">
          <Image />
        </div>
      </div>


      <div className="cf ph2-ns">
        <Link to="/page-2/">Go to page 2</Link>
      </div>

      <ul>
        {posts.map((post, i) => {
          return <li key={i}><a href={post.node.fields.slug}>{post.node.frontmatter.title}</a></li>
        })}
      </ul>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
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

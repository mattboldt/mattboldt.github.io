import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = ({ data, pageContext }) => {
  console.log(pageContext)
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO
        title="Matt Boldt Writes Ruby"
        description="Ruby on Rails, JavaScript, and CSS tutorials, demos, and articles."
        keywords="rails, ruby, javascript, react, tutorials"/>

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
          return <li key={i}>
            <Link to={post.node.fields.slug}>{post.node.frontmatter.title} ({post.node.frontmatter.date})</Link>
          </li>
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

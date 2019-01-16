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

      <header className="container mx-auto max-w-xl py-6">
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
      </header>

      <div className="post-heading container mx-auto max-w-lg py-6">
        <ul class="base-list">
          {posts.map((post, i) => {
            return <li key={i} className="px-2 py-4">
              <Link to={post.node.fields.slug}>
                <strong>{post.node.frontmatter.title} ({post.node.frontmatter.date})</strong>
              </Link>
              <p>{post.node.frontmatter.desc}</p>
            </li>
          })}
        </ul>
      </div>
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
            desc
          }
        }
      }
    }
  }
`

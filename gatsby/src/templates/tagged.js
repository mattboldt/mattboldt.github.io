import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import Header from '../components/header'
import SEO from '../components/seo'

class Tagged extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const { previous, next } = this.props.pathContext;

    return (
      <Layout location={this.props.location}>
        <Header />
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.desc}
          keywords={post.frontmatter.categories} />

        <ul className="list-reset flex">
          <li className="flex-1 mr-2">
            {previous && <Link
              to={previous.fields.slug}
              rel="previous"
              className="text-center block border border-white rounded hover:border-grey-lighter text-blue hover:bg-grey-lighter py-2 px-4">
              &larr; {previous.frontmatter.title}
            </Link>}
          </li>
          <li className="flex-1 mr-2">
            {next && <Link
              to={next.fields.slug}
              rel="next"
              className="text-center block border border-white rounded hover:border-grey-lighter text-blue hover:bg-grey-lighter py-2 px-4">
              {next.frontmatter.title} &rarr;
            </Link>}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default Tagged;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        categories
        desc
      }
    }
  }
`

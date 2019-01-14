import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

class BlogPost extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;

    return (
      <Layout location={this.props.location}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.desc}
          keywords={post.frontmatter.categories} />
        <article>
          <header>
            <span className="fw3 gray f5">{post.frontmatter.date}</span>
            <h1 className="f3 fw3 f2-m fw2-m f1-l fw2-l mv1 db title-gradient">
              {post.frontmatter.title}{' '}
            </h1>
            <span className="f6 moon-gray">
              {post.frontmatter.categories}
            </span>
            <hr className="mv4 bb b--black-10" />
          </header>
          <section>
            <div
              className="post__body"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </section>
        </article>
      </Layout>
    )
  }
}

export default BlogPost;

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

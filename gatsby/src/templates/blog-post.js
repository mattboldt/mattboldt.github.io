import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import Header from '../components/header'
import SEO from '../components/seo'
import Disqus from 'disqus-react'
import {
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share'

class BlogPost extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next, categories } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <Header />
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.desc}
          keywords={post.fields.categories}
        />

        <article>
          <header className="container text-center mx-auto max-w-5xl px-1">
            <h1 className="font-bold break-normal mb-1 text-3xl md:text-5xl">
              {post.frontmatter.title}
            </h1>

            <i className="text-lg text-gray-600 mt-1 py-0 font-bold">
              {post.frontmatter.date}
            </i>
          </header>

          <section className="container mx-auto px-4 py-4 max-w-3xl">
            <div className="mw8 center ph3-ns">
              <div className="sm:flex">
                <div className="sm:w-2/3 mb-1">
                  <p className="text-sm">
                    {categories.map(cat => (
                      <Link
                        className="mr-2 uppercase"
                        key={`cat-${cat.name}`}
                        to={`/categories/${cat.slug}`}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </p>
                </div>
                <div className="flex sm:w-1/3 mb-1 justify-end">
                  <TwitterShareButton
                    url={this.props.location.href}
                    title={post.frontmatter.title}
                    via="atmattb"
                  >
                    <TwitterIcon size={32} round={true} />
                  </TwitterShareButton>
                  <EmailShareButton
                    className="pl-1"
                    url={this.props.location.href}
                  >
                    <EmailIcon size={32} round={true} />
                  </EmailShareButton>
                </div>
              </div>
              <hr />
              <div
                className="post-body"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </section>
        </article>

        <ul className="container mx-auto max-w-2xl list-none flex text-center">
          <li className="flex-1 mr-2">
            {previous && (
              <Link to={previous.fields.slug} rel="previous">
                &larr; {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li className="flex-1 mr-2">
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} &rarr;
              </Link>
            )}
          </li>
        </ul>

        <section className="container mx-auto max-w-3xl my-6 px-4">
          <Disqus.DiscussionEmbed
            shortname="mattboldt"
            config={{
              url: this.props.location.href,
              title: post.frontmatter.title,
            }}
          />
        </section>
      </Layout>
    )
  }
}

export default BlogPost

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        categories
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        desc
      }
    }
  }
`

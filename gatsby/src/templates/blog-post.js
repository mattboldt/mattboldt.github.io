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
  EmailIcon
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
          <header className="post-heading container mx-auto max-w-xl">
            <h1>{post.frontmatter.title}</h1>
          </header>
          <section className="container mx-auto px-4 py-4 max-w-lg">
            <div className="mw8 center ph3-ns text-lg">
              <div className="post-details flex mb-4">
                <div className="w-2/3">
                  <p className="text-base">{post.frontmatter.date}</p>
                  <p className="text-sm">
                    {categories.map(cat => (
                      <Link
                        className="pr-2"
                        key={`cat-${cat.name}`}
                        to={`/categories/${cat.slug}`}>
                        {cat.name}
                      </Link>
                    ))}
                  </p>
                </div>
                <div className="w-1/3">
                  <TwitterShareButton
                    className="float-right pl-1"
                    url={this.props.location.href}
                    title={post.frontmatter.title}
                    via="atmattb">
                    <TwitterIcon size={32} round={true} />
                  </TwitterShareButton>
                  <EmailShareButton
                    className="float-right pl-1"
                    url={this.props.location.href}>
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

        <ul className="container mx-auto max-w-lg list-reset flex">
          <li className="flex-1 mr-2">
            {previous && (
              <Link
                to={previous.fields.slug}
                rel="previous"
                className="text-center block border border-white rounded hover:border-grey-lighter text-blue hover:bg-grey-lighter py-2 px-4">
                &larr; {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li className="flex-1 mr-2">
            {next && (
              <Link
                to={next.fields.slug}
                rel="next"
                className="text-center block border border-white rounded hover:border-grey-lighter text-blue hover:bg-grey-lighter py-2 px-4">
                {next.frontmatter.title} &rarr;
              </Link>
            )}
          </li>
        </ul>

        <section className="container mx-auto max-w-lg mt-6">
          <Disqus.DiscussionEmbed
            shortname="mattboldt"
            config={{
              url: this.props.location.href,
              title: post.frontmatter.title
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

import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import Header from '../components/header'
import SEO from '../components/seo'
import { DiscussionEmbed } from 'disqus-react';

class BlogPost extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const { previous, next } = this.props.pathContext;
    const disqusShortname = "yourdisqusshortname";
    const disqusConfig = {
      identifier: post.id,
      title: post.frontmatter.title,
    };

    return (
      <Layout location={this.props.location}>
        <Header />
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.desc}
          keywords={post.frontmatter.categories} />

            <article>
              <header className="post-heading container mx-auto max-w-xl">
                <h1>{post.frontmatter.title}</h1>
              </header>
              <section className="container mx-auto px-4 py-4 max-w-lg">

                <div className="mw8 center ph3-ns leading-normal text-lg">
                  <div className="post-details">
                    <p className="text-base">{post.frontmatter.date}</p>
                    <p className="text-sm">{post.frontmatter.categories}</p>
                  </div>
                  <hr/>
                  <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>
              </section>
            </article>

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

            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
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

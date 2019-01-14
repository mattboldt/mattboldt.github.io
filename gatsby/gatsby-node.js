// const _ = require(`lodash`)
const path = require(`path`)
const slash = require(`slash`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// const LodashModuleReplacementPlugin = require(`lodash-webpack-plugin`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  // const tagPagesTemplate = path.resolve(`src/templates/template-tag-page.js`)
  return graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                categories
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    result.data.allMarkdownRemark.edges.forEach(edge => {
      createPage({
        path: edge.node.fields.slug, // required
        component: slash(blogPostTemplate),
        context: {
          slug: edge.node.fields.slug,
          highlight: edge.node.frontmatter.highlight,
          shadow: edge.node.frontmatter.shadow,
        },
      })
    })

    // Create tag pages.
    // let tags = []
    // result.data.allMarkdownRemark.edges.forEach(edge => {
    //   if (_.get(edge, `node.frontmatter.tags`)) {
    //     tags = tags.concat(edge.node.frontmatter.tags)
    //   }
    // })
    // tags = _.uniq(tags)
    // tags.forEach(tag => {
    //   const tagPath = `/tags/${_.kebabCase(tag)}/`
    //   createPage({
    //     path: tagPath,
    //     component: tagPagesTemplate,
    //     context: {
    //       tag,
    //     },
    //   })
    // })
  })
}

// Add custom url pathname for blog posts.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `File`) {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split(`---`)[1]}/`
    createNodeField({ node, name: `slug`, value: slug })
  } else if (
    node.internal.type === `MarkdownRemark` &&
    typeof node.slug === `undefined`
  ) {
    const slug = createFilePath({ node, getNode, basePath: `pages/posts` });
    const [, date, title] = slug.match(/^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/);

    let value = ``;
    // if post is using the old url structure
    if (node.frontmatter.permalink === '/:title/') {
      value = `/${title}/`;
    } else {
      value = `/${date.split('-').join('/')}/${title}/`;
    }

    createNodeField({
      node,
      name: `slug`,
      value: value,
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}/`
      )
      createNodeField({ node, name: `tagSlugs`, value: tagSlugs })
    }
  }
}

// Sass and Lodash.
// exports.onCreateWebpackConfig = ({ stage, actions }) => {
//   switch (stage) {
//     case `build-javascript`:
//       actions.setWebpackConfig({
//         plugins: [new LodashModuleReplacementPlugin()],
//       })
//   }
// }

const _ = require(`lodash`)
const LodashModuleReplacementPlugin = require(`lodash-webpack-plugin`)
const path = require(`path`)
const slash = require(`slash`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const createPaginatedPages = require("gatsby-paginate")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  const catPagesTemplate = path.resolve(`src/templates/tagged.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                categories
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
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }
    const posts = result.data.allMarkdownRemark.edges;

    // Create blog posts pages.
    posts.forEach(({ node }, index) => {
      const previous = index === 0 ? false : posts[index - 1].node;
      const next = index === posts.length - 1 ? false : posts[index + 1].node;

      createPage({
        path: node.fields.slug, // required
        component: slash(blogPostTemplate),
        context: {
          slug: node.fields.slug,
          previous: previous,
          next: next,
        },
      })
    })

    createPaginatedPages({
      edges: posts,
      createPage: createPage,
      pageTemplate: `src/templates/index.js`,
      pageLength: 8, // This is optional and defaults to 10 if not used
      context: {} // This is optional and defaults to an empty object if not used
    })

    // Create tag pages.
    let categories = []
    posts.forEach(edge => {
      if (_.get(edge, `node.fields.categories`)) {
        categories = categories.concat(edge.node.fields.categories)
      }
    })

    _.uniq(categories).forEach((cat) => {
      const catPath = `/categories/${_.kebabCase(cat)}/`
      createPage({
        path: catPath,
        component: catPagesTemplate,
        context: { cat },
      });
    })
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

    let newSlug = ``;
    // if post is using the old url structure
    if (node.frontmatter.permalink === '/:title/') {
      newSlug = `/${title}/`;
    } else {
      newSlug = `/${date.split('-').join('/')}/${title}/`;
    }

    createNodeField({ node, name: `slug`, value: newSlug });

    const categories = node.frontmatter.categories.split(',').map((s) => s.trim());
    createNodeField({ node, name: `categories`, value: categories });

    // if (categories) {
    //   const tagSlugs = categories.map(
    //     tag => `/tags/${_.kebabCase(tag)}/`
    //   )
    //   createNodeField({ node, name: `tagSlugs`, value: tagSlugs })
    // }
  }
}

// Sass and Lodash.
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  switch (stage) {
    case `build-javascript`:
      actions.setWebpackConfig({
        plugins: [new LodashModuleReplacementPlugin()],
      })
  }
}

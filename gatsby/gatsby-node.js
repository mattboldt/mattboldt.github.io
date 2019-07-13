const _ = require(`lodash`)
const LodashModuleReplacementPlugin = require(`lodash-webpack-plugin`)
const path = require(`path`)
const slash = require(`slash`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const query = `
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

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(query).then(result => {
    if (result.errors) {
      throw result.errors
    }
    const posts = result.data.allMarkdownRemark.edges

    // Create blog posts pages.
    posts.forEach(({ node }, index) => {
      const previous = index === 0 ? false : posts[index - 1].node
      const next = index === posts.length - 1 ? false : posts[index + 1].node

      createPage({
        path: node.fields.slug, // required
        component: slash(path.resolve(`src/templates/blog-post.js`)),
        context: {
          slug: node.fields.slug,
          previous: previous,
          next: next
        }
      })
    })

    const postsPerPage = 6
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/page/${i + 1}`,
        component: path.resolve(`src/templates/index.js`),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        }
      })
    })

    // Create tag pages.
    let categories = []
    posts.forEach(edge => {
      if (_.get(edge, `node.fields.categories`)) {
        categories = categories.concat(edge.node.fields.categories.split(','))
      }
    })

    _.uniq(categories).forEach(category => {
      createPage({
        path: `/categories/${_.kebabCase(category)}/`,
        component: path.resolve(`src/templates/tagged.js`),
        context: { category: RegExp(`/${category}/g`) }
      })
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
    const slug = createFilePath({ node, getNode, basePath: `pages/posts` })
    const [, date, title] = slug.match(
      /^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
    )

    let newSlug = ``
    // if post is using the old url structure
    if (node.frontmatter.permalink === '/:title/') {
      newSlug = `/${title}/`
    } else {
      newSlug = `/${date.split('-').join('/')}/${title}/`
    }

    createNodeField({ node, name: `slug`, value: newSlug })

    const categories = node.frontmatter.categories
      .split(',')
      .map(s => s.trim())
      .join(',')
    createNodeField({ node, name: `categories`, value: categories })

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
        plugins: [new LodashModuleReplacementPlugin()]
      })
  }
}

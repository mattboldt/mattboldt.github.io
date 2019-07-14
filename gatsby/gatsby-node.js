const _ = require(`lodash`),
  LodashModuleReplacementPlugin = require(`lodash-webpack-plugin`),
  path = require(`path`),
  slash = require(`slash`)

const { createFilePath } = require(`gatsby-source-filesystem`)
const { slugify, convertFilePathToObject, pageParser } = require(`./utils`)

const pagesQuery = `
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

  return graphql(pagesQuery).then(result => {
    if (result.errors) {
      throw result.errors
    }
    const posts = result.data.allMarkdownRemark.edges

    // Home page
    const postsPerPage = 6
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/page/${i + 1}`,
        component: slash(path.resolve(`src/templates/index.js`)),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        }
      })
    })

    let allCategories = []

    // Blog posts
    posts.forEach(({ node }, index) => {
      const { previous, next, categories } = pageParser(
        posts,
        node,
        index,
        allCategories
      )

      createPage({
        path: node.fields.slug, // required
        component: slash(path.resolve(`src/templates/blog-post.js`)),
        context: {
          slug: node.fields.slug,
          previous: previous,
          next: next,
          categories: categories
        }
      })
    })

    // Category indexes
    _.uniq(allCategories).forEach(category => {
      createPage({
        path: `/categories/${slugify(category)}/`,
        component: slash(path.resolve(`src/templates/tagged.js`)),
        context: {
          category: category,
          categoryRegExp: `/${category}/g`
        }
      })
    })
  })
}

// Add custom url pathname for blog posts.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // // Static page
  // if (node.internal.type === `File`) {
  //   const parsedFilePath = path.parse(node.absolutePath)
  //   const slug = `/${parsedFilePath.dir.split(`---`)[1]}/`

  //   createNodeField({ node, name: `slug`, value: slug })
  // }

  // Blog post
  if (
    node.internal.type === `MarkdownRemark` &&
    typeof node.slug === `undefined`
  ) {
    const path = createFilePath({ node, getNode, basePath: `pages/posts` })
    const { date, title } = convertFilePathToObject(path)

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

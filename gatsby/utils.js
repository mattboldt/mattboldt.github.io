const _ = require(`lodash`)

slugify = string => {
  const a =
    'àáäâãåăæąçćčđďèéěėëêęǵḧìíïîįłḿǹńňñòóöôœøṕŕřßśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
  const b =
    'aaaaaaaaacccddeeeeeeeghiiiiilmnnnnooooooprrssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
exports.slugify = slugify

// Convert `2019-01-07-rails-and-graphql.markdown` to date & slug objects
exports.convertFilePathToObject = path => {
  const [, date, title] = path.match(/^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/)
  return { date, title }
}

exports.pageParser = (posts, post, index, allCategories) => {
  const previous = index === 0 ? false : posts[index - 1].node
  const next = index === posts.length - 1 ? false : posts[index + 1].node
  let categories = []

  if (_.get(post, `fields.categories`)) {
    categories = post.fields.categories.split(',').map(c => {
      const name = c.trim()
      allCategories.push(name)

      return {
        name: name,
        slug: slugify(name)
      }
    })
  }

  return {
    previous,
    next,
    categories
  }
}

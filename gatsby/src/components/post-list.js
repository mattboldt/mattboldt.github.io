import React from 'react'
import { Link } from 'gatsby'

const PostList = props => {
  return (
    <ul className="base-list">
      {props.posts.map(({ node }, i) => (
        <li key={i} className="py-4">
          <Link to={node.fields.slug}>
            <strong>{node.frontmatter.title}</strong>
          </Link>
          <p
            className="pt-1 pb-0"
            dangerouslySetInnerHTML={{ __html: node.frontmatter.desc }}
          />
          <span className="text-gray-500 text-sm italic">
            {node.frontmatter.date}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default PostList

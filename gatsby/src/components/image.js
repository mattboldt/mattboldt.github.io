import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "avatar.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 300)
        }
      }
    }
  `)

  const image = getImage(data.placeholderImage)

  return (
    <GatsbyImage
      image={image}
      alt="Avatar"
      className="border-4 border-grey-dark image-tag bg-black"
    />
  )
}
export default Image

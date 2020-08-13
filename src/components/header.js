import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Img from "gatsby-image"
import { useCart } from 'react-use-cart'

const Header = () => {
  const { totalItems } = useCart()

  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "Mega_Text.png" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  
  return (
  <header>
      <h1>
        <Link
          to="/"
        >
        <Img fluid={data.placeholderImage.childImageSharp.fluid} />
      </Link>
      </h1>
      <p><Link to="/cart">Cart [{totalItems}]</Link></p>
  </header>
)
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

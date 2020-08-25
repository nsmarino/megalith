import { Link,
  //  graphql, useStaticQuery
   } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { useCart } from 'react-use-cart'

import styled from "@emotion/styled"

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: inherit;
    text-decoration: none;
  }

  p:hover {
    background: repeating-linear-gradient(
      -45deg,
      #dbc7cb,
      #dbc7cb 5px,
      white 5px,
      white 6px
    );
  ;
  }

  h1 {
    font-family: Megalith-Regular;
    font-weight: 400;
    font-size: 4rem;
    margin: 0;
  }
`

const Header = () => {
  const { totalItems } = useCart()
  
  return (
  <StyledHeader>
      <h1>
        <Link to="/">
        MegalitH
      </Link>
      </h1>
      <p><Link to="/cart">Cart [{totalItems}]</Link></p>
  </StyledHeader>
)
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

// reference:
  // const data = useStaticQuery(graphql`
  //   query {
  //     placeholderImage: file(relativePath: { eq: "Mega_Text.png" }) {
  //       childImageSharp {
  //         fluid(maxWidth: 800, quality: 100) {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //   }
  // `)

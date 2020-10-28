import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import 'react-toastify/dist/ReactToastify.css';

import styled from "@emotion/styled"

const StyledProductCardDiv = styled.div`
  margin: 2rem;
  display: flex;
  border: 1px solid black;
  flex-direction: column;
  align-items: center;

  .productImage {
    min-width: 10rem;
  }

  @media (max-width: 600px) {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`

const ProductCard = ({ product }) => {
    return (
      <Link to={`/products/${product.id}`}>  
      <StyledProductCardDiv>

        <Img 
          fluid={product.gatsbyImage.node.childImageSharp.fluid} 
          alt={product.name} 
          className="productImage"
        />

        <p> ${product.variants[0].retail_price}</p>

      </StyledProductCardDiv>
    </Link>
  )
}

export default ProductCard
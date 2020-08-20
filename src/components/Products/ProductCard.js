import React, { useState } from 'react'
import { useCart } from 'react-use-cart'
import Img from 'gatsby-image'

import VariantSelect from './VariantSelect'

import styled from "@emotion/styled"

const StyledProductInfoDiv = styled.div`
`

const StyledNumberInput = styled.input`
  display: block;
  background: #dbc7cb;
  border: 1px solid black;
  width: 4rem;
`

const StyledSubmitButton = styled.button`
  background: black;
  border: none;
  color: #dbc7cb;
  border-radius: 5px;

`


const ProductCard = ({ product }) => {
  const { addItem } = useCart()

  // Local state
  const [variant, setVariant] = useState(product.variants[0].id)
  const [quantity, setQuantity] = useState(1)

  const selectVariant = (e) => {
    setVariant(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const matchingVariant = product.variants.find(item=>item.id === variant)
    const item = { ...matchingVariant, price: matchingVariant.retail_price*100}
    addItem(item, quantity)
  }

  return (
      <div style={{display: 'flex'}}>
        <Img fluid={product.gatsbyImage.node.childImageSharp.fluid} alt={product.name} style={{width: '300px',}}/>

        <StyledProductInfoDiv>
          <h2>{product.name}</h2>
          <p>${product.variants[0].retail_price}</p>
          <form onSubmit={handleSubmit}>
          <VariantSelect selection={variant} variants={product.variants} productName={product.name} handleChange={selectVariant} />

          <StyledNumberInput type="number" id="quantity" name="quantity"
      min="1" max="10" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value,10))} />
          <StyledSubmitButton type="submit">add to cart</StyledSubmitButton>
          </form>
        </StyledProductInfoDiv>
      </div>
  )
}

export default ProductCard
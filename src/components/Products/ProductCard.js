import React, { useState } from 'react'
import { useCart } from 'react-use-cart'
import Img from 'gatsby-image'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import 'react-toastify/dist/ReactToastify.minimal.css';

import VariantSelect from './VariantSelect'
import StyledButton from '../StyledButton'

import styled from "@emotion/styled"

const StyledProductInfoDiv = styled.div`
  margin: 2rem;
  display: flex;
  font-size: 1.25rem;
  flex-direction: column;
  align-items: center;
`
const StyledNumberInput = styled.input`
  font-family: Computer Modern;
  font-size: 1.25rem;
  width: 2.5rem;
  height: 1.25rem;
  background: #dbc7cb;
  border: 1px solid black;

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
    const item = { ...matchingVariant, price: matchingVariant.retail_price*100, gatsbyImage: product.gatsbyImage}
    addItem(item, quantity)
    toast(`Added ${item.name} to Cart`);  
    }

  return (
      <div style={{margin: '2rem', display: 'flex', alignItems: 'center'}}>
        <Img fluid={product.gatsbyImage.node.childImageSharp.fluid} alt={product.name} style={{width: '300px',}}/>

        <StyledProductInfoDiv>
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >

            <VariantSelect 
              selection={variant} 
              variants={product.variants} 
              productName={product.name} 
              handleChange={selectVariant} 
            />
            <p>
            <StyledNumberInput 
              type="number" 
              id="quantity" 
              name="quantity"
              min="1" max="10" 
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value,10))} 
            />

            <span> ${product.variants[0].retail_price}</span>
            </p>
            
            <StyledButton type="submit">Add to Cart</StyledButton>
          </form>
        </StyledProductInfoDiv>
      </div>
  )
}

export default ProductCard
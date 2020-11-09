import React, { useState } from 'react'
import { graphql } from "gatsby"
import { useCart } from 'react-use-cart'
import Img from 'gatsby-image'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Layout from '../components/layout'
import VariantSelect from '../components/Products/VariantSelect'
import StyledButton from '../components/StyledButton'

import styled from "@emotion/styled"

const StyledProductCardDiv = styled.div`
  margin: 2rem;
  display: flex;
  align-items: center;

  .productImage {
    min-width: 10rem;
  }

  @media (max-width: 600px) {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`

const StyledProductInfoDiv = styled.div`
  margin: 2rem;
  display: flex;
  font-size: 1.25rem;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    margin: 0.5rem;
  }
`

const StyledNumberInput = styled.input`
  font-family: Computer Modern;
  font-size: 1.25rem;
  width: 2.5rem;
  height: 1.25rem;
  background: #dbc7cb;
  border: 1px solid black;

`


const ProductTemplate = ({ pageContext, data }) => {
  const product = pageContext
  product.gatsbyImage = data.allFile.edges[0]
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
      <Layout>
      <StyledProductCardDiv>
        <Img 
          fluid={product.gatsbyImage.node.childImageSharp.fluid} 
          alt={product.name} 
          className="productImage"
        /> 

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
            <StyledButton type="submit" cy="btn">Add to Cart</StyledButton>
          </form>
        </StyledProductInfoDiv>
      </StyledProductCardDiv>
      </Layout>
  )
}

export default ProductTemplate

export const query = graphql`
  query imageQuery($id: String) {
    allFile(filter: {extension: {regex: "/(png)/"}, relativeDirectory: {eq: "productImages"}, name: {eq: $id}}) {
      edges {
        node {
          base
            childImageSharp {
              fluid(maxWidth: 800, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      } 
    }
  `
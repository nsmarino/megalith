import React from 'react'
import { graphql } from "gatsby"
import { useForm } from 'react-hook-form'
import { useCart } from 'react-use-cart'
import Img from 'gatsby-image'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Layout from '../components/layout'
import StyledButton from '../components/StyledButton'
import VariantRadios from '../components/Products/VariantRadios'
import QuantityInput from '../components/Products/QuantityInput'

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
    flex-direction: column;
  }
`
const StyledProductInfoDiv = styled.div`
  margin: 2rem;
  display: flex;
  font-size: 1.25rem;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 600px) {
    margin: 0.5rem;
  }
`

const ProductTemplate = ({ pageContext, data }) => {
  const product = pageContext

  console.log(product)

  product.gatsbyImage = data.allFile.edges[data.allFile.edges.length-1]
  const { register, handleSubmit, watch, getValues, setValue } = useForm({
    defaultValues: {
      quantity: 1,
      variant: product.variants[0].id
    }
  });

  const { addItem } = useCart()

  const onSubmit = ({variant, quantity}) => {
    const matchingVariant = product.variants.find(item=>item.id === variant) || product.variants[0]
    const item = { ...matchingVariant, price: matchingVariant.retail_price*100, gatsbyImage: product.gatsbyImage}
    addItem(item, parseInt(quantity,10))
    toast(`Added ${item.name} to Cart`);  
}

  return (
    <Layout>
      <h2 style={{textAlign: 'center'}}>{product.name}</h2>
      <p style={{textAlign: 'center'}}>${product.variants[0].retail_price}</p>


      <StyledProductCardDiv>
        <Img 
          fluid={product.gatsbyImage.node.childImageSharp.fluid} 
          alt={product.name} 
          className="productImage"
        /> 

        <StyledProductInfoDiv>
          <form onSubmit={handleSubmit(onSubmit)}>
            {product.variants.length > 1 && 
              <VariantRadios 
                variants={product.variants} 
                register={register}
                currentValue={watch('variant')} 
              />
            }
            <QuantityInput 
              register={register}
              getValues={getValues}
              setValue={setValue}
              name="quantity"
            />            
            <StyledButton type="submit" cy="btn">Add to Cart</StyledButton>
          </form>
        </StyledProductInfoDiv>
      </StyledProductCardDiv>
    </Layout>
  )
}

export default ProductTemplate

// Gatsby GraphQL query for fluid product image
// Note use of id variable
export const query = graphql`
  query imageQuery($id: String) {
    allFile(filter: {
      extension: {regex: "/(png)/"}
      relativeDirectory: {regex: "/productImages/"}
      name: {eq: $id}
    }) {
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
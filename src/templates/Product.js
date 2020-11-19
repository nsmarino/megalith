import React from 'react'
import { graphql } from "gatsby"
import { useForm } from 'react-hook-form'
import { useCart } from 'react-use-cart'
import Img from 'gatsby-image'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Layout from '../components/layout'
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
    flex-direction: column;
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


const VariantRadios = ({ variants, register }) => {

  const displayVariants = () => variants.map(variant => 
    <label htmlFor={variant.id} key={variant.id}>
      <input
        type="radio" 
        ref={register} 
        name="variant" 
        id={variant.id}
        value={variant.id}
      />{variant.name}
    </label>
    )
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {displayVariants()}
    </div>
  )
}
const QuantityInput = ({ register, getValues, setValue, name }) => {

  const handleMinus = (e) => {
    e.preventDefault()
    const value = parseInt(getValues(`${name}`),10)
    setValue(`${name}`, value > 1 ? value - 1 : 1)
    }
  
  const handlePlus = (e) => {
    e.preventDefault()
    const value = parseInt(getValues(`${name}`),10)
    setValue(`${name}`, value < 25 ? value + 1 : 25)
  }

  return (
  <div>
    <button onClick={handleMinus}>-</button>
    <input type="number" name={name} ref={register({ required: true })} />
    <button onClick={handlePlus}>+</button>
  </div>
  )
}

const ProductTemplate = ({ pageContext, data }) => {
  const product = pageContext
  console.log(product)

  product.gatsbyImage = data.allFile.edges[0]
  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      quantity: 1,
      variant: product.variants[0].id
    }
  });

  const { addItem } = useCart()

  const onSubmit = ({variant, quantity}) => {
    const matchingVariant = product.variants.find(item=>item.id === variant)
    const item = { ...matchingVariant, price: matchingVariant.retail_price*100, gatsbyImage: product.gatsbyImage}
    addItem(item, parseInt(quantity,10))
    toast(`Added ${item.name} to Cart`);  
}

  // const handleSubmit = (e) => {
  //   e.preventDefault()  
  //   const matchingVariant = product.variants.find(item=>item.id === variant)
  //   const item = { ...matchingVariant, price: matchingVariant.retail_price*100, gatsbyImage: product.gatsbyImage}
  //   addItem(item, quantity)
  //   toast(`Added ${item.name} to Cart`);  
  //   }

  return (
    <Layout>
      <h2 style={{textAlign: 'center'}}>{product.name}</h2>

      <StyledProductCardDiv>
        <Img 
          fluid={product.gatsbyImage.node.childImageSharp.fluid} 
          alt={product.name} 
          className="productImage"
        /> 

        <StyledProductInfoDiv>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VariantRadios variants={product.variants} register={register} />
            
            <QuantityInput 
              register={register}
              getValues={getValues}
              setValue={setValue}
              name="quantity"
            />

            <p>${product.variants[0].retail_price}</p>
            
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

//   import React, { useState } from 'react'
// import { graphql } from "gatsby"
// import { useCart } from 'react-use-cart'
// import Img from 'gatsby-image'
// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';

// import Layout from '../components/layout'
// import VariantSelect from '../components/Products/VariantSelect'
// import StyledButton from '../components/StyledButton'

// import styled from "@emotion/styled"

// const StyledProductCardDiv = styled.div`
//   margin: 2rem;
//   display: flex;
  
//   align-items: center;

//   .productImage {
//     min-width: 10rem;
//   }

//   @media (max-width: 600px) {
//     margin-left: 0.5rem;
//     margin-right: 0.5rem;
//     flex-direction: column;
//   }
// `

// const StyledProductInfoDiv = styled.div`
//   margin: 2rem;
//   display: flex;
//   font-size: 1.25rem;
//   flex-direction: column;
//   align-items: center;

//   @media (max-width: 600px) {
//     margin: 0.5rem;
//   }
// `

// const StyledNumberInput = styled.input`
//   font-family: Computer Modern;
//   font-size: 1.25rem;
//   width: 4rem;
//   height: 2rem;
//   background: #dbc7cb;
//   border: 1px solid black;

// `

// const ProductTemplate = ({ pageContext, data }) => {
//   const product = pageContext
//   console.log(product)

//   product.gatsbyImage = data.allFile.edges[0]
//   const { addItem } = useCart()

//   // Local state
//   const [variant, setVariant] = useState(product.variants[0].id)
//   const [quantity, setQuantity] = useState(1)

//   const selectVariant = (e) => {
//     setVariant(e.target.value)
//   }
//   const handleSubmit = (e) => {
//     e.preventDefault()  
//     const matchingVariant = product.variants.find(item=>item.id === variant)
//     const item = { ...matchingVariant, price: matchingVariant.retail_price*100, gatsbyImage: product.gatsbyImage}
//     addItem(item, quantity)
//     toast(`Added ${item.name} to Cart`);  
//     }

//   return (
//     <Layout>
//       <StyledProductCardDiv>
//         <h2>{product.name}</h2>
//         <Img 
//           fluid={product.gatsbyImage.node.childImageSharp.fluid} 
//           alt={product.name} 
//           className="productImage"
//         /> 

//         <StyledProductInfoDiv>
//           <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >

//             <VariantSelect 
//               selection={variant} 
//               variants={product.variants} 
//               productName={product.name} 
//               handleChange={selectVariant} 
//             />
//             <p>
//             <StyledNumberInput 
//               type="number" 
//               id="quantity" 
//               name="quantity"
//               min="1" max="10" 
//               value={quantity} 
//               onChange={(e) => setQuantity(parseInt(e.target.value,10))} 
//             />

//             <span> ${product.variants[0].retail_price}</span>
//             </p>
//             <StyledButton type="submit" cy="btn">Add to Cart</StyledButton>
//           </form>
//         </StyledProductInfoDiv>
//       </StyledProductCardDiv>
//     </Layout>
//   )
// }

// export default ProductTemplate
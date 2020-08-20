import React from 'react'
import styled from "@emotion/styled"

const StyledSelect = styled.select`
  background: #dbc7cb;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.25rem 2rem 0.25rem 2rem;
`
const VariantSelect = ({ selection, variants, productName, handleChange }) => {
    const displayVariants = () => {
      return variants.map(variant => (
        <option value={variant.id} key={variant.id}>{variant.name}</option>  
      ))
    }
  
    return (
      <StyledSelect name={productName} id={`${productName}-variants`} value={selection} onChange={handleChange} onBlur={handleChange} >
        {displayVariants()}
      </StyledSelect>
    )
  }

export default VariantSelect
import React from 'react'
import styled from "@emotion/styled"

const StyledLabel = styled.label`
  border: 1px solid black;
  background: ${props => props.color};
  display: flex;

  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  margin: 0.25rem;
  input {
      display: none;
  }
  &:hover {
      cursor: pointer;
      border: 1px solid white;
  }

`

const VariantRadios = ({ variants, register, currentValue }) => {
  const displayVariants = () => variants.map(variant => 
      <StyledLabel 
        htmlFor={variant.id} 
        key={variant.id}
        color={currentValue===variant.id ? "white" : ''}
      >
        <input
          type="radio" 
          ref={register} 
          name="variant" 
          id={variant.id}
          value={variant.id}
        />{variant.name.split(' - ')[1]}
      </StyledLabel>
  )

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}
    >
      {displayVariants()}
    </div>
  )
}

export default VariantRadios
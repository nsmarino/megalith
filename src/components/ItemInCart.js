import React from 'react'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

import StyledButton from './StyledButton'

const StyledItemInCartDiv = styled.div`
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: center;

  .itemText {
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      display: block;
      margin: 0rem;
    }
  }
`
const StyledQuantityButton = styled.button`
font-family: Computer Modern;
background: transparent;
font-size: 1.25rem;
border: none;
&:hover {
background: var(--striped-hover);
cursor: pointer;
}
`

const ItemInCart = ({item, removeItem, updateItemQuantity}) => {

    return (
      <StyledItemInCartDiv key={item.id} >
        <Img fluid={item.gatsbyImage.node.childImageSharp.fluid} alt={item.name} style={{width: '50px',}}/>

        <div className="itemText">
          <p>{item.name}</p>
          <p>${item.itemTotal / 100}</p>
        </div>

        <div>
          <StyledQuantityButton 
            onClick={() => 
              item.quantity === 1 ? 
                updateItemQuantity(item.id, item.quantity) 
                : 
                updateItemQuantity(item.id, item.quantity - 1)
            }
          >
            &lt;
          </StyledQuantityButton>
          {item.quantity}
          <StyledQuantityButton onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>&gt;</StyledQuantityButton>
        </div>


        <StyledButton onClick={() => removeItem(item.id)}>Remove</StyledButton>

      </StyledItemInCartDiv>
    )
}

export default ItemInCart

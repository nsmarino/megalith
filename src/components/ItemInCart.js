import React from 'react'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

import StyledButton from './StyledButton'

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
    console.log(item)

    return (
      <div key={item.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Img fluid={item.gatsbyImage.node.childImageSharp.fluid} alt={item.name} style={{width: '50px',}}/>

        <p>{item.name}</p>

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

        <p>${item.itemTotal / 100}</p>

        <StyledButton onClick={() => removeItem(item.id)}>Remove</StyledButton>

      </div>
    )
}

export default ItemInCart

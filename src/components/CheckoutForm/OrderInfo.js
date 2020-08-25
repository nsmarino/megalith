import React from 'react'
import styled from '@emotion/styled'

const StyledInfo = styled.table`
  width: 12rem;
  margin-top: 1rem;

  thead {
    margin-bottom: 1rem;
  }
  
  thead th {
    font-weight: 400;
    font-size: 2rem;
  }

  th {
    font-weight: 400;
    text-align: left;
  }

  td {
    text-align: right;
  }
`
const OrderInfo = ({ subtotal, tax, shipping }) => {
    return (
      <StyledInfo>
        <thead>
          <tr>
            <th colSpan="2">Order</th>
          </tr>   
          </thead>
        <tbody>
        <tr>
          <th>Subtotal:</th><td>${ (subtotal / 100).toFixed(2) }</td>     
        </tr>
        <tr>
          <th>Tax:</th><td>${tax.toFixed(2)}</td>     
        </tr>
        <tr>
          <th>Shipping:</th><td>${shipping.toFixed(2)}</td>     
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <th>Total:</th><td>${((subtotal/100) + tax + shipping).toFixed(2)}</td>     
        </tr>
        </tfoot>
      </StyledInfo>
    )
  }

export default OrderInfo
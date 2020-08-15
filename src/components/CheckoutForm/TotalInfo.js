import React from 'react'

const TotalInfo = ({ subtotal, tax, shipping }) => {
    console.log(subtotal, tax, shipping)
    return (
      <div>
        <p>Sub total: ${ (subtotal / 100).toFixed(2) }</p>
        <p>Tax: ${tax}</p>
        <p>Shipping: ${shipping}</p>
        <p>Total: ${((subtotal/100) + tax + shipping).toFixed(2)}</p>
      </div>
    )
  }

export default TotalInfo
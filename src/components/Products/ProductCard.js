import React, { useState } from 'react'

const VariantSelect = ({ selection, variants, productName, handleChange }) => {

  const displayVariants = () => {
    return variants.map(variant => (
      <option value={variant.id} key={variant.id}>{variant.name}</option>  
    ))
  }
  return (
    <form>
    {/* <label htmlFor={`${productName}-variants`}></label> */}
    <select name={productName} id={`${productName}-variants`} value={selection} onChange={handleChange} onBlur={handleChange} >
      {displayVariants()}
    </select>
    </form>
  )
}

const ProductCard = ({ product }) => {
  const [variant, setVariant] = useState(product.variants[0])
  const [quantity, setQuantity] = useState(1)

  const selectVariant = (e) => setVariant(e.target.value)

  return (
      <div style={{display: 'flex'}}>
        <img src={product.thumbnail_url} alt="random" style={{width: '250px'}}/>
        <div>
          <h2>{product.name}</h2>
          <p>${product.variants[0].retail_price}</p>

          <VariantSelect selection={variant} variants={product.variants} productName={product.name} handleChange={selectVariant} />

          <input type="number" id="quantity" name="quantity"
      min="1" max="10" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <button>add to cart</button>
        </div>
      </div>
  )
}

export default ProductCard
import React, { useState } from 'react'
import { useCart } from 'react-use-cart'

const VariantSelect = ({ selection, variants, productName, handleChange }) => {
  const displayVariants = () => {
    return variants.map(variant => (
      <option value={variant.id} key={variant.id}>{variant.name}</option>  
    ))
  }

  return (
    <select name={productName} id={`${productName}-variants`} value={selection} onChange={handleChange} onBlur={handleChange} >
      {displayVariants()}
    </select>
  )
}

const ProductCard = ({ product }) => {
  // console.log(product)
  const { addItem } = useCart()

  const [variant, setVariant] = useState(product.variants[0].id)
  const [quantity, setQuantity] = useState(1)

  const selectVariant = (e) => {
    setVariant(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const matchingVariant = product.variants.find(item=>item.id === variant)
    const item = { ...matchingVariant, price: matchingVariant.retail_price*100}
    addItem(item, quantity)
  }
  return (
      <div style={{display: 'flex'}}>
        <img src={product.thumbnail_url} alt="random" style={{width: '250px'}}/>
        <div>
          <h2>{product.name}</h2>
          <p>${product.variants[0].retail_price}</p>
          <form onSubmit={handleSubmit}>
          <VariantSelect selection={variant} variants={product.variants} productName={product.name} handleChange={selectVariant} />

          <input type="number" id="quantity" name="quantity"
      min="1" max="10" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <button type="submit">add to cart</button>
          </form>
        </div>
      </div>
  )
}

export default ProductCard
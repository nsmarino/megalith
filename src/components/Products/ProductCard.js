import React from 'react'

const ProductCard = ({ product }) => {
    console.log(product)
    return (
        <div style={{display: 'flex'}}>
          <img src={product.thumbnail_url} alt="random" style={{width: '250px'}}/>
          <div>
            <h2>{product.name}</h2>
            <p>${product.variants[0].retail_price}</p>

            <input type="number" id="tentacles" name="tentacles"
       min="1" max="10" defaultValue="1" />
            <button>add to cart</button>
          </div>
        </div>
    )
}

export default ProductCard
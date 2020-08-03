import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import ProductCard from './ProductCard'

export default () => (
    <StaticQuery 
    query={graphql`
      query ProductQuery {
          products: customServer {
              allProducts {
                  name
                  id
                  thumbnail_url
                  variants {
                      name
                      id
                      retail_price
                      sku
                  }
              }
          }
      }
    `}
    render={({ products }) => (
        products.allProducts.map(product => <ProductCard product={product} key={product.id} />)
    )}
    />
)
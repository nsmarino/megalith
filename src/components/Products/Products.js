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
        images:
          allFile(filter: {extension: {regex: "/(png)/"}, relativeDirectory: {eq: "productImages"}}) {
            edges {
              node {
                base
                childImageSharp {
                  fluid(maxWidth: 800, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
            }
          }
        }
      }
    `}
    render={({ products, images }) => {
      const productsWithImages = products.allProducts.map(
        product => (
          {
            ...product, 
            gatsbyImage: images.edges.find(edge => edge.node.base.split('.')[0] === product.id)
          }
        )
      )
      
      return (
        productsWithImages.map(product => <ProductCard product={product} key={product.id} />)
      )
    }}
    />
)
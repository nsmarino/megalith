import React from 'react'
import { graphql, StaticQuery } from 'gatsby' // static query componet used in component

// import ProductCard from './ProductCard'
import FlipCard from './FlipProductCard'

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
        cards:
          allFile(filter: {extension: {regex: "/(png)/"}, relativeDirectory: {eq: "cards"}}) {
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
    render={({ products, images, cards }) => {
      const productsWithImages = products.allProducts.map(
        product => (
          {
            ...product, 
            gatsbyImage: images.edges.find(edge => edge.node.base.split('.')[0] === product.id),
            cardFace: cards.edges.find(edge => edge.node.base.split('.')[0] === product.id)
          }
        )
      )
      
      return (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {productsWithImages.map(product => <FlipCard product={product} key={product.id} />)}
        </div>
      )
    }}
    />
)
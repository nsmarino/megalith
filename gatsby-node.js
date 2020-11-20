const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    const productTemplate = path.resolve(`src/templates/Product.js`)
    return graphql(`
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
                    src
                    srcSet
                    aspectRatio
                    sizes
                    base64
                  }
                }
              }
            }
          }
    }`).then(result => {
      if (result.errors) {
        throw result.errors   
      }

      const productsWithImages = result.data.products.allProducts.map(
        product => (
          {
            ...product, 
            gatsbyImage: result.data.images.edges.find(edge => 
              edge.node.base.split('.')[0] === product.id),
          }
        )
      )
      console.log(productsWithImages, productsWithImages[0])


      productsWithImages.forEach(product => {
          const path = `/products/${product.id}`;
          createPage({
            path,
            component: productTemplate,
            context: {
              name: product.name,
              id: product.id,
              variants: product.variants,
              gatsbyImage: product.gatsbyImage
            },
          });
      })
      // result.data.products.allProducts.forEach( product => {
      //     const path = `/products/${product.id}`;
      //     createPage({
      //       path,
      //       component: productTemplate,
      //       context: {
      //         name: product.name,
      //         id: product.id,
      //         variants: product.variants,
      //       },
      //     });
      // })

    }
  )
}
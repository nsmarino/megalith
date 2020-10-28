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
    }`).then(result => {
      if (result.errors) {
        throw result.errors   
      }
      result.data.products.allProducts.forEach( product => {
          const path = `/products/${product.id}`;
          createPage({
            path,
            component: productTemplate,
            context: {
              name: product.name,
              id: product.id,
              variants: product.variants,
            },
          });
      })
    }
  )
}
# megalith (frontend)

E-commerce site for streetwear brand. Users should feel that they have entered into an ancient and mysterious zone. This repository contains all frontend code. Server code can be found [here](https://github.com/nsmarino/megalith-backend)

[Visit](https://www.megalith.supply/)

## Map

Products are sourced from Printful via graphql static query located in `/src/components/Products.js`. Communication with Stripe and Printful APIs is handled mostly in `/src/components/CheckoutForm/CheckoutForm.js`. I originally used a Gatsby plugin for Printful but decided to rewrite the logic from scratch to understand it better. Special thanks to [react-hook-form](https://react-hook-form.com/) for freeing me from the pain of form management in React.

## CLI Commands

``` bash
# install dependencies
npm install

# dev server with hot reload at localhost:8000
npm develop

# build for production
npm build

# start production server
npm serve
```

This is a [Gatsby](https://www.gatsbyjs.com/) project based on [`gatsby-graphcms-ecommerce-starter`](https://www.gatsbyjs.com/starters/GraphCMS/gatsby-graphcms-ecommerce-starter).

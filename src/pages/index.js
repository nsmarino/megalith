import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Products from '../components/Products/Products'

const Home = () => (
    <Layout>
    <SEO title="megalith" />
        <Products />
    </Layout>
)

export default Home

// TODO
// - Add all pertinent Printful info to frontend card component (variants, multiple images, etc) THINK IN REACT!
// - Add react-use-cart for cart handling
// - Add stripe on frontend
// - Mutations sent from frontend should go through server to Printful API to do the following:
// 1. Draft order
// 2. Estimate order costs
// 3. Use total to create payment intent on server -- or should paymentIntent be drawn directly from Printful API?
// 4. Send client_secret from payment intent to client so payment can be made to Stripe
// 4. Confirm order via webhook once charge is successful (not a mutation -- POST to express endpoint)
// 5. Once this basic business logic is established I will take time to work carefully on frontend design system (styledComponents?)

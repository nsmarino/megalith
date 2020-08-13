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

import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Products from '../components/Products/Products'

console.log(process.env.ENABLE_GATSBY_REFRESH_ENDPOINT)
const Home = () => (
    <Layout>
    <SEO title="megalith" />
        <Products />
    </Layout>
)

export default Home

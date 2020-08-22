import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Success = () => (
  <Layout>
    <SEO title="success" />
    <h2 style={{fontWeight: '400'}}>Order successful</h2>
    <p>Confirmation code: 00000000000</p>
  </Layout>
)

export default Success

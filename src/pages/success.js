import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Success = () => (
  <Layout>
    <SEO title="success" />
    <h1>Order successful</h1>
    <p>Confirmation code: 00000000000</p>
    <Link to="/">home</Link>
  </Layout>
)

export default Success

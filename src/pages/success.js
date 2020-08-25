import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Success = ({ location }) => {
  return (
  <Layout>
  <SEO title="success" />

    { location.state ?
    <div>
      <h2 style={{fontWeight: '400'}}>Order successful</h2>
      <p>Confirmation code: {location.state.orderId}</p>
    </div>
    :
    null
    }

  </Layout>
)}

export default Success

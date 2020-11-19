import React from 'react'
import styled from '@emotion/styled'
import SEO from '../components/seo'

import Products from '../components/Products/Products'
import SplashHeader from '../components/SplashHeader'

const SplashLayout = styled.div`

@media (min-width: 600px) {
  width: 600px;
}

@media (min-width: 900px) {
  width: 900px;
}

@media (max-width: 600px) {
  width: 95vw;
}

`

const Home = () => {
  return (
    <SplashLayout>
      <SEO title="Megalith" />
      <SplashHeader />
      <Products />
    </SplashLayout>
)}

export default Home

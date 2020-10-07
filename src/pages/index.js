import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/seo'
import styled from "@emotion/styled"
import Btn from '../components/GrahamBtn'

const StyledSplashH1 = styled.h1`
  font-family: Megalith-Regular;
  font-weight: 400;
  font-size: 10rem;
  margin-top: 1rem;
  margin-bottom: 0;
  a {
      text-decoration: none;
      color: inherit;
  }
`

const SplashH1 = () => {
    return (
        <StyledSplashH1><Link to="/">MegalitH</Link></StyledSplashH1>
    )
}

const Home = () => {
  return (
    <>
      <SEO title="Megalith" />
      <div style={
        {
          width:"50rem", 
          height: '90vh', 
          background: 'url(stoneCircle.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'space-between'
        }
      }>
        <SplashH1 />
        <nav style={{display: 'flex', flexDirection: 'column'}}>
          <Btn text="ArtifactS" link="/store" />
          <Btn text="HistorY" link="/history" />
        </nav>     
      </div>
    </>
)}

export default Home

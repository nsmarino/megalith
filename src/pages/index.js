import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/seo'
import styled from "@emotion/styled"

const StyledSplash = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  height: 35rem;
  background: repeating-linear-gradient(
    -45deg,
    #dbc7cb,
    #dbc7cb 6px,
    black 6px,
    black 7px
  );
`
const StyledSplashH1 = styled.h1`
  font-family: Megalith-Regular;
  font-weight: 200;
  font-size: 10rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  a {
      text-decoration: none;
      color: inherit;
  }
`
const StyledSplashUL = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  width: 20rem;

  li {
      font-family: Megalith-Regular;
      font-size: 4rem;
      display: block;
  }

  li a {
      text-decoration: none;
      color: inherit;
  }
`

const HomeNav = () => {
    return (
        <>
        <SEO title="Megalith" />
        <nav>
            <StyledSplashUL>
                <li><Link to="/store">StorE</Link></li>
                <li><Link to="/artifacts">ArtifactS</Link></li>
                <li><Link to="/history">HistorY</Link></li>
            </StyledSplashUL>
        </nav>
        </>
    )
}

const SplashH1 = () => {
    return (
        <StyledSplashH1><Link to="/">MegalitH</Link></StyledSplashH1>
    )
}

const Splash = ({children}) => {
    return (
        <StyledSplash>
            {children}
        </StyledSplash>
    )
}

const Home = () => (
    <Splash>
      <SplashH1 />
      <HomeNav />
    </Splash>
)

export default Home

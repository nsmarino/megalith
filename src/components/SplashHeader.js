import { Link } from "gatsby"
import React from "react"
import Btn from './GrahamBtn'
  
import styled from "@emotion/styled"
  
const StyledHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  
    a {
      color: inherit;
      text-decoration: none;
    }
  
    h1 {
      font-family: Megalith-Regular;
      font-weight: 400;
      font-size: 10rem;
      margin: 0;
    }
`
  
const SplashHeader = () => {  
  return (
    <StyledHeader>
      <h1>
        <Link to="/">
          MegalitH
        </Link>
      </h1>
      <nav style={{display: 'flex'}}>
          <Btn text="HistorY" link="/history" />
          <Btn text="IndeX" link="/zone" />

        </nav>     
    </StyledHeader>
  )
}
  
export default SplashHeader
  
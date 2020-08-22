import React from "react"
import { Link } from 'gatsby'
import styled from '@emotion/styled'

const StyledFooter = styled.footer`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  li {
    display: block;
    padding: 1rem;
    a {
      color: inherit;
      text-decoration: none;
      &:hover {
        background: var(--striped-hover);
      }
    }
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <ul>
        <li><Link to="/store">store</Link></li>
        <li><Link to="/artifacts">artifacts</Link></li>
        <li><Link to="/history">history</Link></li>
      </ul>
    </StyledFooter>
  )
}

export default Footer

import React from "react"
import styled from '@emotion/styled'
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from './Footer'
const StyledLayoutDiv = styled.div`
  margin: 0 auto;
  padding: 0 1rem 1.5rem;

  @media (min-width: 600px) {
    width: 600px;
  }
`


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <StyledLayoutDiv>
        <main>{children}</main>
        <Footer />
      </StyledLayoutDiv>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

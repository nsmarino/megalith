import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header>
      <h1>
        <Link
          to="/"
        >
          {siteTitle}
        </Link>
      </h1>
      <nav>
        <ul>
          <li>about</li>
          <li>erosion</li>
          <li>cart</li>
        </ul>
      </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

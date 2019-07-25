import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <div>
    <nav className="p-4 mt-0 mb-5 border-b bg-gray-100">
      <div className="flex font-extrabold">
        <Link to="/">
          <span className="hidden w-0 md:w-auto md:block">mattboldt.com</span>
        </Link>
      </div>
    </nav>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header

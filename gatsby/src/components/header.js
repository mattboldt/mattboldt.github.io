import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCog, faBook } from '@fortawesome/free-solid-svg-icons'
library.add(fab)

const Header = ({ siteTitle }) => (
  <div>
    <nav className="mb-5 clearfix">
      <ul className="flex list-none float-left">
        <li className="mr-4">
          <Link to="/" className="font-extrabold">
            mattboldt.com
          </Link>
        </li>
      </ul>
      <ul className="flex list-none float-right">
        <li className="ml-4">
          <Link to="/demos">
            <FontAwesomeIcon icon={faCog} /> demos
          </Link>
        </li>
        <li className="ml-4">
          <Link to="/me">
            <FontAwesomeIcon icon={faBook} /> about
          </Link>
        </li>
        <li className="ml-4">
          <Link to="https://www.twitter.com/atmattb">
            <FontAwesomeIcon icon={['fab', 'twitter']} /> twitter
          </Link>
        </li>
        <li className="ml-4">
          <Link to="https://github.com/mattboldt">
            <FontAwesomeIcon icon={['fab', 'github']} /> github
          </Link>
        </li>
      </ul>
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

import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <div>
    <nav className="mb-5 sm:flex">
      <ul className="flex list-none w-full sm:w-1/2">
        <li className="mr-4">
          <Link to="/" className="font-extrabold">
            mattboldt.com
          </Link>
        </li>
      </ul>
      <ul className="flex list-none w-full sm:w-1/2 sm:justify-end">
        <li>
          <Link to="/demos">demos</Link>
        </li>
        <li className="ml-4">
          <Link to="/me">about</Link>
        </li>
        <li className="ml-4">
          <a href="https://www.twitter.com/atmattb">twitter</a>
        </li>
        <li className="ml-4">
          <a href="https://github.com/mattboldt">github</a>
        </li>
      </ul>
    </nav>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

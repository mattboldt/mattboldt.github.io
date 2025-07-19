import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/globals.scss'

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      {children}
      <div className="container mx-auto px-4 py-4 max-w-lg">
        <div className="mw8 center ph3-ns text-center">
          <footer>
            &copy; Copyright &amp; Stuff {new Date().getFullYear()}. Made With
            ❤️ | View on{' '}
            <a href="https://github.com/mattboldt/mattboldt.github.io">
              GitHub
            </a>
          </footer>
        </div>
      </div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

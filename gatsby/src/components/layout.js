import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import '../stylesheets/globals.scss'

const titleQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Layout = ({ children }) => (
  <StaticQuery
    query={titleQuery}
    render={data => (
      <React.Fragment>
        {children}
        <div className="container mx-auto px-4 py-4 max-w-lg">
          <div className="mw8 center ph3-ns">
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
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout

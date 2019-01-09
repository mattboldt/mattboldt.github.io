import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'
import '../stylesheets/globals.scss'

const titleQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={titleQuery}
    render={data => (
      <div className="container mx-auto px-5 max-w-xl">
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="sans-serif mw8 center ph3-ns">
          {children}
          <footer>
            &copy; {new Date().getFullYear()}, Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

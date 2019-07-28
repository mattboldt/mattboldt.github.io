import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Header from '../components/header'
import GeoAnimation from '../components/geo-animation'

const NotFoundPage = () => (
  <Layout>
    <Header />
    <GeoAnimation />
    <SEO title="404: Not found" />

    <header className="container text-center mx-auto max-w-5xl px-1">
      <h1 className="font-bold break-normal mb-1 text-3xl md:text-5xl">
        D'oh! 404
      </h1>
    </header>
  </Layout>
)

export default NotFoundPage

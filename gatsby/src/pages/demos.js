import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Header from '../components/header'
import GeoAnimation from '../components/geo-animation'

const Demos = () => (
  <Layout>
    <SEO title="Demos" />
    <Header />
    <GeoAnimation />

    <header className="container text-center mx-auto max-w-5xl px-1">
      <h1 className="font-bold break-normal mb-1 text-3xl md:text-5xl">
        Demos, Experiments, and Other Fun
      </h1>
    </header>

    <div className="container mx-auto max-w-3xl px-4 py-6">
      <a href="/demos/typed-js/" className="font-bold text-3xl">
        Typed.js
      </a>
      <p>A JavaScript plugin that animates typing.</p>

      <a href="/css3-iphone5/" className="font-bold text-3xl">
        CSS3 iPhone 5
      </a>
      <p>An iPhone 5 made with CSS and 1 HTML tag.</p>

      <a href="/demos/css-apple-nav/" className="font-bold text-3xl">
        Apple.com's Nav Bar
      </a>
      <p>The History of Apple.com's Nav Bar in CSS</p>
    </div>
  </Layout>
)

export default Demos

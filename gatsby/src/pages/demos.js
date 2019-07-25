import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Header from '../components/header'

const Demos = () => (
  <Layout>
    <SEO title="Demos" />
    <Header />

    <div className="container mx-auto max-w-lg py-6">
      <h1 className="page-title">Demos, Experiments, and Other Fun</h1>

      <div className="demo-block">
        <div className="demo-frame-wrap">
          <div className="demo-cover"></div>
          <iframe
            className="demo-frame"
            src="/demos/css-apple-nav/"
            frameborder="0"
            scrolling="no"></iframe>
        </div>
        <div className="demo-title">
          <a href="/demos/css-apple-nav/">Apple.com's Nav Bar</a>
          <p>The History of Apple.com's Nav Bar in CSS</p>
        </div>
      </div>

      <div className="demo-block">
        <div className="demo-frame-wrap">
          <div className="demo-cover"></div>
          <iframe
            className="demo-frame"
            src="/demos/typed-js/"
            frameborder="0"
            scrolling="no"></iframe>
        </div>
        <div className="demo-title">
          <a href="/demos/typed-js/">Typed.js</a>
          <p>A jQuery plugin that animates typing.</p>
        </div>
      </div>

      <div className="demo-block">
        <div className="demo-frame-wrap">
          <div className="demo-cover"></div>
          <iframe
            className="demo-frame"
            src="/demos/semantic-buttons/"
            frameborder="0"
            scrolling="no"></iframe>
        </div>
        <div className="demo-title">
          <a href="/demos/semantic-buttons/">Semantic Buttons</a>
          <p>Versatile, semantic buttons made with HTML and Sass.</p>
        </div>
      </div>

      <div className="demo-block">
        <div className="demo-frame-wrap">
          <div className="demo-cover"></div>
          <iframe
            className="demo-frame"
            src="/css3-iphone5/"
            frameborder="0"
            scrolling="no"></iframe>
        </div>
        <div className="demo-title">
          <a href="/css3-iphone5/">CSS3 iPhone 5</a>
          <p>An iPhone 5 made with CSS and 1 HTML tag.</p>
        </div>
      </div>

      <div className="demo-block">
        <div className="demo-frame-wrap">
          <div className="demo-cover"></div>
          <iframe
            className="demo-frame"
            src="/css3-macbook-air/"
            frameborder="0"
            scrolling="no"></iframe>
        </div>
        <div className="demo-title">
          <a href="/css3-macbook-air/">CSS3 MacBook Air</a>
          <p>MacBook Air made with CSS. Responsive to screen resolution.</p>
        </div>
      </div>

      <div className="demo-block">
        <div className="demo-frame-wrap">
          <div className="demo-cover"></div>
          <iframe
            className="demo-frame"
            src="/demos/calculator/"
            frameborder="0"
            scrolling="no"></iframe>
        </div>
        <div className="demo-title">
          <a href="/demos/calculator/">CSS3 Calculator</a>
          <p>Fully functional calculator made with CSS and JavaScript.</p>
        </div>
      </div>

      <div className="demo-block">
        <div className="demo-frame-wrap">
          <div className="demo-cover"></div>
          <iframe
            className="demo-frame"
            src="/demos/css3-sms/"
            frameborder="0"
            scrolling="no"></iframe>
        </div>
        <div className="demo-title">
          <a href="/demos/css3-sms/">CSS3 SMS Bubbles</a>
          <p>iOS SMS Bubbles designed with CSS, animated with jQuery.</p>
        </div>
      </div>
    </div>
  </Layout>
)

export default Demos

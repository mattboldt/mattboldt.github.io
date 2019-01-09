import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <div class="cf ph2-ns">
      <div className="fl w-70 pa2">
        <h1 className="f3 f1-m f-headline-l lh-solid mb0">Matt Boldt</h1>
        <p class="measure lh-copy">
          Ruby &amp; JavaScript developer from Texas. <br />
          I make beats, synth patches, and coffee tables.
        </p>
      </div>

      <div className="fl w-30 pa2">
        <div class="tc pa4">
          <Image />
        </div>
      </div>
    </div>

    <div class="cf ph2-ns">
      <Link to="/page-2/">Go to page 2</Link>
    </div>
  </Layout>
)

export default IndexPage

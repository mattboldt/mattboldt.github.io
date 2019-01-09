import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <div className="flex items-center">
      <div className="w-2/3">
        <h1 className="font-semibold text-5xl">Matt Boldt</h1>
        <p class="text-grey-darkest text-lg">
          Ruby &amp; JavaScript developer from Texas. <br />
          I make beats, synth patches, and coffee tables.
        </p>
      </div>
      <div className="w-1/3">
        <Image />
      </div>
    </div>


    <div class="cf ph2-ns">
      <Link to="/page-2/">Go to page 2</Link>
    </div>
  </Layout>
)

export default IndexPage

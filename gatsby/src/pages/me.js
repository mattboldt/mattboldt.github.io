import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Header from '../components/header'
import GeoAnimation from '../components/geo-animation'

const Me = () => (
  <Layout>
    <SEO title="Me" />
    <Header />
    <GeoAnimation />

    <header className="container text-center mx-auto max-w-5xl px-1">
      <h1 className="font-bold break-normal mb-1 text-3xl md:text-5xl">
        Hello!
      </h1>
    </header>

    <div className="container mx-auto max-w-3xl px-4">
      <p>
        I'm a web developer from Texas. I write Ruby & JavaScript; mainly using
        Rails &amp; React.
      </p>

      <h3 className="h3">My work</h3>

      <p>
        Have a look at the <a href="/demos/">demos I've built</a>, or check out
        the <a href="/">home page</a> where you'll find my blog posts. If you'd
        like, you can view my profile on{' '}
        <a href="http://www.github.com/mattboldt/">Github</a>, or{' '}
        <a href="http://www.codepen.io/mattboldt">Codepen</a>. By day, I'm a
        developer at <a href="http://www.kalkomey.com/">Kalkomey</a>.
      </p>

      <p>
        A good address to contact me at is{' '}
        <span className="h3">me (at) mattboldt.com</span>
        <br /> I'm also usually glued to{' '}
        <a href="http://www.twitter.com/atmattb">Twitter</a>.
      </p>

      <h3 className="h3">Interests</h3>

      <p>
        Another thing I'm very passionate about is music. I've played guitar for
        nearly half my life, and I also like to write, record, and produce
        music. Lately I've been in an electronic phase, which you can listen to
        on my <a href="http://www.soundcloud.com/in-clouds/">Soundcloud</a>.
      </p>
    </div>
  </Layout>
)
export default Me

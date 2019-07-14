---
layout: post
permalink: /:title/
title:  Using 100% Height in CSS
desc: A cool effect I've been seeing on sites lately involves the use of percentage based heights & absolute positioning. Puzzled by how it worked, I set out to break the code down and do it myself.
date: 2013-08-18 17:00:00
categories: html, css
---

<p>A cool effect I've been seeing on sites lately involves the use of percentage based heights & absolute positioning. Puzzled by how it worked, I set out to break the code down and do it myself.</p>

<p>Some great examples are the Dropbox (<a href="http://www.dropbox.com">http://www.dropbox.com</a>) and Spotify (<a href="http://www.spotify.com/us/">http://www.spotify.com/us/</a>) home pages. Using this effect, the top section of the page adapts to your entire screen resolution (100% height). It also includes some content that always sits at the very bottom of the initial viewport. Now, when you begin to scroll, the rest of the page content appears *just* after the bottom of the page viewport.</p>

~~~ html
<div class="top-section">
  <p>This content takes up 100% of the viewport at the top</p>
  <a href="#" class="more">Learn More</a>
</div>
<div class="bottom-section">
  <p>This is the body content, and should appear just after the top section <strong>only when you scroll down</strong>.</p>
</div>
~~~

~~~ scss
.top-section{
  height: 100vh;
}
~~~

<p>And our result:</p>

<iframe height="265" style="width: 100%;" scrolling="no" title="Using 100% Height" src="//codepen.io/mattboldt/embed/HtkJw/?height=265&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/mattboldt/pen/HtkJw/'>Using 100% Height</a> by Matt Boldt
  (<a href='https://codepen.io/mattboldt'>@mattboldt</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

<p><a href="/demos/height-100-percent/">Here's a live demo</a> on my site to make resizing the browser window a little easier.</p>

<h2>It works!</h2>
<p>Now the top section of content will always take up 100% of the viewport and adapt to changes in screen size. A good thing to do also is set a min-height to your top content so layout isn't broken on short screen sizes.</p>

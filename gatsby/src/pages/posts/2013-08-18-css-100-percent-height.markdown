---
layout: post
permalink: /:title/
title:  Using 100% Height in CSS
desc: A cool effect I've been seeing on sites lately involves the use of percentage based heights & absolute positioning. Puzzled by how it worked, I set out to break the code down and do it myself.
date: 2013-08-18 17:00:00
categories: html, css
---

<p>A cool effect I've been seeing on sites lately involves the use of percentage based heights & absolute positioning. Puzzled by how it worked, I set out to break the code down and do it myself.</p>

<p>Some great examples are the Dropbox (<a href="http://www.dropbox.com">http://www.dropbox.com</a>) and Spotify (<a href="http://www.spotify.com/us/">http://www.spotify.com/us/</a>) home pages. Using this effect, the top section of the page adapts to your entire screen resolution (100% height). It also includes some content that always sits at the very bottom of the initial viewport. Now, when you begin to scroll, the rest of the page content appears *just* after the bottom of the page viewport. Sounds really complicated, right? Actually, the opposite. Let's write some code.</p>

~~~ html
<div class="top-section">
  <p>This content takes up 100% of the viewport at the top</p>
  <a href="#" class="more">Learn More</a>
</div>
<div class="bottom-section">
  <p>This is the body content, and should appear just after the top section <strong>only when you scroll down</strong>.</p>
</div>
~~~

<p>Your first instincts are to make a div, and throw 100% height on it. Lets try that.</p>

~~~ scss
p{
  text-align:center;
}
.top-section{
  height:100%;
}
.more{
  display:block;
  position:absolute;
  bottom:20px;
  text-align:center;
}
~~~

<p data-height="268" data-theme-id="0" data-slug-hash="msHCw" data-user="mattboldt" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/mattboldt/pen/msHCw'>Using 100% Height</a> by Matt Boldt (<a href='http://codepen.io/mattboldt'>@mattboldt</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="http://codepen.io/assets/embed/ei.js"></script>
<br /><br />
<p>All this <em>makes sense</em>, but we're still not getting that effect we want. The more link is in the right place, but the body content is still visible in the top section. Why isn't height:100% doing the trick?</p>

<p>Well, after scratching my head a bit, I realized how to get it working. Add this little bit:</p>

~~~ scss
html, body{
  height:100%;
}
~~~

<p>And our result:</p>

<p data-height="268" data-theme-id="0" data-slug-hash="HtkJw" data-user="mattboldt" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/mattboldt/pen/HtkJw'>Using 100% Height</a> by Matt Boldt (<a href='http://codepen.io/mattboldt'>@mattboldt</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="http://codepen.io/assets/embed/ei.js"></script>
<br /><br />

<p><a href="/demos/height-100-percent/">Here's a live demo</a> on my site to make resizing the browser window a little easier.</p>

<h2>It works!</h2>
<p>Now the top section of content will always take up 100% of the viewport and adapt to changes in screen size. A good thing to do also is set a min-height to your top content so layout isn't broken on short screen sizes.</p>

<p>This doesn't really make a whole lot of sense to me, but in the past I thought people were detecting screen height with javascript and manipulating the top div's height from there. Yuck! Very glad this is such a simple trick. And, best of all, it's compatible across browsers. I've tested all the way back to IE7 with the same result. Brilliant!</p>

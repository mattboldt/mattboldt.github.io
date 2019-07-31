---
layout: post
permalink: /:title/
title: Building Great Nav Bars With display:table
desc: In my opinion, website nav & toolbars should have somewhat of a native feel to them.
date: 2014-03-29 13:00:00
categories: sass, css, html
---

<p>In my opinion, website nav & toolbars should have somewhat of a native feel to them. Not necessarily native to your OS of choice, but built in such a way the user can hardly tell the app is a web app. A great example of this is Google Drive's text editor nav, and really most of Google's controls. Each time I use it there's a sense of solidity & responsive power that you just don't get from a lot of web apps.</p>

<h3 id="usingdisplaytable">Using <span class="inline-code">display:table</span></h3>

<p>There are a number of ways to lay out navigation. I'd say the most popular ways are setting a <span class="inline-code">&lt;ul&gt;</span>'s <span class="inline-code">&lt;li&gt;</span>'s to <span class="inline-code">float:left</span>, or using <span class="inline-code">display:inline-block</span> on them. I have found, though, utilizing <span class="inline-code">display:table</span> removes a lot of the hassle of formatting fancy navigation bars.</p>

<p><strong>Basic SCSS</strong></p>

~~~ scss
.navbar {
    display:table;
    li{
        display:table-cell;
    }
}
~~~

<p><strong>The HTML</strong></p>

~~~ html
<ul class="navbar">
    <li>
        <a href="#">
            Link
        </a>
    </li>
    <!-- 3x -->
</ul>
~~~

<p>Here's the result of that markup:</p>

<iframe width="100%" height="100" src="https://jsfiddle.net/mattboldt/Mz6Fw/1/embedded/result" allowfullscreen="allowfullscreen" frameborder="0"></iframe><p></p>

<p>Incredibly simple, no floats to clear, and no vertical alignment to dial in. It also gives you the ability to size your <span class="inline-code">&lt;li&gt;</span>'s in percents automatically. See the code below:</p>

~~~ scss
.navbar {
    width:500px;
    display:table;
    li{
        display:table-cell;
        text-align:center;
    }
}
~~~

<p>Here we just set our <span class="inline-code">&lt;ul&gt;</span>'s width and the <span class="inline-code">&lt;li&gt;</span>'s follow suit perfectly. This makes for a great responsive nav bar that can break down easily at small screen sizes.</p>

<iframe width="100%" height="100" src="https://jsfiddle.net/mattboldt/Mz6Fw/2/embedded/result" allowfullscreen="allowfullscreen" frameborder="0"></iframe><p></p>

<h3 id="usingbordercollapseboxsizing">Using <span class="inline-code">border-collapse</span> & <span class="inline-code">box-sizing</span></h3>

<p>Since we're using <span class="inline-code">display:table</span>, we also have access to <span class="inline-code">border-collapse</span> just like we do when using HTML tables. Here's a great use case for collapsed borders:</p>

~~~ scss
.navbar {
    width:500px;
    display:table;
    border-collapse:collapse;
    li{
        display:table-cell;
        text-align:center;
        box-sizing:border-box;
        border:#888 1px solid;
    }
}
~~~

<p>And the result (with some added styling):</p>

<iframe width="100%" height="100" src="https://jsfiddle.net/mattboldt/Mz6Fw/3/embedded/result" allowfullscreen="allowfullscreen" frameborder="0"></iframe><p></p>

<h2 id="makingitfeelnative">Making It Feel Native</h2>

<p>Again, not "native" to your operating system, but native to a user's expectation of interacting with web app navigation. When you use it, it has to feel like an extension of your mouse (or finger).</p>

<iframe width="100%" height="200" src="https://jsfiddle.net/mattboldt/Mz6Fw/7/embedded/result" allowfullscreen="allowfullscreen" frameborder="0"></iframe><p></p>

<p>There are some special effects in play here. Lets notice the following: rounded corners (on the edges), collapsed borders in-between buttons, a box-shadow emulating a border on the whole <span class="inline-code">&lt;ul&gt;</span>, and the subtle white box-shadow creating an embossed look on the buttons.</p>

<p>Using <span class="inline-code">border-collapse:collapse</span> takes away the ability to use rounded corners on the element with <span class="inline-code">display:table</span>. The way to get around this is to instead use <span class="inline-code">border-left</span> and <span class="inline-code">border-right</span>, then use box-shadow to add the top and bottom. Coupled with using <span class="inline-code">box-sizing:border-box</span>, this makes for a very comfortable and customizable way to add borders & shadows without any overlapping border issues. Here's the code for that particular section (edited for brevity):</p>

~~~ scss
.navbar {
    display:table;
    border-collapse:collapse;
    border-radius:.25em;
    box-shadow:#d0d0d0 0px 0px 0px 1px;
    li{
        display:table-cell;
        box-sizing:border-box;
        border-left:#e0e0e0 1px solid;
        border-right:#e0e0e0 1px solid;
        &:first-child{
          border-left:0;
          & > a{ border-top-left-radius: .25em; border-bottom-left-radius: .25em; }
        }
        &:last-child{
          border-right:0;
          & > a{ border-top-right-radius: .25em; border-bottom-right-radius: .25em; }
        }
    }
}
~~~

<h3 id="abandoningoverflowhidden">Abandoning <span class="inline-code">overflow:hidden</span></h3>

<p>Often in navigation & toolbars you need to use dropdowns, tooltips, etc. and using <span class="inline-code">overflow:hidden</span> just isn't an option.</p>

<p>Notice the <span class="inline-code">li:last-child</span> and <span class="inline-code">li:first-child</span> selectors. What this does is remove the unwanted edge borders and gives us a nice rounded edge on the buttons. Another issue I run into often is having to use <span class="inline-code">overflow:hidden</span> to keep <span class="inline-code">a:hover</span> properties from escaping outside the <span class="inline-code">border-radius</span>. With this method, that's no longer a problem.</p>

<h3 id="addingadropdown">Adding a Dropdown</h3>

<p>Adding in a drop down shouldn't be difficult, and shouldn't interfere with code around it or need much extra markup. Just as a proof of concept, and without going into much detail, the following markup can be used to create this:</p>

<p><strong>The SCSS</strong></p>

~~~ scss
/* inside the main <li> */
ul{
    position:absolute;
    visibility:hidden;
}
    &:hover ul{
        visibility:visible;
    }
~~~

<p><strong>And the HTML</strong></p>

~~~ html
<ul class="navbar">
    <li>
        <a href="#">
            <svg class="icon icon-calendar" viewBox="0 0 32 32"><use xlink:href="#icon-calendar"></use></svg>
            <span>Calendar <i>&#9660;</i></span>
        </a>
        <!-- Dropdown -->
        <ul>
            <li><a href="#">Child Link</a></li>
            <li><a href="#">Child Link</a></li>
            <li><a href="#">Child Link</a></li>
        </ul>
    </li>
</ul>
~~~

<iframe width="100%" height="200" src="https://jsfiddle.net/mattboldt/Mz6Fw/8/embedded/result" allowfullscreen="allowfullscreen" frameborder="0"></iframe><p></p>

<p>
<a href="https://caniuse.com/#search=display%3Atable">Browser support for display:table</a> is actually quite good, and is honestly a joy to work with compared to using floats or inline-block. What do you think? Leave comments below or ping me on <a href="https://www.twitter.com/atmattb">Twitter</a> for questions & insults!
</p>
<p>-Matt</p>

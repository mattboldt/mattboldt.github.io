---
layout: post
permalink: /:title/
title: Kicking Ass with display:table
desc: Building lean layouts & components using display:table
date: 2014-05-05 22:00:00
categories: sass, css, html
---

Upon hearing about using `display:table` for CSS layout, I thought it sounded like a bit of an oxymoron. Once I realized all the cool things it can do I was kicking myself for not using it sooner. Lets run through some things it's capable of.

* [Superior Vertical Alignment](#superior-vertical-alignment)
* [Float-less Grids](#float-less-grids)
* [Responsively Easy Nav Bars](#responsively-easy-nav-bars)
* [Tables Without the `<table>`](#tables-without-the-table)


<h2 id="superior-vertical-alignment">Superior Vertical Alignment</h2>


Ever wondered what life would be like if `vertical-align:middle` worked how you imagined? Consider the following css.

~~~ scss
.wrap{
  display: table;
  .block{
    display: table-cell;
    vertical-align: middle;
    width: 50%;
  }
}
~~~

And our markup:

~~~ html
<div class="wrap">
  <div class="block">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </div>
  <div class="block">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </div>
</div>
~~~

The above will look something like this:

<p><iframe width="100%" height="300" src="https://jsfiddle.net/mattboldt/Zb79e/embedded/result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe></p>

With that tiny bit of code we've achieved vertical alignment and a semi-responsive 2 column grid.

<h2 id="float-less-grids">Float-less Grids</h2>

There are tons of grid systems out there. One of my favorite to play around with has been the [mdo Table Grid](https://mdo.github.io/table-grid/). This gives you all the features of a `float` or `inline-block` based grid with a fraction of the code. Here's all we need to get a very basic 4 column grid knocked out:

~~~ scss
* { box-sizing: border-box; }
.grid{
  display: table;
  width: 100%;
  border-spacing:.5em;
  .col{
    padding:1em;
    width:25%;
    display:table-cell;
    border:#f0f0f0 1px solid;
  }
}
~~~

The markup:

~~~ html
<div class="grid">
  <div class="col">
    ...
  </div>
  <div class="col">
    ...
  </div>
  ...
</div>
~~~

Notice the lack of extra classes appended to the grid columns. Normally, you have sub classes like `.col-4` or `.col-1-4` to statically set percentage based widths on each column. For full spanning table layouts, all you need are the table cells to get things laid out evenly. Coupled with `box-sizing:border-box`, some added padding & border-spacing, we get the following:

<p><iframe width="100%" height="300" src="https://jsfiddle.net/mattboldt/Zb79e/1/embedded/result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe></p>

<h2 id="responsively-easy-nav-bars">Responsively Easy Nav Bars</h2>

A rather famous `display:table` nav bar is none other than the Apple.com nav. And if we've learned anything in the past 5 years it's that copying Apple is a recipe for success!

~~~ scss
.nav{
  display:table;
  width:500px;
  li{
    display:table-cell;
    text-align:center;
  }
}
~~~

~~~ html
<ul class="nav">
  <li>
    <a href="#">Link 1</a>
  </li>
  <li>
    <a href="#">Link 2</a>
  </li>
    ...
</ul>
~~~

Simple, eh? The result:

<p>
<iframe width="100%" height="100" src="https://jsfiddle.net/mattboldt/Mz6Fw/2/embedded/result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</p>

I go much more in-depth about table-based nav bars [here](/building-great-navbars-toolbars-display-table/).

<h2 id="tables-without-the-table">Tables Without the &lt;table&gt;</h2>

Tables are always a huge pain. The ability to keep our layout out of the HTML is quite a blessing. Given the following markup, lets make a "table".

~~~ html
<div class="table">
  <div class="table-row">
    <div class="table-head">Table Header</div>
    <div class="table-head">Table Header</div>
    <div class="table-head">Table Header</div>
  </div>
  <div class="table-row">
    <div class="table-cell">Table Cell</div>
    <div class="table-cell">Table Cell</div>
    <div class="table-cell">Table Cell</div>
  </div>
</div>
~~~

~~~ scss
.table{
  display: table;
  width:100%;
  border-collapse:collapse;
}
  .table-row{
    display: table-row;
  }
    .table-cell, .table-head{
      display: table-cell;
      padding:1em;
      border:#f0f0f0 1px solid;
    }
    .table-head{
        font-weight:bold;
    }
~~~

As you might expect, we get a nice, fairly responsive table laid out in 100% CSS.

<p><iframe width="100%" height="300" src="https://jsfiddle.net/mattboldt/2qD9t/embedded/result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe></p>

## Some Other Rad Features

You can optionally apply percentage based widths on your columns for use like a normal grid system. This gives you the ability to offset columns and the like. I recommend taking a look at [mdo's Table Grid code](https://github.com/mdo/table-grid/blob/gh-pages/table-grid.css) for the percentage settings.

<p><iframe width="100%" height="300" src="https://jsfiddle.net/mattboldt/Zb79e/2/embedded/result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe></p>

Another popular effect made easy by `display:table` is combining `vertcal-align: middle` with `height: 100%` on the both the `html, body` selector and a parent element. I go more in depth about that effect [here](/css-100-percent-height/), although I'm not using table layouts.

~fin~

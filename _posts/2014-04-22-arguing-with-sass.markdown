---
layout: post
title: Arguing with Sass
desc: "I'm going to keep this short &amp; sweet: <em><strong>keep your Sass mixins simple</strong></em>."
date: 2014-04-22 17:00:00
categories: sass, css, html
---

<p>I'm going to keep this short &amp; sweet: <em><strong>keep your Sass mixins simple</strong></em>.</p>

<p>Given the syntax of Sass's Mixins, you're probably tempted to do something like the following:</p>

~~~ scss
@mixin box-shadow($inset:"", $color, $left, $top, $blur){
    box-shadow:$inset $color $left $top $blur;
}
.element{
    @include box-shadow("inset", black, 0, 0, 10px);
}
~~~

<p>This is <strong>not</strong> how a box-shadow is usually written -- you don't need all those arguments separated by commas. A hugely simpler approach is to combine all the arguments into one <span class="inline-code">$properties</span> argument, then write the box shadow like you're used to. The only difference will be the <span class="inline-code">@include mixin-name()</span> syntax. How much cooler is our mixin now?</p>

~~~ scss
@mixin box-shadow($properties){
    box-shadow:$properties;
}
.element{
    @include box-shadow(inset black 0 0 10px);
}
~~~

<h3>Multiple Sass Mixin Arguments</h3>

<p>Not only is this much cleaner, but we can now use <em>unlimited</em> mixin arguments if we want, like for multiple <span class="inline-code">box-shadow</span>s. To do that, just include an ellipsis at the end of your mixin argument.</p>

~~~ scss
@mixin box-shadow($properties...){
    box-shadow:$properties;
}
.element{
    @include box-shadow(inset black 0 0 10px, black 0 0 10px, white 0 -10px 10px);
}
~~~

<p>This makes way for some mega-powerful mixins that can box-shadow and linear-gradient anything its heart desires. Of course, be sure to include all the browser prefixes you need.</p>

<h3>Mixin for Auto-Prefixing</h3>

<p>A good way to abstract adding browser prefixes is to have a separate mixin.</p>

~~~ scss
@mixin prefixer($property, $value, $prefixes: webkit moz ms o) {
    @each $prefix in $prefixes {
        #{"-" + $prefix + "-" + $property}: $value;
    }
    #{$property}: $value;
}
~~~

<p>Which can be used in other mixins...</p>

~~~ scss
@mixin box-shadow($properties...){
    @include prefixer(box-shadow, $properties);
}
~~~


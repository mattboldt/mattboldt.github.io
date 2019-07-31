---
layout: post
permalink: /:title/
title: Organizing CSS & Sass in Rails
desc: Rails comes equipped with Sass by default. When you build a new app, an application.css stylesheet is created for you. This isn't just a normal stylesheet -- rather, it stands as a master stylesheet in the Rails Asset Pipeline.
date: 2014-02-09 13:00:00
categories: sass, css, rails
---

<p>Rails comes equipped with Sass by default. When you build a new app, an <span class="inline-code">application.css</span> stylesheet is created for you. This isn't just a normal stylesheet -- rather, it stands as a master stylesheet in the Rails Asset Pipeline. If you don't know how the Asset Pipeline works, I suggest you <a href="https://guides.rubyonrails.org/asset_pipeline.html">read a little bit about it</a>. In this file, you'll find the following code.</p>

~~~ scss
app/assets/stylesheets/application.css
/*
    ...ommitted code...
    *= require_self
    *= require_tree .
*/
~~~

<p><span class="inline-code">require_self</span> puts the CSS contained within this file at the top of any other CSS being imported in the following lines. This means if you need to override some classes quickly, here's the stylesheet to do it in. But, I would advise against that as overriding anything from external stylesheets can become confusing very quickly for yourself and other devs working on the project.</p>

<p><span class="inline-code">require_tree .</span> then imports <em>every</em> other file in your <span class="inline-code">app/assets/stylesheets/</span> directory. When it's time to compile &amp; compress all the Sass, all of your code gets put into the <span class="inline-code">application.css</span> file, which then gets a unqiue hash generated on the end of it to prevent caching issues. You can see this in action if you check the source of a live Rails app. It'll look something like <span class="inline-code">/assets/application-743e264624884d9ac2219fcfbb648f54.css</span>.</p>

<p>Another thing that Rails does, is generate stylesheets for you when you run the <span class="inline-code">rails generate</span> command in the terminal. On creation of a new controller, you'll see a stylesheet with the controller's name in your assets. It'll look something like <span class="inline-code">app/assets/stylesheets/posts.css.scss</span>. I'm not quite sure of the reasoning behind the naming scheme here, as you could also name this file <span class="inline-code">posts.scss</span> and it can be imported just the same. The problem with this auto-stylesheet generation, is that it leads to a rather unorganized set of styles. with each controller you create, you end up with a new sheet. Something like...</p>

~~~ scss
**BAD**
+--- assets/
|   +--- stylesheets/
|       +--- /application.css
|       +--- /posts.css.scss
|       +--- /users.css.scss
|       +--- /uploads.css.scss
|       +--- /home.css.scss
~~~

<p>Another issue with this is the use of site-wide Sass resources such as variables, mixins, and other proprocessor features. If you declare a mixin and some variables in <span class="inline-code">home.css.scss</span>, you <em>cannot</em> use it in <span class="inline-code">users.css.scss</span>. This is because Rails does not compile all the stylesheets in the Sass way using <span class="inline-code">@import</span>, but rather it includes them all with the <span class="inline-code">require_tree .</span> snippet you saw earlier in <span class="inline-code">application.css</span>.</p>

<p>I much prefer to take full advantage of Sass, while still playing nice with Rails' asset pipeline. Here's the strutcure I follow:</p>

~~~ scss
app/assets/stylesheets/application.css
/*
    *= require_self
    // notice I'm only requiring main.scss
    *= require main
*/

Directory structure:
+--- assets/
|   +--- stylesheets/
|       +--- /application.css
|       +--- /main.scss
|           +--- base/
|               +--- /mixins.scss
|               +--- /globals.scss
|               +--- /normalize.scss
|           +--- styles/
|               +--- /posts.scss
|               +--- /home.scss
~~~

<p>This allows you to do all of your organization in <span class="inline-code">main.scss</span>, leaves you in charge of which stylesheets come first, and provides all your Sass access to mixins living in your <span class="inline-code">mixins.scss</span> file. Lets take a look at what my <span class="inline-code">main.scss</span> file looks like.</p>

~~~ scss
app/assets/stylesheets/main.scss
@import "base/mixins.scss";
@import "base/normalize.scss";
@import "base/globals.scss";
@import "styles/home.scss";
@import "styles/posts.scss";
~~~

<p>I usually avoid writing any regular Sass code in my main stylesheet, as well as in <span class="inline-code">application.css</span>. If I write styles that affect the website globally, they will go in <span class="inline-code">globals.scss</span>. If I edit how my posts are laid out, or how my user home page looks, I will put the styles in their respective stylesheets. This tackles CSS in a more object oriented way, as well as keeps your assets clean and very easy for a team to go in and edit.</p>

<p>Leave your thoughts below, or ping me on <a href="https://www.twitter.com/atmattb">Twitter</a>. I plan to make a quick gem to set this all up for you in the future, so be on the lookout!</p>

---
layout: post
permalink: /:title/
title: Heroku Staging & Production Environments
desc: Heroku is super powerful and I suggest if you're new to Rails, or any other framework they support (which is a lot), to give them a try. Manual setup for a lot of these languages and frameworks can be really tedious, but Heroku gets it all done for you. This is especially helpful when you first learn [Insert bleeding edge technology here] and it's either not supported by your web host, or a pain in the ass to set up. Of course, down the road, learning how to do it all manually is also helpful.
date: 2013-10-19 13:00:00
categories: rails, ruby, heroku
---


<p>Heroku is super powerful and I suggest if you're new to Rails, or any other framework they support (which is a lot), to give them a try. Manual setup for a lot of these languages and frameworks can be really tedious, but Heroku gets it all done for you. This is especially helpful when you first learn [Insert bleeding edge technology here] and it's either not supported by your web host, or a pain in the ass to set up. Of course, down the road, learning how to do it all manually is also helpful.</p>

<p>I've been using Heroku on a new project of mine and decided I need to set up a testing environment. Once I actually push this site live, I'd like to be able to test changes out up on the server before they're pushed to the public. This is actually very simple with Heroku, even though their <a href="https://devcenter.heroku.com/articles/multiple-environments">guide is kind of confusing...</a></p>

<h3>Step 0: Create / have an existing app you've set up and pushed to Heroku</h3>

<p>This is step 0 because this post isn't supposed to teach you how to get started from scratch :p</p>

<p><small>NOTICE: every time from here on out, when I say "appname" it means enter your own! It's <strong>not</strong> a command or name native to git or Heroku.</small></p>

<h3>Step 1: In the Terminal, create a <em>new</em> app.</h3>

<p>Name it something like staging-appname or test-appname.</p>

~~~
  $ heroku apps:create staging-appname
~~~

<h3>Step 2: Configure Your Git Remotes</h3>
<p>By default, your one and only remote is called "heroku". This is why you do things like <span class="inline-code">$ git push heroku master</span>, you're pushing to the master branch of `heroku`. What we want is two remotes: one staging, one production. You can view your remotes by typing...</p>
~~~
  $ git remote -v
  // this should return:
  // heroku	git@heroku.com:appname.git (fetch)
  // heroku	git@heroku.com:appname.git (push)
~~~

<p>So, lets rename that default `heroku` git remote to a live, production one. You should probably use "production", but "live" is quicker for me to type.</p>

~~~
  $ git remote rename heroku live
~~~

<h3>Step 3: Create a new remote</h3>
<p>This is essentially splitting your local git repo to be able to push to two different remotes. Also, from now on, when you run things like <span class="inline-code">$ heroku run rake db:migrate</span>, it's going to ask you to specify which app you want to do it to. I actually really like this because I can know exactly what I'm doing up in the server.</p>

<p>Lets add our new remote to the local repo, that points to the 2nd app you made.</p>

~~~
  $ git remote add staging git@heroku.com:staging-appname.git
~~~

<p>Here "staging" could be whatever name you want. Now lets run that remote command again! <span class="inline-code">$ git remote -v</span>:</p>

~~~
  live	git@heroku.com:appname.git (fetch)
  live	git@heroku.com:appname.git (push)
  staging	git@heroku.com:staging-appname.git (fetch)
  staging	git@heroku.com:staging-appname.git (push)
~~~

<p>Awesome; it worked. Note: to push, you must now specify which remote instead of just saying <span class="inline-code">$ git push heroku master</span></p>

<p>Example workflow:</p>
~~~
  // Add files you've been working on
  $ git add .
  // Commit to your local repo
  $ git commit -m "Made some changes"

  // Push to `staging`
  git push staging master

  // Everything look ok on your staging app? Cool.
  git push live master

~~~
<p><small>WARNING: You may run into errors pushing to the staging app. Continue reading.</small></p>

<p>Now, what I want to do is have this 2nd staging app use the <strong>same production database</strong>. This way, I can see how all my live data looks when I'm testing out new features. But beware: doing this makes your production database editable from both staging and live apps.</p>

<h3>Step 4: Configure your app to use the production database</h3>
<p>When you set up your staging app, heroku created a database for it. Now, it may be because I'm on Rails 4, or it may just be a normal bug, but if I pushed my app to the staging environment like so:</p>

~~~
  $ git push staging master
~~~

<p>I'd get those classic Heroku errors that hint to disabling the Asset Pipeline's precompile function. But, I've already done that. What's really happening is a Database issue since this app existed previously, and you're trying to push it to another app that has <em>another</em> database. Boo!</p>

<p>Lets get our staging app on the same DB! First, run this to see the database URL of your current live app.</p>

~~~
  $ heroku config --app myapp
  // see, here's that app declaration
  // I was taking about earlier.
~~~

<p>Should return either a single, or multiple results based on what you have setup on Heroku. Here's the important one, so copy it down:</p>

~~~
DATABASE_URL: postgres://THIS-IS-YOUR-DATABASE-URL
~~~

<p>In your Rails app, you want to add this URL so it always looks for this database in production, and not the default one Heroku set up for your staging app.</p>

<p>Open <span class="inline-code">app/config/environments/production.rb</span> and add this line. I added it to the bottom before `end`.</p>

~~~
  ENV["DATABASE_URL"] = "postgres://THIS-IS-YOUR-DATABASE-URL"
~~~

<h3>Final Step: Successfully push to staging</h3>

~~~
  $ git push staging master
~~~

<p>At this point, if you've done it all right, you should be able to push your current local app to the 2nd (staging) remote we added. Navigate to your staging app's url, usually staging-myapp.herokuapp.com. Your staging app should be live, using the data from your production database. Once you've reviewed your changes on this staging environment, push to your live one!</p>

~~~
  $ git push live master
~~~

<p>Thanks for reading!</p>

<p>If you run into any problems, please complain to me on <a href="https://www.twitter.com/atmattb">Twitter</a>. I spent most of last night getting this all to work so it's very possible I missed out on some details.</p>

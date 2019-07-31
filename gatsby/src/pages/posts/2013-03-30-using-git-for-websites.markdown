---
layout: post
permalink: /:title/
title:  Using Git for Websites
desc: Let me start off by saying <strong>Git is awesome</strong>. I'm not a native app developer, nor am I part of a large dev team. I'm a web developer, who builds both dynamic and static websites, usually on my own. When I was first introduced to Git, it was in mostly in the context of app development for iOS, Mac, Windows, etc. Upon digging deeper, I found that the use of a version control system benefits <strong>just about every other kind of development / content creation project</strong>.
date:   2013-03-30 19:30:00
categories: git, web development
unlisted: true
---

<p>Let me start off by saying <strong>Git is awesome</strong>. I'm not a native app developer, nor am I part of a large dev team. I'm a web developer, who builds both dynamic and static websites, usually on my own. When I was first introduced to Git, it was in mostly in the context of app development for iOS, Mac, Windows, etc. Upon digging deeper, I found that the use of a version control system benefits <strong>just about every other kind of development / content creation project</strong>.</p> <p> For some reason, Git just seemed like a native programmer's club. This might be because of the way version control systems and repo hosting providers are marketed. For instance, I understand GitHub <em>now</em>... But at first I had no clue what "social coding" was supposed to accomplish. What did it have to do with building a website? What if I'm the only one working on the project &mdash; do I really need to use Git or SVN? <strong>Yes</strong>.</p>


<h2>My Initial Questions</h2>
<ol>
     <li>Is Git better than using FTP for websites?</li>
     <li>Can I use Git with my current web hosting provider?</li>
     <li>I have to install Git on my local machine... and it needs to be on a web host, too?</li>
     <li>What's a repo? Would it be the live web directory?</li>
     <li>Whoa, use the command line?</li>
</ol>

<p>
<strong>1. Is Git better than using FTP for websites?</strong><br />
Firstly, uploading website files using FTP sucks. Even with an awesome FTP client, things get really messy very quickly. You've got duplicates, files uploaded to the wrong folder because you didn't realize where you were transferring them, hidden .DS_Store files (on Mac) getting pushed to the server, you don't know how, what, or when files were edited, and the list goes on. If your site is made up of 1 page and some CSS, sure; it's not a big deal. But even then you don't have the ability to revert changes you made to that single file if you break some code.
</p>

<p>
<strong>2. Can I use Git with my current web hosting provider?</strong><br />
This is a bit of an issue with Git. This website is hosted on one of Godaddy's shared hosting plans. Godaddy doesn't seem to like Git. I jumped through many hoops to try and install it via SSH, and still couldn't get it to work properly. Other shared hosting providers might be a little more Git friendly, and I'll name some in a minute, as well as list other forms of hosting.
</p>

<p>
<strong>3. I have to install Git on my local machine... and it needs to be on a web host, too?</strong><br />
Git works locally, and on the server side. It's not an app with a user interface, but rather a package on the machine. It's installed by default on Mac, and can be installed easily on Windows. Git manages all of your files in a specified directory, and keeps track of when changes are made to them. It gives you the ability to undo changes you made far down the road when you realize you broke something on the site, among lots of other advantages. And to be clear, I'm just explaining simple usage for web projects &mdash; there are a million and one other features & uses that you can read about more <a href="https://git-scm.com/about">here</a>.
</p>


<p>
<strong>4. What's a repo? Would it be the live web directory?</strong><br />
A Git repo is essentially a directory where your project is located. In the local directory, you must first <a href="https://www.kernel.org/pub/software/scm/git/docs/git-init.html">initialize</a> a Git repo, and it puts it under version control. From there, you can <a href="https://www.kernel.org/pub/software/scm/git/docs/git-push.html">push</a> it to a remote repo. This remote repo <em>could</em> be the home of your web directory ( something like /your-site/public_html/ ) or it could be located on a server dedicated to hosting repos. The latter would be something like GitHub, where they host repos and create a social environment around them that allows you to share code and build upon it freely.
</p>

<p>
<strong>5. Whoa, use the command line?</strong><br />
Yes, to use Git you will need to use terminal (or command prompt) for Git commands. 
<br />
I know, I know, the Terminal can be scary. I don't know much about Unix, but learning basic commands is very useful &mdash; especially while dealing with Git. You can use an app with an easy-to-understand user interface, but for learning purposes it's best to start on the command line. Figure out what's going on first; you can search for shortcuts later.
</p>

<h2>Hosting Your Website & Git Repositories</h2>

<h3>Beanstalk</h3>
<p>
One great repo hosting provider is Beanstalk. They host Git, SVN, and Mercurial repos. They also allow you to deploy your repos via SSH, FTP, SFPT and more, to your web host. It's the best of both worlds: you've got your site under version control with a hosted repo, and you're still using your web host like you usually would. The problem? The cheapest Beanstalk plan is $15 a month, and that would be on top of your web hosting bill. If your site brings in money, this would be a great way to go. But for me, it's just too expensive to pay for 2 providers.<br />
<a href="https://beanstalkapp.com/">Learn More</a>
</p>

<h3>GitHub Pages</h3>
<p>
But don't worry, there are other options. Heroku and GitHub both allow you to host a website repo and point your domain to them. The problem I have, though, is this is really not made clear for people who intend to host websites. GitHub has a service called Pages, but when I first looked into it I hadn't the slightest clue how to sign up or use it. What's the bandwidth like? Storage space? Databases? Language support? But I digress, that's a topic for another post.<br />
<a href="https://pages.github.com/">Learn More</a>
</p>

<h3>Heroku</h3>
<p>
Heroku is a bit more user friendly. Still, though, when someone like me comes to their website looking for web hosting, they didn't do a great job of advertising that aspect of their service. Alas, after some reading, I learned they <em>did</em> support PHP, and they allow you to point your domain name to your Heroku repo. Finally. <a href="https://www.coldcoffeephp.com/">ColdCoffee</a>, a front end website template I made, is hosted on Heroku, and the domain is provided by GoDaddy. To learn more about hosting a site with Heroku, check out <a href="https://devcenter.heroku.com/articles/custom-domains">this article</a>.<br />
<a href="https://www.heroku.com/">Learn More</a>
</p>

<h3>Hosting with a regular ol' web host</h3>
<p>
This differs depending on the host. Like I said before, it's next to impossible to successfully install git on Godaddy. <a href="https://dren.ch/git-on-godaddy/">Here's</a> a post explaining how to, but again it's not easy. As for other hosts, some of the more developer-friendly ones have it installed by default. This is awesome. However, if yours doesn't, you'll have to install it manually. Since it differs with each provider, you're going to have to google around and check the hosts' FAQ and support for any information. If you don't have SSH access, then it's time to switch hosts. If you do, be on the lookout for SSH features your host disables. This is common on shared hosting. A good developer friendly host that supports git is <a href="https://www.a2hosting.com/">A2 Hosting</a>.<br />
<strong><a href="https://joemaller.com/990/a-web-focused-git-workflow/">Here's</a> a great article explaining how to manually set up a web based git workflow.</strong><br />
</p>




<h2>A Simple Git Workflow For Websites</h2>

<p>

To put in simplest terms, here's how git <em>could</em> work for your website. These conditions differ based on how you've set things up.
</p>



<ol>
    <li>Make changes to your website locally.</li>
    <li>Commit the files to your local repo. (these changes are only on your machine)</li>
    <li>Check the status of all your website files &mdash; what's been edited? When, how, and why was it edited?</li>
    <li>Everything looks good? Push the local repo to the remote repo.</li>
</ol>

<p>The remote repo can be a number of things. It could be the live website directory on your web server, a GitHub repo associated with GitHub Pages, or a Heroku app with a custom domain.</p>

<p>You pushed only the edited files, you have no duplicates, git ignored those hidden files like .DS_Store, and if you mess anything up you can revert your changes and push once again to the live website repo. Pretty cool, eh?</p>


<h2>To Sum Up</h2>


<p>Using Git for websites, at present time, isn't very easy to set up. Standard web hosting providers don't go into much detail about their support of it, nor do any have a system set up for hosting repos and deploying them to live website directories. On the other end, services dedicated to Git and other version control systems don't cater towards those looking to host a website. They may be able to, but I personally think it's difficult to find resources and support on this topic. A coworker of mine said the same thing; he had a vague understanding of hosting Git repos but upon looking into Heroku and GitHub, he just left confused. Maybe it's just us, or maybe there are plenty of other web designers out there who are confused as well.</p>

<p>Past the confusion and tedious setup, Git can be very useful for web designers and large app development teams alike. If you're a web dev hearing all this buzz about Git but don't understand how it can apply to you, I hope this gave you a little insight or maybe cleared up some of the confusion.</p>

<p>Cheers,<br />
Matt</p>

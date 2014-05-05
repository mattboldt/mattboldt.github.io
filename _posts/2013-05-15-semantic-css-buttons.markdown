---
layout: post
title:  Semantic Buttons
desc: An obvious common trait of any web app landing page, download page, or any other website offering a product, are the large call-to-action buttons. I usually prefer beginning with a vague idea of a button style, and then code it all (or most) in CSS from the get-go. Button styles will always be subjective, and will need to be custom per website, color scheme, etc. One thing that doesn't change much is the markup and structure used...
date:   2013-05-15 19:30:00
categories: html, css
---

<p>An obvious common trait of any web app landing page, download page, or any other website offering a product, are the large call-to-action buttons. I usually prefer beginning with a vague idea of a button style, and then code it all (or most) in CSS from the get-go. Button styles will always be subjective, and will need to be custom per website, color scheme, etc. One thing that doesn't change much is the markup and structure used.</p>

<img src="/demos/semantic-buttons/img/buttons-semantic.png" alt="Semantic Button Layout" width="100%" class="full-img"/>
<span class="demo-link">
<a href="/demos/semantic-buttons/">View Live Demo</a>
<a href="http://www.github.com/mattboldt/semantic-buttons/">See the Code</a>
</span>

<h3>Buttons...</h3>

<ul>
   <li>Have different colors, but in the same style.</li>
   <li>Have descriptive text that lives near the button.</li>
   <li>Have optional tooltips on button hover.</li>
   <li>Need to be laid out either horizontally, or vertically depending on container size &amp; shape.</li>
   <li>Have variable widths, based on container size &amp; shape.</li>
   <li>Must comply with their surroundings, so as to not break the layout of other elements nearby.</li>
</ul>

<p>
As I said before, I prefer pure CSS buttons. Most everything a button needs can be done with CSS, with an exception of more unique and particular designs that code either isn't capable of or would be impractical to use for. A downside to using pure CSS, obviously, is backwards compatibility. I tend to design with this in mind, and keep basic user functionality intact on browsers that don't support CSS gradients, shadows, and the like. This means creating hover and click states what will (partially) gracefully degrade in way that also makes sense on old browsers.
</p>

<h3>Button Examples in the Wild</h3>

<img src="/demos/semantic-buttons/img/buttons-dropbox.png" alt="Dropbox Download Button" width="100%" class="full-img" />
<img src="/demos/semantic-buttons/img/buttons-realmac.png" alt="Realmac Software Buy Buttons" width="100%" class="full-img"/>
<img src="/demos/semantic-buttons/img/buttons-wireframe.png" alt="Button Wireframe" width="100%" class="full-img"/>
<p>

The above examples show the typical layout for a call-to-action button. Large button with centered content inside, descriptive text nearby with possible other links, and the ability to add things like tooltips to the existing code without breaking structure. Now, these examples use their own layout. If you were to go and view their source, I'm sure it would be very different. But, this is a pattern I have to build so often that I've sought out to make a standard structure of which I'll follow moving forward in development.
</p>


<h2>The Markup</h2>

~~~ html

<div class="btn-wrap">
	<div class="btn">
		<a href="#">Download Now</a>
		<p>For <a href="#">Mac</a> and <a href="#">Windows</a></p>
	</div>
</div>

~~~

<p>

Here you see a button wrapper <span class="inline-code">div class=btn-wrap</span> From there, each <span class="inline-code">a href</span> button lives inside <span class="inline-code">div class=btn</span>. This gives us the ability to position a number of buttons in an area of our choice, with the option to exclude <span class="inline-code">btn-wrap</span>, and instead use the <span class="inline-code">btn</span> classes separate. Each <span class="inline-code">div class=btn</span> can also contain a paragraph, pre, div, etc of additional content relevant to the surrounding button. Marking it up in this way gives you complete control over text layout and styling, grouping multiple buttons, or using singular buttons without any descriptive text <strong>anywhere you want on the page</strong>.

</p>



<p>

Another important thing to consider is responsive layout. These buttons can either grow with the content inside them, or fill their parent container. This can be seen in the live demo as you resize the browser window to a mobile device's viewport size. With media queries, I've added a display property to the base <span class="inline-code">btn</span> class that makes it fill its container. There's also a <span class="inline-code">btn-block</span> class that can be added to make the child buttons <span class="inline-code">display:block</span> by default in a normal sized window.

</p>

<h2>The Sass</h2>

<p>I used Sass's mixin and variable features to draw customizable CSS background gradients. I also made good use of class nesting and parent selecting, which you'll see more of in a moment. Not using Sass? Take a moment to check it out <a href="http://sass-lang.com/" rel="nofollow">here</a>.</p>


<h3>Base Button Class</h3>
~~~ scss

.btn{
	display: inline-block;
	position: relative;
	margin:0 10px;
	text-align: left;
	vertical-align: top;

	& > a{
		display: block;
		position: relative;
		padding:0.8em 1.75em 0.7em;

        /* ---- BG Gradient Mixin ---- */
		$basecolor: #CCC;
		background-color:$basecolor;
		@include btn-gradient(top, $basecolor, 10%, 10%);

		&:hover{
			@include btn-gradient(top, $basecolor, 15%, 10%);
		}
		&:active{
			@include btn-gradient(top, $basecolor, 5%, 10%);
		}

	}
 }
~~~

<p>

This is what makes up our button structure. We wrap the <span class="inline-code">a href</span> in <span class="inline-code">div class=btn</span> to control display and layout options, such as displaying them inline or block, floated or not, with margins and padding, etc. You'll notice I used the child combinator (greater-than sign) on my anchor. This is so that only the first anchor in the div is affected by the button styles, and that other descriptive text nearby can also have links without problem. Also, see that <span class="inline-code">@include btn-gradient()</span>? That's a Sass mixin, and it will be defined later.

</p>

<h3>Customizing Buttons</h3>

~~~ scss
.btn-blue{
     /* Add unique background color and gradient styles */
	a{ $basecolor:#34A2FF; @include btn-gradient(top, $basecolor, 10%, 10%);
		&:hover{ @include btn-gradient(top, $basecolor, 15%, 10%); }
		&:active{ @include btn-gradient(top, $basecolor, 5%, 10%); }
	}
}
.btn-green{
	a{ $basecolor:#33BF39; @include btn-gradient(top, $basecolor, 10%, 10%);
		&:hover{ @include btn-gradient(top, $basecolor, 15%, 10%); }
		&:active{ @include btn-gradient(top, $basecolor, 5%, 10%); }
	}
}
~~~

<p>

Here you see classes that can extend the original <span class="inline-code">div class=btn</span> to incorporate other colors and styles. In this case, we've got a blue and green button, both with their own hover and active states. Because of variable scope in Sass, we do have to <span class="inline-code">@include</span> the background gradient mixin again on hover and active states. If we didn't, the button would fall back on its original styles and the variable that is set in its default class.

</p>

<h3>The Background Gradient Sass Mixin</h3>
~~~ scss

@mixin btn-gradient($dir, $basecolor, $hi, $lo){
	background-color:$basecolor;
	background-image: -webkit-linear-gradient($dir, lighten($basecolor, $hi), darken($basecolor, $lo));
	background-image: -moz-linear-gradient($dir, lighten($basecolor, $hi), darken($basecolor, $lo));
	background-image: -ms-linear-gradient($dir, lighten($basecolor, $hi), darken($basecolor, $lo));
	background-image: -o-linear-gradient($dir, lighten($basecolor, $hi), darken($basecolor, $lo));
	background-image: linear-gradient($dir, lighten($basecolor, $hi), darken($basecolor, $lo));
}

~~~


<p>

This mixin takes 4 arguments to create linear background gradients: Direction, Base Color, Hi, and Lo values for gradient intensity. The <span class="inline-code">$hi</span>and <span class="inline-code">$lo</span> variables are the percent at which <span class="inline-code">$basecolor</span> is lightened or darkened. <span class="inline-code">lighten()</span> and <span class="inline-code">darken()</span> are features of Sass.

</p>

<p>
This style is actually new to me. Up until now, I've used transparent gradients to get the effect I want, like this: <span class="inline-code">background-image: linear-gradient(top, rgba(255,255,255,0.1), rgba(0,0,0,0.1) );</span></p>


<p>
But, this method has some issues. Using transparent white and black means the button color can become slightly desaturated with higher opacity values. RGBA also isn't supported everywhere (but then again neither is <span class="inline-code">linear-gradient</span>). The new method I'm using takes the base color of the button, and creates a light and a dark starting and stopping point for the gradient. Sass takes care of figuring the color codes for me so I don't have to go back and fourth from image editors to find the right shade. It might sound lazy, but the colors tend to come out great.
</p>

<h2>Summing Up</h2>
<p>

After recently employing this method on the sites I build at work, I realized the buttons become very versatile and receptive to change in surrounding layout. I had to re-design a page header incorporating these buttons, and after swapping a few class names I had them laid out exactly how I needed them without redoing any CSS. While obviously the design will always change, I believe this code structure is very helpful. Please, share your thoughts with me on <a href="http://www.twitter.com/atmattb/">Twitter</a>.

</p>

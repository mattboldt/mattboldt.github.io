---
layout: post
title:  iPhone 5 in CSS and One HTML Tag
desc: <p>A while back, I published a CSS3 experiment of mine on my website, as well as on Codepen. It was an iPhone 5, rendered entirely in CSS, and using only one HTML element.</p>
date:   2014-05-01 23:19:56
categories: jekyll update
---

<img class="full-img" src="/content/img/html-and-css/css-iphone-5.png" alt="The iPhone 5 in Pure CSS and One HTML Tag" />

<span class="demo-link"><a href="/css3-iphone5/">View Live Demo</a></span>

<h3>Overview</h3>
<p>A while back, I published a CSS3 experiment of mine on my website, as well as on <a href="http://codepen.io/mattboldt/pen/jbvfG">Codepen</a>. It&rsquo;s an iPhone 5, rendered entirely in CSS, and using only one HTML element. After seeing some similar CSS projects like my own, I figured I would see if I could pull it off. Although impractical, it really shows how powerful CSS really is, and what its future holds. By utilizing the CSS3 box-shadow and gradient properties, you are able to render graphics, sometimes pixel by pixel, with a nearly photo-finish accuracy. As always, browser support for things like these is rather unpredictable; but for the most part, my particular experiment rendered well when viewed through a number of browsers. Safari, Chrome, and Firefox performed well. I can&rsquo;t say I even tried to view it with Internet Explorer... Doing the strenuous task of placing box shadows pixel-by-pixel wasn&rsquo;t the most fun I&rsquo;ve had coding, but it helped me understand the kind of ways those properties can be manipulated. </p>

<h3>Using box-shadow to plot points</h3>
<p>
Box shadows are meant to add dimension to HTML elements, but they can also be manipulated to plot pixels and create effects you may have not thought possible. Example below.
</p>
<pre class="brush: css;">

.shadow{
    width:120px;
    height:120px;
    background:lightblue;
    border-radius:5px;

    box-shadow:#000 0px 2px 20px;
}

<div class="shadow"></div>

</pre>
<img class="demo-img" src="/content/img/html-and-css/box-shadow-box.png" width="250" alt="CSS3 Box-shadow" />


<p>
This is the usual use of box-shadow. The shadows adhere to the element&rsquo;s size and shape, and can be either subtle additions or heavy 3D effects. But if we take to the more experimental usage of box-shadow, we could do something like...</p>
<pre class="brush: css;">

 .shadow{
			width:7px;
			height:7px;
			background:lightblue;
			
			box-shadow:#000 25px 5px 0px,
					   #000 15px 20px 0px,
					   #0CC 10px 30px 0px,
					   #000 12px 5px 0px,
					   #C0C 40px 12px 0px;
		}

<div class="shadow"></div>

</pre>

<img class="demo-img" src="/content/img/html-and-css/box-shadows.png" width="600" alt="Plotting pixels with box-shadow" />

<p>
Here the shadows are dots, relative to the size of the origin html element, and positioned by the box-shadow property. These shadows are always relative to their element&rsquo;s shape, size, and position.

</p>


<h3>Using gradients to plot points</h3>
<p>Another, slightly less reliable way to plot single pixels is to use radial gradients. The gradients will work inside the html element and appear one over the other in the order they&rsquo;re placed.</p>

<pre class="brush: css;">

.dots{
	width:200px;
	height:200px;
	background:
			-webkit-radial-gradient(10px 10px, circle, #333 0%, rgba(0, 0, 0, 0) 2%),
			-webkit-radial-gradient(20px 20px, circle, #CCC 0%, rgba(0, 0, 0, 0) 2%),
			-webkit-radial-gradient(35px 10px, circle, #0c0 0%, rgba(0, 0, 0, 0) 2%),
			-webkit-radial-gradient(50px 15px, circle, red 0%, rgba(0, 0, 0, 0) 2%);
}

<div class="dots"></div>

</pre>

<img src="/content/img/html-and-css/radial-gradient-dots.png" width="300" alt="CSS Radial Gradient Dots" />

<h3>Using :before and :after</h3>
<p>When creating a graphic using only one html element, you&rsquo;ve essentially got 3 objects to work with. The main html element, the :before, and the :after. :before and :after allow you to create objects (by default, :before is above or behind, and :after is below or after) around the one html element without having to use more html tags that may be unnecessary or undesired. Example:</p>

<pre class="brush: css;">
		.element{
			width:120px;
			height:120px;
			padding:5px;
			background:lightblue;		
		}
			.element:before{
				content:"I\2019m before";
				display: block;
				padding:5px;
				position: absolute;
				margin:-20px 0 0 -100px;
				background:lightgreen;
			}
			.element:after{
				content:"I\2019m after";
				display: block;
				padding:5px;
				position: absolute;
				margin:20px 0 0 140px;
				color:#fff;
				background:darkred;
			}

     <div class="element">I&rsquo;m the main element</div>
</pre>

<img src="/content/img/html-and-css/before-after.png" width="400" alt="CSS :before and :after" />

<p>
These can be used to create things like shapes under tooltips, quotation marks around an element, or any other addition that just shouldn&rsquo;t need its own html element. The pros of using :before and :after are that we&rsquo;re not using extra markup, and they can be created and stylized dynamically. For instance, we could dynamically insert content into the :before of an element, and create an on-hover tooltip with CSS and JavaScript.
</p>

<pre class="brush: css;">
       .element{
			width:120px;
			height:50px;
			padding:5px;
			background:lightblue;
			border-radius:5px;	
		}
			.element:hover:before{
				display: block;
			}
			.element:before{
				content:"The Tooltip";
				display: none;
				padding:5px;
				position: absolute;
				margin:-50px 0 0 0;
				background:lightgreen;
				box-shadow:#666 0px 0px 10px;
			}

<div class="element">Hover Over Me</div>
</pre>

<img src="/content/img/html-and-css/hover-tooltip.png" width="350" alt="Pure CSS Tooltip" />

<h3>To Sum Up</h3>
<p>You can get away with a lot in CSS. Of course, relying on these methods to display content isn&rsquo;t a good idea as they are not supported on every browser, and they may look different on each browser that <strong>does</strong> support CSS3, which is kind of a pain.</p>

<p>In my next post all go into more depth about using :before and :after in a more practical sense.</p>

<p>Cheers,<br />
Matt</p>
</strong></p>
</p></p>
</p>
</p></div>
</p></h>

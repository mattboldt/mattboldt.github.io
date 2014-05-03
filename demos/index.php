<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<?php
set_include_path( implode( PATH_SEPARATOR, array(
"../",
get_include_path()
) ) );
include_once("assets/php/master.php");
?>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Demos | Matt Boldt</title>
<?php include_once($styles);?>
<link href="/demos/css/main.css" rel="stylesheet" />
<?php include_once($scripts);?>
<?php include($GA_tracking);?>
<style>._nav-demos a{color:#333;background:#fff;}</style>
</head>

<body>

<?php include($module); ?>

<div class="module-body">

	<h1 class="h1 page-title">
		Demos, Experiments, and Other Fun
	</h1>

		<div class="demo-block">
			<div class="demo-frame-wrap">
				<div class="demo-cover"></div>
				<iframe class="demo-frame" src="/demos/css-apple-nav/" frameborder="0" scrolling="no"></iframe>
			</div>
			<div class="demo-title">
				<a href="/demos/css-apple-nav/">Apple.com's Nav Bar</a>
			    <p>The History of Apple.com's Nav Bar in CSS</p>
			</div>
		</div>

		<div class="demo-block">
			<div class="demo-frame-wrap">
				<div class="demo-cover"></div>
				<iframe class="demo-frame" src="/demos/typed-js/" frameborder="0" scrolling="no"></iframe>
			</div>
			<div class="demo-title">
				<a href="/demos/typed-js/">Typed.js</a>
			    <p>A jQuery plugin that animates typing.</p>
			</div>
		</div>

		<div class="demo-block">
			<div class="demo-frame-wrap">
				<div class="demo-cover"></div>
				<iframe class="demo-frame" src="/demos/semantic-buttons/" frameborder="0" scrolling="no"></iframe>
			</div>
			<div class="demo-title">
				<a href="/demos/semantic-buttons/">Semantic Buttons</a>
			    <p>Versatile, semantic buttons made with HTML and Sass.</p>
			</div>
		</div>

		<div class="demo-block">
		    <div class="demo-frame-wrap">
				<div class="demo-cover"></div>
				<iframe class="demo-frame" src="/css3-iphone5/index.htm" frameborder="0" scrolling="no"></iframe>
			</div>
			<div class="demo-title">
				<a href="/css3-iphone5/">CSS3 iPhone 5</a>
			    <p>An iPhone 5 made with CSS and 1 HTML tag.</p>
			</div>
		</div>

		<div class="demo-block">
		    <div class="demo-frame-wrap">
				<div class="demo-cover"></div>
				<iframe class="demo-frame" src="/css3-macbook-air/index.htm" frameborder="0" scrolling="no"></iframe>
			</div>
			<div class="demo-title">
				<a href="/css3-macbook-air/">CSS3 MacBook Air</a>
		    	<p>MacBook Air made with CSS. Responsive to screen resolution.</p>
			</div>
		</div>

		<div class="demo-block">
		    <div class="demo-frame-wrap">
				<div class="demo-cover"></div>
				<iframe class="demo-frame" src="/demos/calculator/index.htm" frameborder="0" scrolling="no"></iframe>
			</div>
			<div class="demo-title">
				<a href="/demos/calculator/">CSS3 Calculator</a>
		    	<p>Fully functional calculator made with CSS and JavaScript.</p>
			</div>
		</div>

		<div class="demo-block">
		    <div class="demo-frame-wrap">
				<div class="demo-cover"></div>
				<iframe class="demo-frame" src="http://www.coldcoffeephp.com" frameborder="0" scrolling="no"></iframe>
			</div>
			<div class="demo-title">
				<a href="http://www.coldcoffeephp.com">ColdCoffee</a>
		    	<p>A simple front-end website boilerplate and template system.</p>
			</div>
		</div>

		<div class="demo-block">
		    <div class="demo-frame-wrap">
				<div class="demo-cover"></div>
				<iframe class="demo-frame" src="/demos/css3-sms/index.htm" frameborder="0" scrolling="no"></iframe>
			</div>
			<div class="demo-title">
				<a href="/demos/css3-sms/">CSS3 SMS Bubbles</a>
		    	<p>iOS SMS Bubbles designed with CSS, animated with jQuery.</p>
			</div>
	</div>


	<?php include_once($footer); ?>
</div>

    	





        
</body>
</html>
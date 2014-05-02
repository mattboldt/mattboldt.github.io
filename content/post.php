<?php
set_include_path( implode( PATH_SEPARATOR, array("",get_include_path()))); include_once("assets/php/master.php");
	
	// Grab the url and change to lowercase
	$title_url = mysql_real_escape_string($_GET['title']);

	// Main query for entries
	$result = mysql_query("SELECT * FROM mb_blog_content WHERE url='$title_url' and is_active='TRUE' LIMIT 1") or die(mysql_error());
	// if the post doesn't exist
	if( mysql_num_rows($result) === 0 ){
		died();
	}

	while ($row = mysql_fetch_array($result)) {
		$date = date("F d, Y", $row['timestamp']);
		$title = stripslashes($row['title']);
    	$entry = stripslashes($row['entry']);
    	$timestamp = $row['timestamp'];
		$get_categories = mysql_query("SELECT * FROM mb_blog_categories WHERE category_id = $row[category]");
		$category = mysql_fetch_array($get_categories);
		$category_url = $category['category_url'];
	}

	$prev_url = "";
	$next_url = "";
	$prev_req = mysql_query("SELECT url FROM mb_blog_content WHERE timestamp < $timestamp ORDER BY timestamp DESC LIMIT 1");
		$prev_row = mysql_fetch_array($prev_req);
		$prev_url = $prev_row['url'];

	$next_req = mysql_query("SELECT url FROM mb_blog_content WHERE timestamp > $timestamp ORDER BY timestamp ASC LIMIT 1");
		$next_row = mysql_fetch_array($next_req);
		$next_url = $next_row['url'];

?>
<!DOCTYPE html>
<html itemscope itemtype="http://schema.org/Article" xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="icon" type="image/x-icon" href="/assets/img/favicon.ico" />
<meta name="description" content="<?php echo $title; ?>" />
<!-- Mobile device view -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!-- G+ author & publisher -->
<link rel="author" href="http://plus.google.com/100085691725629323730/"/>
<link rel="publisher" href="http://plus.google.com/100085691725629323730/"/>
<!-- G+ content -->
<meta itemprop="name" content="Web Development &amp; Design Blog by Matt Boldt">
<meta itemprop="image" content="http://www.mattboldt.com/assets/img/avatar.jpg">
<meta itemprop="description" content="<?php echo $title; ?>">
<!-- G+ Open Graph -->
<meta property="og:title" content="Web Development &amp; Design Blog by Matt Boldt" />
<meta property="og:image" content="http://www.mattboldt.com/assets/img/avatar.jpg" />
<meta property="og:description" content="<?php echo $title; ?>" />
<!-- Twitter card -->
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@atmattb">
<meta name="twitter:creator" content="@atmattb">
<meta name="twitter:title" content="Web Development &amp; Design Blog by Matt Boldt">
<meta name="twitter:description" content="<?php echo $title; ?>">
<meta name="twitter:image" content="http://www.mattboldt.com/assets/img/avatar.jpg">
<meta name="twitter:domain" content="mattboldt.com">

<!-- External assets DSN -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//platform.twitter.com">
<link rel="dns-prefetch" href="//www.google-analytics.com">
<link rel="dns-prefetch" href="//p.twitter.com">
<link rel="dns-prefetch" href="//cdn.api.twitter.com">

<title><?php echo $title ?> | by Matt Boldt</title>
<?php include_once($styles);?>
<?php include_once($scripts);?>
</head>
<body>

<?php include($module); ?>

<div class="module-body">
	<div class="module-inner-wrap post">
        
        <article>
	        <h1 class="h1 page-title">
	        	<?php echo $title ?>
	        </h1>
	        		<div class="share-button"><a href="https://twitter.com/share" class="twitter-share-button" data-via="atMattb" data-count="none">Tweet</a></div>
					<div class="share-button"><div class="g-plusone" data-size="tall" data-annotation="none"></div></div>
		       		
		       		<p class="entry-info">
			        	<?php echo $date ?><br />
			        	Posted in <a href="/posts/<?php echo $category_url; ?>/"><?php echo $category['category_name']; ?></a>
			        </p>

			        <!-- Article -->
			        <?php echo $entry ?>
			        <!-- End Article -->
        </article>
        <a href="https://twitter.com/share" class="twitter-share-button" data-via="atMattb" data-count="none">Tweet</a>
		<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script><br />
        
        
        
<div id="disqus_thread"></div>
<script type="text/javascript">
var disqus_shortname = 'mattboldt'; 
(function() {
var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>

<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
<!-- Place this tag after the last +1 button tag. -->
<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
        

</div>
<?php include_once($footer); ?>
</div>


</body>
</html>

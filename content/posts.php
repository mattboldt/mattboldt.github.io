<?php

	$sql = "SELECT * FROM mb_blog_content WHERE is_active='TRUE' ORDER BY timestamp DESC LIMIT 0,20";
	//$sql = "SELECT * FROM mb_blog_content WHERE is_active='TRUE' ORDER BY timestamp DESC LIMIT ".($posts_per_page*$current_page).",".$posts_per_page;
	$result = mysql_query($sql) or die(mysql_error());
	

	
	
	while ($row = mysql_fetch_array($result)) {
		$id = $row['id'];
		$date = date("F d,", $row['timestamp']);
		$year = date("Y", $row['timestamp']);
		$title = stripslashes($row['title']);
		$url = $row['url'];
		$entry = stripslashes($row['entry']);
    	$short_entry = stripslashes($row['short_entry']) . "<p><a href=/$url/>Read More</a><p>";
		
			
		$get_categories = mysql_query("SELECT * FROM mb_blog_categories WHERE category_id = $row[category]");
		$category = mysql_fetch_array($get_categories);
		// Format category name for its URL
		$category_url = $category['category_url'];
		
	
		?>
		
        	<div class="entry">
	            <article>
		            <h1 class="h2"><a href="/<?php echo $url; ?>/"><?php echo $title; ?></a></h1>
		            
		            <span class="entry-info"><?php echo $date ?> <?php echo $year ?> 
		            Posted in <a href="/posts/<?php echo $category_url; ?>/"><?php echo $category['category_name']; ?></a>
		            </span>
	
		            <?php echo $short_entry ?>
	                
	            </article>
            </div>
        
        <?php
		
	}

?>
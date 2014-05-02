
<html>
<head>
<title></title>

<?php

	set_include_path( implode( PATH_SEPARATOR, array(
	$_SERVER['DOCUMENT_ROOT'],
	get_include_path()
	) ) );
	include_once("assets/php/master.php");
	mysql_connect ($db_hostname, $db_username, $db_password);
	mysql_select_db ($db_name);

	$result = mysql_query("SELECT FROM_UNIXTIME(timestamp, '%Y') AS get_year, COUNT(*) AS entries FROM mb_blog_content GROUP BY get_year") or die(mysql_error());

?>
</head>
<body>
<?php


while ($row = mysql_fetch_array($result)){
		$get_year = $row['get_year'];
		$entries = $row['entries'];
		?>
        
        <a href="archive.php?year=<?php echo $get_year; ?>">Entries from <?php echo $get_year; ?>:</a> <?php echo $entries; ?><br />
		
        <br />
       <?php
	}
	mysql_close();

	?>


</body></html>
<?php
	$root = $_SERVER['DOCUMENT_ROOT'];
	include($root . "/php/master.php");
	
if(isset($_POST['submit_comment'])){
	if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['comment'])){
		die("Try again");
	}
	$entry = htmlspecialchars(strip_tags($_POST['entry']));
    $timestamp = htmlspecialchars(strip_tags($_POST['timestamp']));
    $name = htmlspecialchars(strip_tags($_POST['name']));
    $email = htmlspecialchars(strip_tags($_POST['email']));
    $url = htmlspecialchars(strip_tags($_POST['url']));
    $comment = htmlspecialchars(strip_tags($_POST['comment']));
	$comment = nl2br($comment);
	
	if (!get_magic_quotes_gpc()) {
        $name = addslashes($name);
        $url = addslashes($url);
        $comment = addslashes($comment);
    }
	if (!eregi("^([_a-z0-9-]+)(\.[_a-z0-9-]+)*@([a-z0-9-]+)(\.[a-z0-9-]+)*(\.[a-z]{2,4})$", $email)) {
         die("The e-mail address you submitted does not appear to be valid. Please go back and correct it.");
    }
	
	mysql_connect ($db_hostname, $db_username, $db_password);
	mysql_select_db ($db_name);
	
	$result = mysql_query("INSERT INTO mb_blog_comments (entry, timestamp, name, email, url, comment) VALUES ('$entry','$timestamp','$name','$email','$url','$comment') ");
	
	header("Location: single-entry.php?id=" . $entry);
}
else{
	die("You can't be here!");
}

?>
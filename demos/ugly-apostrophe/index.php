<html>
<head>
<?php
set_include_path( implode( PATH_SEPARATOR, array(
"../../",
get_include_path()
) ) );
include_once("assets/php/master.php");
?>
<?php include($scripts); ?>
<script>
$(function(){
	$("*").each(function (i, ap) { 
	   if ($(this).children().length == 0) { 
	      $(this).text($(this).text().replace("'","<span class='apostrophe'></span>")); 
	   }
	   $(".apostrophe").html("&#39;");
	});
});
</script>
</head>

<body>
&#39;

this is a sentence and here's an apostrophe

</body>
</html>
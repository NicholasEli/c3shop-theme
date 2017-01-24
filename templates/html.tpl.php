<?php print $doctype; ?>
<html lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf->version . $rdf->namespaces; ?>>
<head<?php print $rdf->profile; ?>>
  <?php print $head; ?>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php print $head_title; ?></title>  
  <?php 
  	print $styles;
  	print $scripts; 
  ?>
</head>
<?php

	$url = drupal_get_path_alias();
  $id = explode('/',$url)[0];

?>
<body id="<?php print $id ;?>" class="<?php print $classes; ?>" <?php print $attributes;?>>
<?php 
	print $page_top;
 	print $page;
  print $page_bottom;
?>
</body>
</html>


<?php
	hide($content['field_panel_subtitle']);
	hide($content['field_brand_logo_light']);
	hide($content['field_logo_fill_light']);
	hide($content['field_brand_logo_dark']);
	hide($content['field_logo_fill_dark']);
	hide($content['field_panel_official_page_link']);
	hide($content['field_panel_body_text']);
	hide($content['field_panel_background_image']);
	hide($content['field_brand_categories‎']);
	hide($content['field_related_product']);
	hide($content['field_panel_official_page_link']);
	//panel image teaser
	hide($content['field_panel_full_background_imag']);

	$image = $content['field_panel_background_image']['#items'][0]['uri'];
	$fullimage = file_create_url($content['field_panel_full_background_imag']['#items'][0]['uri']);
	$body = $content['field_panel_body_text']['#items'][0]['value'];

	$categories = field_get_items('node', $node, 'field_brand_categories');
?>

<?php if ($view_mode == 'teaser') {?>

	<a class="panel" href="<?php print $node_url; ?>" style="background-image: url('<?php print file_create_url($image);?>')">
		<div class="container">
			<div class="panel__content-box-logo panel__content-box-logo--light">
				<?php
					$logo_light = $colorValue = field_get_items('node', $node, 'field_brand_logo_light');
					if($logo_light){
						$uri = $content['field_brand_logo_light']['#object']->field_brand_logo_light['und'][0]['uri'];
						$type = explode('.',$uri);
						if($type[1] != 'svg'){
							print '<img src="'.$uri.'">';
						}else{
							$id = str_replace(" ", "-", $title);
							print '<style>#' . $id . ' svg *{ fill:' . $content['field_logo_fill_light']['#items'][0]['rgb'] . ' !important;}</style>';
							print '<div id="' . $id . '">';
								$path = file_create_url($uri);
								print file_get_contents($path);
							print '</div>';
						}
					}
				?>
			</div>
			<div class="panel__content-box-body">
				<div class="button__plain" href="<?php print $node_url; ?>">Shop <?php print $node->title;?></div>
			</div>
		</div>
	</a>
<?php } ?>
<?php if ($view_mode == 'full') {?>
	<section class="panel panel--full-screen" style="background-image: url('<?php print $fullimage;?>');>">
		<div class="container">
				<div class="panel__content-box-logo panel__content-box-logo--dark">
					<?php
						$logo_light = $colorValue = field_get_items('node', $node, 'field_brand_logo_dark');
						if($logo_light){
							$uri = $content['field_brand_logo_dark']['#object']->field_brand_logo_light['und'][0]['uri'];
							$type = explode('.',$uri);
							if($type[1] != 'svg'){
								print '<img src="'.$uri.'">';
							}else{
								$id = str_replace(" ", "-", $title);
								print '<style>#' . $id . ' svg *{ fill:' . $content['field_logo_fill_dark']['#items'][0]['rgb'] . ' !important;}</style>';
								print '<div id="' . $id . '">';
									$path = file_create_url($uri);
									print file_get_contents($path);
								print '</div>';
							}
						}
					?>
				</div>

				<a class="link__plain--white panel__content-box-site-link" href="<?php print render($content['field_panel_official_page_link']);?>" target="_blank" class="panel__content-box-page-link">Visit Official Webpage</a>
				<div class="panel__content-box-body panel__content-box-body--full-screen">
					<h6 class="panel__content-box-subtitle"><?php print render($content['field_panel_subtitle']);?></h6>
					<?php 
						print '<p class="panel__content-body-text">' . c3_views_split_half($body, 0.5)[0] . '</p>';
						print '<p class="panel__content-body-text">' . c3_views_split_half($body, 0.5)[1] . '</p>';
					?>
				</div>
			</div>
	</section>
	<section id="related-catagories">
		<div class="container">
			<?php
	            	if($categories){
	            		$info = $content['field_brand_categories'];
	            		//kpr($content['field_brand_categories']);
	            		for($i = 0; $i < count($info['#items']); $i++){
	            			$value = $info['#items'][$i]['value'];

	            			$categoryUri = $info[$i]['entity']['field_collection_item'][$value]['field_category_image']['#items'][0]['uri'];
	            			$categoryName = $info[$i]['entity']['field_collection_item'][$value]['field_category_name']['#items'][0]['value'];
	            			$caytegoryLink = $info[$i]['entity']['field_collection_item'][$value]['field_category_link']['#items'][0]['value'];

	            			print '<a href="'.$caytegoryLink.'" class="product-category__card product-category__card--catagorey"> 
	            					   <div class="product-category__card-image">
									   		<img src="'.file_create_url($categoryUri).'" alt="'.$categoryName.'"  title="Click for '.$categoryName.'">
									   </div>
									   <div class="product-category__card-title product-category__card-title--black">
									   		'.$categoryName.'
									   </div>
									</a>';
	            		}
	            	}
	            ?>
		</div>
	</section>

	<section>
		<div class="container">
			<h2 class="title__plain title__plain--black">Featured Products</h2>
			<?php print render($content['field_related_product']); ?>
		</div>
	</section>
<?php } ?>


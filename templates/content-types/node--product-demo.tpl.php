<?php
	hide($content['field_original_product']);
	hide($content['field_product_condition']);
	hide($content['field_product_image_list']);
	hide($content['field_sku_upc']);
	hide($content['field_product_type']);
	hide($content['field_product_staff_selected']);
	hide($content['field_condition_comments']);
	// make sure to hide all fields from SKU Level
  	hide($content['product:sku']);
  	hide($content['product:title']);
  	hide($content['product:commerce_price']);
  	hide($content['product:field_commerce_msrp']);
  	hide($content['product:field_commerce_upc']);
  	hide($content['product:field_commerce_image']);
  	hide($content['product:field_commerce_brand']);

  	hide($content['product:field_commerce_demo_boolean']);
  	hide($content['product:field_commerce_condition_text']);
  	hide($content['product:field_commerce_condition_rating']);

  	hide($content['product:status']);

	$product = field_get_items('node', $node, 'field_original_product');
?>
<?php 
	if ($view_mode == 'teaser') {
		$imageList 	= $content['product:field_commerce_image']['#items'][0]['value'];
		$images 	= explode(',', $imageList);
?>

	<a href="<?php print base_path(). 'node/' . $node->nid; ?>" class="product-category__card product-category__card--medium">
		<div class="product-category__card-image">
			<img src="<?php print base_path() . 'sites/default/files/commerce-images/' . $images[0]; ?>">
		</div>
		<div class="product-category__card-title product-category__card-title--demo">Demo</div>
		<div class="product-category__card-title product-category__card-title--black"><?php print $title; ?></div>
		<div class="product-category__card-sku product-category__card-title--gray"><?php print render($content['product:sku']); ?></div>
		<div class="product-category__card-msrp-price">
			<div class="product-category__card-msrp"><?php print render($content['product:field_commerce_msrp']); ?></div>
			<div class="product-category__card-price"><?php print render($content['product:commerce_price']); ?></div>
		</div>
	</a>
<?php } ?>

<?php if ($view_mode == 'full') {
	$id = $content['field_original_product']['#items'][0]['target_id'];
	$upc = $content['field_sku_upc'];
	$condition = $content['product:field_commerce_condition_rating'];
	$type = $content['field_original_product'][0]['node'][$id]['field_product_type']['#bundle'];
	$imageList = $content['field_product_image_list'][0]['#markup'];
	$image = explode(',', $imageList);
	$description = $content['field_original_product'][0]['node'][$id]['field_product_description']['#items'][0]['value'];
	$vid = $content['field_original_product'][0]['node'][$id]['field_product_video'];
	$feature = $content['field_original_product'][0]['node'][$id]['field_product_features_list'];
	$info = $content['field_original_product'][0]['node'][$id]['field_product_support_info'];
	$dimensions = $content['field_original_product'][0]['node'][$id]['field_product_dimensions']['#items'][0]['value'];
	$relatedProducts = $content['field_original_product'][0]['node'][$id]['field_related_product'];

	$comments = render($content['product:field_commerce_condition_text']);
	$demo = field_get_items('node', $node, 'product:field_commerce_demo_boolean');
	$image_array = explode(",", $content['product:field_commerce_image'][0]['#markup']);

?>
	<section id="left-container">
	  <div id="product-gallery">
		<div class="product__gallery">
		  <div class="swiper-wrapper">
		    <?php 
			    	foreach ($image_array as $image){
			      		print '<div class="swiper-slide"><img src="'. base_path() . 'sites/default/files/commerce-images/' . $image .'"></div>';
					}
				?>
		  </div>
		</div>
		<div class="swiper-container product__gallery-pagination">
		  <div class="swiper-wrapper">
		    <?php 
			    	foreach ($image_array as $delta => $item){
			      		print '<div class="swiper-slide"><img src="'. base_path() . 'sites/default/files/commerce-images/' . $image .'"></div>';
					}
				?>
		  </div>
		</div>
	  </div>
	  <div id="product-buy-options-left" class="fixed-cart">
	    <div id="add-to-cart">
			<h1 class="title__plain title__plain--black-large"><?php print $title;?></h1>
			    <div class="product-buy-options__description"><?php print $description?></div>
			    <?php 
			    	$condition_value = $condition[0]['#markup'];
				    print 	'<div class="product-buy-options__condition">'.
				    	  		'<label class="product-condition__label">Product Condition</label>' .
				    	  		'<div class="product-buy-options__condition-gauge">'.
				    	  		'<div id="condition-track" class="product-buy-options__guauge-track field-item" data-condition="' . intval(render($condition_value)) * 10 . '"></div>
								</div>'.
				    	  		'<span id="thrashed">Thrashed</span>' .
				    	  		'<span id="perfect">Perfect</span>' .
				    		'</div>' .
				    		'<div class="product-buy-options__description">' . $comments . '</div>';
					
			    ?>

			    <div class="product-buy-options__price-msrp">
			      <div class="product-buy-options__price">
			        <label class="product-buy-options__label">Price:</label>
			        <div class="product-buy-options__value"><?php print render($content['product:commerce_price']); ?></div>
			      </div>
			      <div class="product-buy-options__msrp">
			        <label class="product-buy-options__label">MSRP:</label>
			        <div class="product-buy-options__value--strike-through"><?php print render($content['product:field_commerce_msrp']); ?></div>
			      </div>
			    </div>
			    <div class="product-buy-options__options">
			      <div class="product-buty-options__add-to-cart">
			        <?php print render($upc); ?>
			      </div>
			      <div id="out-of-stock">
			      	<p>Out of stock: Please choose another item.</p>
			      </div>
			    </div>
			</div>
	  </div>
	  <div id="model-video">
	    	<?php 
	    		c3_views_media($vid);
	    	?>
	  </div>
	  
	    <?php 
			print '<div id="tech-features">';
			print '<h2 class="title__plain title__plain--black">Tech Features</h2>';
			print '<ul class="tech__feature-list">';
			//kpr($feature);
			for($i = 0; $i < count($feature['#items']); $i++){
				print '<li class="tech__feature-list-item">' .$feature ['#items'][$i]['value'] . '</li>';
			}

			print '</ul>';
			print '</div>';
	    ?>
	  
	  
	    <?php
			print '<div id="product-profile">';
			if(isset($info[$i]['entity']['field_collection_item'])){
				for($i = 0; $i < count($info['#items']); $i++){
					$value = $info['#items'][$i]['value'];
					print '<div class="product-profile__description">' . $info[$i]['entity']['field_collection_item'][$value]['field_support_info_text']['#items'][0]['value']. '</div>';
					if($info[$i]['entity']['field_collection_item'][$value]['field_support_info_media']['#items'][0]['uri'] != ""){
						print '<img src="'.file_create_url($info[$i]['entity']['field_collection_item'][$value]['field_support_info_media']['#items'][0]['uri']).'">';
					}
				}
				print '</div>';
			}
	    ?>
	    
	    <?php 
	    	if($dimensions){
	    		print '<div id="product-specifications">' . 
	    				'<h2 class="title__plain title__plain--black-small">Specifications</h2>' . 
	    				$dimensions .
	    			'</div>';
	    	}
	    ?>
	  <div id="related-products">	            
	  	<?php
	  		//get entity ids
	      	$relatedID = array();
	      	for($i = 0; $i < count($relatedProducts['#items']); $i++){
	      		array_push($relatedID,$relatedProducts['#items'][$i]['target_id']);
	      	}
	      	//get entity product sku ids
	      	$entities = entity_load('node', $ids = $relatedID, $conditions = array(), $reset = FALSE);
	      	$productID = array();
	      	foreach($entities as $e){
	      		array_push($productID,$e->field_sku_upc['und'][0]['product_id']);
	      	}
	      	//render sku ids
	      	$relatedSku = commerce_product_load_multiple($productID, $conditions = array(), $reset = FALSE);
	      	$count = -1;
	      	foreach($relatedSku as $sku){
	      		if($count === -1){
	      			print '<h2 class="title__plain title__plain--black">Rides well with</h2>';
	      		}
	      		$count++;
	      		$title = $sku->title;
	      		$image = $sku->field_commerce_image['und'][0]['value'];
	      		$price = commerce_currency_format($sku->commerce_price['und'][0]['amount'], 'USD', $object = NULL, $convert = TRUE);
	      		print '<a class="product-category__card product-category__card--small product-overview__card" href="'.base_path().'node/'.$relatedID[$count].'">' . 
		           			'<div class="product-category__card-image">' .
		           				'<img src="'. base_path() . 'sites/default/files/commerce-images/' . $image . '">' .
		           			'</div>'.
		            		'<div class="product-category__card-title-group">' .
		            			'<div class="product-category__card-title product-category__card-title--black">' .
		            				$title .            	
		            			'</div>'.
		            	    '</div>' .
		        			'<div class="product-category__card-description product-category__card-description--black">'.
		        				$price .
		        			'</div>'.
	       				'</a>';
	      	}
		?>
	  </div>
	</section>

<?php }?>	





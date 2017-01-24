<?php 
	hide($content['field_product_brand']);
	hide($content['field_product_description']);
	hide($content['field_product_image_list']);
	hide($content['field_product_support_info']);
	hide($content['field_product_features_list']);
	hide($content['field_product_video']);
	hide($content['field_sku_upc']);
	hide($content['field_related_product']);
	hide($content['field_baseplate_stiffness']);
	hide($content['field_highback_stiffness']);
	hide($content['field_disktype']);

	// make sure to hide all fields from SKU Level
	hide($content['product:field_commerce_brand']);
	hide($content['product:field_commerce_product_type']);
	hide($content['product:field_commerce_season']);
  	hide($content['product:title']);
  	hide($content['product:sku']);
  	hide($content['product:field_commerce_upc']);
  	hide($content['product:commerce_stock']);
  	hide($content['product:field_commerce_image']);

  	hide($content['product:field_commerce_msrp']);
  	hide($content['product:commerce_price']);

  	hide($content['product:field_commerce_gender']);
  	hide($content['product:field_commerce_binding_size']);
  	hide($content['product:field_commerce_binding_color']);

  	hide($content['product:field_commerce_binding_color']);

  	hide($content['product:field_shipping_dimensions']);
  	hide($content['product:field_shipping_weight']);

	$price = $content['product:commerce_price'];
	$msrp = $content['product:field_commerce_msrp'];

	$sku_upc = $content['field_sku_upc'];
	
	$features = field_get_items('node', $node, 'field_product_features_list');
	$supportingInfo = field_get_items('node', $node, 'field_product_support_info');
	$relatedProducts = field_get_items('node', $node, 'field_related_product');

	$baseplate_stiffness = $content['field_baseplate_stiffness'];
	$highback_stiffness = $content['field_highback_stiffness'];

?>
<?php 
	if ($view_mode == 'teaser') { 
		
	$product_id = array();
	for($i = 0; $i < count($sku_upc['#items']); $i++){
  		array_push($product_id,$sku_upc['#items'][$i]['product_id']);
  	}

  	
	$products = commerce_product_load_multiple($product_id, $conditions = array(), $reset = FALSE);
	$num_of_sku = count($products);
	$num_in_stock = 0;

	//defaults
  	$stock_status = 'in-stock';
  	$size = '';
  	$price = '';
	$index = -1;
	
	foreach ($products as $product) {

		$index++;
		//stock
		$stock_num = $product->commerce_stock['und'][0]['value'];
		if($stock_num == '0.00'){
			$num_in_stock += 1;
		}

		//size
		$size_neutralize = str_replace(" ", "", $product->field_commerce_binding_size['und'][0]['value']);
		$size .= $size_neutralize . ' ';

		//price
		if($index == 0){
			$formated_price = entity_metadata_wrapper('commerce_product', $product->product_id)->commerce_price->value();
			$price_display = commerce_currency_format($formated_price['amount'], $formated_price['currency_code'], $product->product_id);
			$whole_dollar_amount = explode('.',explode('$',$price_display)[1])[0];

			if($whole_dollar_amount < 100){
				$price .= 'very-low';
			}else if($whole_dollar_amount >= 100 && $whole_dollar_amount < 150){
				$price .= 'low';
			}else if($whole_dollar_amount >= 150 && $whole_dollar_amount < 200){
				$price .= 'medium';
			}else if($whole_dollar_amount >= 200 && $whole_dollar_amount < 250){
				$price .= 'high';
			}else if($whole_dollar_amount >= 250 && $whole_dollar_amount < 300){
				$price .= 'very-high';
			}else{
				$price .= 'max';
			}	
		}
	}
	
	//stffness
	$stiffness_value = '';
	$stiffness = ($highback_stiffness[0]['#markup'] + $baseplate_stiffness[0]['#markup']) / 2;
	switch (true) {
      	case $stiffness <= 4:
        	$stiffness_value = 'loose_stiffness';
      	break;
      	case $stiffness >= 5 && $stiffness <= 7:
        	$stiffness_value = 'medium_stiffness';
      	break;
      	case $stiffness >= 8 && $stiffness <= 10:
        	$stiffness_value = 'stiff_stiffness';
      	break;
      	default:
        	$stiffness_value = 'medium_stiffness';
      	break;
	}

	//stock
	if($num_in_stock == $num_of_sku){
		 $stock_status = 'out-of-stock';
	}else{
		$stock_status = 'in-stock';
	}

?>

<a 
	data-stiffness="<?php print $stiffness_value;?> " 
	data-size="<?php print $size ; ?>" 
	data-price="<?php print $price ; ?>" 
	data-stock="<?php print $stock_status ; ?>" 
	class="product-category__card product-category__card--small product-overview__card <?php print $price . ' any-price ' . $size . ' ' . $stock_status . ' all-stock ' . $stiffness_value;?>" 
	href="<?php print $node_url; ?>">
           	<div class="product-category__card-image">
           		<?php 
           			//print render($content['product:field_commerce_image']); 
           			print $content['product:field_commerce_image'][0]['#markup'];
           		?>
           	</div>
            <div class="product-category__card-title-group">
            	<div class="product-category__card-title product-category__card-title--black">
            		<?php print $title; ?>
            	</div>
            	<?php print render($content['product:field_commerce_season']); ?>
            </div>
        	<div class="product-category__card-description product-category__card-description--black">
        		<?php print render($content['product:commerce_price']); ?>
        		<div class="out-of-stock">Out Of Stock</div>
        	</div>
       </a>
<?php } ?>
<?php 
	if ($view_mode == 'full') {
	$description = $content['field_product_description'][0]['#markup'];
	$galleryImages 	= field_get_items('node', $node, 'field_product_image_list');
	$baseplate 	= field_get_items('node', $node, 'field_baseplate_stiffness');
	$highback  	= field_get_items('node', $node, 'field_highback_stiffness');
	$disk 		= field_get_items('node', $node, 'field_disktype');

	if($galleryImages){
		$imageList 		= explode(",",$content['field_product_image_list']['#items'][0]['value']);
		$firstImage 	= $imageList[0];	                		
	}
?>
		<section id="left-container">
	          <div id="product-gallery">
	            <div class="product__gallery">
	              <div class="swiper-wrapper">
	                <?php
                		if($galleryImages){
	                		foreach($imageList as $image){
	                			print '<div class="swiper-slide"><img src="'. base_path() . 'sites/default/files/commerce-images/' . $image .'"></div>';
	                		}
	                	}
	                ?>
	              </div>
	            </div>
	            <div class="swiper-container product__gallery-pagination">
	              <div class="swiper-wrapper">
	                <?php
                		if($galleryImages){
	                		foreach($imageList as $image){
	                			print '<div class="swiper-slide"><img src="'. base_path() . 'sites/default/files/commerce-images/' . $image .'"></div>';
	                		}
	                	}
	                ?>
	              </div>
	            </div>
	          </div>
	          <div id="product-buy-options-left" class="fixed-cart">
	            <div id="add-to-cart">
					<h1 class="title__plain title__plain--black-large"><?php print $title;?></h1>
					    <!--<div class="product-buy-options__title-long">A long name can go here - Colorway Name Here</div>-->
					    <div class="product-buy-options__description"><?php print render($description);?></div>
					    <div class="product-buy-options__price-msrp">
					      <div class="product-buy-options__price">
					        <label class="product-buy-options__label">Price:</label>
					        <div class="product-buy-options__value"><?php print render($price); ?></div>
					      </div>
					      <div class="product-buy-options__msrp">
					        <label class="product-buy-options__label">MSRP:</label>
					        <div class="product-buy-options__value--strike-through"><?php print render($msrp); ?></div>
					      </div>
					    </div>
					    <div class="product-buy-options__options">
					      <div class="product-buty-options__add-to-cart">
					        <?php print render($sku_upc); ?>
					      </div>
					      <div id="out-of-stock">
					      	<p>Out of stock: Please choose another item.</p>
					      </div>
					    </div>
					</div>
	          </div>
	          <div id="model-video">
	            <div id="model-video">
	            	<?php 
	            		$productVideo = field_get_items('node', $node, 'field_product_video');
	            		if($productVideo){
	            			print '<h2 class="title__plain title__plain--black">Product Video</h2>';
	            			print '<div class="video__wrapper">';
	            			c3_views_media($content['field_product_video']);
	            			print '</div>'; 
	            		}
	            	?>
	          </div>
	          </div>
	          
	            <?php 
	            	if($features){
	            		print '<div id="tech-features">';
	            		print '<h2 class="title__plain title__plain--black">Tech Features</h2>';
	            		print '<ul class="tech__feature-list">';
	            		$feature = $content['field_product_features_list'];
	            		//kpr($feature);
	            		for($i = 0; $i < count($feature['#items']); $i++){
	            			print '<li class="tech__feature-list-item">' .$feature ['#items'][$i]['value'] . '</li>';
	            		}

	            		print '</ul>';
	            		print '</div>';
	            	}
	            ?>
	          <div id="highback-baseplate-disk">
	          	<?php if($baseplate){ 
                  $baseplateValue = intval($content['field_baseplate_stiffness'][0]['#markup']);
                ?>
                  <div id="baseplate-stiffness" class="chart">
                        <h4 class="title__plain title__plain--black-small">Baseplate Stiffness</h4>
                        <div id="baseplate-stiffness-progress" class="chart-wrapper" data-percent="<?php print $baseplateValue; ?>">
                          </div>
                          	<?php 
                            	switch (true) {
	                              	case $baseplateValue <= 4:
	                                	print '<p>Loose and surfy</p>';
	                              	break;
	                              	case $baseplateValue >= 5 && $baseplateValue <= 7:
	                                	print '<p>medium flex</p>';
	                              	break;
	                              	case $baseplateValue >= 8 && $baseplateValue <= 10:
	                                	print '<p>Stiff and responsive</p>';
	                              	break;
	                              	default:
	                                	print ''; 
	                              	break;
                            	}
                          	?>
                  </div>
                <?php } ?>
                <?php if($highback){ 
                  $highbackValue = intval($content['field_highback_stiffness'][0]['#markup']);
                ?>
                  <div id="highback-stiffness" class="chart">
                        <h4 class="title__plain title__plain--black-small">Highback Stiffness</h4>
                        <div id="highback-stiffness-progress" class="chart-wrapper" data-percent="<?php print $highbackValue; ?>">
                          </div>
                          	<?php 
                            	switch (true) {
	                              	case $highbackValue <= 4:
	                                	print '<p>Loose and surfy</p>';
	                              	break;
	                              	case $highbackValue >= 5 && $highbackValue <= 7:
	                                	print '<p>medium flex</p>';
	                              	break;
	                              	case $highbackValue >= 8 && $highbackValue <= 10:
	                                	print '<p>Stiff and responsive</p>';
	                              	break;
	                              	default:
	                                	print ''; 
	                              	break;
                            	}
                          	?>
                  </div>
                <?php } ?>
                <?php if($disk) { ?>
                    <div id="disk" class="chart" >
                        <h4 class="title__plain title__plain--black-small">Disk Type</h4>
                        <?php
                        	$diskName = $content['field_disktype']['#items'][0]['value'];
                          if($diskName != 'MINI DISK 4X2 AND THE CHANNEL'){
                          	print '<img src="' .base_path() . drupal_get_path('theme', 'c3Shop').'/images/bindings/universal-disk.png">';
                            print '<p>COMPATIBLE WITH 4X4, 4X2, CHANNEL</p>';
                          }else{
                          	print '<img src="' .base_path() . drupal_get_path('theme', 'c3Shop').'/images/bindings/minidisk.png">';
                            print '<p>MINI DISK 4X2 AND THE CHANNEL</p>';
                          }

                        ?>
                    </div>
                <?php } ?>
	          </div>
	          
	            <?php
	            	if($supportingInfo){
	            		print '<div id="product-profile">';
	            		$info = $content['field_product_support_info'];
	            		for($i = 0; $i < count($info['#items']); $i++){
	            			$value = $info['#items'][$i]['value'];
	            			print '<div class="product-profile__description">' . $info[$i]['entity']['field_collection_item'][$value]['field_support_info_text']['#items'][0]['value']. '</div>';
	            			
	            			if(isset($info[$i]['entity']['field_collection_item'][$value]['field_support_info_media'])){
		            			print '<img src="'.file_create_url($info[$i]['entity']['field_collection_item'][$value]['field_support_info_media']['#items'][0]['uri']).'">';
		            		}
		            		
	            		}
	            	}
	            	print '</div>';
	            ?>
	          <div id="related-products">
	            <?php
	              	if($relatedProducts){
	              		print '<h2 class="title__plain title__plain--black">Rides well with</h2>';
	              		print render($content['field_related_product']);
	              	}
	        	?>
	          </div>
	        </section>
<?php } ?>
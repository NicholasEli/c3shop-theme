<div class="product__gallery">
  <div class="swiper-wrapper">
    <?php 
	    	foreach ($items as $delta => $item){
	      		$string = explode(',',$item['#markup']);
	      		
	      		foreach($string as $img){
	      			print '<div class="swiper-slide"><img src="'. base_path() . 'sites/default/files/commerce-images/' . $img .'"></div>';
	      		}
			}
		?>
  </div>
</div>
<div class="swiper-container product__gallery-pagination">
  <div class="swiper-wrapper">
    <?php 
	    	foreach ($items as $delta => $item){
	      		$string = explode(',',$item['#markup']);
	      		
	      		foreach($string as $img){
	      			print '<div class="swiper-slide"><img src="'. base_path() . 'sites/default/files/commerce-images/' . $img .'"></div>';
	      		}
			}
		?>
  </div>
</div>
<?php 
	global $user;
	if (!isset($account)) {
        $account = $user;
     }
?>
<section id="shipping">
	<div id="shipping-nav">
		<nav>
			<h4 class="title__plain title__plain--black">Contents</h4>
			<ul>
				<li>
					<a class="link__plain scroll__link scroll" data-speed="1000" href="#shipping-intro">About Us 
							<svg width="100%" height="100%" viewBox="0 0 63 111" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    							<g transform="matrix(8.33333,0,0,8.33333,-11648.5,-2726.84)">
        							<path d="M1398.75,340.443L1397.82,339.518L1403.51,333.833L1397.82,328.148L1398.75,327.223L1405.36,333.833L1398.75,340.443Z" style="fill:black;fill-rule:nonzero;"/>
    							</g>
							</svg>
					</a>
				</li>
				<li>
					<a class="link__plain scroll__link scroll" data-speed="1000" href="#shipping-contact-us">Contact Us 
							<svg width="100%" height="100%" viewBox="0 0 63 111" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    							<g transform="matrix(8.33333,0,0,8.33333,-11648.5,-2726.84)">
        							<path d="M1398.75,340.443L1397.82,339.518L1403.51,333.833L1397.82,328.148L1398.75,327.223L1405.36,333.833L1398.75,340.443Z" style="fill:black;fill-rule:nonzero;"/>
    							</g>
							</svg>
					</a>
				</li>
				<li>
					<a class="link__plain scroll__link scroll" data-speed="1000" href="#shipping-info">Shipping Info 
							<svg width="100%" height="100%" viewBox="0 0 63 111" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    							<g transform="matrix(8.33333,0,0,8.33333,-11648.5,-2726.84)">
        							<path d="M1398.75,340.443L1397.82,339.518L1403.51,333.833L1397.82,328.148L1398.75,327.223L1405.36,333.833L1398.75,340.443Z" style="fill:black;fill-rule:nonzero;"/>
    							</g>
							</svg>
					</a>
				</li>
				<li>
					<a class="link__plain scroll__link scroll" data-speed="1000" href="#shipping-policy">Policy 
							<svg width="100%" height="100%" viewBox="0 0 63 111" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    							<g transform="matrix(8.33333,0,0,8.33333,-11648.5,-2726.84)">
        							<path d="M1398.75,340.443L1397.82,339.518L1403.51,333.833L1397.82,328.148L1398.75,327.223L1405.36,333.833L1398.75,340.443Z" style="fill:black;fill-rule:nonzero;"/>
    							</g>
							</svg>
					</a>
				</li>
				<li>
					<a class="link__plain scroll__link scroll" data-speed="1000" href="#shipping-terms">Terms 
							<svg width="100%" height="100%" viewBox="0 0 63 111" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    							<g transform="matrix(8.33333,0,0,8.33333,-11648.5,-2726.84)">
        							<path d="M1398.75,340.443L1397.82,339.518L1403.51,333.833L1397.82,328.148L1398.75,327.223L1405.36,333.833L1398.75,340.443Z" style="fill:black;fill-rule:nonzero;"/>
    							</g>
							</svg>
					</a>
				</li>
			</ul>
		</nav>
	</div>
	<!-- shipping intro -->
	<div id="shipping-intro" class="shipping__section" data-scrollThreshold="200" >
		<img class="shipping__section-image" src="<?php print drupal_get_path('theme', 'c3Shop');?>/images/shipping/c3-about-crew.jpg" alt="">
		<div class="shipping__section-content">
			<div class="shipping__section-icon">
				<img src="<?php print drupal_get_path('theme', 'c3Shop');?>/images/shipping/shipping-about-image.svg" alt="">
			</div>
			<div class="shipping__section-text"><!--
				<h4 class="title__plain title__plain--black">About</h4>
				<p>This is an example of what body copy can look like. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ipsum felis, mollis non massa in, blandit blandit odio. Aenean vulputate varius lobortis. Praesent nec tellus sed nunc cursus ultrices in euismod erat. Phasellus eget iaculis libero, eget eleifend tellus. Sed sollicitudin vitae mi id dapibus.</p> -->
				<?php
				
      			$intro = module_invoke('block', 'block_view', 6);
      			print render($intro['content']);
      			if ($account->uid == 1 || in_array('administrator', $account->roles) || in_array('Store Admin', $account->roles) || in_array('Inventory Admin', $account->roles)) {
      				print '<a class="link__plain link__plain--primary" href="'.base_path().'admin/structure/block/manage/block/6/configure" target="_blank">Edit</a>';
      			}
				?>
			</div>
		</div>
	</div>
	<!-- shipping contact -->
	<div id="shipping-contact-us" class="shipping__section" data-scrollThreshold="200">
		<div class="shipping__section-content">
			<div class="shipping__section-icon">
				<img src="<?php print drupal_get_path('theme', 'c3Shop');?>/images/shipping/shipping-contact-image.svg" alt="">
			</div>
			<div class="shipping__section-text">
				<!--
				<h4 class="title__plain title__plain--black">Contact Us</h4>
				<p>This is an example of what body copy can look like. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ipsum felis, mollis non massa in, blandit blandit odio. Aenean vulputate varius lobortis. Praesent nec tellus sed nunc cursus ultrices in euismod erat. Phasellus eget iaculis libero, eget eleifend tellus. Sed sollicitudin vitae mi id dapibus.</p>
				<address class="shipping__section-qtr">
					<p>Address:</p>
					<p>Line One of Address</p>
					<p>Line Two of Address</p>
					<p>XXXX</p>
				</address>
				<div class="shipping__section-qtr">
					<p>Click Here to talk</p>
					<p>with a representative</p>
					<a class="link__plain link__plain--primary" href="javascript:void(0)" onclick="olark('api.box.expand')">Live Chat ></a>	
				</div>
				<div class="shipping__section-qtr shipping__section-qtr--clear">
					<p>PHONE: <a href="tel:000-000-0000">XXX.XXX.XXXX</a></p>
					<p>FAX: <a href="tel:000-000-0000">XXX.XXX.XXXX</a></p>
				</div>
				-->
				<?php
					$contact = module_invoke('block', 'block_view', 7);
      				print render($contact['content']);
      				if ($account->uid == 1 || in_array('administrator', $account->roles) || in_array('Store Admin', $account->roles) || in_array('Inventory Admin', $account->roles)) {
      					print '<a class="link__plain link__plain--primary" href="'.base_path().'admin/structure/block/manage/block/7/configure" target="_blank">Edit</a>';
      				}
				?>
			</div>
		</div>
	</div>
	<!-- shipping info -->
	<div id="shipping-info" class="shipping__section" data-scrollThreshold="400">
		
		<div class="shipping__section-content">
			<div class="shipping__section-icon">
				<img src="<?php print drupal_get_path('theme', 'c3Shop');?>/images/shipping/shipping-info-image.svg" alt="">
			</div>
			<div class="shipping__section-text">
				<!--
				<h4 class="title__plain title__plain--black">Shipping Info</h4>
				<p>This is an example of what body copy can look like. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ipsum felis, mollis non massa in, blandit blandit odio. Aenean vulputate varius lobortis. Praesent nec tellus sed nunc cursus ultrices in euismod erat. Phasellus eget iaculis libero, eget eleifend tellus. Sed sollicitudin vitae mi id dapibus.</p>
				-->
				<?php
					$info = module_invoke('block', 'block_view', 5);
      				print render($info['content']);
      				if ($account->uid == 1 || in_array('administrator', $account->roles) || in_array('Store Admin', $account->roles) || in_array('Inventory Admin', $account->roles)) {
      					print '<a class="link__plain link__plain--primary" href="'.base_path().'admin/structure/block/manage/block/5/configure" target="_blank">Edit</a>';
      				}
				?>
			</div>
		</div>
		<img class="shipping__section-image" src="<?php print drupal_get_path('theme', 'c3Shop');?>/images/shipping/shipping-map.png" alt="">
	</div>
	<!-- shipping policy -->
	<div id="shipping-policy" class="shipping__section" data-scrollThreshold="100">
		<div class="shipping__section-content">
			<div class="shipping__section-icon">
				<img src="<?php print drupal_get_path('theme', 'c3Shop');?>/images/shipping/shipping-policy-image.svg" alt="">
			</div>
			<div class="shipping__section-text">
				<!--
				<h4 class="title__plain title__plain--black">Policy</h4>
				<p>This is an example of what body copy can look like. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ipsum felis, mollis non massa in, blandit blandit odio. Aenean vulputate varius lobortis. Praesent nec tellus sed nunc cursus ultrices in euismod erat. Phasellus eget iaculis libero, eget eleifend tellus. Sed sollicitudin vitae mi id dapibus.</p>
				-->
				<?php
					$policy = module_invoke('block', 'block_view', 8);
      				print render($policy['content']);
      				if ($account->uid == 1 || in_array('administrator', $account->roles) || in_array('Store Admin', $account->roles) || in_array('Inventory Admin', $account->roles)) {
      					print '<a class="link__plain link__plain--primary" href="'.base_path().'admin/structure/block/manage/block/8/configure" target="_blank">Edit</a>';
      				}
				?>
			</div>
		</div>
	</div>
	<!-- shipping terms -->
	<div id="shipping-terms" class="shipping__section" data-scrollThreshold="100">
		<div class="shipping__section-content">
			<div class="shipping__section-icon">
				<img src="<?php print drupal_get_path('theme', 'c3Shop');?>/images/shipping/shipping-terms-image.svg" alt="">
			</div>
			<div class="shipping__section-text">
				<!--
				<h4 class="title__plain title__plain--black">Terms</h4>
				<p>This is an example of what body copy can look like. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ipsum felis, mollis non massa in, blandit blandit odio. Aenean vulputate varius lobortis. Praesent nec tellus sed nunc cursus ultrices in euismod erat. Phasellus eget iaculis libero, eget eleifend tellus. Sed sollicitudin vitae mi id dapibus.</p> 
				-->
				<?php
					$terms = module_invoke('block', 'block_view', 9);
      				print render($terms['content']);
      				if ($account->uid == 1 || in_array('administrator', $account->roles) || in_array('Store Admin', $account->roles) || in_array('Inventory Admin', $account->roles)) {
      					print '<a class="link__plain link__plain--primary" href="'.base_path().'admin/structure/block/manage/block/9/configure" target="_blank">Edit</a>';
      				}
				?>
			</div>
		</div>
	</div>
</section>
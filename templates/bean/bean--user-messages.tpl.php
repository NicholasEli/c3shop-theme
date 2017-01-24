<?php	
	hide($content['field_message_background_color']) ; 
	hide($content['field_message']);
	//print render($content);
	//kpr($content);
?>
<section class="bean" style="background-color: <?php print render($content['field_message_background_color']['#items'][0]['rgb']); ?>;">
	<div class="container">
		<p class="bean__text"><?php print render($content['field_message']['#items'][0]['value']); ?></p>
	</div>
</section>
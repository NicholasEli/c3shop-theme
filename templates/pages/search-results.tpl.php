<?php if ($search_results): ?>
	<main id="search">
		<section id="search-results">
			<div id="search-container" class="container">
				<?php print $search_results; ?>
			</div>
		</section>
		<section id="search-pager">
			<div class="container">
				<?php print $pager; ?>
			</div>
		</section>
	</main>
<?php else : ?>
	<main id="search">
	    <section id="search-items">
	    	<div id="search-container" class="container">
		      <h2><?php print t('Your search yielded no results');?></h2>
		      <?php print search_help('search#noresults', drupal_help_arg()); ?>
	    	</div>
	    </section>
	</main>
<?php endif; ?>
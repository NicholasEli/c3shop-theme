const addToCart = () =>{
	let cartContainer = document.getElementById('product-buy-options-left'),
		region = document.querySelector('.region-content'),
		desktopStyle = {
			'width' : region.getBoundingClientRect().width - 15+'px',
			'max-width' : '1400px',
			'z-index' : '1',
			'transition': 'none'
		},
		fixed = {
			'position' : 'fixed',
			'top' : '15px',
			'left' : '50%',
			'transform': 'translateX(-50%)'
		},
		absolute = {
			'position' : 'absolute',
			'top' : '0px',
			'left' : 'unset',
			'transform': 'translateX(0%)'
		};

	if(window.innerWidth > 960){
		applyStyle('#product-buy-options-left', desktopStyle);

		if(window.scrollY > 130){
			applyStyle('#product-buy-options-left', fixed);
		}else{
			applyStyle('#product-buy-options-left', absolute);
		}
	}else{
		cartContainer.removeAttribute('style');
	}
}
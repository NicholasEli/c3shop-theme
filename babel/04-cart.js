const cartItems = () =>{
	if(!mobileDevice()){
		let cartItems = Drupal.settings.c3Shop.cart_items,
			storedItems =  parseInt(localStorage.getItem('cartItems_status'));
		if(localStorage.getItem('cartItems_status')){

			if(cartItems > storedItems){
				let title = "C3 Shop",
	                bodyText = `${cartItems - storedItems} item(s) have been added to your cart.`,
	                iconImage = Drupal.settings.basePath + "sites/all/themes/c3Shop/images/c3-logo.png";
	                
	                notify(title, bodyText, iconImage);

	                localStorage.setItem('cartItems_status', cartItems);
			}

			if(cartItems < storedItems){
				let title = "C3 Shop",
	                bodyText = `${storedItems - cartItems} item(s) have been removed to your cart.`,
	                iconImage = Drupal.settings.basePath + "sites/all/themes/c3Shop/images/c3-logo.png";

	                localStorage.setItem('cartItems_status', cartItems);

	            notify(title, bodyText, iconImage);
			}
			
		}else{
			localStorage.setItem('cartItems_status', cartItems);
		}
	}
}
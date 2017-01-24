const MoveProductGallery = () => {
    let obj = {},
    	container = document.getElementById('left-container'),
        gallery = document.getElementById('product-gallery'),
        cart = document.getElementById('product-buy-options-left'),
        video = document.getElementById('model-video');

    obj.desktop = () => {

        if (window.innerWidth > 960) {
            let g = gallery.cloneNode(true);
            gallery.parentNode.removeChild(gallery);
            container.insertBefore(g, video);
        }
    }

    return obj;
}
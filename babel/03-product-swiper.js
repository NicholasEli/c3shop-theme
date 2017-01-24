const productSwiper = () => {
    const productGallery = new Swiper('.product__gallery', {
        spaceBetween: 10,
        onSlideChangeEnd: function() {
            imgZoom();
        },
        onImagesReady: function(){
          imgZoom();  
        }
    });
    const productPagination = new Swiper('.product__gallery-pagination', {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
    });
    productGallery.params.control = productPagination;
    productPagination.params.control = productGallery;
}

const magnifyStyle = {
    'position': 'absolute',
    'top': '0px',
    'left': '0px',
    'overflow': 'hidden',
    'opacity': '0',
    'z-index': '2'
}

const imgStyle = {
    'width': '200%',
    'max-width': 'none',
    'height': '200%'
}

//zoom in
const imgZoom = () => {
    if (!mobileDevice()) {
        let zoom = document.querySelector('.product__gallery .swiper-slide-active'),
            container = document.querySelector('.product__gallery'),
            magnify = document.createElement('div');



        let imgLeft = zoom.getBoundingClientRect().left,
            imgTop = zoom.getBoundingClientRect().top;


        zoom.addEventListener('mouseenter', () => {
            if (hasClass(zoom, 'swiper-slide-active')) {
                let img = zoom.innerHTML;

                magnify.setAttribute('id', 'magnify');

                magnify.style.width = container.getBoundingClientRect().width + 'px';
                magnify.style.height = container.getBoundingClientRect().height + 'px';

                zoom.appendChild(magnify);
                magnify.innerHTML = img;

                applyStyle('#magnify', magnifyStyle);

                magnify.childNodes[0].classList.add('magnify-image');
                applyStyle('.magnify-image', imgStyle);

                magnify.style.opacity = '1';

                let imgWidth = zoom.offsetWidth * 2,
                    imgHeight = zoom.offsetHeight * 2;
            }

        });

        zoom.addEventListener('mousemove', () => {
            if (hasClass(zoom, 'swiper-slide-active')) {

                magnify.scrollLeft = (event.x * 2) - (imgLeft * 2) //divide by to restrict offset;
                magnify.scrollTop = (event.y * 2) - (imgTop * 2);

            }
        });

        zoom.addEventListener('mouseleave', () => {
            if (hasClass(zoom, 'swiper-slide-active')) {
                magnify.parentNode.removeChild(magnify);
            }
        });


    }
}
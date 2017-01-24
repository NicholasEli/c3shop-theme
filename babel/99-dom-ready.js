Drupal.behaviors.outOfStock = {
    attach: (ctx, server) => {

        if (page('add-to-cart')) {
            let outOfStock = document.getElementById('out-of-stock'),
                checkOutForm = document.querySelector('.commerce-add-to-cart');

            if (hasClass(checkOutForm, 'out-of-stock')) {
                outOfStock.style.opacity = '1';
            } else {
                outOfStock.style.opacity = '0';
            }
        }

        if (page('condition-track')) {
            let track = document.getElementById('condition-track');
            if (inView('#condition-track', 0)) {
                track.style.width = track.getAttribute('data-condition') + '%';
            }

            productSwiper();
        }

        if (page('product-buy-options-left')) {
            addToCart();
        }

    }
};

window.onload = () => {    

    let productPageLayout = new MoveProductGallery()
    if (page('add-to-cart')) {
        productPageLayout.desktop();
    }


    const mainNav = new linkActiveClass('header .box__link');
    mainNav.activeState('box__link--active', 'header__navigation-bar--active', false, false);
    //open sub navigation - submenu
    const subNav = new linkActiveClass('.parent-link');
    subNav.activeState('link__plain--gray-active', 'sub-menu--active', false, false);

    //open user cards
    const userNav = new linkActiveClass('.card-nav');
    userNav.activeState('header__button--active', 'user-menu__card--active', false, false); 

    //close user cards
    closeUserCards();

    //search bar open/close
    const searchBar = new linkActiveClass('header #header-search');
    searchBar.activeState('header__button--active', 'search__bar--active', false, false);

    
    //menu search bar
    submitSearch();

    //bindings page
    if (page('highback-baseplate-disk')) {
        getCharts();
    }

    //product page
    if (page('product-gallery')) {
        productSwiper();
        if(!IE11){
            imgZoom();
        }
    }

    //demo page
    if (page('condition-track')) {
        let track = document.getElementById('condition-track');
        if (inView('#condition-track', 0)) {
            track.style.width = track.getAttribute('data-condition') + '%';
        }
    }

    if(page('vip')){
        new_user_existing_user_form_update();
    }

    if (page('back-to-top')) {
        clickToScroll();
    }

    //shipping page
    if (page('shipping')) {
        document.getElementById('shipping-intro').setAttribute('data-scrollThreshold', window.innerHeight / 4);
        document.getElementById('shipping-contact-us').setAttribute('data-scrollThreshold', window.innerHeight / 4);
        document.getElementById('shipping-info').setAttribute('data-scrollThreshold', window.innerHeight / 3);
        document.getElementById('shipping-policy').setAttribute('data-scrollThreshold', window.innerHeight - 200);
        document.getElementById('shipping-terms').setAttribute('data-scrollThreshold', window.innerHeight - 200);
        activeSection('.shipping__section', '.scroll__link', 'link__plain--primary-active');
        clickToScroll();
    }

    const documentState = setInterval(() => {

        if (document.readyState === 'complete') {
            clearInterval(documentState);
            //olark
            if (page('chat-status')) {
                olarkStatus();
            }

            if (page('capita') || page('coal') || page('union')) {
                
                product_filter();
            }
        }
    }, 100);

    window.addEventListener('scroll', () => {

        let olark = document.getElementById('habla_window_div'),
            olarkWrapper = document.getElementById('habla_beta_container_do_not_rely_on_div_classes_or_names');
        if (page('habla_window_div')) {
            if (olarkWrapper.getBoundingClientRect().top > window.innerHeight && !mobileDevice()) {
                olark.classList.remove('olarkSet');
            } else {
                olark.classList.add('olarkSet');
            }
        }

        //bindings page
        if (page('highback-baseplate-disk')) {
            getCharts();
        }

        //shipping page
        if (page('shipping')) {
            activeSection('.shipping__section', '.scroll__link', 'link__plain--primary-active');
        }

        //demo page
        if (page('condition-track')) {
            let track = document.getElementById('condition-track');
            if (inView('#condition-track', 0)) {
                track.style.width = track.getAttribute('data-condition') + '%';
            }
        }

        //product pages
        if (page('product-buy-options-left')) {
            addToCart();
        }
    });

    window.addEventListener('resize', () => {
        let olark = document.getElementById('habla_window_div'),
            olarkWrapper = document.getElementById('habla_beta_container_do_not_rely_on_div_classes_or_names');
        if (page('habla_window_div')) {
            if (olarkWrapper.getBoundingClientRect().top > window.innerHeight && !mobileDevice()) {
                olark.classList.remove('olarkSet');
            } else {
                olark.classList.add('olarkSet');
            }
        }

        //product pages
        if (page('product-buy-options-left')) {
            addToCart();
        }
    });
}
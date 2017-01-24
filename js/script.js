"use strict";

var mobileDevice = function mobileDevice() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
    } else {
        return false;
    }
};

var IE11 = !!window.MSInputMethodContext && !!document.documentMode;

var applyStyle = function applyStyle(element, property) {
    var el = document.querySelectorAll(element);
    for (var i = 0; i < el.length; i++) {
        for (var key in property) {
            if (property.hasOwnProperty(key)) {
                el[i].style[key] = property[key];
            }
        }
    }
};

var notify = function notify(title, bodyText, iconImage) {
    var options = {
        body: bodyText,
        icon: iconImage
    };

    if (!mobileDevice()) {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted" || Notification.permission === "default") {
            (function () {
                document.body.classList.add('no-jgrowl');
                var notification = new Notification(title, options);
                setTimeout(function () {
                    notification.close();
                }, 8000);
            })();
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {

                if (permission === "granted" || Notification.permission === "default") {
                    (function () {
                        document.body.classList.add('no-jgrowl');
                        var notification = new Notification(title, options);
                        setTimeout(function () {
                            notification.close();
                        }, 8000);
                    })();
                }
            });
        }
    }
};

var page = function page(id) {
    if (typeof document.getElementById(id) != 'undefined' && document.getElementById(id) != null) {
        return true;
    } else {
        return false;
    }
};

var hasClass = function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
};

var inView = function inView(el, index) {

    var elTop = document.querySelectorAll(el)[index].getBoundingClientRect().top,
        winHeight = window.innerHeight;

    if (elTop < winHeight - 100 && elTop > 0) {
        return true;
    } else {
        return false;
    }
};

var once = function once(fn, context) {
    var result = void 0;

    return function () {
        if (fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
};

var linkActiveClass = function linkActiveClass(element) {
    var obj = {},
        link = document.querySelectorAll(element);
    obj.clearActiveClasses = function (activeClass, activeNavClass) {

        for (var i = 0; i < link.length; i++) {
            link[i].classList.remove(activeClass);
            if (activeNavClass != false) {
                var navigationID = link[i].getAttribute('href');
                document.querySelector(navigationID).classList.remove(activeNavClass);
            }
        }
    }, obj.activeState = function (activeClass, activeNavClass, open, close) {
        for (var i = 0; i < link.length; i++) {
            (function (i) {
                link[i].addEventListener('click', function (event) {
                    event.preventDefault();

                    if (!hasClass(link[i], activeClass)) {
                        obj.clearActiveClasses(activeClass, activeNavClass);
                        link[i].classList.add(activeClass);
                        var navigationID = link[i].getAttribute('href');
                        document.querySelector(navigationID).classList.add(activeNavClass);
                        if (open) {
                            open();
                        }
                    } else {
                        link[i].classList.remove(activeClass);
                        var _navigationID = link[i].getAttribute('href');
                        document.querySelector(_navigationID).classList.remove(activeNavClass);
                        if (close) {
                            close();
                        }
                    }
                });
            })(i);
        }
    };

    return obj;
};

var elementObserver = function elementObserver(el, callback) {
    // select the target node
    var target = document.getElementById(el);

    // create an observer instance
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (callback) {
                callback(mutation);
            }
        });
    });

    // configuration of the observer:
    var config = {
        attributes: true,
        childList: true,
        characterData: true
    };

    // pass in the target node, as well as the observer options
    observer.observe(target, config);
};

var clickToScroll = function clickToScroll() {
    // Feature Test
    if ('querySelector' in document && 'addEventListener' in window && Array.prototype.forEach) {
        (function () {

            // Function to animate the scroll
            var smoothScroll = function smoothScroll(anchor, duration) {

                // Calculate how far and how fast to scroll
                var startLocation = window.pageYOffset;
                var endLocation = anchor.offsetTop;
                var distance = endLocation - startLocation;
                var increments = distance / (duration / 16);
                var stopAnimation = void 0;

                // Scroll the page by an increment, and check if it's time to stop
                var animateScroll = function animateScroll() {
                    window.scrollBy(0, increments);
                    stopAnimation();
                };

                // If scrolling down
                if (increments >= 0) {
                    // Stop animation when you reach the anchor OR the bottom of the page
                    stopAnimation = function stopAnimation() {
                        var travelled = window.pageYOffset;
                        if (travelled >= endLocation - increments || window.innerHeight + travelled >= document.body.offsetHeight) {
                            clearInterval(runAnimation);
                        }
                    };
                }
                // If scrolling up
                else {
                        // Stop animation when you reach the anchor OR the top of the page
                        stopAnimation = function stopAnimation() {
                            var travelled = window.pageYOffset;
                            if (travelled <= (endLocation || 0)) {
                                clearInterval(runAnimation);
                            }
                        };
                    }

                // Loop the animation function
                var runAnimation = setInterval(animateScroll, 16);
            };

            // Define smooth scroll links
            var scrollToggle = document.querySelectorAll('.scroll');

            // For each smooth scroll link
            [].forEach.call(scrollToggle, function (toggle) {

                // When the smooth scroll link is clicked
                toggle.addEventListener('click', function (e) {

                    // Prevent the default link behavior
                    e.preventDefault();

                    // Get anchor link and calculate distance from the top
                    var dataID = toggle.getAttribute('href');
                    var dataTarget = document.querySelector(dataID);
                    var dataSpeed = toggle.getAttribute('data-speed');

                    // If the anchor exists
                    if (dataTarget) {
                        // Scroll to the anchor
                        smoothScroll(dataTarget, dataSpeed || 500);
                    }
                }, false);
            });
        })();
    }
};

var user = function user() {
    return Drupal.settings.c3Shop.user;
};

var get_errors = function get_errors() {
    var errors = Drupal.settings.c3Shop.form_errors;

    for (var i = 0; i < errors.length; i++) {
        var title = "C3 Shop",
            bodyText = errors[i].content.replace(/<(?:.|\n)*?>/gm, ''),
            iconImage = Drupal.settings.basePath + "sites/all/themes/c3Shop/images/c3-logo.png";

        notify(title, bodyText, iconImage);
    }
};
'use strict';

var submitSearch = function submitSearch() {
    var searchBtn = document.querySelector('#search input[type="submit"]'),
        input = document.querySelector('#search input[type="text"]'),
        newResults = document.getElementById('search-results'),
        searchTimer = void 0;

    searchBtn.addEventListener('click', function (event) {
        event.preventDefault();
        if (input.value != '' && input.value != null && input.value.length != 0) {
            newResults.style.padding = "10px 0px";
            search(input.value);
        } else {
            input.setAttribute('placeholder', 'You must enter something...');
        }
    });

    input.addEventListener('keyup', function () {
        console.log(input.value.length);
        if (input.value != '' && input.value != null && input.value.length != 0) {
            searchBtn.classList.add('button__plain--dk-gray-active');
        } else {
            searchBtn.classList.remove('button__plain--dk-gray-active');
        }
    });
};
//search/node/hats
var search = function search(data) {
    var xmlhttp = new XMLHttpRequest(),
        newResults = document.getElementById('search-results');

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var parser = new DOMParser(),
                    doc = parser.parseFromString(xmlhttp.responseText, "text/html"),
                    results = doc.getElementById('search-container').childNodes,
                    main = document.querySelectorAll('main')[0];
                newResults.innerHTML = "";
                for (var i = 0; i < results.length; i++) {
                    if (results[i].tagName === "FIELDSET" || results[i].tagName === "H2" || results[i].tagName === "UL") {
                        newResults.appendChild(results[i]);
                    }
                }
            } else {
                var title = "C3 Shop",
                    bodyText = "Oops! Something went wrong. Please refresh the page.",
                    iconImage = Drupal.settings.basePath + "sites/all/themes/c3Shop/images/c3-logo.png";

                notify(title, bodyText, iconImage);
            }
        }
    };

    xmlhttp.open("GET", Drupal.settings.basePath + 'search/node/' + data, true);
    xmlhttp.send();
};
'use strict';

var createSwiper = function createSwiper(direction, loop, callback) {
    var swiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: direction,
        loop: loop,

        // If we need pagination
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationElement: 'div',

        // Navigation arrows
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

        // And if we need scrollbar
        scrollbar: '.swiper-scrollbar'
    });

    if (callback) {
        callback();
    }
};
'use strict';

var productSwiper = function productSwiper() {
    var productGallery = new Swiper('.product__gallery', {
        spaceBetween: 10,
        onSlideChangeEnd: function onSlideChangeEnd() {
            imgZoom();
        },
        onImagesReady: function onImagesReady() {
            imgZoom();
        }
    });
    var productPagination = new Swiper('.product__gallery-pagination', {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
    });
    productGallery.params.control = productPagination;
    productPagination.params.control = productGallery;
};

var magnifyStyle = {
    'position': 'absolute',
    'top': '0px',
    'left': '0px',
    'overflow': 'hidden',
    'opacity': '0',
    'z-index': '2'
};

var imgStyle = {
    'width': '200%',
    'max-width': 'none',
    'height': '200%'
};

//zoom in
var imgZoom = function imgZoom() {
    if (!mobileDevice()) {
        (function () {
            var zoom = document.querySelector('.product__gallery .swiper-slide-active'),
                container = document.querySelector('.product__gallery'),
                magnify = document.createElement('div');

            var imgLeft = zoom.getBoundingClientRect().left,
                imgTop = zoom.getBoundingClientRect().top;

            zoom.addEventListener('mouseenter', function () {
                if (hasClass(zoom, 'swiper-slide-active')) {
                    var img = zoom.innerHTML;

                    magnify.setAttribute('id', 'magnify');

                    magnify.style.width = container.getBoundingClientRect().width + 'px';
                    magnify.style.height = container.getBoundingClientRect().height + 'px';

                    zoom.appendChild(magnify);
                    magnify.innerHTML = img;

                    applyStyle('#magnify', magnifyStyle);

                    magnify.childNodes[0].classList.add('magnify-image');
                    applyStyle('.magnify-image', imgStyle);

                    magnify.style.opacity = '1';

                    var imgWidth = zoom.offsetWidth * 2,
                        imgHeight = zoom.offsetHeight * 2;
                }
            });

            zoom.addEventListener('mousemove', function () {
                if (hasClass(zoom, 'swiper-slide-active')) {

                    magnify.scrollLeft = event.x * 2 - imgLeft * 2; //divide by to restrict offset;
                    magnify.scrollTop = event.y * 2 - imgTop * 2;
                }
            });

            zoom.addEventListener('mouseleave', function () {
                if (hasClass(zoom, 'swiper-slide-active')) {
                    magnify.parentNode.removeChild(magnify);
                }
            });
        })();
    }
};
'use strict';

var cartItems = function cartItems() {
	if (!mobileDevice()) {
		var _cartItems = Drupal.settings.c3Shop.cart_items,
		    storedItems = parseInt(localStorage.getItem('cartItems_status'));
		if (localStorage.getItem('cartItems_status')) {

			if (_cartItems > storedItems) {
				var title = "C3 Shop",
				    bodyText = _cartItems - storedItems + ' item(s) have been added to your cart.',
				    iconImage = Drupal.settings.basePath + "sites/all/themes/c3Shop/images/c3-logo.png";

				notify(title, bodyText, iconImage);

				localStorage.setItem('cartItems_status', _cartItems);
			}

			if (_cartItems < storedItems) {
				var _title = "C3 Shop",
				    _bodyText = storedItems - _cartItems + ' item(s) have been removed to your cart.',
				    _iconImage = Drupal.settings.basePath + "sites/all/themes/c3Shop/images/c3-logo.png";

				localStorage.setItem('cartItems_status', _cartItems);

				notify(_title, _bodyText, _iconImage);
			}
		} else {
			localStorage.setItem('cartItems_status', _cartItems);
		}
	}
};
'use strict';

var closeUserCards = function closeUserCards() {
	var closeCardBtn = document.querySelectorAll('.user-menu__card--close-btn'),
	    userNav = document.querySelectorAll('.card-nav'),
	    userCard = document.querySelectorAll('.user-menu__card');

	var hideAllCards = function hideAllCards() {
		for (var i = 0; i < userCard.length; i++) {
			userCard[i].classList.remove('user-menu__card--active');
		}

		for (var _i = 0; _i < userNav.length; _i++) {
			userNav[_i].classList.remove('header__button--active');
		}
	};

	for (var i = 0; i < closeCardBtn.length; i++) {
		(function (i) {
			closeCardBtn[i].addEventListener('click', function () {
				hideAllCards();
			});
		})(i);
	}
};
'use strict';

var activeSection = function activeSection(element, anchor, activeClass) {
	var section = document.querySelectorAll(element),
	    link = document.querySelectorAll(anchor);

	for (var i = 0; i < section.length; i++) {
		if (inView(element, i) && section[i].getBoundingClientRect().top < parseInt(section[i].getAttribute('data-scrollThreshold'))) {
			link[i].classList.add(activeClass);
		} else {
			link[i].classList.remove(activeClass);
		}
	}
};
'use strict';

//check if user is logged in
var loggedIn = function loggedIn() {
    if (!mobileDevice()) {
        (function () {
            var userStorage = localStorage.getItem('user_status');
            if (user().uid && userStorage != 'loggedIn') {
                notify('Welcome!', 'You are now logged in', Drupal.settings.basePath + "sites/all/themes/c3Shop/images/c3-logo.png");
                localStorage.setItem('user_status', 'loggedIn');
            } else if (!user().uid) {
                localStorage.removeItem('user_status');
            }

            var logoutBtn = document.querySelectorAll('logout-btn');
            for (var i = 0; i < logoutBtn.length; i++) {
                (function (i) {
                    logoutBtn[i].addEventListener('click', function () {
                        localStorage.removeItem('user_status');
                    });
                })(i);
            }
        })();
    }
};
'use strict';

var getCharts = function getCharts() {
    var chartWrapper = document.querySelectorAll('.chart-wrapper');
    for (var i = 0; i < chartWrapper.length; i++) {
        var chartId = chartWrapper[i].getAttribute('id'),
            percent = parseInt(chartWrapper[i].getAttribute('data-percent'));
        if (inView('.chart-wrapper', i) && chartWrapper[i].getAttribute('animation') != 'true') {
            chartWrapper[i].setAttribute('animation', 'true');
            chartAnimation(chartId, percent);
        }
    }
};

var chartAnimation = function chartAnimation(id, amount) {
    var graph = new ProgressBar.Circle('#' + id, {
        strokeWidth: 6,
        color: '#59595b',
        trailColor: '#C6C8CA',
        trailWidth: 6,
        easing: 'easeInOut',
        duration: 1400,
        svgStyle: null,
        text: {
            value: '',
            alignToBottom: false
        },
        from: {
            color: '#59595b'
        },
        to: {
            color: '#59595b'
        },
        // Set default step function for all animate calls
        step: function step(state, graph) {
            graph.path.setAttribute('stroke', state.color);

            var value = Math.round(graph.value() * 100);

            if (value === 0) {
                graph.setText('');
            } else {
                graph.setText(Math.floor(value / 10) + "/10");
            }
        }
    });
    graph.animate(amount / 10); // Number from 0.0 to 1.0        
};
'use strict';

var olarkStatus = function olarkStatus() {
	setTimeout(function () {
		var chat = document.getElementById('chat-status'),
		    offline = document.getElementById('habla_offline_message_span');

		if (document.contains(offline)) {
			chat.innerHTML = '<span class="button__plain button__plain--red">Olark Offline</span>';
		} else {
			chat.innerHTML = '<span class="button__plain button__plain--green">Olark Online</span>';
		}
	}, 2000);
};
'use strict';

var MoveProductGallery = function MoveProductGallery() {
    var obj = {},
        container = document.getElementById('left-container'),
        gallery = document.getElementById('product-gallery'),
        cart = document.getElementById('product-buy-options-left'),
        video = document.getElementById('model-video');

    obj.desktop = function () {

        if (window.innerWidth > 960) {
            var g = gallery.cloneNode(true);
            gallery.parentNode.removeChild(gallery);
            container.insertBefore(g, video);
        }
    };

    return obj;
};
'use strict';

var addToCart = function addToCart() {
	var cartContainer = document.getElementById('product-buy-options-left'),
	    region = document.querySelector('.region-content'),
	    desktopStyle = {
		'width': region.getBoundingClientRect().width - 15 + 'px',
		'max-width': '1400px',
		'z-index': '1',
		'transition': 'none'
	},
	    fixed = {
		'position': 'fixed',
		'top': '15px',
		'left': '50%',
		'transform': 'translateX(-50%)'
	},
	    absolute = {
		'position': 'absolute',
		'top': '0px',
		'left': 'unset',
		'transform': 'translateX(0%)'
	};

	if (window.innerWidth > 960) {
		applyStyle('#product-buy-options-left', desktopStyle);

		if (window.scrollY > 130) {
			applyStyle('#product-buy-options-left', fixed);
		} else {
			applyStyle('#product-buy-options-left', absolute);
		}
	} else {
		cartContainer.removeAttribute('style');
	}
};
'use strict';

//initiate
var product_filter = function product_filter() {
    var iso = new Isotope('.view-content', {
        itemSelector: '.product-category__card',
        percentPosition: true,
        layoutMode: 'fitRows'
    });

    //sort string of values
    var Sort = function Sort(data_attr) {
        var product = document.querySelectorAll('.product-category__card'),
            sort_range = '',
            obj = {};

        for (var i = 0; i < product.length; i++) {
            var sort_string = product[i].getAttribute(data_attr);
            sort_range += sort_string;
        }

        var s = sort_range.split(" "),
            unsorted_array = [];

        s.forEach(function (key, value) {
            if (key != undefined && key != '') {
                unsorted_array.push(key);
            }
        });

        obj.sort_array = function () {
            //remove duplicates	
            var arr = unsorted_array.filter(function (value, index, array) {
                return array.indexOf(value) == index;
            });

            return arr.sort();
        }, obj.last_item = function () {
            return obj.sort_array()[obj.sort_array().length - 1];
        };

        return obj;
    },
        size = new Sort('data-size'),
        ride_type = new Sort('data-ride'),
        stiffness = new Sort('data-stiffness');

    //create form field values from sorted string
    var Create_form_values = function Create_form_values(value_array) {
        var obj = {};
        obj.option = function () {
            var classify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            var show_last = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var options = void 0;
            for (var i = 0; i < value_array.length; i++) {

                if (value_array[i] != undefined || value_array[i] != null) {
                    if (classify) {
                        if (show_last) {
                            if (i != value_array.length - 1) {
                                options += '<option value=".' + value_array[i] + '">' + value_array[i] + '</option>';
                            } else {
                                options += '<option value=".' + value_array[value_array.length - 1] + '" selected>' + value_array[value_array.length - 1] + '</option>';
                            }
                        } else {
                            options += '<option value=".' + value_array[i] + '">' + value_array[i] + '</option>';
                        }
                    } else {
                        if (show_last) {

                            if (i != value_array.length - 1) {
                                options += '<option value="' + value_array[i] + '">' + value_array[i] + '</option>';
                            } else {
                                options += '<option value="' + value_array[i] + '" selected>' + value_array[i] + '</option>';
                            }
                        } else {
                            options += '<option value="' + value_array[i] + '">' + value_array[i] + '</option>';
                        }
                    }
                }
            }
            return options;
        };

        return obj;
    };

    var size_fields = new Create_form_values(size.sort_array()),
        ride_fields = new Create_form_values(ride_type.sort_array()),
        stiffness_fields = new Create_form_values(stiffness.sort_array());

    //create filter template & actions
    var Filter = function Filter(form_fields) {
        //properties of a filter
        this.form_fields = form_fields;
    };

    Filter.prototype.create_template = function () {
        var self = this;

        var parent_element = document.querySelector('main'),
            new_element = document.createElement('div');

        new_element.id = "product-filter";
        new_element.className = 'user-menu__card';

        new_element.innerHTML += '\n    \t<div class="container">\n\t  \t\t<div class="user-menu__card-section" id="product-filter-header">\n\t    \t\t<a id="filter-btn" class="button__plain button__plain--primary" href="#">Product Filter</a>\n\t  \t\t</div>\n\t  \t\t<form id="filter-form">\n\t\t  \t\t<div class="user-menu__card-section" id="product-filter-items">\n\t\t\t\t\t' + self.form_fields + '\t\n\t\t    \t</div>\n\t\t  \t</form>\n\t\t  \t<div class="user-menu__card-section" id="product-filter-footer">\n\t\t  \t\t<a id="reset" class="button__plain button__plain--primary" href="#">Show All</a>\n\t\t  \t</div>\n\t\t</div>\n\t';

        parent_element.insertBefore(new_element, parent_element.firstChild);

        //open close filter
        var filter_btn = document.getElementById('filter-btn');
        filter_btn.addEventListener('click', function (event) {
            event.preventDefault();
            if (hasClass(new_element, 'product-filter-active')) {
                new_element.classList.remove('product-filter-active');
            } else {
                new_element.classList.add('product-filter-active');
            }
        });

        //reset form
        var reset = document.getElementById('reset'),
            radio_btn = document.querySelectorAll('input[type="radio"]');

        var cards = document.querySelectorAll('.product-category__card');

        reset.addEventListener('click', function (event) {
            event.preventDefault();
            for (var i = 0; i < radio_btn.length; i++) {
                radio_btn[i].checked = false;
            }
            radio_btn[0].checked = true;

            for (var _i = 0; _i < cards.length; _i++) {
                cards[_i].style.display = "block";
            }
            iso.arrange({
                filter: '*'
            });
        });
    };

    //capita 
    Filter.prototype.capita_submit = function () {
        var self = this,
            filter_form = document.getElementById('filter-form'),
            cards = document.querySelectorAll('.product-category__card');

        filter_form.addEventListener('change', function (event) {
            event.preventDefault();

            var price_fields = document.querySelectorAll('input[type="radio"]'),
                ride_val = event.currentTarget.ride_type.value,
                min_size_val = event.currentTarget.min_size.value,
                max_size_val = event.currentTarget.max_size.value,
                stock_val = event.currentTarget.product_status.value,
                min_size_index = size.sort_array().indexOf(min_size_val),
                max_size_index = size.sort_array().indexOf(max_size_val),
                val = '',
                price_val = "medium";

            for (var i = 0; i < price_fields.length; i++) {
                if (price_fields[i].checked === true) {
                    price_val = price_fields[i].value;
                }
            }

            for (var _i2 = min_size_index; _i2 < max_size_index + 1; _i2++) {
                if (_i2 != max_size_index) {
                    val += '.' + stock_val + '.' + ride_val + '.' + price_val + '.' + size.sort_array()[_i2] + ', ';
                } else {
                    val += '.' + stock_val + '.' + ride_val + '.' + price_val + '.' + size.sort_array()[_i2];
                }
            }

            // use matching filter function
            iso.arrange({
                filter: '' + val
            });
        });
    };

    var capita_form_fields = '\n\t\t<div class="form-group">\n\t\t\t<div class="group">\n\t\t\t\t<label class="label-full">Price</label>\n\t\t\t\t<div class="btn-group">\n\t\t\t\t\t<input id="any-price" type="radio" name="price" value="any-price" checked>\n\t\t\t\t\t<label for="any-price"></label> <span>All Price Ranges</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="btn-group">\n\t\t\t\t\t<input id="very-low" type="radio" name="price" value="very-low">\n\t\t\t\t\t<label for="very-low"></label> <span>$100.00 or less</span>\n\t\t\t\t</div>\n\t\t  \t\t<div class="btn-group">\n\t\t  \t\t\t<input id="low" type="radio" name="price" value="low">\n\t\t  \t\t\t<label for="low"></label> <span>$100.00 - $150.00</span>\n\t\t  \t\t</div>\n\t\t  \t\t<div class="btn-group">\n\t\t  \t\t\t<input id="medium" type="radio" name="price" value="medium">\n\t\t  \t\t\t<label for="medium"></label> <span>$150.00 - $200.00</span>\n\t\t  \t\t</div>\n\t\t  \t\t<div class="btn-group">\n\t\t  \t\t\t<input id="high" type="radio" name="price" value="high">\n\t\t  \t\t\t<label for="high"></label> <span>$200.00 - $250.00</span>\n\t\t  \t\t</div>\n\t\t  \t\t<div class="btn-group">\n\t\t  \t\t\t<input id="very-high" type="radio" name="price" value="very-high">\n\t\t  \t\t\t<label for="very-high"></label> <span>$250.00 - $300.00</span>\n\t\t  \t\t</div>\n\t\t  \t\t<div class="btn-group">\n\t\t  \t\t\t<input id="max" type="radio" name="price" value="max">\n\t\t  \t\t\t<label for="max"></label> <span>$300.00 or more</span>\n\t\t  \t\t</div>\n\t\t\t</div>\n\t\t\t<div class="group">\n\t\t\t\t<div class="btn-group connected">\n\t\t\t\t\t<label for="min-size">Min. Size</label>\t\t\n\t\t\t\t\t<select id="min-size" name="min_size">\n\t\t\t\t\t\t' + size_fields.option(false, false) + '\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t\t<div class="btn-group">\t\n\t\t\t\t\t<label for="max-size">Max. Size</label>\t\t\n\t\t\t\t\t<select id="max-size" name="max_size">\n\t\t\t\t\t\t' + size_fields.option(false, true) + '\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t\t<div class="btn-group">\t\n\t\t\t\t\t<label for="ride-type">Ride Type</label>\t\t\n\t\t\t\t\t<select id="ride-type" name="ride_type">\n\t\t\t\t\t\t<option value="any-ride-type" selected>Any</option>\n\t\t\t\t\t\t' + ride_fields.option(false, false) + '\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="btn-group">\t\n\t\t\t\t\t<label for="product-status">In Stock</label>\n\t\t\t\t\t<select id="product-status" name="product_status" >\n\t\t\t\t\t\t<option value="all-stock" selected>All Stock</option>\n\t\t\t\t\t\t<option value="in-stock">In Stock</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\t\t\n\n';

    var capita_filter = new Filter(capita_form_fields);

    //coal
    Filter.prototype.coal_submit = function () {
        var self = this,
            filter_form = document.getElementById('filter-form'),
            cards = document.querySelectorAll('.product-category__card');

        filter_form.addEventListener('change', function (event) {
            event.preventDefault();

            var price_fields = document.querySelectorAll('input[type="radio"]'),
                size_val = event.currentTarget.size.value,
                stock_val = event.currentTarget.product_status.value,
                price_val = "medium";

            for (var i = 0; i < price_fields.length; i++) {
                if (price_fields[i].checked === true) {
                    price_val = price_fields[i].value;
                }
            }

            iso.arrange({
                filter: '.' + price_val + '.' + size_val + '.' + stock_val
            });
        });
    };

    var coal_form_fields = '\n\t\t<div class="form-group">\n\t\t\t<div class="group">\n\t\t\t\t<label class="label-full">Price</label>\n\t\t\t\t<div class="btn-group">\n\t\t\t\t\t<input id="any-price" type="radio" name="price" value="any-price" checked>\n\t\t\t\t\t<label for="any-price"></label> <span>All Price Ranges</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="btn-group">\n\t\t  \t\t\t<input id="low" type="radio" name="price" value="low">\n\t\t  \t\t\t<label for="low"></label> <span>$25.00 or less</span>\n\t\t  \t\t</div>\n\t\t  \t\t<div class="btn-group">\n\t\t  \t\t\t<input id="medium" type="radio" name="price" value="medium">\n\t\t  \t\t\t<label for="medium"></label> <span>$25.00 - $50.00</span>\n\t\t  \t\t</div>\n\t\t  \t\t<div class="btn-group">\n\t\t  \t\t\t<input id="high" type="radio" name="price" value="high">\n\t\t  \t\t\t<label for="high"></label> <span>$50.00 - $75.00</span>\n\t\t  \t\t</div>\n\t\t  \t\t<div class="btn-group">\n\t\t  \t\t\t<input id="max" type="radio" name="price" value="max">\n\t\t  \t\t\t<label for="max"></label> <span>$75.00 or more</span>\n\t\t  \t\t</div>\n\t\t\t</div>\n\t\t\t<div class="group">\n\t\t\t\t<div class="btn-group">\n\t\t\t\t\t<label for="size">Size</label>\t\t\n\t\t\t\t\t<select id="size" name="size">\n\t\t\t\t\t\t' + size_fields.option(false) + '\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="btn-group">\t\n\t\t\t\t\t<label for="product-status">In Stock</label>\n\t\t\t\t\t<select id="product-status" name="product_status" >\n\t\t\t\t\t\t<option value="all-stock" selected>All Stock</option>\n\t\t\t\t\t\t<option value="in-stock">In Stock</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\t\t\n\n';
    var coal_filter = new Filter(coal_form_fields);

    //union
    Filter.prototype.union_submit = function () {
        var self = this,
            filter_form = document.getElementById('filter-form'),
            cards = document.querySelectorAll('.product-category__card');

        filter_form.addEventListener('change', function (event) {
            event.preventDefault();

            var price_fields = document.querySelectorAll('input[type="radio"]'),
                size_val = event.currentTarget.size.value,
                stock_val = event.currentTarget.product_status.value,
                stiffness_val = event.currentTarget.stiffness.value,
                price_val = "medium";

            for (var i = 0; i < price_fields.length; i++) {
                if (price_fields[i].checked === true) {
                    price_val = price_fields[i].value;
                }
            }

            console.log('.' + price_val + size_val + '.' + stock_val + '.' + stiffness_val);

            iso.arrange({
                filter: '.' + price_val + size_val + '.' + stock_val + '.' + stiffness_val
            });
        });
    };

    var union_form_fields = '\n\t\t<div class="form-group">\n\t\t\t<div class="group">\n\t\t\t\t<label class="label-full">Price</label>\n\t\t\t\t<div class="btn-group">\n\t\t\t\t\t<input id="any-price" type="radio" name="price" value="any-price" checked>\n\t\t\t\t\t<label for="any-price"></label> <span>All Price Ranges</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="btn-group">\n\t\t\t\t\t<input id="very-low" type="radio" name="price" value="very-low">\n\t\t\t\t\t<label for="very-low"></label> <span>$100.00 or less</span>\n\t\t\t\t</div>\n\t\t  \t\t<div class="btn-group">\n\t\t  \t\t\t<input id="low" type="radio" name="price" value="low">\n\t\t  \t\t\t<label for="low"></label> <span>$100.00 - $150.00</span>\n\t\t  \t\t</div>\n\t\t  \t\t<div class="btn-group">\n\t\t  \t\t\t<input id="medium" type="radio" name="price" value="medium">\n\t\t  \t\t\t<label for="medium"></label> <span>$150.00 - $200.00</span>\n\t\t  \t\t</div>\n\t\t  \t\t<div class="btn-group">\n\t\t  \t\t\t<input id="high" type="radio" name="price" value="high">\n\t\t  \t\t\t<label for="high"></label> <span>$200.00 - $250.00</span>\n\t\t  \t\t</div>\n\t\t  \t\t<div class="btn-group">\n\t\t  \t\t\t<input id="very-high" type="radio" name="price" value="very-high">\n\t\t  \t\t\t<label for="very-high"></label> <span>$250.00 - $300.00</span>\n\t\t  \t\t</div>\n\t\t  \t\t<div class="btn-group">\n\t\t  \t\t\t<input id="max" type="radio" name="price" value="max">\n\t\t  \t\t\t<label for="max"></label> <span>$300.00 or more</span>\n\t\t  \t\t</div>\n\t\t\t</div>\n\t\t\t<div class="group">\n\t\t\t\t<div class="btn-group">\n\t\t\t\t\t<label for="size">Size</label>\t\t\n\t\t\t\t\t<select id="size" name="size">\n                        <option value=".S">Small</option>\n                        <option value=".M" selected>Medium</option>\n\t\t\t\t\t\t<option value=".L">Large</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="btn-group">\n\t\t\t\t\t<label for="stiffness">Stiffness</label>\t\t\n\t\t\t\t\t<select id="stiffness" name="stiffness">\n\t\t\t\t\t\t<option value="loose_stiffness" selected>loose and surfy</option>\n\t\t\t\t\t\t<option value="medium_stiffness">medium flex</option>\n\t\t\t\t\t\t<option value="stiff_stiffness">stiff and responsive</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="btn-group">\t\n\t\t\t\t\t<label for="product-status">In Stock</label>\n\t\t\t\t\t<select id="product-status" name="product_status" >\n\t\t\t\t\t\t<option value="all-stock" selected>All Stock</option>\n\t\t\t\t\t\t<option value="in-stock" selected>In Stock</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\t\t\n\n';
    var union_filter = new Filter(union_form_fields);

    if (hasClass(document.body, 'page-capita')) {
        capita_filter.create_template();
        capita_filter.capita_submit();
    }

    if (hasClass(document.body, 'page-coal')) {
        coal_filter.create_template();
        coal_filter.coal_submit();
    }

    if (hasClass(document.body, 'page-union') && !hasClass(document.body, 'page-union-all-parts')) {
        union_filter.create_template();
        union_filter.union_submit();
    }
};
'use strict';

var new_user_form = document.getElementById('new-user-form'),
    existing_user_form = document.getElementById('existing-user-form'),
    select = document.getElementById('new-user-registred-user-btn');

var new_user_existing_user_form_state = function new_user_existing_user_form_state() {

	if (select.value === 'existing_user') {
		new_user_form.classList.remove('proform-user-option--active');
		existing_user_form.classList.add('proform-user-option--active');
	} else if (select.value === 'new_user') {
		existing_user_form.classList.remove('proform-user-option--active');
		new_user_form.classList.add('proform-user-option--active');
	} else {
		existing_user_form.classList.remove('proform-user-option--active');
		new_user_form.classList.add('proform-user-option--active');
	}
};

var new_user_existing_user_form_update = function new_user_existing_user_form_update() {
	select.addEventListener('change', function (event) {
		new_user_existing_user_form_state();
	});
};
'use strict';

Drupal.behaviors.outOfStock = {
    attach: function attach(ctx, server) {

        if (page('add-to-cart')) {
            var outOfStock = document.getElementById('out-of-stock'),
                checkOutForm = document.querySelector('.commerce-add-to-cart');

            if (hasClass(checkOutForm, 'out-of-stock')) {
                outOfStock.style.opacity = '1';
            } else {
                outOfStock.style.opacity = '0';
            }
        }

        if (page('condition-track')) {
            var track = document.getElementById('condition-track');
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

window.onload = function () {

    var productPageLayout = new MoveProductGallery();
    if (page('add-to-cart')) {
        productPageLayout.desktop();
    }

    var mainNav = new linkActiveClass('header .box__link');
    mainNav.activeState('box__link--active', 'header__navigation-bar--active', false, false);
    //open sub navigation - submenu
    var subNav = new linkActiveClass('.parent-link');
    subNav.activeState('link__plain--gray-active', 'sub-menu--active', false, false);

    //open user cards
    var userNav = new linkActiveClass('.card-nav');
    userNav.activeState('header__button--active', 'user-menu__card--active', false, false);

    //close user cards
    closeUserCards();

    //search bar open/close
    var searchBar = new linkActiveClass('header #header-search');
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
        if (!IE11) {
            imgZoom();
        }
    }

    //demo page
    if (page('condition-track')) {
        var track = document.getElementById('condition-track');
        if (inView('#condition-track', 0)) {
            track.style.width = track.getAttribute('data-condition') + '%';
        }
    }

    if (page('vip')) {
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

    var documentState = setInterval(function () {

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

    window.addEventListener('scroll', function () {

        var olark = document.getElementById('habla_window_div'),
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
            var _track = document.getElementById('condition-track');
            if (inView('#condition-track', 0)) {
                _track.style.width = _track.getAttribute('data-condition') + '%';
            }
        }

        //product pages
        if (page('product-buy-options-left')) {
            addToCart();
        }
    });

    window.addEventListener('resize', function () {
        var olark = document.getElementById('habla_window_div'),
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
};
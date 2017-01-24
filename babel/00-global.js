const mobileDevice = () => {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(
            /webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(
            /iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(
            /BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
    } else {
        return false;
    }
}

const IE11 = !!window.MSInputMethodContext && !!document.documentMode;

const applyStyle = (element, property) => {
    let el = document.querySelectorAll(element);
    for(let i = 0; i < el.length; i++){
        for(let key in property){
            if(property.hasOwnProperty(key)){
                el[i].style[key] = property[key];
            }
        }
    }
}


const notify = (title, bodyText, iconImage) => {
    let options = {
        body: bodyText,
        icon: iconImage
    }

    if (!mobileDevice()) {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted" || Notification.permission === "default") {
            document.body.classList.add('no-jgrowl');
            let notification = new Notification(title, options);
            setTimeout(() => {
                notification.close();
            }, 8000);

        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function(permission) {

                if (permission === "granted" || Notification.permission === "default") {
                    document.body.classList.add('no-jgrowl');
                    let notification = new Notification(title, options);
                    setTimeout(() => {
                        notification.close();
                    }, 8000);
                }
            });
        }
    }
}

const page = (id) => {
    if (typeof(document.getElementById(id)) != 'undefined' && document.getElementById(id) != null) {
        return true;
    } else {
        return false;
    }
}

const hasClass = (element, className) => {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

const inView = (el, index) => {

    let elTop = document.querySelectorAll(el)[index].getBoundingClientRect().top,
        winHeight = window.innerHeight;

    if (elTop < winHeight - 100 && elTop > 0) {
        return true;
    } else {
        return false;
    }

}

const once = (fn, context) => {
    let result;

    return function() {
        if (fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
}

const linkActiveClass = (element) => {
    let obj = {},
        link = document.querySelectorAll(element);
    obj.clearActiveClasses = (activeClass, activeNavClass) => {

            for (let i = 0; i < link.length; i++) {
                link[i].classList.remove(activeClass);
                if (activeNavClass != false) {
                    let navigationID = link[i].getAttribute('href');
                    document.querySelector(navigationID).classList.remove(activeNavClass);
                }
            }
        },
        obj.activeState = (activeClass, activeNavClass, open, close) => {
            for (let i = 0; i < link.length; i++) {
                (function(i){
                    link[i].addEventListener('click', (event) => {
                        event.preventDefault();

                        if (!hasClass(link[i], activeClass)) {
                            obj.clearActiveClasses(activeClass, activeNavClass);
                            link[i].classList.add(activeClass);
                            let navigationID = link[i].getAttribute('href');
                            document.querySelector(navigationID).classList.add(activeNavClass);
                            if (open) {
                                open();
                            }
                        } else {
                            link[i].classList.remove(activeClass);
                            let navigationID = link[i].getAttribute('href');
                            document.querySelector(navigationID).classList.remove(activeNavClass);
                            if (close) {
                                close();
                            }
                        }

                    });
                })(i);
            }
        }

    return obj;
}

const elementObserver = (el, callback) => {
    // select the target node
    const target = document.getElementById(el);

    // create an observer instance
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (callback) {
                callback(mutation);
            }
        });
    });

    // configuration of the observer:
    const config = {
        attributes: true,
        childList: true,
        characterData: true
    };

    // pass in the target node, as well as the observer options
    observer.observe(target, config);
}

const clickToScroll = () => {
    // Feature Test
    if ('querySelector' in document && 'addEventListener' in window && Array.prototype.forEach) {

        // Function to animate the scroll
        let smoothScroll = (anchor, duration) => {

            // Calculate how far and how fast to scroll
            let startLocation = window.pageYOffset;
            let endLocation = anchor.offsetTop;
            let distance = endLocation - startLocation;
            let increments = distance / (duration / 16);
            let stopAnimation;

            // Scroll the page by an increment, and check if it's time to stop
            let animateScroll = () => {
                window.scrollBy(0, increments);
                stopAnimation();
            };

            // If scrolling down
            if (increments >= 0) {
                // Stop animation when you reach the anchor OR the bottom of the page
                stopAnimation = () => {
                    let travelled = window.pageYOffset;
                    if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight)) {
                        clearInterval(runAnimation);
                    }
                };
            }
            // If scrolling up
            else {
                // Stop animation when you reach the anchor OR the top of the page
                stopAnimation = () => {
                    let travelled = window.pageYOffset;
                    if (travelled <= (endLocation || 0)) {
                        clearInterval(runAnimation);
                    }
                };
            }

            // Loop the animation function
            let runAnimation = setInterval(animateScroll, 16);

        };

        // Define smooth scroll links
        let scrollToggle = document.querySelectorAll('.scroll');

        // For each smooth scroll link
        [].forEach.call(scrollToggle, (toggle) => {

            // When the smooth scroll link is clicked
            toggle.addEventListener('click', (e) => {

                // Prevent the default link behavior
                e.preventDefault();

                // Get anchor link and calculate distance from the top
                let dataID = toggle.getAttribute('href');
                let dataTarget = document.querySelector(dataID);
                let dataSpeed = toggle.getAttribute('data-speed');

                // If the anchor exists
                if (dataTarget) {
                    // Scroll to the anchor
                    smoothScroll(dataTarget, dataSpeed || 500);
                }

            }, false);

        });

    }
}

const user = () => {
    return Drupal.settings.c3Shop.user;
}

const get_errors = () => {
    const errors = Drupal.settings.c3Shop.form_errors;

    for (let i = 0; i < errors.length; i++) {
        let title = "C3 Shop",
            bodyText = errors[i].content.replace(/<(?:.|\n)*?>/gm, ''),
            iconImage = Drupal.settings.basePath + "sites/all/themes/c3Shop/images/c3-logo.png";

        notify(title, bodyText, iconImage);
    }
}
const createSwiper = (direction, loop, callback) =>{
    const swiper = new Swiper ('.swiper-container', {
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
        scrollbar: '.swiper-scrollbar',
    });

    if(callback){
        callback();
    }
}  
const swiper = new Swiper('.cases-swiper', {
    loop: true,
    grabCursor: true,
    slidesPerView: 'auto',
    spaceBetween: 150,
    speed: 500,

    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
});
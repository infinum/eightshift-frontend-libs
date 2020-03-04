import domReady from '@wordpress/dom-ready';

domReady(() => {
  const selector = '.js-block-carousel';
  const elements = document.querySelectorAll(selector);

  if (elements.length) {
    import('./carousel-slider').then(({ CarouselSlider }) => {
      [...elements].forEach((element) => {
        const carouselSlider = new CarouselSlider({
          element,
          nextEl: '.js-swiper-next',
          prevEl: '.js-swiper-prev',
        });
        carouselSlider.init();
      });
    });
  }
});

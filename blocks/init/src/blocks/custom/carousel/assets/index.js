import domReady from '@wordpress/dom-ready';

domReady(() => {
  const selector = '.js-block-carousel';
  const elements = document.querySelectorAll(selector);

  if (elements.length) {
    import('./carousel-slider').then(({ CarouselSlider }) => {
      const carouselSlider = new CarouselSlider(selector);
      carouselSlider.init();
    });
  }
});

$(function() {
  
  const selector = '.js-block-carousel';
  if ($(selector).length) {
    import('./carousel-slider').then(({ CarouselSlider }) => {
      const carouselSlider = new CarouselSlider(selector);
      carouselSlider.init();
    });
  }
});

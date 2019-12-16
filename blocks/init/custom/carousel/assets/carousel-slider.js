import Swiper from 'swiper/dist/js/swiper';
import { media } from 'EighshiftBlocksUtilityHelpersPath/media';

export class CarouselSlider {
  constructor(defaultElement) {
    this.defaultElement = defaultElement;
  }

  init() {

    $.each($(this.defaultElement), function(index, item) {
      const $item = $(item);

      const mySwiper = new Swiper(item, { // eslint-disable-line no-unused-vars
        loop: $item.attr('data-swiper-loop'),
        freeMode: $item.attr('data-swiper-freeMode'),
        slidesPerView: 'auto',
        spaceBetween: 25,
        keyboard: {
          enabled: true,
        },
        grabCursor: true,
        breakpointsInverse: true,
        breakpoints: {
          [media.tablet]: {
            spaceBetween: 50,
          },
        },
        navigation: {
          nextEl: '.js-swiper-next',
          prevEl: '.js-swiper-prev',
        },
      });
    });
  }
}

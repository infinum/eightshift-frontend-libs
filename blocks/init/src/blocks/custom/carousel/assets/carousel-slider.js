import Swiper from 'EightshiftBlocksSwiper';
import { media } from 'EightshiftBlocksUtilityHelpersPath/media';

export class CarouselSlider {
  constructor(defaultElement) {
    this.defaultElements = document.querySelectorAll(defaultElement);
  }

  init() {

    [...this.defaultElements].forEach((el) => {
      const item = el;

      const mySwiper = new Swiper(item, { // eslint-disable-line no-unused-vars
        loop: item.getAttribute('data-swiper-loop'),
        freeMode: item.getAttribute('data-swiper-freeMode'),
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

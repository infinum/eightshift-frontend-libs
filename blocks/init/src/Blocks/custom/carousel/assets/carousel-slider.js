import Swiper from 'swiper';
import globalSettings from './../../../manifest.json';

export class CarouselSlider {
	constructor(options) {
		this.element = options.element;
		this.blockClass = options.blockClass;
		this.nextElement = options.nextElement;
		this.prevElement = options.prevElement;
		this.paginationElement = options.paginationElement;
		this.eventName = options.eventName;
	}

	init() {
		this.initCarousel();
	}

	initCarousel() {
		const item = this.element;

		const showItems = item.getAttribute('data-show-items');
		const { media } = globalSettings.globalVariables;

		const mySwiper = new Swiper(item, { // eslint-disable-line no-unused-vars
			loop: item.getAttribute('data-swiper-loop'),
			slideClass: `${this.blockClass}__item`,
			slidesPerView: 1,
			spaceBetween: 1,
			keyboard: {
				enabled: true,
			},
			grabCursor: true,
			breakpointsInverse: true,
			threshold: 20,
			navigation: {
				nextEl: this.nextElement,
				prevEl: this.prevElement,
			},
			pagination: {
				el: this.paginationElement,
				type: 'bullets',
				clickable: true,
			},
			breakpoints: {
				[media.tablet]: {
					slidesPerView: showItems,
					spaceBetween: showItems === '2' ? 3 : 0,
				},
			},
			on: {
				init: () => {
					window.dispatchEvent(this.eventName);
				},
			},
		});
	}
}

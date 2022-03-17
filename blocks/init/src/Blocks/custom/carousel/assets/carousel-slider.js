import Swiper, { Navigation, Pagination, A11y } from 'swiper';
import globalManifest from './../../../manifest.json';

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
		const { breakpoints } = globalManifest.globalVariables;
		
		const item = this.element;

		const showItems = item?.dataset?.showItems ?? -1;
		const loopMode = item?.dataset?.swiperLoop ?? 'false';

		new Swiper(item, {
			loop: loopMode === 'true',
			slideClass: `${this.blockClass}__item`,
			slidesPerView: 1,
			spaceBetween: 10,
			modules: [
				Navigation, Pagination, A11y
			],
			a11y: {
				slideRole: 'figure',
			},
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
				[breakpoints.tablet]: {
					slidesPerView: parseInt(showItems) === -1 ? 'auto' : parseInt(showItems),
					spaceBetween: 10,
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

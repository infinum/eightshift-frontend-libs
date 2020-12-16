import domReady from '@wordpress/dom-ready';

domReady(() => {
	const selector = '.js-block-carousel';
	const elements = document.querySelectorAll(selector);

	if (elements.length) {
		const eventName = new CustomEvent('carouselInit');

		import('./carousel-slider').then(({ CarouselSlider }) => {
			[...elements].forEach((element) => {
				const carouselSlider = new CarouselSlider({
					element,
					blockClass: 'block-carousel',
					nextElement: `${selector}-next-arrow`,
					prevElement: `${selector}-prev-arrow`,
					paginationElement: `${selector}-pagination`,
					eventName,
				});
				carouselSlider.init();
			});
		});
	}
});

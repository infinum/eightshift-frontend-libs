import domReady from '@wordpress/dom-ready';
import manifest from '../manifest.json';

domReady(async () => {
	const { blockJsClass, blockName } = manifest;

	const selector = `.${blockJsClass}`;
	const elements = document.querySelectorAll(selector);

	if (!elements.length) {
		return;
	}

	const eventName = new CustomEvent('carouselInit');

	const { CarouselSlider } = await import('./carousel-slider');

	[...elements].forEach((element) => {
		const carouselSlider = new CarouselSlider({
			element,
			blockClass: `block-${blockName}`,
			nextElement: `${selector}-next-arrow`,
			prevElement: `${selector}-prev-arrow`,
			paginationElement: `${selector}-pagination`,
			eventName,
		});
		carouselSlider.init();
	});
});

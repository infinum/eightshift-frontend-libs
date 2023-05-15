import domReady from '@wordpress/dom-ready';
import manifest from '../manifest.json';

domReady(async () => {
	const { blockName } = manifest;

	const element = document.querySelector(`.js-block-${blockName}`);
	const isScrolledClass = 'is-scrolled';

	if (!element) {
		return;
	}

	// Optimized scroll listener.
	let lastKnownScrollPosition = 0;
	let ticking = false;

	const handleScroll = (scrollPosition) => {
		element.classList.toggle(isScrolledClass, scrollPosition >= 20);
	};

	window.addEventListener('scroll', () => {
		lastKnownScrollPosition = window.scrollY;

		if (!ticking) {
			window.requestAnimationFrame(() => {
				handleScroll(lastKnownScrollPosition);
				ticking = false;
			});

			ticking = true;
		}
	});
});

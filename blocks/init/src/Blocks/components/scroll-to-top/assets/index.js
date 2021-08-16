import domReady from '@wordpress/dom-ready';
import manifest from '../manifest.json';

domReady(() => {
	const selector = `.${manifest.componentJsClass}`;
	const elements = document.querySelectorAll(selector);

	if (!elements.length) {
		return;
	}

	[...elements].forEach((element) => {
		element.addEventListener('click', (event) => {
			event.preventDefault();
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
		});
	});
});

import domReady from '@wordpress/dom-ready';

domReady(() => {
	const selector = '.js-scroll-to-top';
	const elements = document.querySelectorAll(selector);

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

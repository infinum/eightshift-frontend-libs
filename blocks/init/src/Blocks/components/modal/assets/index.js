import domReady from '@wordpress/dom-ready';

domReady(() => {
	const selector = '.js-modal';
	const elements = document.querySelectorAll(selector);
	const body = document.getElementsByTagName('body')[0];

	[...elements].forEach((element) => {
		body.append(element);
	});

});

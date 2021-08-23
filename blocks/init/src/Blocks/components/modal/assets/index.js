import domReady from '@wordpress/dom-ready';
import MicroModal from 'micromodal';

domReady(() => {
	const selector = '.js-modal';
	const elements = document.querySelectorAll(selector);
	const body = document.getElementsByTagName('body')[0];

	[...elements].forEach((element) => {
		body.append(element);
	});

	MicroModal.init({
		openTrigger: 'data-micromodal-trigger',
		closeTrigger: 'data-micromodal-close',
		openClass: 'is-open',
		disableScroll: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true
	});
});

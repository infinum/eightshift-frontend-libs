import domReady from '@wordpress/dom-ready';
import manifest from './../manifest.json';

domReady(async () => {
	const { componentJsClass, attributes } = manifest;

	const body = document.querySelector('body');
	const modalSelector = `.${componentJsClass}`;
	const modalElements = document.querySelectorAll(modalSelector);

	if (!modalElements.length) {
		return;
	}

	// Append all modals at the bottom of body.
	[...modalElements].forEach((element) => {
		body.append(element);
	});

	// Instantiate and initialize Modal.
	const { Modal } = await import('./modal');

	const modal = new Modal({
		openTrigger: `${attributes.modalOpenAttr.default}`,
		closeTrigger: `${attributes.modalCloseAttr.default}`,
		openClass: 'is-open',
	});

	modal.init();
});

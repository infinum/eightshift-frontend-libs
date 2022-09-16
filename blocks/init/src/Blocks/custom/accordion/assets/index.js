import domReady from '@wordpress/dom-ready';
import manifest from './../manifest.json';

domReady(async () => {
	const accordionSelector = `.${manifest.blockJsClass}`;
	const accordionItemSelector = `.${manifest.blockJsClass}-item`;
	const accordionElements = document.querySelectorAll(accordionSelector);

	if (!accordionElements.length) {
		return;
	}

	const { Accordion } = await import('./accordion');

	accordionElements.forEach((item) => {
		const accordion = new Accordion({
			containerElement: item,
			accordionItems: item.querySelectorAll(accordionItemSelector),
			itemSelector: `${accordionSelector}-item`,
			triggerSelector: `${accordionSelector}-item-trigger`,
			panelSelector: `${accordionSelector}-item-panel`,
		});

		accordion.init();
	});
});

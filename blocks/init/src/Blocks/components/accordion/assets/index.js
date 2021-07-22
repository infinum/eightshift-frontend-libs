import domReady from '@wordpress/dom-ready';
import { componentJsClass } from './../manifest.json';

domReady(() => {
	const accordionSelector = `.${componentJsClass}`;
	const accordionElements = document.querySelectorAll(accordionSelector);

	if (accordionElements.length) {
		import('./accordion').then(({ Accordion }) => {
			[...accordionElements].forEach((item) => {
				const accordion = new Accordion({
					accordion: item,
					accordionSelector,
					triggerSelector: `${accordionSelector}-trigger`,
					panelSelector: `${accordionSelector}-panel`,
				});

				accordion.init();
			});
		});
	}
});

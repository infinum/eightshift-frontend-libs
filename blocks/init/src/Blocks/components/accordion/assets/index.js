import domReady from '@wordpress/dom-ready';

domReady(() => {
	const accordionSelector = '.js-accordion';
	const accordionElements = document.querySelectorAll(accordionSelector);

	if (accordionElements.length) {
		import('./accordion').then(({ Accordion }) => {
			[...accordionElements].forEach((item) => {
				const accordion = new Accordion({
					accordion: item,
					accordionSelector,
				});

				accordion.init();
			});
		});
	}
});

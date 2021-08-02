import domReady from '@wordpress/dom-ready';
import { tabClass } from './../manifest.json'

domReady(() => {
	const blockJsClass = `js-block-tabs`;
	const tabsBlockSelector = `.${blockJsClass}`;
	const tabElements = document.querySelectorAll(tabsBlockSelector);

	if (tabElements.length) {
		import('./tabber').then(({ Tabber }) => {
			const tabber = new Tabber({
				blockJsClass,
				innerBlockJsClass: `js-${tabClass}`,
				tabsBlockSelector
			});

			tabber.init();
		});
	}
});

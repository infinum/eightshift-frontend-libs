/* global esBlocksLocalization */

import domReady from '@wordpress/dom-ready';
import manifest from './../manifest.json';

domReady(() => {
	const {
		componentJsClass,
	} = manifest;

	const selectors = `.${componentJsClass}`;
	const elements = document.querySelectorAll(selectors);

	if (elements.length) {
		import('./load-more').then(({ LoadMore }) => {
			const loadMore = new LoadMore({
				triggerElements: elements,
				ajaxHandler: 'dynamic_data',
				ajaxUrl: esBlocksLocalization?.ajaxurl,
			});

			loadMore.init();
		});
	}
});

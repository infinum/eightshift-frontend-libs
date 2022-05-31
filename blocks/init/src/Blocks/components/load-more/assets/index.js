/* global esBlocksLocalization */

import domReady from '@wordpress/dom-ready';
import manifest from './../manifest.json';

domReady(() => {
	const {
		componentJsClass,
		componentJsContainerClass,
		componentJsLoaderClass
	} = manifest;

	const selectors = `.${componentJsClass}`;
	const elements = document.querySelectorAll(selectors);

	if (elements.length) {
		import('./load-more').then(({ LoadMore }) => {
			const loadMore = new LoadMore({
				triggerElements: elements,
				container: `.${componentJsContainerClass}`,
				loader: `.${componentJsLoaderClass}`,
				ajaxHandler: 'dynamic_data',
				ajaxUrl: esBlocksLocalization?.ajaxurl,
			});

			loadMore.init();
		});
	}
});

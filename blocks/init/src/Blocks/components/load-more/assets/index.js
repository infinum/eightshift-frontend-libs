/* global esBlocksLocalization */

import domReady from '@wordpress/dom-ready';
import manifest from './../manifest.json';

domReady(async () => {
	const {
		componentJsClass,
	} = manifest;

	const selectors = `.${componentJsClass}`;
	const elements = document.querySelectorAll(selectors);

	const { LoadMore } = await import('./load-more');

	const loadMore = new LoadMore({
		triggerElements: elements,
		restUrl: esBlocksLocalization?.loadMoreRestUrl ?? '',
	});

	loadMore.init();
});

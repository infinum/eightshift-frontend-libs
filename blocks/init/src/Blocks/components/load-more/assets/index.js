/* global esBlocksLocalization */

import domReady from '@wordpress/dom-ready';
import manifest from './../manifest.json';

domReady(async () => {
	const {
		componentJsClass,
	} = manifest;

	const selectors = `.${componentJsClass}`;
	const elements = document.querySelectorAll(selectors);

	if (!elements.length) {
		return;
	}
	
	const { LoadMore } = await import('./load-more');

	new LoadMore({
		triggerElements: elements,
		restUrl: esBlocksLocalization?.loadMoreRestUrl ?? '',
	}).init();
});

import domReady from '@wordpress/dom-ready';
import manifest from './../manifest.json';

domReady(async () => {
	const shareLinkSelector = `.${manifest.componentJsClass}`;
	const shareLinks = document.querySelectorAll(shareLinkSelector);

	if (!shareLinks) {
		return;
	}

	const { Share } = await import('./share');

	const share = new Share({ shareLinks });
	share.init();
});

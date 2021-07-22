import domReady from '@wordpress/dom-ready';
import { componentJsClass } from './../manifest.json';

domReady(() => {
	const shareLinkSelector = `.${componentJsClass}`;
	const shareLinks = document.querySelectorAll(shareLinkSelector);

	if (shareLinks) {
		import('./share').then(({ Share }) => {
			const share = new Share({
				shareLinks,
			});
			share.init();
		});
	}
});

import domReady from '@wordpress/dom-ready';

domReady(() => {
	const shareLinkSelector = '.js-share-link';
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

import domReady from '@wordpress/dom-ready';
import manifest from '../manifest.json';

domReady(async () => {
	const shareTargets = document.querySelectorAll(`.${manifest.componentJsClass}`);

	if (shareTargets.length < 1) {
		return;
	}

	const openShareDialog = async ({ shareUrl, pageUrl, pageTitle }) => {
		const navigatorShareData = {
			title: pageTitle,
			url: pageUrl,
		};

		if ('share' in navigator && navigator?.canShare(navigatorShareData)) {
			await navigator?.share(navigatorShareData);
		} else {
			window.open(
				shareUrl,
				'share-post',
				'height=600,width=800,left=0,top=0,location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1'
			);
		}
	};

	shareTargets.forEach((element) => {
		element.querySelectorAll(`.${manifest.componentJsClass}-link`).forEach((link) => {
			link.addEventListener('click', () => {
				openShareDialog({
					shareUrl: link?.dataset?.shareUrl ?? '',
					pageUrl: link?.dataset?.pageUrl ?? '',
					pageTitle: link?.dataset?.pageTitle ?? '',
				});
			});
		});
	});
});

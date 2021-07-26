export class Share {
	constructor(options) {
		this.shareLinks = options.shareLinks;
	}

	init() {
		[...this.shareLinks].forEach((shareLink) => {
			shareLink.addEventListener('click', async (event) => {
				event.preventDefault();

				await this.openShareDialog(event.currentTarget);
			});
		});
	}

	async openShareDialog({ href, dataset }) {
		const shareUrl = href;
		const pageUrl = dataset.shareUrl;
		const pageTitle = dataset.shareTitle;

		if (navigator.share) {
			await navigator?.share({
				title: pageTitle,
				url: pageUrl,
			});
		} else {
			window.open(
				shareUrl,
				'share-post',
				'height=600,width=800,left=0,top=0,location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1'
			);
		}
	}
}

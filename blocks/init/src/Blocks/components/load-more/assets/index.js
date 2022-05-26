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
			[...elements].forEach((item) => {
				const loadMore = new LoadMore({
					trigger: item,
					container: `.${componentJsContainerClass}`,
					loader: `.${componentJsLoaderClass}`,
				});

				loadMore.init();
			});
		});
	}
});

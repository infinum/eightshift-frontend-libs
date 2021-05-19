import domReady from '@wordpress/dom-ready';
import manifest from './../manifest.json';

domReady(() => {
	const drawerSelector = `.${manifest.componentJsClass}`;
	const drawerElements = document.querySelector(drawerSelector);

	if (drawerElements) {
		import('./drawer').then(({ Drawer }) => {
			const drawer = new Drawer({
				drawerSelector
			});

			drawer.init();
		});
	}
});

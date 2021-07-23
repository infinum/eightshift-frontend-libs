import domReady from '@wordpress/dom-ready';
import manifest from './../manifest.json';

domReady(async () => {
	const drawerSelector = `.${manifest.componentJsClass}`;
	const drawerElements = document.querySelector(drawerSelector);

	if (!drawerElements) {
		return;
	}

	const { Drawer } = await import('./drawer');
	const drawer = new Drawer({
		drawerSelector
	});
	drawer.init();
});

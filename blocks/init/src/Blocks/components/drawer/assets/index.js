import domReady from '@wordpress/dom-ready';
import manifest from './../manifest.json';

domReady(async () => {
	const drawerSelector = `.${manifest.componentJsClass}`;
	const drawerElement = document.querySelector(drawerSelector);

	if (!drawerElement) {
		return;
	}

	const { Drawer } = await import('./drawer');

	const drawer = new Drawer({ drawerElement });
	drawer.init();
});

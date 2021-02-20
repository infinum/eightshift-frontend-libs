import domReady from '@wordpress/dom-ready';

domReady(() => {

	const menuSelector = '.js-main-menu';
	const anchor = '.js-main-menu-link';
	const subMenu = '.js-submenu';

	if (menuSelector.length) {
		import('./main-menu-a11y').then(({ AccessibleMenu }) => {
			const menu = new AccessibleMenu({
				menuSelector,
				anchor,
				subMenu,
			});

			menu.init();
		});
	}
});

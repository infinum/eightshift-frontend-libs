import domReady from '@wordpress/dom-ready';
import manifest from '../manifest.json';

domReady(async () => {
	const { blockName } = manifest;

	const selector = `.js-block-${blockName}`;
	const elements = document.querySelectorAll(selector);

	if (!elements.length) {
		return;
	}

	const { MapController } = await import('./map-controller');

	elements.forEach((element) => {
		const map = new MapController({element});

		map.init();
	});
});

import domReady from '@wordpress/dom-ready';
import globalManifest from '../../../manifest.json';
import manifest from './../manifest.json';

domReady(async () => {
	const lottieElementSelector = `.${manifest.blockJsClass}`;
	const lottieElements = document.querySelectorAll(lottieElementSelector);

	if (!lottieElements.length) {
		return;
	}

	const {
		globalVariables: {
			breakpoints,
		},
	} = globalManifest;

	const { LottieControl } = await import('./lottie-control');

	[...lottieElements].forEach((lottieElement) => {
		const lottieControl = new LottieControl({
			lottieElement,
			lottieContainerSelector: `${lottieElementSelector}-container`,
			breakpoints,
		});

		lottieControl.init();
	});

});

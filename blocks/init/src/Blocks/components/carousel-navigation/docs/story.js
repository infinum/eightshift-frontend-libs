import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { CarouselNavigationEditor } from './../components/carousel-navigation-editor';

export default {
	title: 'Components|Carousel Navigation',
	parameters: {
		notes: readme,
	},
};

const props = {
	blockClass: 'block-selector',
	blockJsPrevClass: 'js-prev-trigger',
	blockJsNextClass: 'js-next-trigger',
};

export const component = () => (
	<CarouselNavigationEditor {...props} />
);

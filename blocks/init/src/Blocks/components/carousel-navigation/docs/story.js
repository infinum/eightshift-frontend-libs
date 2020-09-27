import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { CarouselNavigation } from '../carousel-navigation';

export default {
	title: 'Components|Carousel Navigation',
	parameters: {
		notes: readme,
	},
};

export const component = () => (
	<CarouselNavigation />
);

import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { CarouselPagination } from '../carousel-pagination';

export default {
	title: 'Components|Carousel Pagination',
	parameters: {
		notes: readme,
	},
};

export const component = () => (
	<CarouselPagination />
);

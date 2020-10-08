import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { CarouselPaginationEditor } from './../components/carousel-pagination-editor';

export default {
	title: 'Components|Carousel Pagination',
	parameters: {
		notes: readme,
	},
};

const props = {
	blockClass: 'block-selector',
	blockJsClass: 'js-pagination',
};

export const component = () => (
	<CarouselPaginationEditor {...props} />
);

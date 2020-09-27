import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { ScrollToTopEditor } from '../components/scroll-to-top-editor';

export default {
	title: 'Components|Scroll To Top',
	parameters: {
		notes: readme,
	},
};

export const component = () => (
	<ScrollToTopEditor />
);

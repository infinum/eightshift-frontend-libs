import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { SearchBarEditor } from '../components/search-bar-editor';

export default {
	title: 'Components|Search Bar',
	parameters: {
		notes: readme,
	},
};

export const component = () => (
	<SearchBarEditor />
);

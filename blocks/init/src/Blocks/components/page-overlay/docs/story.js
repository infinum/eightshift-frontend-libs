import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { PageOverlayEditor } from '../components/page-overlay-editor';

export default {
	title: 'Components|Page Overlay',
	parameters: {
		notes: readme,
	},
};

document.body.classList.add('page-overlay-shown');

export const component = () => (
	<PageOverlayEditor />
);

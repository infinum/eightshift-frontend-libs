import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { FooterEditor } from './../components/footer-editor';

export default {
	title: 'Components|Footer',
	parameters: {
		notes: readme,
	},
};

const editorProps = {
	left: 'Column Left',
	center: 'Column Center',
	right: 'Column Right',
};

export const component = () => (
	<FooterEditor {...editorProps}
	/>
);

import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { HeaderEditor } from '../components/header-editor';

export default {
	title: 'Components|Header',
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
	<HeaderEditor {...editorProps}
	/>
);

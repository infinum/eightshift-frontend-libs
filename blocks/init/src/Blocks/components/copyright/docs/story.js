import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { CopyrightEditor } from './../components/copyright-editor';

export default {
	title: 'Components|Copyright',
	parameters: {
		notes: readme,
	},
};

export const component = () => (
	<CopyrightEditor />
);

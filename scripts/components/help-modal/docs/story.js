import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { HelpModal } from '../help-modal';

export default {
	title: 'Options|HelpModal',
	parameters: {
		notes: readme,
	},
};

const props = {};

export const component = () => (
	<HelpModal
		{...props}
	/>
);

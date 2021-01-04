import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.mdx';
import { HelpModal } from '../help-modal';

export default {
	title: 'Options/HelpModal',
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const props = {};

export const component = () => (
	<HelpModal
		{...props}
	/>
);

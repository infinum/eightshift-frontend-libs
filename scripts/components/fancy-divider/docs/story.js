import React from 'react';
import readme from './readme.mdx';
import { FancyDivider } from '../fancy-divider';

export default {
	title: `Options/FancyDivider`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const simpleDivider = () => (
	<FancyDivider label='Divider' />
);

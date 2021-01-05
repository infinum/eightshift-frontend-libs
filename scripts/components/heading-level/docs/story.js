import React from 'react';
import readme from './readme.mdx';
import { HeadingLevel } from '../heading-level';

export default {
	title: 'Options/Heading Level',
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const defaultProps = {
	minLevel: 1,
	maxLevel: 6,
	selectedLevel: 2,
	onChange: () => {},
};

export const component = () => (
	<HeadingLevel
		{...defaultProps}
	/>
);

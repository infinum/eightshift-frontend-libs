import React from 'react';
import readme from './readme.mdx';
import { ServerSideRender } from '../server-side-render';

export default {
	title: 'Options/ServerSideRender',
	parameters: {
		docs: {
			page: readme
		}
	},
};

const defaultProps = {
	block: 'eightshift-boilerplate/paragraph',
	attributes: {
		paragraphContent: 'Hello',
		wrapperUse: false
	}
};

export const SelectSingle = () => {
	return (
		<ServerSideRender
			{...defaultProps}
		/>
	);
};

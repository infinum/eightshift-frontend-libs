import React from 'react';
import { ServerSideRender } from '../server-side-render';

export default {
	title: 'Options/ServerSideRender',
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

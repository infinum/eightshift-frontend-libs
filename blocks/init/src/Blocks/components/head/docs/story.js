import React from 'react';
import readme from './readme.mdx';
import manifest from '../manifest.json';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

export const editor = () => (
	<div>{`Component - ${manifest.title} - Please check readme`}</div>
);

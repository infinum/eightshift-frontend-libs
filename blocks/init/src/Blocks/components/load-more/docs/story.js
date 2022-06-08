import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { LoadMoreEditor } from '../components/load-more-editor';
import { LoadMoreOptions } from '../components/load-more-options';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const attributes = getExample('loadMore', manifest);

export const editor = () => (
	<LoadMoreEditor {...props('loadMore', attributes)} />
);

export const options = () => (
	<LoadMoreOptions
		{...props('loadMore', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);

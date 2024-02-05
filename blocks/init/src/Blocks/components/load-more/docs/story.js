import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { LoadMoreEditor } from '../components/load-more-editor';
import { LoadMoreOptions } from '../components/load-more-options';

export default {
	title: 'Components/Load more',
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

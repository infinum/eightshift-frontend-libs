import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { SearchBarEditor } from '../components/search-bar-editor';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const attributes = getExample('searchBar', manifest);

export const editor = () => (
	<SearchBarEditor {...props('searchBar', attributes)} />
);

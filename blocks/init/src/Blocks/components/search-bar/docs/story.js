import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { SearchBarEditor } from '../components/search-bar-editor';

export default {
	title: 'Components/Search bar',
};

const attributes = getExample('searchBar', manifest);

export const editor = () => (
	<SearchBarEditor {...props('searchBar', attributes)} />
);

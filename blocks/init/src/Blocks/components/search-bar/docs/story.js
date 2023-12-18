import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { SearchBarEditor } from '../components/search-bar-editor';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/SearchBar',
};

const attributes = getExample('searchBar', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<SearchBarEditor {...props('searchBar', attributes)} />
	</GetStoryComponentDescription>
);

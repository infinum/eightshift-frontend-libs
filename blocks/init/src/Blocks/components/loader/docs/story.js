import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { LoaderEditor } from '../components/loader-editor';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Loader',
};

const attributes = getExample('loader', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<LoaderEditor {...props('loader', attributes)} />
	</GetStoryComponentDescription>
);

import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { LoaderEditor } from '../components/loader-editor';

export default {
	title: 'Components/Loader',
};

const attributes = getExample('loader', manifest);

export const editor = () => (
	<LoaderEditor {...props('loader', attributes)} />
);

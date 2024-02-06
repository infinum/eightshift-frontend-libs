import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { CopyrightEditor } from '../components/copyright-editor';

export default {
	title: 'Components/Copyright',
};

const attributes = getExample('copyright', manifest);

export const editor = () => (
	<CopyrightEditor {...props('copyright', attributes)} />
);

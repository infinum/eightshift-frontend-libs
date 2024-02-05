import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { PageOverlayEditor } from '../components/page-overlay-editor';

export default {
	title: 'Components/Page overlay',
};

const attributes = getExample('pageOverlay', manifest);

const open = () => document.body.classList.add('page-overlay-shown');

export const editor = () => {
	open();

	return (
		<PageOverlayEditor {...props('pageOverlay', attributes)} />
	);
};

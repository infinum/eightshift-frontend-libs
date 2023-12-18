import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { PageOverlayEditor } from '../components/page-overlay-editor';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Page Overlay',
};

const attributes = getExample('pageOverlay', manifest);

const open = () => document.body.classList.add('page-overlay-shown');

export const editor = () => {
	open();

	return (
		<GetStoryComponentDescription manifest={manifest}>
			<div className='es-position-relative es-h-100'>
				<PageOverlayEditor {...props('pageOverlay', attributes)} />
			</div>
		</GetStoryComponentDescription>
	);
};

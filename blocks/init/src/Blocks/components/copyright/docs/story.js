import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { CopyrightEditor } from '../components/copyright-editor';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Copyright',
};

const attributes = getExample('copyright', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<CopyrightEditor {...props('copyright', attributes)} />
	</GetStoryComponentDescription>
);

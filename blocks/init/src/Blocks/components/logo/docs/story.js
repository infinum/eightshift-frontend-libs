import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { LogoEditor } from '../components/logo-editor';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Logo',
};

const attributes = getExample('logo', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<LogoEditor {...props('logo', attributes)} />
	</GetStoryComponentDescription>
	);

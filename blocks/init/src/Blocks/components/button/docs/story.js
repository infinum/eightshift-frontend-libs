import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { ButtonEditor } from '../components/button-editor';
import { ButtonOptions } from '../components/button-options';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Button',
};

const attributes = getExample('button', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<ButtonEditor {...props('button', attributes)} />
	</GetStoryComponentDescription>
);

export const options = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<ButtonOptions {...props('button', attributes, {
			options: getOptions(attributes, manifest),
		})} />
	</GetStoryComponentDescription>
);

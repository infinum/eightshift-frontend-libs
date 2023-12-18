import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { CardEditor } from '../components/card-editor';
import { CardOptions } from '../components/card-options';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Card',
};

const attributes = getExample('card', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<CardEditor {...props('card', attributes)} />
	</GetStoryComponentDescription>
);

export const options = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<CardOptions
			{...props('card', attributes, {
				options: getOptions(attributes, manifest),
			})}
		/>
	</GetStoryComponentDescription>
);

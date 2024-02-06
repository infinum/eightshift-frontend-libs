import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { CardEditor } from '../components/card-editor';
import { CardOptions } from '../components/card-options';

export default {
	title: 'Components/Card',
};

const attributes = getExample('card', manifest);

export const editor = () => (
	<CardEditor {...props('card', attributes)} />
);

export const options = () => (
	<CardOptions
		{...props('card', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);

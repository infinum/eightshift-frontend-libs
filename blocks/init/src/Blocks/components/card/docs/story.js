import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { CardEditor } from '../components/card-editor';
import { CardOptions } from '../components/card-options';
import { CardToolbar } from '../components/card-toolbar';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
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

export const toolbar = () => (
	<CardToolbar
		{...props('card', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);

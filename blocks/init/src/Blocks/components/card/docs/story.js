import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import manifest from './../manifest.json';
import { CardEditor } from '../components/card-editor';
import { CardOptions } from '../components/card-options';
import { CardToolbar } from '../components/card-toolbar';

export default {
	title: `Components|${manifest.title}`,
	parameters: {
		notes: readme,
	},
};

const props = manifest.example.attributes;

export const editor = () => (
	<CardEditor {...props} />
);

export const options = () => (
	<CardOptions {...props} />
);

export const toolbar = () => (
	<CardToolbar {...props} />
);

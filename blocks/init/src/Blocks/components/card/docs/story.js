import React from 'react';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import imageManifest from './../../image/manifest.json';
import headingManifest from './../../heading/manifest.json';
import paragraphManifest from './../../paragraph/manifest.json';
import buttonManifest from './../../button/manifest.json';
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

const props = {
	...imageManifest.example.attributes,
	...headingManifest.example.attributes,
	...paragraphManifest.example.attributes,
	...buttonManifest.example.attributes,
	...manifest.example.attributes,
};

export const editor = () => (
	<CardEditor {...props} />
);

export const options = () => (
	<CardOptions {...props} />
);

export const toolbar = () => (
	<CardToolbar {...props} />
);

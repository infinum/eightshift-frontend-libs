import React from 'react';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import imageManifest from './../../image/manifest.json';
import headingManifest from './../../heading/manifest.json';
import paragraphManifest from './../../paragraph/manifest.json';
import buttonManifest from './../../button/manifest.json';
import { JumbotronEditor } from '../components/jumbotron-editor';
import { JumbotronOptions } from '../components/jumbotron-options';
import { JumbotronToolbar } from '../components/jumbotron-toolbar';

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
	<JumbotronEditor {...props} />
);

export const options = () => (
	<JumbotronOptions {...props} />
);

export const toolbar = () => (
	<JumbotronToolbar {...props} />
);

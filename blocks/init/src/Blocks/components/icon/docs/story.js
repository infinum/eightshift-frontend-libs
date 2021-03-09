import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { IconEditor } from '../components/icon-editor';
import { IconOptions } from '../components/icon-options';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

const props = manifest.example.attributes;

export const editor = () => (
	<IconEditor {...props} />
);

export const options = () => (
	<IconOptions {...props} />
);

import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import manifest from './../manifest.json';
import { LoaderEditor } from '../components/loader-editor';

export default {
	title: `Components|${manifest.title}`,
	parameters: {
		notes: readme,
	},
};

const props = manifest.example.attributes;

export const editor = () => (
	<LoaderEditor {...props} />
);

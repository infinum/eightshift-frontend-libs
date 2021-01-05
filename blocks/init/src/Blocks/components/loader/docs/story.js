import React from 'react';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { LoaderEditor } from '../components/loader-editor';

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
	<LoaderEditor {...props} />
);

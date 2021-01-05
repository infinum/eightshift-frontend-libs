import React from 'react';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { PageOverlayEditor } from '../components/page-overlay-editor';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const props = manifest.example.attributes;

const open = () => document.body.classList.add('page-overlay-shown');

export const editor = () => {
	open();

	return (
		<PageOverlayEditor {...props} />
	);
};

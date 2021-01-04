import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { ScrollToTopEditor } from '../components/scroll-to-top-editor';

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
	<ScrollToTopEditor {...props} />
);

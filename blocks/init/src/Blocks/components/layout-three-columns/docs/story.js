import React from 'react';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { LayoutThreeColumnsEditor } from '../components/layout-three-columns-editor';

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
	<LayoutThreeColumnsEditor {...props} />
);

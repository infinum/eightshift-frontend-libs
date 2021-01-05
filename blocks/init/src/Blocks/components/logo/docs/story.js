import React from 'react';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { LogoEditor } from '../components/logo-editor';

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
	<LogoEditor {...props} />
);

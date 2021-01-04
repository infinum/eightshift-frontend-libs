import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { SocialLinksEditor } from '../components/social-links-editor';

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
	<SocialLinksEditor {...props} />
);

import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
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

const attributes = getExample('socialLinks', manifest);

export const editor = () => (
	<SocialLinksEditor {...props('socialLinks', attributes)} />
);

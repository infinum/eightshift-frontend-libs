import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { SocialNetworksEditor } from '../components/social-networks-editor';
import { SocialNetworksOptions } from '../components/social-networks-options';

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
	<SocialNetworksEditor {...props('socialNetworks', attributes)} />
);

export const options = () => (
	<SocialNetworksOptions {...props('socialNetworks', attributes)} />
);

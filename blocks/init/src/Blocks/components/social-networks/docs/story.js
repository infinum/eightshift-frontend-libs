import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { SocialNetworksEditor } from '../components/social-networks-editor';
import { SocialNetworksOptions } from '../components/social-networks-options';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Social Networks',
};

const attributes = getExample('socialLinks', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<SocialNetworksEditor {...props('socialNetworks', attributes)} />
	</GetStoryComponentDescription>
);

export const options = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<SocialNetworksOptions {...props('socialNetworks', attributes)} />
	</GetStoryComponentDescription>
);

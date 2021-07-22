import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts/editor';
import readme from './readme.mdx';
import manifest from '../manifest.json';
import { VideoButtonEditor } from '../components/video-button-editor';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const attributes = getExample('videoButton', manifest);

export const editor = () => (
	<VideoButtonEditor {...props('videoButton', attributes)} />
);

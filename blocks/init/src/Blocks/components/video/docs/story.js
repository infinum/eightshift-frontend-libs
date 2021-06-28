import React from 'react';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { VideoEditor } from '../components/video-editor';
import { VideoOptions } from '../components/video-options';

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
	<VideoEditor {...props} />
);
export const options = () => (
	<VideoOptions {...props} />
);

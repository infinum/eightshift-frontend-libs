import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
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

const attributes = getExample('video', manifest);

export const editor = () => (
	<VideoEditor {...props('video', attributes)} />
);
export const options = () => (
	<VideoOptions
		{...props('video', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);
